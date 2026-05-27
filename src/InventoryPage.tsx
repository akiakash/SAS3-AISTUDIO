/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, Eye, Pencil, Trash2, Filter, ArrowUpDown, Download,
  CheckCircle2, Clock, XCircle, ChevronDown, ChevronUp,
  LayoutList, Layers,
} from 'lucide-react';
import {
  VEHICLES, TRANSPORTS, groupVehiclesByOrder,
  type Vehicle, type OrderGroup,
} from './vehicleData';
import VehicleDetailPanel from './VehicleDetailPanel';
import { useInventoryAttachments } from './inventoryAttachments';

type ViewMode = 'orders' | 'list';

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string; icon: ReactNode }> = {
  Available: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', icon: <CheckCircle2 style={{ width: 11, height: 11 }} /> },
  Reserved: { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: <Clock style={{ width: 11, height: 11 }} /> },
  Sold: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: <XCircle style={{ width: 11, height: 11 }} /> },
};

export default function InventoryPage() {
  const navigate = useNavigate();
  const { getAttachments, addImages, addDocuments, removeImage, removeDocument } = useInventoryAttachments();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('orders');
  const [expandedOrder, setExpandedOrder] = useState<string | null>('ORD-2024-001');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = useMemo(() => VEHICLES.filter(v => {
    const q = search.toLowerCase();
    if (!q) return true;
    return `${v.orderId} ${v.make} ${v.model} ${v.chassis} ${v.stock} ${v.customerName}`.toLowerCase().includes(q);
  }), [search]);

  const orderGroups = useMemo(() => groupVehiclesByOrder(filtered), [filtered]);
  const counts = {
    total: VEHICLES.length,
    available: VEHICLES.filter(v => v.status === 'Available').length,
    reserved: VEHICLES.filter(v => v.status === 'Reserved').length,
    sold: VEHICLES.filter(v => v.status === 'Sold').length,
  };
  const totalTransports = Object.values(TRANSPORTS).reduce((s, a) => s + a.length, 0);

  return (
    <>
      <div className="inventory-page-toolbar">
        <div className="manage-view-toggle">
          <button
            type="button"
            className={`manage-view-btn${viewMode === 'orders' ? ' active' : ''}`}
            onClick={() => setViewMode('orders')}
            style={{ width: 'auto', padding: '0 14px', gap: 6, fontSize: 12, fontWeight: 600 }}
          >
            <Layers style={{ width: 14, height: 14 }} />
            By Order
          </button>
          <button
            type="button"
            className={`manage-view-btn${viewMode === 'list' ? ' active' : ''}`}
            onClick={() => setViewMode('list')}
            style={{ width: 'auto', padding: '0 14px', gap: 6, fontSize: 12, fontWeight: 600 }}
          >
            <LayoutList style={{ width: 14, height: 14 }} />
            List
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-ghost" style={{ color: '#475569', borderColor: '#e2e8f0' }}>
            <Download style={{ width: 14, height: 14 }} /> Export
          </button>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/orders/inventory/new')}>
            <Plus style={{ width: 14, height: 14 }} /> New Entry
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Vehicles', value: counts.total, color: '#2563eb', border: '#bfdbfe' },
          { label: 'Orders', value: orderGroups.length, color: '#6554c0', border: '#ddd6fe' },
          { label: 'Available', value: counts.available, color: '#36b37e', border: '#bbf7d0' },
          { label: 'Reserved', value: counts.reserved, color: '#ffab00', border: '#fde68a' },
          { label: 'Transports', value: totalTransports, color: '#64748b', border: '#e2e8f0' },
        ].map(s => (
          <div
            key={s.label}
            style={{
              background: '#fff', border: '1px solid #ebecf0', borderRadius: 12,
              padding: '16px 20px', borderLeft: `3px solid ${s.color}`,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="audit-card">
        <InventorySearchBar
          search={search}
          onSearchChange={setSearch}
          resultCount={filtered.length}
          resultLabel={viewMode === 'orders' ? `orders · ${filtered.length} vehicles` : 'vehicles'}
        />

        {viewMode === 'list' ? (
          <VehicleTable
            vehicles={filtered}
            showOrderColumn
            expandedRow={expandedRow}
            onToggleExpand={id => setExpandedRow(expandedRow === id ? null : id)}
            onEdit={() => navigate('/orders/inventory/new/form')}
            getAttachments={getAttachments}
            onAddImages={addImages}
            onAddDocuments={addDocuments}
            onRemoveImage={removeImage}
            onRemoveDocument={removeDocument}
          />
        ) : (
          <div className="inventory-orders-view">
            {orderGroups.length === 0 ? (
              <div className="inventory-orders-empty">No orders match your search.</div>
            ) : (
              orderGroups.map(order => (
                <div key={order.orderId}>
                  <OrderSection
                    order={order}
                    expanded={expandedOrder === order.orderId}
                    onToggle={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}
                    onEdit={() => navigate('/orders/inventory/new/form')}
                    getAttachments={getAttachments}
                    onAddImages={addImages}
                    onAddDocuments={addDocuments}
                    onRemoveImage={removeImage}
                    onRemoveDocument={removeDocument}
                  />
                </div>
              ))
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>
            {viewMode === 'orders'
              ? `${orderGroups.length} order${orderGroups.length !== 1 ? 's' : ''} · ${filtered.length} vehicles`
              : `Showing ${filtered.length} of ${counts.total} vehicles`}
          </span>
        </div>
      </div>
    </>
  );
}

function InventorySearchBar({
  search, onSearchChange, resultCount, resultLabel,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  resultCount: number;
  resultLabel: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
        <Search style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#6b778c' }} />
        <input
          style={{ width: '100%', height: 32, paddingLeft: 30, paddingRight: 10, border: '1px solid #dfe1e6', borderRadius: 7, fontSize: 12.5, fontFamily: 'inherit', outline: 'none', color: '#172b4d', background: '#f4f5f7' }}
          placeholder="Search by order ID, stock, chassis, customer…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <button type="button" className="topbar-icon-btn" title="Filter" style={{ border: '1px solid #dfe1e6', borderRadius: 7 }}>
        <Filter style={{ width: 14, height: 14 }} />
      </button>
      <button type="button" className="topbar-icon-btn" title="Sort" style={{ border: '1px solid #dfe1e6', borderRadius: 7 }}>
        <ArrowUpDown style={{ width: 14, height: 14 }} />
      </button>
      <span style={{ fontSize: 11.5, color: '#94a3b8', marginLeft: 'auto' }}>{resultCount} {resultLabel}</span>
    </div>
  );
}

type AttachmentHandlers = {
  getAttachments: (vehicleId: number) => import('./VehicleAttachments').VehicleAttachmentState;
  onAddImages: (vehicleId: number, files: FileList) => void;
  onAddDocuments: (vehicleId: number, files: FileList) => void;
  onRemoveImage: (vehicleId: number, id: string) => void;
  onRemoveDocument: (vehicleId: number, id: string) => void;
};

function OrderSection({
  order, expanded, onToggle, onEdit,
  getAttachments, onAddImages, onAddDocuments, onRemoveImage, onRemoveDocument,
}: {
  order: OrderGroup;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
} & AttachmentHandlers) {
  const v = order.vehicle;
  const s = STATUS_STYLE[v.status] ?? STATUS_STYLE.Available;
  const transports = TRANSPORTS[v.id] ?? [];
  const attachments = getAttachments(v.id);

  return (
    <div className={`inventory-order-block${expanded ? ' expanded' : ''}`}>
      <button type="button" className="inventory-order-header" onClick={onToggle}>
        <span className="inventory-order-chevron">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
        <span className="inventory-order-id">{order.orderId}</span>
        <span className="inventory-order-meta">{order.customerName}</span>
        <span className="inventory-order-meta inventory-order-auction">{order.auctionName}</span>
        <span className="inventory-order-vehicle">{v.make} {v.model} · {v.stock}</span>
        <span className="status-pill inventory-order-status" style={{ background: s.bg, borderColor: s.border, color: s.color }}>
          {s.icon}{v.status}
        </span>
        <span className="inventory-order-total">¥{v.price.toLocaleString()}</span>
      </button>
      {expanded && (
        <VehicleDetailPanel
          vehicle={v}
          transports={transports}
          attachments={attachments}
          onAddImages={files => onAddImages(v.id, files)}
          onAddDocuments={files => onAddDocuments(v.id, files)}
          onRemoveImage={id => onRemoveImage(v.id, id)}
          onRemoveDocument={id => onRemoveDocument(v.id, id)}
        />
      )}
    </div>
  );
}

function VehicleTable({
  vehicles, showOrderColumn, expandedRow, onToggleExpand, onEdit, nested,
  getAttachments, onAddImages, onAddDocuments, onRemoveImage, onRemoveDocument,
}: {
  vehicles: Vehicle[];
  showOrderColumn: boolean;
  expandedRow: number | null;
  onToggleExpand: (id: number) => void;
  onEdit: () => void;
  nested?: boolean;
} & AttachmentHandlers) {
  const headers = [
    '',
    ...(showOrderColumn ? ['Order ID'] : []),
    'Stock ID', 'Make / Model', 'Chassis No.', 'Year', 'Fuel', 'Mileage', 'Grade', 'Price (¥)', 'Status', 'Actions',
  ];

  return (
    <div style={{ overflowX: 'auto', ...(nested ? { borderTop: '1px solid #e2e8f0' } : {}) }}>
      <table className={`inventory-vehicle-table${nested ? ' nested' : ''}`}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h || 'expand'}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v, i) => (
            <React.Fragment key={v.id}>
              <VehicleRows
                vehicle={v}
                rowIndex={i}
                showOrderColumn={showOrderColumn}
                isExpanded={expandedRow === v.id}
                onToggleExpand={() => onToggleExpand(v.id)}
                onEdit={onEdit}
                attachments={getAttachments(v.id)}
                onAddImages={files => onAddImages(v.id, files)}
                onAddDocuments={files => onAddDocuments(v.id, files)}
                onRemoveImage={id => onRemoveImage(v.id, id)}
                onRemoveDocument={id => onRemoveDocument(v.id, id)}
              />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VehicleRows({
  vehicle: v, rowIndex, showOrderColumn, isExpanded, onToggleExpand, onEdit,
  attachments, onAddImages, onAddDocuments, onRemoveImage, onRemoveDocument,
}: {
  vehicle: Vehicle;
  rowIndex: number;
  showOrderColumn: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  attachments: import('./VehicleAttachments').VehicleAttachmentState;
  onAddImages: (files: FileList) => void;
  onAddDocuments: (files: FileList) => void;
  onRemoveImage: (id: string) => void;
  onRemoveDocument: (id: string) => void;
}) {
  const s = STATUS_STYLE[v.status] ?? STATUS_STYLE.Available;
  const transports = TRANSPORTS[v.id] ?? [];
  const attachmentCount = attachments.images.length + attachments.documents.length;
  const rowBg = rowIndex % 2 === 1 ? '#fafbfc' : '#fff';
  const colSpan = 11 + (showOrderColumn ? 1 : 0);

  return (
    <>
      <tr className={isExpanded ? 'expanded' : ''} style={{ background: isExpanded ? '#f0f6f7' : rowBg }}>
        <td className="col-expand">
          <button type="button" className={`inventory-expand-btn${isExpanded ? ' active' : ''}`} onClick={onToggleExpand} title="View full details, transports & uploads">
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {!isExpanded && (transports.length > 0 || attachmentCount > 0) && (
              <span className="inventory-transport-badge">{transports.length + attachmentCount}</span>
            )}
          </button>
        </td>
        {showOrderColumn && (
          <td className="col-order">{v.orderId}</td>
        )}
        <td className="col-stock">{v.stock}</td>
        <td>
          <div className="vehicle-name">{v.make} {v.model}</div>
          <div className="vehicle-sub">{v.color}</div>
        </td>
        <td className="col-mono">{v.chassis}</td>
        <td>{v.year}</td>
        <td>{v.fuel}</td>
        <td>{v.mileage.toLocaleString()} km</td>
        <td><span className="grade-pill">{v.grade}</span></td>
        <td className="col-price">¥{v.price.toLocaleString()}</td>
        <td>
          <span className="status-pill" style={{ background: s.bg, borderColor: s.border, color: s.color }}>
            {s.icon}{v.status}
          </span>
        </td>
        <td>
          <div style={{ display: 'flex', gap: 6 }}>
            <button type="button" className="action-btn action-btn-view" title="View"><Eye style={{ width: 14, height: 14 }} /></button>
            <button type="button" className="action-btn action-btn-edit" title="Edit" onClick={onEdit}><Pencil style={{ width: 14, height: 14 }} /></button>
            <button type="button" className="action-btn action-btn-delete" title="Delete"><Trash2 style={{ width: 14, height: 14 }} /></button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={colSpan} style={{ padding: 0 }}>
            <VehicleDetailPanel
              vehicle={v}
              transports={transports}
              attachments={attachments}
              onAddImages={onAddImages}
              onAddDocuments={onAddDocuments}
              onRemoveImage={onRemoveImage}
              onRemoveDocument={onRemoveDocument}
            />
          </td>
        </tr>
      )}
    </>
  );
}
