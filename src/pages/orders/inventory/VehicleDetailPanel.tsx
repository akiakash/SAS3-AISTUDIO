/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { Truck, Plus, Pencil } from 'lucide-react';
import { SHEET_COLUMN_GROUPS, vehicleToSheetData } from '../../../data/inventory/inventorySheetColumns';
import type { Vehicle, TransportRecord } from '../../../data/inventory/vehicleData';
import VehicleAttachments, {
  type VehicleAttachmentState,
} from './VehicleAttachments';

const T_STATUS: Record<string, { bg: string; color: string; border: string }> = {
  Delivered: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  'In Transit': { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  Pending: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  Awaiting: { bg: '#f4f5f7', color: '#6b778c', border: '#dfe1e6' },
};

type VehicleDetailPanelProps = {
  vehicle: Vehicle;
  transports: TransportRecord[];
  attachments: VehicleAttachmentState;
  onAddImages: (files: FileList) => void;
  onAddDocuments: (files: FileList) => void;
  onRemoveImage: (id: string) => void;
  onRemoveDocument: (id: string) => void;
};

export default function VehicleDetailPanel({
  vehicle,
  transports,
  attachments,
  onAddImages,
  onAddDocuments,
  onRemoveImage,
  onRemoveDocument,
}: VehicleDetailPanelProps) {
  const sheet = vehicleToSheetData(vehicle);

  return (
    <div className="inventory-detail-panel">
      {sheet.mainImageUrl && (
        <div className="inventory-detail-hero">
          <img src={sheet.mainImageUrl} alt={`${vehicle.make} ${vehicle.model}`} />
          <div className="inventory-detail-hero-caption">
            <strong>{vehicle.make} {vehicle.model}</strong>
            <span>{vehicle.stock} · {vehicle.chassis}</span>
          </div>
        </div>
      )}

      <div className="inventory-detail-sections">
        {SHEET_COLUMN_GROUPS.map(group => (
          <div key={group.label}>
            <DetailSection title={group.label}>
              <div className="inventory-detail-grid">
                {group.columns.map(col => (
                  <div key={col.key}>
                    <DetailField
                      label={col.label}
                      value={formatFieldValue(sheet[col.key])}
                      wide={col.key === 'description' || col.key === 'extraDetails' || col.key === 'mainImageUrl'}
                    />
                  </div>
                ))}
              </div>
            </DetailSection>
          </div>
        ))}
      </div>

      <VehicleAttachments
        stockLabel={vehicle.stock}
        attachments={attachments}
        onAddImages={onAddImages}
        onAddDocuments={onAddDocuments}
        onRemoveImage={onRemoveImage}
        onRemoveDocument={onRemoveDocument}
      />

      <div className="inventory-transport-panel inventory-transport-panel--nested">
        <div className="inventory-transport-panel-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Truck style={{ width: 13, height: 13, color: '#2563eb' }} />
            <span>All transport records</span>
            <span className="inventory-order-badge">{transports.length} record{transports.length !== 1 ? 's' : ''}</span>
          </div>
          <button type="button" className="btn btn-ghost" style={{ height: 28, fontSize: 11, padding: '0 10px' }}>
            <Plus style={{ width: 11, height: 11 }} /> Add Transport
          </button>
        </div>
        {transports.length === 0 ? (
          <p className="inventory-detail-empty">No transport records for this vehicle.</p>
        ) : (
          <>
            <table className="inventory-transport-table">
              <thead>
                <tr>
                  {['#', 'Transporter', 'Delivery Yard', 'Yard In Date', 'Cost', 'Status', 'Notes', ''].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transports.map((t, ti) => {
                  const ts = T_STATUS[t.status] ?? T_STATUS.Awaiting;
                  return (
                    <tr key={t.id}>
                      <td>T{ti + 1}</td>
                      <td><strong>{t.transporter}</strong></td>
                      <td>{t.deliveryYard}</td>
                      <td className="col-mono">{t.yardInDate}</td>
                      <td>¥{t.cost.toLocaleString()}</td>
                      <td>
                        <span className="status-pill" style={{ background: ts.bg, borderColor: ts.border, color: ts.color, fontSize: 11 }}>
                          {t.status}
                        </span>
                      </td>
                      <td>{t.notes || '—'}</td>
                      <td>
                        <button type="button" className="action-btn action-btn-edit" title="Edit"><Pencil style={{ width: 14, height: 14 }} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="inventory-transport-total">
              Total Transport Cost: <strong>¥{transports.reduce((s, t) => s + t.cost, 0).toLocaleString()}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="inventory-detail-section">
      <h4 className="inventory-detail-section-title">{title}</h4>
      {children}
    </section>
  );
}

function DetailField({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`inventory-detail-field${wide ? ' inventory-detail-field--wide' : ''}`}>
      <span className="inventory-detail-label">{label}</span>
      <span className="inventory-detail-value">{value}</span>
    </div>
  );
}

function formatFieldValue(value: string): string {
  if (!value || value.trim() === '') return '—';
  return value;
}
