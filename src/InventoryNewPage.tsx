/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Save, Gavel, ClipboardList, ListChecks,
  Image as ImageIcon, Zap, Shield, Plus, Trash2, Car, Truck, MapPin,
  FileEdit, Table2,
} from 'lucide-react';

type EntryMode = 'form' | 'sheet';

type SheetRow = {
  id: string;
  stock: string;
  make: string;
  model: string;
  chassis: string;
  year: string;
  fuel: string;
  mileage: string;
  grade: string;
  price: string;
  color: string;
  country: string;
  auction: string;
  status: string;
};

const SHEET_COLUMNS: { key: keyof SheetRow; label: string; width?: number; type?: string }[] = [
  { key: 'stock', label: 'Stock ID', width: 100 },
  { key: 'make', label: 'Make', width: 90 },
  { key: 'model', label: 'Model', width: 110 },
  { key: 'chassis', label: 'Chassis No.', width: 130 },
  { key: 'year', label: 'Year', width: 64, type: 'number' },
  { key: 'fuel', label: 'Fuel', width: 72 },
  { key: 'mileage', label: 'Mileage', width: 88, type: 'number' },
  { key: 'grade', label: 'Grade', width: 56 },
  { key: 'price', label: 'Price (¥)', width: 100, type: 'number' },
  { key: 'color', label: 'Color', width: 90 },
  { key: 'country', label: 'Country', width: 80 },
  { key: 'auction', label: 'Auction', width: 120 },
  { key: 'status', label: 'Status', width: 100 },
];

let nextRowId = 1;
function createEmptyRow(): SheetRow {
  return {
    id: String(nextRowId++),
    stock: '', make: '', model: '', chassis: '', year: '', fuel: '',
    mileage: '', grade: '', price: '', color: '', country: '', auction: '', status: '',
  };
}

function createEmptyRows(count: number): SheetRow[] {
  return Array.from({ length: count }, () => createEmptyRow());
}

export default function InventoryNewPage() {
  const navigate = useNavigate();
  const [entryMode, setEntryMode] = useState<EntryMode>('sheet');

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="page-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to="/orders/inventory" style={{ color: '#2563eb', fontWeight: 600, fontSize: 12, textDecoration: 'none' }}>Inventory</Link>
            <ChevronRight style={{ width: 12, height: 12 }} />
            <span>New Entry</span>
          </div>
          <h1 className="page-title">Add Inventory Entry</h1>
          <p className="page-subtitle">
            {entryMode === 'sheet'
              ? 'Enter multiple vehicles in the sheet — tab between cells or paste from Excel.'
              : 'Full detailed form: auction, order, vehicle, and vehicle_details.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="manage-view-toggle">
            <button
              type="button"
              className={`manage-view-btn${entryMode === 'sheet' ? ' active' : ''}`}
              onClick={() => setEntryMode('sheet')}
              title="Sheet entry (Excel-style)"
              style={{ width: 'auto', padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 600 }}
            >
              <Table2 style={{ width: 14, height: 14 }} />
              Sheet
            </button>
            <button
              type="button"
              className={`manage-view-btn${entryMode === 'form' ? ' active' : ''}`}
              onClick={() => setEntryMode('form')}
              title="Detailed form entry"
              style={{ width: 'auto', padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 600 }}
            >
              <FileEdit style={{ width: 14, height: 14 }} />
              Form
            </button>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/orders/inventory')}>
            Back to Inventory
          </button>
        </div>
      </div>

      {entryMode === 'sheet' ? <InventorySheetEntry /> : <InventoryFormEntry />}
    </>
  );
}

