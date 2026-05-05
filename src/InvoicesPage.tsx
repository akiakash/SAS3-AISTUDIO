import React, { useState } from 'react';
import {
  Search, Plus, Download, FileText, Filter, ArrowUpDown,
  MoreHorizontal, Eye, Pencil, Trash2, X, Save,
  CreditCard, Ship, User, Building2, Calendar, DollarSign,
  Info, ChevronDown, CheckCircle2, AlertCircle, FileStack,
  Receipt, Landmark, Truck, MessageSquare, History,
  ChevronRight, ArrowRight, Check
} from 'lucide-react';

interface Invoice {
  id: number;
  stockId: string;
  customerName: string;
  invoiceDate: string;
  amount: number;
  currency: string;
  status: 'Draft' | 'Final' | 'Proforma';
  chassisNo: string;
  model: string;
  lcNumber: string;
  shipName: string;
  client: string;
}

const DUMMY_INVOICES: Invoice[] = [
  { id: 1, stockId: '32777', customerName: 'Ranasinghe Ent', invoiceDate: '2026-04-29', amount: 2660000, currency: 'JPY', status: 'Draft', chassisNo: 'LA350S-0361108', model: 'DAIHATSU MIRA', lcNumber: 'LC-9982', shipName: 'Global Leader', client: 'ojtjapan' },
  { id: 2, stockId: '32776', customerName: 'R S CAR SALES', invoiceDate: '2026-04-29', amount: 3500000, currency: 'JPY', status: 'Draft', chassisNo: 'A210A-3122', model: 'TOYOTA RAIZE', lcNumber: '', shipName: 'Pioneer', client: 'rscarsales' },
  { id: 3, stockId: '32775', customerName: 'MR. MOHAMED NIZAR', invoiceDate: '2026-04-28', amount: 2880000, currency: 'JPY', status: 'Draft', chassisNo: 'C1DKR-116328', model: 'VW T-CROSS', lcNumber: 'LC-8871', shipName: 'Oceania', client: 'ojtjapan' },
  { id: 4, stockId: '32774', customerName: 'Arjuna Kumari', invoiceDate: '2026-04-28', amount: 1250000, currency: 'JPY', status: 'Final', chassisNo: 'RV5-1302075', model: 'HONDA VEZEL', lcNumber: '', shipName: '', client: 'arjunakumari' },
  { id: 5, stockId: '32773', customerName: 'SUN TRADING COM', invoiceDate: '2026-04-27', amount: 4800000, currency: 'JPY', status: 'Proforma', chassisNo: 'GK3-0187654', model: 'HONDA FIT', lcNumber: 'LC-1122', shipName: 'Morning Glory', client: 'suntrading' },
];

