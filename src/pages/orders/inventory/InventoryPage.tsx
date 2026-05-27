/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, Eye, Pencil, Trash2, Filter, ArrowUpDown, Download,
  CheckCircle2, Clock, XCircle, ChevronDown, ChevronUp,
  LayoutList, Layers, Package, ShoppingBag, Truck, Paperclip,
  User, Gavel, Car,
} from 'lucide-react';
import {
  VEHICLES, TRANSPORTS, groupVehiclesByOrder,
  type Vehicle, type OrderGroup,
} from '../../../data/inventory/vehicleData';
import VehicleDetailPanel from './VehicleDetailPanel';
import { useInventoryAttachments } from './useInventoryAttachments';

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

  const attachmentHandlers = {
    getAttachments,
    onAddImages: addImages,
    onAddDocuments: addDocuments,
    onRemoveImage: removeImage,
    onRemoveDocument: removeDocument,
  };

  return (
    <div className="inventory-page">
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

      <div className="inventory-stat-grid">
        {[
          { label: 'Total Vehicles', value: counts.total, icon: <Package size={18} />, accent: '#2563eb', bg: '#eff6ff' },
          { label: 'Orders', value: orderGroups.length, icon: <ShoppingBag size={18} />, accent: '#7c3aed', bg: '#f5f3ff' },
          { label: 'Available', value: counts.available, icon: <CheckCircle2 size={18} />, accent: '#16a34a', bg: '#f0fdf4' },
          { label: 'Reserved', value: counts.reserved, icon: <Clock size={18} />, accent: '#d97706', bg: '#fffbeb' },
          { label: 'Transports', value: totalTransports, icon: <Truck size={18} />, accent: '#64748b', bg: '#f8fafc' },
        ].map(s => (
          <div key={s.label} className="inventory-stat-box" style={{ '--stat-accent': s.accent, '--stat-bg': s.bg } as React.CSSProperties}>
            <div className="inventory-stat-box-icon">{s.icon}</div>
            <div className="inventory-stat-box-body">
              <span className="inventory-stat-box-label">{s.label}</span>
              <span className="inventory-stat-box-value">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="inventory-main-box">
        <InventorySearchBar
          search={search}
          onSearchChange={setSearch}
          resultCount={filtered.length}
          resultLabel={viewMode === 'orders' ? `orders · ${filtered.length} vehicles` : 'vehicles'}
        />

        <div className="inventory-main-box-body">
          {viewMode === 'list' ? (
            filtered.length === 0 ? (
              <div className="inventory-orders-empty">No vehicles match your search.</div>
            ) : (
              <div className="inventory-vehicle-grid">
                {filtered.map(v => (
                  <div key={v.id}>
                    <VehicleBoxCard
                      vehicle={v}
                      expanded={expandedRow === v.id}
                      onToggleExpand={() => setExpandedRow(expandedRow === v.id ? null : v.id)}
                      onEdit={() => navigate('/orders/inventory/new/form')}
                      {...attachmentHandlers}
                    />
                  </div>
                ))}
              </div>
            )
          ) : (
            orderGroups.length === 0 ? (
              <div className="inventory-orders-empty">No orders match your search.</div>
            ) : (
              <div className="inventory-order-grid">
                {orderGroups.map(order => (
                  <div key={order.orderId}>
                    <OrderBoxCard
                      order={order}
                      expanded={expandedOrder === order.orderId}
                      onToggleExpand={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}
                      onEdit={() => navigate('/orders/inventory/new/form')}
                      {...attachmentHandlers}
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <div className="inventory-main-box-footer">
          <span>
            {viewMode === 'orders'
              ? `${orderGroups.length} order${orderGroups.length !== 1 ? 's' : ''} · ${filtered.length} vehicles`
              : `Showing ${filtered.length} of ${counts.total} vehicles`}
          </span>
        </div>
      </div>
    </div>
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
    <div className="inventory-search-bar">
      <div className="inventory-search-input-wrap">
        <Search className="inventory-search-icon" size={14} />
        <input
          type="search"
          className="inventory-search-input"
          placeholder="Search by order ID, stock, chassis, customer…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <button type="button" className="inventory-filter-btn" title="Filter">
        <Filter size={14} />
      </button>
      <button type="button" className="inventory-filter-btn" title="Sort">
        <ArrowUpDown size={14} />
      </button>
      <span className="inventory-search-count">{resultCount} {resultLabel}</span>
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

function VehicleSummaryGrid({ vehicle: v }: { vehicle: Vehicle }) {
  const items = [
    { label: 'Stock ID', value: v.stock },
    { label: 'Order ID', value: v.orderId },
    { label: 'Make', value: v.make },
    { label: 'Model', value: v.model },
    { label: 'Brand', value: v.brand },
    { label: 'Chassis', value: v.chassis, mono: true },
    { label: 'Year', value: String(v.year) },
    { label: 'Fuel', value: v.fuel },
    { label: 'Mileage', value: `${v.mileage.toLocaleString()} km` },
    { label: 'Grade', value: v.grade },
    { label: 'Color', value: v.color },
    { label: 'Country', value: v.country },
    { label: 'Customer', value: v.customerName },
    { label: 'Auction', value: v.auctionName },
    { label: 'Price (¥)', value: `¥${v.price.toLocaleString()}`, highlight: true },
  ];

  return (
    <div className="inventory-summary-grid">
      {items.map(item => (
        <div key={item.label} className="inventory-summary-cell">
          <span className="inventory-summary-label">{item.label}</span>
          <span className={`inventory-summary-value${item.mono ? ' mono' : ''}${item.highlight ? ' highlight' : ''}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function VehicleMetaChips({
  vehicleId, status,
}: {
  vehicleId: number;
  status: string;
}) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Available;
  const transportCount = (TRANSPORTS[vehicleId] ?? []).length;

  return (
    <div className="inventory-meta-chips">
      <span className="status-pill" style={{ background: s.bg, borderColor: s.border, color: s.color }}>
        {s.icon}{status}
      </span>
      {transportCount > 0 && (
        <span className="inventory-meta-chip inventory-meta-chip--transport">
          <Truck size={11} /> {transportCount} transport{transportCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}

function OrderBoxCard({
  order, expanded, onToggleExpand, onEdit,
  getAttachments, onAddImages, onAddDocuments, onRemoveImage, onRemoveDocument,
}: {
  order: OrderGroup;
  expanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
} & AttachmentHandlers) {
  const v = order.vehicle;
  const transports = TRANSPORTS[v.id] ?? [];
  const attachments = getAttachments(v.id);
  const attachmentCount = attachments.images.length + attachments.documents.length;

  return (
    <article className={`inventory-box-card${expanded ? ' expanded' : ''}`}>
      <div className="inventory-box-card-header">
        <div className="inventory-box-card-header-main">
          <span className="inventory-box-order-id">{order.orderId}</span>
          <VehicleMetaChips vehicleId={v.id} status={v.status} />
        </div>
        <div className="inventory-box-card-header-sub">
          <span className="inventory-box-chip">
            <User size={12} /> {order.customerName}
          </span>
          <span className="inventory-box-chip">
            <Gavel size={12} /> {order.auctionName}
          </span>
          <span className="inventory-box-chip">
            <Car size={12} /> {v.make} {v.model}
          </span>
        </div>
      </div>

      <div className="inventory-box-card-body">
        <VehicleSummaryGrid vehicle={v} />
      </div>

      <div className="inventory-box-card-footer">
        <div className="inventory-box-card-footer-meta">
          {attachmentCount > 0 && (
            <span className="inventory-meta-chip inventory-meta-chip--file">
              <Paperclip size={11} /> {attachmentCount} file{attachmentCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="inventory-box-card-actions">
          <button type="button" className="btn btn-ghost inventory-box-btn" onClick={onToggleExpand}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Hide details' : 'Full details'}
          </button>
          <button type="button" className="action-btn action-btn-view" title="View"><Eye size={14} /></button>
          <button type="button" className="action-btn action-btn-edit" title="Edit" onClick={onEdit}><Pencil size={14} /></button>
          <button type="button" className="action-btn action-btn-delete" title="Delete"><Trash2 size={14} /></button>
        </div>
      </div>

      {expanded && (
        <div className="inventory-box-card-expand">
          <VehicleDetailPanel
            vehicle={v}
            transports={transports}
            attachments={attachments}
            onAddImages={files => onAddImages(v.id, files)}
            onAddDocuments={files => onAddDocuments(v.id, files)}
            onRemoveImage={id => onRemoveImage(v.id, id)}
            onRemoveDocument={id => onRemoveDocument(v.id, id)}
          />
        </div>
      )}
    </article>
  );
}

function VehicleBoxCard({
  vehicle: v, expanded, onToggleExpand, onEdit,
  getAttachments, onAddImages, onAddDocuments, onRemoveImage, onRemoveDocument,
}: {
  vehicle: Vehicle;
  expanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
} & AttachmentHandlers) {
  const transports = TRANSPORTS[v.id] ?? [];
  const attachments = getAttachments(v.id);
  const attachmentCount = attachments.images.length + attachments.documents.length;

  return (
    <article className={`inventory-box-card inventory-box-card--vehicle${expanded ? ' expanded' : ''}`}>
      <div className="inventory-box-card-header">
        <div className="inventory-box-card-header-main">
          <span className="inventory-box-stock">{v.stock}</span>
          <VehicleMetaChips vehicleId={v.id} status={v.status} />
        </div>
        <div className="inventory-box-card-header-sub">
          <span className="inventory-box-order-id">{v.orderId}</span>
          <span className="inventory-box-vehicle-title">{v.make} {v.model}</span>
        </div>
      </div>

      <div className="inventory-box-card-body">
        <VehicleSummaryGrid vehicle={v} />
      </div>

      <div className="inventory-box-card-footer">
        <div className="inventory-box-card-footer-meta">
          {attachmentCount > 0 && (
            <span className="inventory-meta-chip inventory-meta-chip--file">
              <Paperclip size={11} /> {attachmentCount} file{attachmentCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="inventory-box-card-actions">
          <button type="button" className="btn btn-ghost inventory-box-btn" onClick={onToggleExpand}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Hide' : 'Details'}
          </button>
          <button type="button" className="action-btn action-btn-edit" title="Edit" onClick={onEdit}><Pencil size={14} /></button>
        </div>
      </div>

      {expanded && (
        <div className="inventory-box-card-expand">
          <VehicleDetailPanel
            vehicle={v}
            transports={transports}
            attachments={attachments}
            onAddImages={files => onAddImages(v.id, files)}
            onAddDocuments={files => onAddDocuments(v.id, files)}
            onRemoveImage={id => onRemoveImage(v.id, id)}
            onRemoveDocument={id => onRemoveDocument(v.id, id)}
          />
        </div>
      )}
    </article>
  );
}
