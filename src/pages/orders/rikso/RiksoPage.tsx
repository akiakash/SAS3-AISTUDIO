/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import {
  Save, ChevronDown, ChevronUp, LayoutList, FileEdit, Truck, Search,
  ClipboardList, ChevronRight,
} from 'lucide-react';
import { createEmptyTransport } from '../../../data/rikso/riksoData';
import { RIKSO_COLUMNS } from '../../../data/rikso/riksoColumns';
import type { RiksoRecord } from '../../../data/rikso/riksoData';
import RiksoTransportsEditor from './RiksoTransportsEditor';
import RiksoOrderDetails, { RiksoOrderHero } from './RiksoOrderDetails';
import { RiksoRecordsProvider, useRiksoRecords } from './RiksoRecordsContext';

export default function RiksoPage() {
  return (
    <RiksoRecordsProvider>
      <Routes>
        <Route index element={<RiksoListView />} />
        <Route path="form" element={<RiksoFormView />} />
        <Route path="*" element={<Navigate to="/orders/rikso" replace />} />
      </Routes>
    </RiksoRecordsProvider>
  );
}

function RiksoViewBar() {
  return (
    <div className="new-entry-view-bar">
      <span className="new-entry-view-label">RIKSO mode</span>
      <div className="manage-view-toggle">
        <NavLink
          to="/orders/rikso"
          end
          className={({ isActive }) => `manage-view-btn${isActive ? ' active' : ''}`}
          style={{ width: 'auto', padding: '0 14px', gap: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
        >
          <LayoutList style={{ width: 14, height: 14 }} />
          List
        </NavLink>
        <NavLink
          to="/orders/rikso/form"
          className={({ isActive }) => `manage-view-btn${isActive ? ' active' : ''}`}
          style={{ width: 'auto', padding: '0 14px', gap: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
        >
          <FileEdit style={{ width: 14, height: 14 }} />
          Form
        </NavLink>
      </div>
    </div>
  );
}

function RiksoListView() {
  const { records, updateTransports } = useRiksoRecords();
  const [expandedIds, setExpandedIds] = useState<Set<number>>(() => new Set());

  const toggleExpand = (recordId: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(recordId)) next.delete(recordId);
      else next.add(recordId);
      return next;
    });
  };

  const colSpan = RIKSO_COLUMNS.length + 2;

  return (
    <div className="rikso-list-page">
      <RiksoViewBar />
      <div className="inventory-sheet-toolbar">
        <span className="inventory-sheet-hint">
          <strong>{records.length}</strong> orders · expand <strong>T</strong> to add or edit transport legs
        </span>
        <button type="button" className="btn btn-primary">
          <Save style={{ width: 14, height: 14 }} /> Save transports
        </button>
      </div>

      <div className="inventory-sheet-wrap rikso-sheet-wrap">
        <div className="inventory-sheet-scroll">
          <table className="inventory-sheet-table rikso-sheet-table">
            <thead>
              <tr>
                <th className="inventory-sheet-row-num">#</th>
                <th className="rikso-col-transport" title="Transports">T</th>
                {RIKSO_COLUMNS.map(col => (
                  <th key={col.key} style={{ minWidth: col.width }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <React.Fragment key={record.id}>
                  <RiksoListRow
                    index={index}
                    record={record}
                    colSpan={colSpan}
                    expanded={expandedIds.has(record.id)}
                    onToggleExpand={() => toggleExpand(record.id)}
                    onTransportsChange={t => updateTransports(record.id, t)}
                  />
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RiksoListRow({
  index, record, colSpan, expanded, onToggleExpand, onTransportsChange,
}: {
  index: number;
  record: RiksoRecord;
  colSpan: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onTransportsChange: (t: RiksoRecord['transports']) => void;
}) {
  const transportCount = record.transports.length;

  return (
    <>
      <tr className="inventory-sheet-existing-row">
        <td className="inventory-sheet-row-num">{index + 1}</td>
        <td className="rikso-col-transport">
          <button
            type="button"
            className={`inventory-expand-btn${expanded ? ' active' : ''}`}
            onClick={onToggleExpand}
            title="Transport details"
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {!expanded && transportCount > 0 && (
              <span className="inventory-transport-badge">{transportCount}</span>
            )}
          </button>
        </td>
        {RIKSO_COLUMNS.map(col => (
          <td key={col.key}>
            <span className="inventory-sheet-readonly" title={record[col.key]}>
              {record[col.key] || '—'}
            </span>
          </td>
        ))}
      </tr>
      {expanded && (
        <tr className="rikso-transport-expand-row">
          <td colSpan={colSpan} className="rikso-transport-expand-cell">
            <div className="rikso-transport-expand-wrap">
              <RiksoTransportsEditor
                transports={record.transports.length > 0 ? record.transports : [createEmptyTransport()]}
                onChange={onTransportsChange}
                compact
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function RiksoFormView() {
  const { records, updateTransports } = useRiksoRecords();
  const [selectedId, setSelectedId] = useState<number | null>(records[0]?.id ?? null);
  const [search, setSearch] = useState('');

  const filtered = records.filter(r => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return `${r.orderId} ${r.auction} ${r.make} ${r.modelName} ${r.chassisNumber}`.toLowerCase().includes(q);
  });

  const selected = records.find(r => r.id === selectedId);
  const transportCount = selected?.transports.length ?? 0;

  return (
    <>
      <RiksoViewBar />

      <div className="rikso-form-layout">
        <aside className="rikso-form-sidebar">
          <div className="rikso-form-sidebar-head">
            <div className="rikso-form-sidebar-title">
              <ClipboardList style={{ width: 16, height: 16 }} />
              <span>Orders</span>
            </div>
            <span className="rikso-form-sidebar-badge">{records.length}</span>
          </div>
          <div className="rikso-form-sidebar-search">
            <Search style={{ width: 14, height: 14, color: '#94a3b8' }} />
            <input
              type="search"
              placeholder="Search order, auction, chassis…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="rikso-form-orders-list">
            {filtered.length === 0 ? (
              <p className="rikso-form-sidebar-empty">No orders match your search.</p>
            ) : (
              filtered.map(record => {
                const active = selectedId === record.id;
                const count = record.transports.length;
                return (
                  <button
                    key={record.id}
                    type="button"
                    className={`rikso-form-order-item${active ? ' active' : ''}`}
                    onClick={() => setSelectedId(record.id)}
                  >
                    <div className="rikso-form-order-item-body">
                      <span className="rikso-form-order-id">{record.orderId}</span>
                      <span className="rikso-form-order-vehicle">{record.make} {record.modelName}</span>
                      <span className="rikso-form-order-auction">{record.auction}</span>
                      {count > 0 && (
                        <span className="rikso-form-order-transport-pill">
                          {count} transport{count !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <ChevronRight className={`rikso-form-order-chevron${active ? ' active' : ''}`} size={16} />
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <div className="rikso-form-detail">
          {selected ? (
            <div className="rikso-form-detail-inner">
              <div className="rikso-form-detail-toolbar">
                <p className="rikso-form-detail-hint">Order details are read-only · manage transports below</p>
                <button type="button" className="btn btn-primary">
                  <Save style={{ width: 14, height: 14 }} /> Save transports
                </button>
              </div>

              <div className="rikso-form-detail-card">
                <RiksoOrderHero record={selected} transportCount={transportCount} />
                <div className="rikso-form-detail-body">
                  <RiksoOrderDetails record={selected} />
                </div>
              </div>

              <div className="rikso-form-transport-card">
                <div className="rikso-form-transport-head">
                  <div className="rikso-form-transport-title">
                    <span className="rikso-form-transport-icon">
                      <Truck style={{ width: 15, height: 15 }} />
                    </span>
                    <div>
                      <h3>Transport legs</h3>
                      <p>Add or update delivery yard, transporter, dates and cost</p>
                    </div>
                  </div>
                </div>
                <div className="rikso-form-transport-body">
                  <RiksoTransportsEditor
                    transports={selected.transports.length > 0 ? selected.transports : [createEmptyTransport()]}
                    onChange={t => updateTransports(selected.id, t)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="rikso-form-empty">
              <div className="rikso-form-empty-icon">
                <ClipboardList style={{ width: 28, height: 28 }} />
              </div>
              <h3>Select an order</h3>
              <p>Choose an order from the list to view details and manage transport records.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
