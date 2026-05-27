/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, Trash2, Truck } from 'lucide-react';
import type { RiksoTransport } from '../../../data/rikso/riksoData';
import { createEmptyTransport } from '../../../data/rikso/riksoData';

type RiksoTransportsEditorProps = {
  transports: RiksoTransport[];
  onChange: (transports: RiksoTransport[]) => void;
  readOnly?: boolean;
  /** Fits inside list table expand row without horizontal scroll */
  compact?: boolean;
};

export default function RiksoTransportsEditor({
  transports, onChange, readOnly, compact,
}: RiksoTransportsEditorProps) {
  const update = (id: string, field: keyof RiksoTransport, value: string) => {
    onChange(transports.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const addLeg = () => {
    onChange([...transports, createEmptyTransport()]);
  };

  const removeLeg = (id: string) => {
    if (transports.length <= 1) {
      onChange([createEmptyTransport()]);
      return;
    }
    onChange(transports.filter(t => t.id !== id));
  };

  const totalCost = transports.reduce((sum, t) => sum + (Number(t.cost) || 0), 0);

  return (
    <div className={`rikso-transports-editor${compact ? ' rikso-transports-editor--compact' : ''}`}>
      <div className="rikso-transports-editor-head">
        <Truck style={{ width: 13, height: 13, color: '#7c3aed' }} />
        <span>Transport legs</span>
        <span className="inventory-order-badge">{transports.length}</span>
        {!readOnly && (
          <button type="button" className="rikso-transport-add-btn" onClick={addLeg}>
            <Plus style={{ width: 11, height: 11 }} /> Add
          </button>
        )}
      </div>

      <div className="rikso-transport-legs">
        {transports.map((t, i) => (
          <div key={t.id} className="rikso-transport-card">
            <div className="rikso-transport-card-head">
              <span>Leg {i + 1}</span>
              {!readOnly && (
                <button
                  type="button"
                  className="action-btn action-btn-delete"
                  title="Remove transport"
                  onClick={() => removeLeg(t.id)}
                  disabled={transports.length <= 1}
                >
                  <Trash2 style={{ width: 13, height: 13 }} />
                </button>
              )}
            </div>
            <div className="rikso-transport-card-fields">
              <TransportField
                label="Transporter"
                readOnly={readOnly}
                value={t.transporter}
                placeholder="Transporter name"
                onChange={v => update(t.id, 'transporter', v)}
              />
              <TransportField
                label="Delivery yard"
                readOnly={readOnly}
                value={t.deliveryYard}
                placeholder="Yard / port"
                onChange={v => update(t.id, 'deliveryYard', v)}
              />
              <TransportField
                label="Yard in date"
                readOnly={readOnly}
                type="date"
                value={t.yardInDate}
                onChange={v => update(t.id, 'yardInDate', v)}
              />
              <TransportField
                label="Cost (¥)"
                readOnly={readOnly}
                type="number"
                value={t.cost}
                placeholder="0"
                onChange={v => update(t.id, 'cost', v)}
              />
            </div>
          </div>
        ))}
      </div>

      {totalCost > 0 && (
        <div className="rikso-transports-total">
          Total: <strong>¥{totalCost.toLocaleString()}</strong>
        </div>
      )}
    </div>
  );
}

function TransportField({
  label, value, onChange, readOnly, type = 'text', placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="rikso-transport-field">
      <span className="rikso-transport-field-label">{label}</span>
      {readOnly ? (
        <span className="rikso-transport-field-value">{value || '—'}</span>
      ) : (
        <input
          className="rikso-transport-field-input"
          type={type}
          value={value}
          placeholder={placeholder}
          min={type === 'number' ? 0 : undefined}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
