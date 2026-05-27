/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, ReactNode } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import {
  Save, Gavel, ClipboardList, ListChecks,
  Image as ImageIcon, Zap, Shield, Plus, Trash2, Car, Truck, MapPin,
  Table2, FileEdit, Paperclip, ChevronDown, ChevronUp,
} from 'lucide-react';
import VehicleAttachments from './VehicleAttachments';
import { useAttachmentsMap } from './useAttachmentsMap';

const FORM_ATTACHMENTS_KEY = 'new-entry-form';

import { VEHICLES } from '../../../data/inventory/vehicleData';
import {
  SHEET_COLUMN_GROUPS,
  SHEET_COLUMNS,
  createEmptySheetRow,
  vehicleToSheetData,
  rowHasEntryData,
  type SheetRow,
  type SheetData,
  type SheetColumnDef,
} from '../../../data/inventory/inventorySheetColumns';

export default function InventoryNewPage() {
  return (
    <Routes>
      <Route index element={<InventorySheetEntry />} />
      <Route path="form" element={<InventoryFormEntry />} />
      <Route path="*" element={<Navigate to="/orders/inventory/new" replace />} />
    </Routes>
  );
}

function NewEntryViewBar() {
  return (
    <div className="new-entry-view-bar">
      <span className="new-entry-view-label">Entry mode</span>
      <div className="manage-view-toggle">
        <NavLink
          to="/orders/inventory/new"
          end
          className={({ isActive }) => `manage-view-btn${isActive ? ' active' : ''}`}
          style={{ width: 'auto', padding: '0 14px', gap: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
        >
          <Table2 style={{ width: 14, height: 14 }} />
          Sheet
        </NavLink>
        <NavLink
          to="/orders/inventory/new/form"
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

function InventorySheetEntry() {
  const [entryRows, setEntryRows] = useState<SheetRow[]>(() => [createEmptySheetRow()]);
  const [expandedAttachRow, setExpandedAttachRow] = useState<string | null>(null);
  const { getAttachments, addImages, addDocuments, removeImage, removeDocument, clearAttachments } = useAttachmentsMap();
  const existingRows = VEHICLES.map(v => ({ id: `existing-${v.id}`, ...vehicleToSheetData(v) }));

  const updateCell = (rowId: string, key: keyof SheetData, value: string) => {
    setEntryRows(prev => prev.map(r => (r.id === rowId ? { ...r, [key]: value } : r)));
  };

  const addEntryRow = () => {
    setEntryRows(prev => [...prev, createEmptySheetRow()]);
  };

  const removeEntryRow = (rowId: string) => {
    setEntryRows(prev => (prev.length <= 1 ? prev : prev.filter(r => r.id !== rowId)));
    clearAttachments(rowId);
    setExpandedAttachRow(prev => (prev === rowId ? null : prev));
  };

  const clearEntryRows = () => {
    entryRows.forEach(r => clearAttachments(r.id));
    setEntryRows([createEmptySheetRow()]);
    setExpandedAttachRow(null);
  };

  const filledCount = entryRows.filter(rowHasEntryData).length;
  const totalColumns = SHEET_COLUMNS.length + 3;

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTableElement>) => {
    const text = e.clipboardData.getData('text/plain');
    if (!text.includes('\t') && !text.includes('\n')) return;

    e.preventDefault();
    const pastedRows = text.trimEnd().split(/\r?\n/).map(line => line.split('\t'));
    const colKeys = SHEET_COLUMNS.map(c => c.key);

    setEntryRows(prev => {
      const next = [...prev];
      let targetIndex = next.findIndex(r => !rowHasEntryData(r));

      pastedRows.forEach(cells => {
        if (targetIndex < 0 || targetIndex >= next.length) {
          next.push(createEmptySheetRow());
          targetIndex = next.length - 1;
        }
        const row = { ...next[targetIndex] };
        cells.forEach((cell, ci) => {
          if (ci < colKeys.length) {
            row[colKeys[ci]] = cell.trim();
          }
        });
        next[targetIndex] = row;
        targetIndex += 1;
      });
      return next;
    });
  }, []);

  return (
    <div className="inventory-sheet-page">
      <NewEntryViewBar />

      <div className="inventory-sheet-toolbar">
        <span className="inventory-sheet-hint">
          <strong>{filledCount}</strong> new row{filledCount !== 1 ? 's' : ''} ready to save · <strong>{existingRows.length}</strong> existing vehicles below
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={clearEntryRows}>
            Clear new rows
          </button>
          <button type="button" className="btn btn-ghost" onClick={addEntryRow}>
            <Plus style={{ width: 14, height: 14 }} /> Add entry row
          </button>
          <button type="button" className="btn btn-primary">
            <Save style={{ width: 14, height: 14 }} /> Save new entries
          </button>
        </div>
      </div>

      <div className="inventory-sheet-wrap">
        <div className="inventory-sheet-scroll">
          <table className="inventory-sheet-table" onPaste={handlePaste}>
            <thead>
              <tr>
                <th className="inventory-sheet-row-num" rowSpan={2}>#</th>
                <th className="inventory-sheet-attach-col" rowSpan={2} title="Images & documents">A</th>
                {SHEET_COLUMN_GROUPS.map(group => (
                  <th key={group.label} colSpan={group.columns.length} className="inventory-sheet-group-th">
                    {group.label}
                  </th>
                ))}
                <th className="inventory-sheet-actions-col" rowSpan={2} />
              </tr>
              <tr>
                {SHEET_COLUMNS.map(col => (
                  <th key={col.key} style={{ minWidth: col.width }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="inventory-sheet-section-row">
                <td colSpan={totalColumns}>
                  New entry — fill rows below · column <strong>A</strong> for images & documents
                </td>
              </tr>
              {entryRows.map((row, index) => (
                <React.Fragment key={row.id}>
                <SheetTableRowWithAttachments
                  rowId={row.id}
                  rowNum={`+${index + 1}`}
                  rowNumClass="inventory-sheet-row-num-new"
                  rowClassName="inventory-sheet-entry-row"
                  totalColumns={totalColumns}
                  stockLabel={row.stockId || row.chassisNumber || `Row +${index + 1}`}
                  expandedAttachRow={expandedAttachRow}
                  onToggleAttach={() => setExpandedAttachRow(expandedAttachRow === row.id ? null : row.id)}
                  getAttachments={getAttachments}
                  addImages={addImages}
                  addDocuments={addDocuments}
                  removeImage={removeImage}
                  removeDocument={removeDocument}
                  actions={(
                    <button
                      type="button"
                      className="action-btn action-btn-delete"
                      title="Remove entry row"
                      onClick={() => removeEntryRow(row.id)}
                      disabled={entryRows.length <= 1}
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  )}
                >
                  {SHEET_COLUMNS.map(col => (
                    <td key={col.key}>
                      <SheetCellInput
                        col={col}
                        value={row[col.key]}
                        onChange={value => updateCell(row.id, col.key, value)}
                      />
                    </td>
                  ))}
                </SheetTableRowWithAttachments>
                </React.Fragment>
              ))}

              <tr className="inventory-sheet-section-row inventory-sheet-section-existing">
                <td colSpan={totalColumns}>
                  Existing vehicles ({existingRows.length}) — expand <strong>A</strong> to add images & documents
                </td>
              </tr>
              {existingRows.map((row, index) => (
                <React.Fragment key={row.id}>
                <SheetTableRowWithAttachments
                  rowId={row.id}
                  rowNum={String(index + 1)}
                  rowClassName="inventory-sheet-existing-row"
                  totalColumns={totalColumns}
                  stockLabel={row.stockId || row.chassisNumber || `Vehicle ${index + 1}`}
                  expandedAttachRow={expandedAttachRow}
                  onToggleAttach={() => setExpandedAttachRow(expandedAttachRow === row.id ? null : row.id)}
                  getAttachments={getAttachments}
                  addImages={addImages}
                  addDocuments={addDocuments}
                  removeImage={removeImage}
                  removeDocument={removeDocument}
                >
                  {SHEET_COLUMNS.map(col => (
                    <td key={col.key}>
                      <span className="inventory-sheet-readonly" title={row[col.key]}>
                        {row[col.key] || '—'}
                      </span>
                    </td>
                  ))}
                </SheetTableRowWithAttachments>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="inventory-sheet-footer">
          <button type="button" className="inventory-sheet-add-row" onClick={addEntryRow}>
            <Plus style={{ width: 13, height: 13 }} /> Add another entry row
          </button>
        </div>
      </div>
    </div>
  );
}

type SheetAttachHandlers = {
  getAttachments: (key: string) => import('./VehicleAttachments').VehicleAttachmentState;
  addImages: (key: string, files: FileList) => void;
  addDocuments: (key: string, files: FileList) => void;
  removeImage: (key: string, id: string) => void;
  removeDocument: (key: string, id: string) => void;
};

function SheetTableRowWithAttachments({
  rowId,
  rowNum,
  rowNumClass,
  rowClassName,
  totalColumns,
  stockLabel,
  expandedAttachRow,
  onToggleAttach,
  children,
  actions,
  getAttachments,
  addImages,
  addDocuments,
  removeImage,
  removeDocument,
}: {
  rowId: string;
  rowNum: string;
  rowNumClass?: string;
  rowClassName: string;
  totalColumns: number;
  stockLabel: string;
  expandedAttachRow: string | null;
  onToggleAttach: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
} & SheetAttachHandlers) {
  const attach = getAttachments(rowId);
  const attachCount = attach.images.length + attach.documents.length;
  const attachExpanded = expandedAttachRow === rowId;

  return (
    <>
      <tr className={rowClassName}>
        <td className={`inventory-sheet-row-num${rowNumClass ? ` ${rowNumClass}` : ''}`}>{rowNum}</td>
        <td className="inventory-sheet-attach-col">
          <button
            type="button"
            className={`inventory-expand-btn${attachExpanded ? ' active' : ''}`}
            onClick={onToggleAttach}
            title="Upload images & documents"
          >
            {attachExpanded ? <ChevronUp size={12} /> : <Paperclip size={12} />}
            {!attachExpanded && attachCount > 0 && (
              <span className="inventory-transport-badge">{attachCount}</span>
            )}
          </button>
        </td>
        {children}
        <td className="inventory-sheet-actions-col">{actions}</td>
      </tr>
      {attachExpanded && (
        <tr className="inventory-sheet-attach-expand-row">
          <td colSpan={totalColumns} className="inventory-sheet-attach-expand-cell">
            <div className="entry-sheet-attachments-wrap">
              <VehicleAttachments
                stockLabel={stockLabel}
                attachments={attach}
                onAddImages={files => addImages(rowId, files)}
                onAddDocuments={files => addDocuments(rowId, files)}
                onRemoveImage={id => removeImage(rowId, id)}
                onRemoveDocument={id => removeDocument(rowId, id)}
                compact
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function SheetCellInput({
  col,
  value,
  onChange,
}: {
  col: SheetColumnDef;
  value: string;
  onChange: (value: string) => void;
}) {
  if (col.input === 'select' && col.options) {
    return (
      <select
        className="inventory-sheet-cell"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {col.options.map(opt => (
          <option key={opt || 'empty'} value={opt}>{opt || '—'}</option>
        ))}
      </select>
    );
  }

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

function InventoryFormEntry() {
  const { getAttachments, addImages, addDocuments, removeImage, removeDocument } = useAttachmentsMap();
  const formAttachments = getAttachments(FORM_ATTACHMENTS_KEY);

  return (
    <>
      <NewEntryViewBar />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 20 }}>
        <button type="button" className="btn btn-primary">
          <Save style={{ width: 14, height: 14 }} /> Save Entry
        </button>
      </div>

      {/* Orders + Auctions (Orders first, matching sheet order) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="form-card">
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon">
                <ClipboardList style={{ width: 14, height: 14, color: '#2563eb' }} />
              </div>
              <span className="form-section-title">Orders</span>
              <span className="form-section-tag">orders</span>
            </div>
            <div className="section-grid section-grid-2">
              <div>
                <label className="field-label">Order ID</label>
                <input className="field-input" type="text" />
              </div>
              <div>
                <label className="field-label">Sold Status</label>
                <select className="field-input">
                  <option value="">Select…</option>
                  <option>Sold</option>
                  <option>Unsold</option>
                  <option>Pending</option>
                </select>
              </div>
              <div>
                <label className="field-label">Purchase Manager</label>
                <input className="field-input" type="text" />
              </div>
              <div>
                <label className="field-label">Auction ID (FK)</label>
                <input className="field-input" type="number" placeholder="Linked auction id" />
              </div>
              <div>
                <label className="field-label">POS Number</label>
                <input className="field-input" type="text" />
              </div>
              <div>
                <label className="field-label">Giri Giri</label>
                <input className="field-input" type="text" />
              </div>
              <div className="col-span-2">
                <label className="field-label">Created At</label>
                <input className="field-input" type="datetime-local" readOnly />
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon">
                <Gavel style={{ width: 14, height: 14, color: '#2563eb' }} />
              </div>
              <span className="form-section-title">Auctions</span>
              <span className="form-section-tag">auctions</span>
            </div>
            <div className="section-grid section-grid-2">
              <div className="col-span-2">
                <label className="field-label">Auction ID</label>
                <input className="field-input" type="text" placeholder="External auction reference" />
              </div>
              <div className="col-span-2">
                <label className="field-label">Auction Name</label>
                <input className="field-input" type="text" />
              </div>
              <div>
                <label className="field-label">Auction Company</label>
                <input className="field-input" type="text" />
              </div>
              <div>
                <label className="field-label">Auction Date</label>
                <input className="field-input" type="datetime-local" />
              </div>
              <div className="col-span-2">
                <label className="field-label">Port Letter</label>
                <input className="field-input" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <Car style={{ width: 14, height: 14, color: '#2563eb' }} />
            </div>
            <span className="form-section-title">Vehicles</span>
            <span className="form-section-tag">vehicles</span>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label className="field-label">Order ID (FK)</label>
            <input className="field-input" type="number" placeholder="Parent order id" style={{ maxWidth: 220 }} />
          </div>
          <div className="section-grid section-grid-4">
            {[
              { label: 'Make', type: 'text' },
              { label: 'Brand', type: 'text' },
              { label: 'Model', type: 'text' },
              { label: 'Model Name', type: 'text' },
              { label: 'Model Number', type: 'text' },
              { label: 'Type', type: 'text' },
              { label: 'Chassis Number', type: 'text' },
              { label: 'Chassis Tick', type: 'text' },
              { label: 'Engine Number', type: 'text' },
              { label: 'Manufacture Year', type: 'text' },
              { label: 'Manufacture Month', type: 'text' },
              { label: 'Register Year', type: 'text' },
              { label: 'Register Month', type: 'text' },
              { label: 'Gear Type', type: 'text' },
              { label: 'Doors', type: 'number' },
              { label: 'Seats', type: 'number' },
              { label: 'Fuel', type: 'text' },
              { label: 'KM Mileage', type: 'number' },
            ].map(({ label, type }) => (
              <div key={label}>
                <label className="field-label">{label}</label>
                <input className="field-input" type={type} min={type === 'number' ? 0 : undefined} />
              </div>
            ))}
            <div>
              <label className="field-label">Created At</label>
              <input className="field-input" type="datetime-local" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 24 }}>
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon">
              <ListChecks style={{ width: 14, height: 14, color: '#2563eb' }} />
            </div>
            <span className="form-section-title">Vehicle Details</span>
            <span className="form-section-tag">vehicle_details</span>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="field-label">Vehicle ID (FK)</label>
            <input className="field-input" type="number" placeholder="Parent vehicle id" style={{ maxWidth: 220 }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <div className="flags-heading">
              <Zap style={{ width: 12, height: 12 }} />
              Equipment Flags
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8 }}>
              {['Airbag', 'ABS', 'Air Condition', 'Power Mirror', 'Power Steering', 'Power Window', 'Rear Wiper', 'Sun Roof', 'Stereo'].map(flag => (
                <label key={flag} className="check-pill">
                  <input type="checkbox" />
                  {flag}
                </label>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: '#f1f5f9', margin: '0 -28px 24px' }} />
          <div className="section-grid section-grid-4" style={{ marginBottom: 16 }}>
            <div>
              <label className="field-label">Color</label>
              <input className="field-input" type="text" />
            </div>
            <div>
              <label className="field-label">Country</label>
              <input className="field-input" type="text" />
            </div>
            <div>
              <label className="field-label">Price (Yen)</label>
              <input className="field-input" type="number" min={0} />
            </div>
            <div>
              <label className="field-label">Transmission Type</label>
              <input className="field-input" type="text" />
            </div>
            <div>
              <label className="field-label">Auction Grade</label>
              <input className="field-input" type="text" />
            </div>
            <div>
              <label className="field-label">Stock ID</label>
              <input className="field-input" type="text" />
            </div>
            <div>
              <label className="field-label">Mileage Unit</label>
              <select className="field-input">
                <option value="">Select…</option>
                <option>km</option>
                <option>miles</option>
              </select>
            </div>
            <div>
              <label className="field-label">Availability Status</label>
              <select className="field-input">
                <option value="">Select…</option>
                <option>Available</option>
                <option>Reserved</option>
                <option>Sold</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ImageIcon style={{ width: 11, height: 11 }} />
              Main Image URL
            </label>
            <input className="field-input" type="url" placeholder="https://… (optional if uploading below)" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="field-label">Description</label>
            <textarea className="field-input" style={{ minHeight: 80 }} />
          </div>
          <div>
            <label className="field-label">Extra Details</label>
            <textarea className="field-input" style={{ minHeight: 64 }} />
          </div>
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon" style={{ background: '#ecfdf5', border: '1px solid #bbf7d0' }}>
              <Paperclip style={{ width: 14, height: 14, color: '#16a34a' }} />
            </div>
            <span className="form-section-title">Images & Documents</span>
            <span className="form-section-tag" style={{ color: '#16a34a', background: '#ecfdf5', borderColor: '#bbf7d0' }}>
              attachments
            </span>
          </div>
          <p className="entry-form-attachments-hint">
            Upload vehicle photos and related documents (PDF, Word, Excel). Files are stored for this entry until you save.
          </p>
          <VehicleAttachments
            stockLabel="New entry"
            attachments={formAttachments}
            onAddImages={files => addImages(FORM_ATTACHMENTS_KEY, files)}
            onAddDocuments={files => addDocuments(FORM_ATTACHMENTS_KEY, files)}
            onRemoveImage={id => removeImage(FORM_ATTACHMENTS_KEY, id)}
            onRemoveDocument={id => removeDocument(FORM_ATTACHMENTS_KEY, id)}
          />
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: 16 }}>
        <div className="form-section">
          <div className="form-section-header">
            <div className="form-section-icon" style={{ background: '#ede9fe', border: '1px solid #ddd6fe' }}>
              <Truck style={{ width: 14, height: 14, color: '#7c3aed' }} />
            </div>
            <span className="form-section-title">Transport Records</span>
            <span className="form-section-tag" style={{ color: '#7c3aed', background: '#ede9fe', borderColor: '#ddd6fe' }}>transports</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 140px 120px 1fr 36px', gap: 10, marginBottom: 8, padding: '0 4px' }}>
            {['Transporter', 'Delivery Yard', 'Yard In Date', 'Cost (¥)', 'Status', ''].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
            ))}
          </div>
          {[1, 2].map(n => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 140px 120px 1fr 36px', gap: 10, marginBottom: 10, alignItems: 'center' }}>
              <input className="field-input" type="text" placeholder={n === 1 ? 'e.g. Nippon Express' : 'e.g. Gulf Freight'} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin style={{ width: 12, height: 12, color: '#94a3b8', flexShrink: 0 }} />
                <input className="field-input" type="text" placeholder="Yard / port name" style={{ flex: 1 }} />
              </div>
              <input className="field-input" type="date" />
              <input className="field-input" type="number" placeholder="0" min={0} />
              <select className="field-input">
                <option value="">Status…</option>
                <option>Pending</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Awaiting</option>
              </select>
              <button type="button" style={{ width: 32, height: 32, flexShrink: 0, border: '1px solid #fee2e2', borderRadius: 7, background: '#fef2f2', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 style={{ width: 13, height: 13 }} />
              </button>
            </div>
          ))}
          <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', border: '1.5px dashed #c7d2fe', borderRadius: 8, background: 'transparent', color: '#6366f1', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>
            <Plus style={{ width: 13, height: 13 }} /> Add Another Transport Leg
          </button>
        </div>
      </div>

      <div className="audit-card">
        <div className="audit-card-header">
          <Shield style={{ width: 13, height: 13, color: '#64748b' }} />
          Audit Trail
        </div>
        <AuditRow label="System initialized ledger record" time="2023-11-24 09:12:44" dotColor="#94a3b8" />
        <AuditRow
          label={<span>Chassis validation: <span style={{ color: '#16a34a', fontWeight: 700 }}>SUCCESS</span></span>}
          time="2023-11-24 09:12:45"
          dotColor="#1d4ed8"
          highlight
        />
      </div>
    </>
  );
}

function AuditRow({
  label, time, dotColor, highlight,
}: {
  label: ReactNode;
  time: string;
  dotColor?: string;
  highlight?: boolean;
}) {
  return (
    <div className="audit-row" style={{ background: highlight ? '#fafcff' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className="audit-dot"
          style={{
            background: dotColor ?? '#cbd5e1',
            boxShadow: highlight ? `0 0 0 3px ${dotColor}20` : undefined,
          }}
        />
        <span className="audit-label">{label}</span>
      </div>
      <span className="audit-time">{time}</span>
    </div>
  );
}