function InventorySheetEntry() {
  const [rows, setRows] = useState<SheetRow[]>(() => createEmptyRows(12));

  const updateCell = (rowId: string, key: keyof SheetRow, value: string) => {
    setRows(prev => prev.map(r => (r.id === rowId ? { ...r, [key]: value } : r)));
  };

  const addRows = (count = 5) => {
    setRows(prev => [...prev, ...createEmptyRows(count)]);
  };

  const removeRow = (rowId: string) => {
    setRows(prev => (prev.length <= 1 ? prev : prev.filter(r => r.id !== rowId)));
  };

  const filledCount = rows.filter(r =>
    r.stock || r.chassis || r.make || r.model
  ).length;

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTableElement>) => {
    const text = e.clipboardData.getData('text/plain');
    if (!text.includes('\t') && !text.includes('\n')) return;

    e.preventDefault();
    const pastedRows = text
      .trimEnd()
      .split(/\r?\n/)
      .map(line => line.split('\t'));

    const colKeys = SHEET_COLUMNS.map(c => c.key);

    setRows(prev => {
      const next = [...prev];
      let targetIndex = next.findIndex(r => !r.stock && !r.chassis && !r.make);

      pastedRows.forEach(cells => {
        if (targetIndex < 0 || targetIndex >= next.length) {
          next.push(createEmptyRow());
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
    <>
      <div className="inventory-sheet-toolbar">
        <span className="inventory-sheet-hint">
          <strong>{filledCount}</strong> row{filledCount !== 1 ? 's' : ''} with data · Click a cell and type, or paste from Excel
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={() => setRows(createEmptyRows(12))}>
            Clear sheet
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => addRows(5)}>
            <Plus style={{ width: 14, height: 14 }} /> Add 5 rows
          </button>
          <button type="button" className="btn btn-primary">
            <Save style={{ width: 14, height: 14 }} /> Save all rows
          </button>
        </div>
      </div>

      <div className="audit-card inventory-sheet-wrap">
        <div className="inventory-sheet-scroll">
          <table className="inventory-sheet-table" onPaste={handlePaste}>
            <thead>
              <tr>
                <th className="inventory-sheet-row-num">#</th>
                {SHEET_COLUMNS.map(col => (
                  <th key={col.key} style={{ minWidth: col.width }}>{col.label}</th>
                ))}
                <th className="inventory-sheet-actions-col" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className="inventory-sheet-row-num">{index + 1}</td>
                  {SHEET_COLUMNS.map(col => (
                    <td key={col.key}>
                      {col.key === 'status' ? (
                        <select
                          className="inventory-sheet-cell"
                          value={row.status}
                          onChange={e => updateCell(row.id, 'status', e.target.value)}
                        >
                          <option value="" />
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                        </select>
                      ) : (
                        <input
                          type={col.type ?? 'text'}
                          className="inventory-sheet-cell"
                          value={row[col.key]}
                          onChange={e => updateCell(row.id, col.key, e.target.value)}
                          placeholder="—"
                        />
                      )}
                    </td>
                  ))}
                  <td className="inventory-sheet-actions-col">
                    <button
                      type="button"
                      className="action-btn action-btn-delete"
                      title="Remove row"
                      onClick={() => removeRow(row.id)}
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="inventory-sheet-footer">
          <button
            type="button"
            className="inventory-sheet-add-row"
            onClick={() => addRows(1)}
          >
            <Plus style={{ width: 13, height: 13 }} /> Add row
          </button>
        </div>
      </div>
    </>
  );
}

function InventoryFormEntry() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 20 }}>
        <button type="button" className="btn btn-primary">
          <Save style={{ width: 14, height: 14 }} /> Save Entry
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
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
          <div className="section-grid section-grid-2" style={{ marginBottom: 16 }}>
            <div>
              <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <ImageIcon style={{ width: 11, height: 11 }} />
                Main Image URL
              </label>
              <input className="field-input" type="url" placeholder="https://…" />
            </div>
            <div>
              <label className="field-label">Additional Images</label>
              <textarea className="field-input" style={{ minHeight: 68 }} placeholder="JSON or newline-separated URLs" />
            </div>
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
