import React, { useState } from 'react';
import {
  Search, Plus, Download, FileText, Filter,
  Eye, Trash2,
} from 'lucide-react';
import InvoiceFormModal, { type InvoiceListItem } from './InvoiceFormModal';

const DUMMY_INVOICES: InvoiceListItem[] = [
  { id: 1, stockId: '32777', customerName: 'Ranasinghe Ent', invoiceDate: '2026-04-29', amount: 2660000, currency: 'JPY', status: 'Draft', chassisNo: 'LA350S-0361108', model: 'DAIHATSU MIRA', lcNumber: 'LC-9982', shipName: 'Global Leader', client: 'ojtjapan' },
  { id: 2, stockId: '32776', customerName: 'R S CAR SALES', invoiceDate: '2026-04-29', amount: 3500000, currency: 'JPY', status: 'Draft', chassisNo: 'A210A-3122', model: 'TOYOTA RAIZE', lcNumber: '', shipName: 'Pioneer', client: 'rscarsales' },
  { id: 3, stockId: '32775', customerName: 'MR. MOHAMED NIZAR', invoiceDate: '2026-04-28', amount: 2880000, currency: 'JPY', status: 'Draft', chassisNo: 'C1DKR-116328', model: 'VW T-CROSS', lcNumber: 'LC-8871', shipName: 'Oceania', client: 'ojtjapan' },
  { id: 4, stockId: '32774', customerName: 'Arjuna Kumari', invoiceDate: '2026-04-28', amount: 1250000, currency: 'JPY', status: 'Final', chassisNo: 'RV5-1302075', model: 'HONDA VEZEL', lcNumber: '', shipName: '', client: 'arjunakumari' },
  { id: 5, stockId: '32773', customerName: 'SUN TRADING COM', invoiceDate: '2026-04-27', amount: 4800000, currency: 'JPY', status: 'Proforma', chassisNo: 'GK3-0187654', model: 'HONDA FIT', lcNumber: 'LC-1122', shipName: 'Morning Glory', client: 'suntrading' },
];

export default function InvoicesPage() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceListItem | null>(null);

  const handleOpenForm = (inv: InvoiceListItem | null = null) => {
    setSelectedInvoice(inv);
    setShowForm(true);
  };

  const filtered = DUMMY_INVOICES.filter(inv => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      inv.stockId.toLowerCase().includes(q) ||
      inv.chassisNo.toLowerCase().includes(q) ||
      inv.client.toLowerCase().includes(q) ||
      inv.customerName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="invoices-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="page-eyebrow">Orders</div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">Manage billing, LC payments, and shipping documentation.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-outline">
            <Download style={{ width: 14, height: 14 }} /> Export Excel
          </button>
          <button type="button" className="btn btn-primary" onClick={() => handleOpenForm()}>
            <Plus style={{ width: 14, height: 14 }} /> Create Invoice
          </button>
        </div>
      </div>

      <div className="audit-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#94a3b8' }} />
            <input
              className="field-input"
              style={{ paddingLeft: 34 }}
              placeholder="Search by Stock ID, Chassis, Client..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button type="button" className="btn-sm btn-ghost" style={{ height: 36 }}>
            <Filter style={{ width: 14, height: 14 }} /> Filter
          </button>
        </div>
      </div>

      <div className="audit-card" style={{ overflowX: 'auto' }}>
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Status</th>
              <th>Chassis No.</th>
              <th>Invoice Date</th>
              <th>LC Number</th>
              <th>Amount</th>
              <th>Client / Notify Party</th>
              <th>Ship Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontWeight: 700, color: '#2563eb' }}>{inv.stockId}</td>
                <td>
                  <span className={`badge badge-${inv.status.toLowerCase()}`}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace' }}>{inv.chassisNo}</td>
                <td>{inv.invoiceDate}</td>
                <td>{inv.lcNumber || '—'}</td>
                <td style={{ fontWeight: 600 }}>{inv.currency} {inv.amount.toLocaleString()}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{inv.client}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{inv.customerName}</div>
                </td>
                <td>{inv.shipName || '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button type="button" className="action-btn action-btn-view" title="View Detail" onClick={() => handleOpenForm(inv)}>
                      <Eye style={{ width: 14, height: 14 }} />
                    </button>
                    <button
                      type="button"
                      className="action-btn action-btn-edit"
                      title="Create/Edit Invoice"
                      onClick={() => handleOpenForm(inv)}
                    >
                      <FileText style={{ width: 14, height: 14 }} />
                    </button>
                    <button type="button" className="action-btn action-btn-delete" title="Delete">
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceFormModal
        open={showForm}
        invoice={selectedInvoice}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}
