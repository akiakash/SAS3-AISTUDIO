/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import {
  Save, Plus, Trash2, ChevronDown, ChevronUp, LayoutList, FileEdit, ClipboardList, Truck,
} from 'lucide-react';
import { RIKSO_RECORDS, createEmptyTransport } from './riksoData';
import {
  RIKSO_COLUMNS,
  createEmptyRiksoRow,
  rowHasRiksoData,
  type RiksoEditableRow,
  type RiksoColumnDef,
} from './riksoColumns';
import type { RiksoRowData, RiksoRecord } from './riksoData';
import RiksoTransportsEditor from './RiksoTransportsEditor';

export default function RiksoPage() {
  return (
    <Routes>
      <Route index element={<RiksoListView />} />
      <Route path="form" element={<RiksoFormView />} />
      <Route path="*" element={<Navigate to="/orders/rikso" replace />} />
    </Routes>
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

function cloneRiksoRecords(records: RiksoRecord[]): RiksoRecord[] {
  return records.map(r => ({
    ...r,
    transports: r.transports.map(t => ({ ...t })),
  }));
}

function RiksoListView() {
  const [entryRows, setEntryRows] = useState<RiksoEditableRow[]>(() => [createEmptyRiksoRow()]);
  const [existingRecords, setExistingRecords] = useState<RiksoRecord[]>(() => cloneRiksoRecords(RIKSO_RECORDS));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateCell = (rowId: string, key: keyof RiksoRowData, value: string) => {
    setEntryRows(prev => prev.map(r => (r.id === rowId ? { ...r, [key]: value } : r)));
  };

  const updateTransports = (rowId: string, transports: RiksoEditableRow['transports']) => {
    setEntryRows(prev => prev.map(r => (r.id === rowId ? { ...r, transports } : r)));
  };

  const updateExistingTransports = (recordId: number, transports: RiksoRecord['transports']) => {
    setExistingRecords(prev =>
      prev.map(r => (r.id === recordId ? { ...r, transports } : r)),
    );
  };

  const addEntryRow = () => setEntryRows(prev => [...prev, createEmptyRiksoRow()]);
  const removeEntryRow = (rowId: string) => {
    setEntryRows(prev => (prev.length <= 1 ? prev : prev.filter(r => r.id !== rowId)));
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.delete(rowId);
      return next;
    });
  };
  const clearEntryRows = () => {
    setEntryRows([createEmptyRiksoRow()]);
    setExpandedIds(new Set());
  };

  const filledCount = entryRows.filter(rowHasRiksoData).length;
  const colSpan = RIKSO_COLUMNS.length + 3;

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTableElement>) => {
    const text = e.clipboardData.getData('text/plain');
    if (!text.includes('\t') && !text.includes('\n')) return;
    e.preventDefault();
    const pastedRows = text.trimEnd().split(/\r?\n/).map(line => line.split('\t'));
    const colKeys = RIKSO_COLUMNS.map(c => c.key);

    setEntryRows(prev => {
      const next = [...prev];
      let targetIndex = next.findIndex(r => !rowHasRiksoData(r));
      pastedRows.forEach(cells => {
        if (targetIndex < 0 || targetIndex >= next.length) {
          next.push(createEmptyRiksoRow());
          targetIndex = next.length - 1;
        }
        const row = { ...next[targetIndex] };
        cells.forEach((cell, ci) => {
          if (ci < colKeys.length) row[colKeys[ci]] = cell.trim();
        });
        next[targetIndex] = row;
        targetIndex += 1;
      });
      return next;
    });
  }, []);

  return (
    <>
      <RiksoViewBar />
      <div className="inventory-sheet-toolbar">
        <span className="inventory-sheet-hint">
          <strong>{filledCount}</strong> new row{filledCount !== 1 ? 's' : ''} ready to save · <strong>{existingRecords.length}</strong> existing below
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={clearEntryRows}>Clear new rows</button>
          <button type="button" className="btn btn-ghost" onClick={addEntryRow}>
            <Plus style={{ width: 14, height: 14 }} /> Add row
          </button>
          <button type="button" className="btn btn-primary">
            <Save style={{ width: 14, height: 14 }} /> Save new entries
          </button>
        </div>
      </div>

      <div className="audit-card inventory-sheet-wrap rikso-sheet-wrap">
        <div className="inventory-sheet-scroll">
          <table className="inventory-sheet-table rikso-sheet-table" onPaste={handlePaste}>
            <thead>
              <tr>
                <th className="inventory-sheet-row-num">#</th>
                <th className="rikso-col-transport" title="Transports">T</th>
                {RIKSO_COLUMNS.map(col => (
                  <th key={col.key} style={{ minWidth: col.width }}>{col.label}</th>
                ))}
                <th className="inventory-sheet-actions-col" />
              </tr>
            </thead>
            <tbody>
              <tr className="inventory-sheet-section-row">
                <td colSpan={colSpan}>New entry — fill rows below (expand T for transports)</td>
              </tr>
              {entryRows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <RiksoListRowBlock
                    rowNum={`+${index + 1}`}
                    row={row}
                    colSpan={colSpan}
                    isNew
                    expanded={expandedIds.has(row.id)}
                    onToggleExpand={() => toggleExpand(row.id)}
                    onCellChange={(key, value) => updateCell(row.id, key, value)}
                    onTransportsChange={t => updateTransports(row.id, t)}
                    onRemove={() => removeEntryRow(row.id)}
                    canRemove={entryRows.length > 1}
                    transportsEditable
                  />
                </React.Fragment>
              ))}

              <tr className="inventory-sheet-section-row inventory-sheet-section-existing">
                <td colSpan={colSpan}>Existing RIKSO records ({existingRecords.length}) — expand T to add or edit transports</td>
              </tr>
              {existingRecords.map((record, index) => (
                <React.Fragment key={record.id}>
                  <RiksoExistingRowBlock
                    index={index}
                    record={record}
                    colSpan={colSpan}
                    expanded={expandedIds.has(`existing-${record.id}`)}
                    onToggleExpand={() => toggleExpand(`existing-${record.id}`)}
                    onTransportsChange={t => updateExistingTransports(record.id, t)}
                  />
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="inventory-sheet-footer">
          <button type="button" className="inventory-sheet-add-row" onClick={addEntryRow}>
            <Plus style={{ width: 13, height: 13 }} /> Add another row
          </button>
        </div>
      </div>
    </>
  );
}

function RiksoListRowBlock({
  rowNum, row, colSpan, isNew, expanded, onToggleExpand, onCellChange, onTransportsChange, onRemove, canRemove,
  transportsEditable = false,
}: {
  rowNum: string;
  row: RiksoEditableRow;
  colSpan: number;
  isNew?: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onCellChange: (key: keyof RiksoRowData, value: string) => void;
  onTransportsChange: (t: RiksoEditableRow['transports']) => void;
  onRemove?: () => void;
  canRemove?: boolean;
  /** When true, transport legs can be added/edited (new rows and existing records). */
  transportsEditable?: boolean;
}) {
  const transportCount = row.transports.length;

  return (
    <>
      <tr className={isNew ? 'inventory-sheet-entry-row' : 'inventory-sheet-existing-row'}>
        <td className={`inventory-sheet-row-num${isNew ? ' inventory-sheet-row-num-new' : ''}`}>{rowNum}</td>
        <td className="rikso-col-transport">
          <button type="button" className={`inventory-expand-btn${expanded ? ' active' : ''}`} onClick={onToggleExpand} title="Transports">
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {!expanded && transportCount > 0 && <span className="inventory-transport-badge">{transportCount}</span>}
          </button>
        </td>
        {RIKSO_COLUMNS.map(col => (
          <td key={col.key}>
            {isNew ? (
              <RiksoCellInput col={col} value={row[col.key]} onChange={v => onCellChange(col.key, v)} />
            ) : (
              <span className="inventory-sheet-readonly" title={row[col.key]}>{row[col.key] || '—'}</span>
            )}
          </td>
        ))}
        <td className="inventory-sheet-actions-col">
          {isNew && onRemove && (
            <button type="button" className="action-btn action-btn-delete" title="Remove row" onClick={onRemove} disabled={!canRemove}>
              <Trash2 style={{ width: 14, height: 14 }} />
            </button>
          )}
        </td>
      </tr>
      {expanded && (
        <tr className="rikso-transport-expand-row">
          <td colSpan={colSpan} className="rikso-transport-expand-cell">
            <div className="rikso-transport-expand-wrap">
              <RiksoTransportsEditor
                transports={row.transports.length > 0 ? row.transports : [createEmptyTransport()]}
                onChange={onTransportsChange}
                readOnly={!transportsEditable}
                compact
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function RiksoExistingRowBlock({
  index, record, colSpan, expanded, onToggleExpand, onTransportsChange,
}: {
  index: number;
  record: RiksoRecord;
  colSpan: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onTransportsChange: (t: RiksoRecord['transports']) => void;
}) {
  const { id: _recordId, transports, ...data } = record;
  const row: RiksoEditableRow = { id: `existing-${record.id}`, ...data, transports };
  return (
    <RiksoListRowBlock
      rowNum={String(index + 1)}
      row={row}
      colSpan={colSpan}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      onCellChange={() => {}}
      onTransportsChange={onTransportsChange}
      transportsEditable
    />
  );
}

function RiksoCellInput({
  col, value, onChange,
}: {
  col: RiksoColumnDef;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type={col.type ?? 'text'}
      className="inventory-sheet-cell"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="—"
    />
  );
}

const EMPTY_FORM: RiksoRowData = {
  orderId: '', auctionDate: '', auction: '', posNo: '', portLetter: '', auctionNumber: '',
  chassisNumber: '', make: '', modelName: '', type: '', pickNote: '', paySoonDate: '',
  orderDate: '', cutOffDate: '', eyaDate: '',
};

function RiksoFormView() {
  const [form, setForm] = useState<RiksoRowData>({ ...EMPTY_FORM });
  const [transports, setTransports] = useState(() => [createEmptyTransport()]);

  const setField = (key: keyof RiksoRowData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <RiksoViewBar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 20 }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setForm({ ...EMPTY_FORM });
            setTransports([createEmptyTransport()]);
          }}
        >
          Clear
        </button>
        <button type="button" className="btn btn-primary">
          <Save style={{ width: 14, height: 14 }} /> Save entry
        </button>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <ClipboardList style={{ width: 14, height: 14, color: '#2563eb' }} />
            </div>
            <span className="form-section-title">RIKSO Order</span>
            <span className="form-section-tag">rikso</span>
          </div>
          <div className="section-grid section-grid-4">
            {RIKSO_COLUMNS.map(col => (
              <div key={col.key} className={col.key === 'pickNote' ? 'col-span-2' : undefined}>
                <label className="field-label">{col.label}</label>
                <input
                  className="field-input"
                  type={col.type ?? 'text'}
                  value={form[col.key]}
                  onChange={e => setField(col.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon" style={{ background: '#ede9fe', border: '1px solid #ddd6fe' }}>
              <Truck style={{ width: 14, height: 14, color: '#7c3aed' }} />
            </div>
            <span className="form-section-title">Transport Records</span>
            <span className="form-section-tag" style={{ color: '#7c3aed', background: '#ede9fe', borderColor: '#ddd6fe' }}>transports</span>
          </div>
          <RiksoTransportsEditor transports={transports} onChange={setTransports} />
        </div>
      </div>
    </>
  );
}