export default function InvoicesPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleOpenDrawer = (inv: Invoice | null = null) => {
    setSelectedInvoice(inv);
    setActiveStep(1);
    setShowDrawer(true);
  };

  return (
    <div className="invoices-page">
      {/* ── Page Header ──────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="page-eyebrow">Orders</div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">Manage billing, LC payments, and shipping documentation.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline">
            <Download style={{ width: 14, height: 14 }} /> Export Excel
          </button>
          <button className="btn btn-primary" onClick={() => handleOpenDrawer()}>
            <Plus style={{ width: 14, height: 14 }} /> Create Invoice
          </button>
        </div>
      </div>

      {/* ── Filter Bar ────────────────────────────── */}
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
          <button className="btn-sm btn-ghost" style={{ height: 36 }}>
            <Filter style={{ width: 14, height: 14 }} /> Filter
          </button>
        </div>
      </div>

      {/* ── Invoices Table ────────────────────────── */}
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
            {DUMMY_INVOICES.map(inv => (
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
                    <button className="action-btn action-btn-view" title="View Detail">
                      <Eye style={{ width: 14, height: 14 }} />
                    </button>
                    <button 
                      className="action-btn action-btn-edit" 
                      title="Create/Edit Invoice"
                      onClick={() => handleOpenDrawer(inv)}
                    >
                      <FileText style={{ width: 14, height: 14 }} />
                    </button>
                    <button className="action-btn action-btn-delete" title="Delete">
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Professional Side Drawer ──────────────── */}
      {showDrawer && (
        <div className="drawer-overlay" onClick={() => setShowDrawer(false)}>
          <div className="drawer-container" onClick={e => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="drawer-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2563eb', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  <FileText style={{ width: 14, height: 14 }} /> 
                  INVOICE MANAGEMENT
                </div>
                <h2 className="modal-title" style={{ fontSize: 24 }}>
                  {selectedInvoice ? `Invoice: #${selectedInvoice.stockId}` : 'New Invoice Entry'}
                </h2>
                <p className="modal-subtitle">Follow the steps below to finalize the vehicle invoice.</p>
              </div>
              <button className="close-btn" onClick={() => setShowDrawer(false)}>
                <X style={{ width: 24, height: 24 }} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="drawer-body">
              {/* Steps Indicator */}
              <div className="drawer-steps">
                <StepItem num={1} label="Identity" active={activeStep === 1} done={activeStep > 1} />
                <StepItem num={2} label="Financials" active={activeStep === 2} done={activeStep > 2} />
                <StepItem num={3} label="Logistics" active={activeStep === 3} done={activeStep > 3} />
                <StepItem num={4} label="Review" active={activeStep === 4} done={activeStep > 4} />
              </div>

              {activeStep === 1 && (
                <div className="step-content">
                  <div className="form-group-title"><User style={{ width: 14, height: 14 }} /> Customer & Vehicle Identity</div>
                  <div className="grid-2" style={{ marginBottom: 24 }}>
                    <div className="field">
                      <label className="field-label">Stock ID</label>
                      <input className="field-input" defaultValue={selectedInvoice?.stockId || '32773'} />
                    </div>
                    <div className="field">
                      <label className="field-label">Chassis Number</label>
                      <input className="field-input" defaultValue={selectedInvoice?.chassisNo || 'JZX100-0123456'} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Customer / Client</label>
                    <div className="customer-box" style={{ background: '#f4f5f7', padding: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', border: '1px solid #e2e8f0' }}>
                          <User style={{ width: 20, height: 20, color: '#64748b' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedInvoice?.client || 'Select Client'}</div>
                          <div style={{ fontSize: 12, color: '#94a3b8' }}>ID: {selectedInvoice?.id || 'NEW'}</div>
                        </div>
                      </div>
                      <textarea className="field-input" placeholder="Notify Party / Address Details..." defaultValue={selectedInvoice?.customerName}></textarea>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="step-content">
                  <div className="form-group-title"><Landmark style={{ width: 14, height: 14 }} /> Pricing & Payment Terms</div>
                  <div className="pricing-grid" style={{ gap: 12 }}>
                    <PricingRow label="Vehicle Cost (FOB)" value={selectedInvoice?.amount || 2660000} currency="JPY" />
                    <PricingRow label="Ocean Freight" value={0} currency="JPY" />
                    <PricingRow label="Insurance Premium" value={0} currency="JPY" />
                    <div style={{ height: 1, background: '#f1f5f9', margin: '8px 0' }} />
                    <PricingRow label="TOTAL CIF VALUE" value={selectedInvoice?.amount || 2660000} currency="JPY" bold />
                  </div>
                  <div className="field" style={{ marginTop: 24 }}>
                    <label className="field-label">Payment Terms</label>
                    <select className="field-input">
                      <option>LC AT SIGHT</option>
                      <option>TT PAYMENT</option>
                      <option>CASH ON DELIVERY</option>
                    </select>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="step-content">
                  <div className="form-group-title"><Truck style={{ width: 14, height: 14 }} /> Logistics & Auction Charges</div>
                  <div className="charges-list" style={{ gap: 10 }}>
                    <ChargeRow label="Auction Fee" value="12,000" />
                    <ChargeRow label="Forwarding Charge" value="15,000" />
                    <ChargeRow label="Internal Transport" value="8,500" />
                    <ChargeRow label="Inspection Fee" value="0" />
                    <ChargeRow label="Radiation Check" value="0" />
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="step-content">
                   <div className="form-group-title"><CheckCircle2 style={{ width: 14, height: 14 }} /> Review & Finalize</div>
                   <div className="audit-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', padding: 20, marginBottom: 24 }}>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <div style={{ color: '#16a34a' }}><CheckCircle2 style={{ width: 24, height: 24 }} /></div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#166534' }}>Ready for Finalization</div>
                          <div style={{ fontSize: 13, color: '#15803d' }}>All required fields are validated. This will generate a formal invoice.</div>
                        </div>
                      </div>
                   </div>
                   <div className="summary-mini-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                        <span style={{ color: '#64748b' }}>Total Invoice Amount</span>
                        <span style={{ fontWeight: 800, fontSize: 20 }}>{selectedInvoice?.currency || 'JPY'} {selectedInvoice?.amount.toLocaleString() || '2,660,000'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: '#64748b' }}>Projected Profit</span>
                        <span style={{ fontWeight: 600, color: '#16a34a' }}>+¥145,000</span>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="drawer-footer">
              <button 
                className="btn btn-outline" 
                onClick={() => activeStep > 1 ? setActiveStep(activeStep - 1) : setShowDrawer(false)}
              >
                {activeStep === 1 ? 'Cancel' : 'Previous Step'}
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={() => activeStep < 4 ? setActiveStep(activeStep + 1) : setShowDrawer(false)}
              >
                {activeStep === 4 ? 'Save & Finalize' : 'Next Step'} <ArrowRight style={{ width: 14, height: 14, marginLeft: 8 }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepItem({ num, label, active, done }: { num: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`step-item ${active ? 'active' : ''}`}>
      <div className="step-num">{done ? <Check style={{ width: 12, height: 12 }} /> : num}</div>
      {label}
    </div>
  );
}

function PricingRow({ label, value, currency, bold }: { label: string; value: any; currency: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: bold ? 16 : 14 }}>
      <span style={{ color: bold ? '#0f172a' : '#64748b', fontWeight: bold ? 700 : 400 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>{currency}</span>
        <input className="pricing-input" style={{ width: 140, fontWeight: bold ? 800 : 600 }} defaultValue={value.toLocaleString()} />
      </div>
    </div>
  );
}

function ChargeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="charge-row" style={{ padding: '8px 0', borderBottom: '1px solid #f8fafc' }}>
      <span className="charge-label" style={{ fontSize: 13 }}>{label}</span>
      <input className="charge-input" style={{ width: 120, height: 32 }} defaultValue={value} />
    </div>
  );
}
