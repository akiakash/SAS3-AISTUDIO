import React, { useMemo, useState } from 'react';
import {
  X, Save, User, FileText, Ship, Landmark, Receipt,
  ChevronDown, ChevronUp, ArrowRight, Check, CheckCircle2, Truck,
} from 'lucide-react';

const STEPS = [
  { num: 1, label: 'Identity' },
  { num: 2, label: 'Financials' },
  { num: 3, label: 'Logistics' },
  { num: 4, label: 'Review' },
] as const;

export interface InvoiceListItem {
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

export interface InvoiceFormData {
  orderId: string;
  invoiceDate: string;
  auctionDate: string;
  chassisNo: string;
  hsCode: string;
  payTerms: string;
  cost: string;
  insurance: string;
  freight: string;
  currency: string;
  lcId: string;
  lcNo: string;
  lcExpireDate: string;
  latestShipmentDate: string;
  bank: string;
  customerId: string;
  notifyParty: string;
  customerAddress: string;
  bankIdConsignee: string;
  bankId: string;
  bankName: string;
  bankCountry: string;
  shipOkNo: string;
  shipNo: string;
  docsStatus: string;
  shipper: string;
  purchasePrice: string;
  aucChg: string;
  aucTax: string;
  riksoChg: string;
  riksoTax: string;
  forwarding: string;
  radiation: string;
  insuranceChg: string;
  inspectionChg: string;
  freightChg: string;
  demurrage: string;
  repairCost: string;
  dhlEms: string;
  handlingFee: string;
  lcAdvising: string;
  amendment1: string;
  amendment2: string;
  amendment3: string;
  collectionFee: string;
  lcDhlFee: string;
  lcHandlingFee: string;
  interest: string;
  reimCom: string;
  postalChg: string;
  bkIbFwdBank: string;
  discrepancy: string;
  shipId: string;
  shipName: string;
  sailingDate: string;
  sailingPort: string;
  destinationPort: string;
  portLetter: string;
  inspectionRemark: string;
  country: string;
  eta: string;
  blNo: string;
  blDate: string;
  inspCertNo: string;
  placeOfDelivery: string;
  cyCfs: string;
  cycy: string;
  lines: string[];
  memo1: string;
  memo2: string;
  blCheck: boolean;
  inspectionCheck: boolean;
  totalCost: string;
  salesPrice: string;
  salesExRate: string;
  salesman: string;
  salePrAfterEx: string;
  deposit: string;
  depositDate: string;
  advance1: string;
  advance1Date: string;
  advance2: string;
  advance2Date: string;
  advance3: string;
  advance3Date: string;
  lcCashAmt: string;
  lcCashDate: string;
  payment: string;
  balance: string;
  courierName: string;
  courierOk: string;
  atMufgDate: string;
  courierNo: string;
  courierDate: string;
  information: string;
}

const PAY_TERMS = ['LC AT SIGHT', 'TT PAYMENT', 'CASH ON DELIVERY', 'USANCE LC'];
const BANKS = ['MUFG BANK, LTD.', 'SUMITOMO MITSUI BANKING', 'MIZUHO BANK', 'RESONA BANK'];
const COURIERS = ['DHL', 'EMS', 'FedEx', 'UPS'];

export function getDefaultFormData(inv?: InvoiceListItem | null): InvoiceFormData {
  const today = '2026-05-20';
  return {
    orderId: inv?.stockId ?? '32817',
    invoiceDate: inv?.invoiceDate ?? today,
    auctionDate: today,
    chassisNo: inv?.chassisNo ?? 'RU4-1100458',
    hsCode: '8703.23',
    payTerms: 'LC AT SIGHT',
    cost: '',
    insurance: '',
    freight: '',
    currency: inv?.currency ?? 'JPY',
    lcId: '',
    lcNo: inv?.lcNumber ?? '',
    lcExpireDate: '',
    latestShipmentDate: '',
    bank: 'MUFG BANK, LTD.',
    customerId: inv?.client ?? 'Apatsa',
    notifyParty: inv?.customerName ?? 'Apatsa Pearson Chelewani',
    customerAddress: 'Lilongwe, Malawi',
    bankIdConsignee: '',
    bankId: '',
    bankName: '',
    bankCountry: 'Malawi',
    shipOkNo: '',
    shipNo: '',
    docsStatus: 'No',
    shipper: 'SAS3 Trading Co. Ltd.',
    purchasePrice: '370000',
    aucChg: '12000',
    aucTax: '1200',
    riksoChg: '0',
    riksoTax: '0',
    forwarding: '15000',
    radiation: '0',
    insuranceChg: '0',
    inspectionChg: '0',
    freightChg: '0',
    demurrage: '0',
    repairCost: '0',
    dhlEms: '0',
    handlingFee: '0',
    lcAdvising: '0',
    amendment1: '0',
    amendment2: '0',
    amendment3: '0',
    collectionFee: '0',
    lcDhlFee: '0',
    lcHandlingFee: '0',
    interest: '0',
    reimCom: '0',
    postalChg: '0',
    bkIbFwdBank: '0',
    discrepancy: '0',
    shipId: '',
    shipName: inv?.shipName ?? '',
    sailingDate: '',
    sailingPort: '',
    destinationPort: '',
    portLetter: '',
    inspectionRemark: '',
    country: 'Malawi',
    eta: '',
    blNo: '',
    blDate: '',
    inspCertNo: '',
    placeOfDelivery: '',
    cyCfs: '',
    cycy: '',
    lines: [
      'Accessories Installed in the Vehicle',
      'ONE UNIT OF USED',
      '',
      '',
      '',
      '',
      '',
      '',
      '(FOR PERMIT NUMBER)',
      '',
    ],
    memo1: '',
    memo2: '',
    blCheck: false,
    inspectionCheck: false,
    totalCost: '411050',
    salesPrice: '0',
    salesExRate: '',
    salesman: 'PHILIP',
    salePrAfterEx: '',
    deposit: '',
    depositDate: '',
    advance1: '',
    advance1Date: '',
    advance2: '',
    advance2Date: '',
    advance3: '',
    advance3Date: '',
    lcCashAmt: '',
    lcCashDate: '',
    payment: '',
    balance: '',
    courierName: 'DHL',
    courierOk: '',
    atMufgDate: '',
    courierNo: '',
    courierDate: '',
    information: '',
  };
}

function parseNum(s: string): number {
  const n = parseFloat(String(s).replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function sumFields(...vals: string[]): number {
  return vals.reduce((a, v) => a + parseNum(v), 0);
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

interface Props {
  open: boolean;
  invoice: InvoiceListItem | null;
  onClose: () => void;
  onSave?: (data: InvoiceFormData) => void;
}

export default function InvoiceFormModal({ open, invoice, onClose, onSave }: Props) {
  const [form, setForm] = useState<InvoiceFormData>(() => getDefaultFormData(invoice));
  const [showAllCosts, setShowAllCosts] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  React.useEffect(() => {
    if (open) {
      setForm(getDefaultFormData(invoice));
      setActiveStep(1);
      setShowAllCosts(false);
    }
  }, [open, invoice]);

  const vehicleCosts = useMemo(
    () =>
      sumFields(
        form.purchasePrice,
        form.aucChg,
        form.aucTax,
        form.riksoChg,
        form.riksoTax,
        form.forwarding,
        form.radiation,
        form.insuranceChg,
        form.inspectionChg,
        form.freightChg,
        form.demurrage,
        form.repairCost,
        form.dhlEms,
        form.handlingFee,
      ),
    [form],
  );

  const lcBankCost = useMemo(
    () =>
      sumFields(
        form.lcAdvising,
        form.amendment1,
        form.amendment2,
        form.amendment3,
        form.collectionFee,
        form.lcDhlFee,
        form.lcHandlingFee,
        form.interest,
        form.reimCom,
        form.postalChg,
        form.bkIbFwdBank,
        form.discrepancy,
      ),
    [form],
  );

  const cifAmount = useMemo(
    () => sumFields(form.cost, form.insurance, form.freight),
    [form.cost, form.insurance, form.freight],
  );

  const profitLoss = useMemo(() => {
    const sales = parseNum(form.salesPrice);
    const cost = parseNum(form.totalCost) || vehicleCosts + lcBankCost;
    return sales - cost;
  }, [form.salesPrice, form.totalCost, vehicleCosts, lcBankCost]);

  const set = (key: keyof InvoiceFormData, value: string | boolean | string[]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const setLine = (index: number, value: string) => {
    setForm(prev => {
      const lines = [...prev.lines];
      lines[index] = value;
      return { ...prev, lines };
    });
  };

  if (!open) return null;

  const totals = { vehicleCosts, lcBankCost, cifAmount, profitLoss };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container invoice-drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2563eb', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
              <FileText style={{ width: 14, height: 14 }} />
              INVOICE MANAGEMENT
            </div>
            <h2 className="modal-title" style={{ fontSize: 22 }}>
              {invoice ? `Invoice: #${invoice.stockId}` : 'New Invoice Entry'}
            </h2>
            <p className="modal-subtitle">Step {activeStep} of 4 — {STEPS[activeStep - 1].label}</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X style={{ width: 22, height: 22 }} />
          </button>
        </div>

        <div className="drawer-body invoice-drawer-body">
          <div className="drawer-steps">
            {STEPS.map(s => (
              <StepItem
                key={s.num}
                num={s.num}
                label={s.label}
                active={activeStep === s.num}
                done={activeStep > s.num}
                onClick={() => setActiveStep(s.num)}
              />
            ))}
          </div>

          {activeStep === 1 && (
            <div className="step-content">
              <div className="form-group-title"><User style={{ width: 14, height: 14 }} /> Order & Customer Identity</div>
              <div className="invoice-step-grid-2">
                <div className="form-column" style={{ padding: 16 }}>
                  <div className="invoice-costs-heading" style={{ marginBottom: 10 }}>Order & Trade</div>
                  <div className="invoice-field-grid">
                    <Field label="Order ID" value={form.orderId} onChange={v => set('orderId', v)} />
                    <Field label="Invoice Date" value={form.invoiceDate} onChange={v => set('invoiceDate', v)} type="date" />
                    <Field label="Auction Date" value={form.auctionDate} onChange={v => set('auctionDate', v)} type="date" />
                    <Field label="Chassis No." value={form.chassisNo} onChange={v => set('chassisNo', v)} mono />
                    <Field label="HS Code" value={form.hsCode} onChange={v => set('hsCode', v)} />
                    <div className="field invoice-field-full">
                      <label className="field-label">Pay Terms</label>
                      <select className="field-input field-input-sm" value={form.payTerms} onChange={e => set('payTerms', e.target.value)}>
                        {PAY_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-column" style={{ padding: 16 }}>
                  <div className="invoice-costs-heading" style={{ marginBottom: 10 }}>Customer & Consignee</div>
                  <div className="customer-box" style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div className="invoice-avatar">
                        <User style={{ width: 18, height: 18, color: '#64748b' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Field label="Customer Id" value={form.customerId} onChange={v => set('customerId', v)} compact />
                      </div>
                    </div>
                    <Field label="Notify Party" value={form.notifyParty} onChange={v => set('notifyParty', v)} />
                    <div className="field" style={{ marginTop: 8 }}>
                      <label className="field-label">Name & Address</label>
                      <textarea className="field-input" rows={3} value={form.customerAddress} onChange={e => set('customerAddress', e.target.value)} />
                    </div>
                  </div>
                  <div className="invoice-field-grid">
                    <Field label="Bank Id/Consignee" value={form.bankIdConsignee} onChange={v => set('bankIdConsignee', v)} />
                    <Field label="Bank Name" value={form.bankName} onChange={v => set('bankName', v)} />
                    <Field label="Country" value={form.bankCountry} onChange={v => set('bankCountry', v)} />
                    <Field label="Ship OK NO" value={form.shipOkNo} onChange={v => set('shipOkNo', v)} />
                    <Field label="Ship No" value={form.shipNo} onChange={v => set('shipNo', v)} />
                    <div className="field">
                      <label className="field-label">Docs</label>
                      <select className={`field-input field-input-sm ${form.docsStatus === 'No' ? 'invoice-docs-no' : ''}`} value={form.docsStatus} onChange={e => set('docsStatus', e.target.value)}>
                        <option>Yes</option><option>No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="step-content">
              <div className="form-group-title"><Landmark style={{ width: 14, height: 14 }} /> Pricing, LC & Costs</div>
              <div className="form-column" style={{ padding: 16, marginBottom: 16 }}>
                <div className="invoice-field-grid">
                  <Field label="Cost" value={form.cost} onChange={v => set('cost', v)} />
                  <Field label="Insurance" value={form.insurance} onChange={v => set('insurance', v)} />
                  <Field label="Freight" value={form.freight} onChange={v => set('freight', v)} />
                  <div className="field">
                    <label className="field-label">CIF Amount</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input className="field-input field-input-sm" readOnly value={fmt(cifAmount)} style={{ flex: 1, fontWeight: 700 }} />
                      <select className="field-input field-input-sm" style={{ width: 72 }} value={form.currency} onChange={e => set('currency', e.target.value)}>
                        <option>JPY</option><option>USD</option>
                      </select>
                    </div>
                  </div>
                  <Field label="LC ID" value={form.lcId} onChange={v => set('lcId', v)} />
                  <Field label="LC No." value={form.lcNo} onChange={v => set('lcNo', v)} />
                  <Field label="LC Expire Date" value={form.lcExpireDate} onChange={v => set('lcExpireDate', v)} type="date" />
                  <Field label="Latest Shipment" value={form.latestShipmentDate} onChange={v => set('latestShipmentDate', v)} type="date" />
                  <div className="field invoice-field-full">
                    <label className="field-label">Bank</label>
                    <select className="field-input field-input-sm" value={form.bank} onChange={e => set('bank', e.target.value)}>
                      {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-column" style={{ padding: 16 }}>
                <Field label="Shipper" value={form.shipper} onChange={v => set('shipper', v)} full />
                <div className="invoice-costs-split" style={{ marginTop: 12 }}>
                  <div className="invoice-costs-col">
                    <div className="invoice-costs-heading">Vehicle / Export</div>
                    <CostField label="Purchase Price" value={form.purchasePrice} onChange={v => set('purchasePrice', v)} />
                    <CostField label="Auction Fee" value={form.aucChg} onChange={v => set('aucChg', v)} />
                    <CostField label="Auc. Tax (10%)" value={form.aucTax} onChange={v => set('aucTax', v)} />
                    <CostField label="Rikso Chg." value={form.riksoChg} onChange={v => set('riksoChg', v)} />
                    <CostField label="Forwarding" value={form.forwarding} onChange={v => set('forwarding', v)} />
                    {showAllCosts && (
                      <>
                        <CostField label="Radiation" value={form.radiation} onChange={v => set('radiation', v)} />
                        <CostField label="Inspection Fee" value={form.inspectionChg} onChange={v => set('inspectionChg', v)} />
                        <CostField label="Freight Chg." value={form.freightChg} onChange={v => set('freightChg', v)} />
                        <CostField label="DHL/EMS" value={form.dhlEms} onChange={v => set('dhlEms', v)} />
                        <CostField label="Handling Fee" value={form.handlingFee} onChange={v => set('handlingFee', v)} />
                      </>
                    )}
                    <button type="button" className="btn-sm btn-ghost invoice-show-all" onClick={() => setShowAllCosts(!showAllCosts)}>
                      {showAllCosts ? <ChevronUp style={{ width: 12, height: 12 }} /> : <ChevronDown style={{ width: 12, height: 12 }} />}
                      {showAllCosts ? 'Show Less' : 'Show All'}
                    </button>
                  </div>
                  <div className="invoice-costs-col">
                    <div className="invoice-costs-heading">LC / Bank</div>
                    <CostField label="LC Advising" value={form.lcAdvising} onChange={v => set('lcAdvising', v)} />
                    <CostField label="Collection Fee" value={form.collectionFee} onChange={v => set('collectionFee', v)} />
                    <CostField label="LC Handling Fee" value={form.lcHandlingFee} onChange={v => set('lcHandlingFee', v)} />
                    <CostField label="Interest" value={form.interest} onChange={v => set('interest', v)} />
                    <div className="invoice-lc-total">
                      <span>TOTAL LC/BANK COST</span>
                      <strong>{fmt(lcBankCost)}</strong>
                    </div>
                  </div>
                </div>
                <div className="invoice-summary-fields" style={{ marginTop: 16 }}>
                  <Field label="Total Cost" value={form.totalCost} onChange={v => set('totalCost', v)} highlight />
                  <Field label="Sales Price" value={form.salesPrice} onChange={v => set('salesPrice', v)} sales />
                  <Field label="Salesman" value={form.salesman} onChange={v => set('salesman', v)} />
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="step-content">
              <div className="form-group-title"><Truck style={{ width: 14, height: 14 }} /> Logistics & Documentation</div>
              <div className="form-column" style={{ padding: 16, marginBottom: 16 }}>
                <div className="invoice-shipping-grid invoice-shipping-grid-drawer">
                  <Field label="Ship ID" value={form.shipId} onChange={v => set('shipId', v)} />
                  <Field label="Ship Name" value={form.shipName} onChange={v => set('shipName', v)} />
                  <Field label="Sailing Date" value={form.sailingDate} onChange={v => set('sailingDate', v)} type="date" />
                  <Field label="Sailing Port" value={form.sailingPort} onChange={v => set('sailingPort', v)} />
                  <Field label="Destination Port" value={form.destinationPort} onChange={v => set('destinationPort', v)} />
                  <Field label="Port Letter" value={form.portLetter} onChange={v => set('portLetter', v)} />
                  <Field label="Country" value={form.country} onChange={v => set('country', v)} />
                  <Field label="ETA" value={form.eta} onChange={v => set('eta', v)} type="date" />
                  <Field label="BL No." value={form.blNo} onChange={v => set('blNo', v)} />
                  <Field label="BL Date" value={form.blDate} onChange={v => set('blDate', v)} type="date" />
                  <Field label="Insp Cert.No." value={form.inspCertNo} onChange={v => set('inspCertNo', v)} />
                  <Field label="Place of Delivery" value={form.placeOfDelivery} onChange={v => set('placeOfDelivery', v)} />
                </div>
              </div>
              <div className="form-group-title" style={{ marginTop: 8 }}>Invoice Line Descriptions</div>
              <div className="invoice-lines-grid invoice-lines-grid-drawer">
                {form.lines.map((line, i) => (
                  <div key={i} className="invoice-line-item">
                    <label className="field-label">LINE {i + 1}</label>
                    <textarea className="field-input invoice-line-input" rows={2} value={line} onChange={e => setLine(i, e.target.value)} />
                  </div>
                ))}
              </div>
              <div className="form-group-title" style={{ marginTop: 20 }}>Payments & Courier</div>
              <div className="form-column" style={{ padding: 16 }}>
                <div className="invoice-payment-block">
                  <PaymentRow label="Deposit" amount={form.deposit} date={form.depositDate} onAmount={v => set('deposit', v)} onDate={v => set('depositDate', v)} />
                  <PaymentRow label="Advance 1" amount={form.advance1} date={form.advance1Date} onAmount={v => set('advance1', v)} onDate={v => set('advance1Date', v)} />
                  <PaymentRow label="Advance 2" amount={form.advance2} date={form.advance2Date} onAmount={v => set('advance2', v)} onDate={v => set('advance2Date', v)} />
                  <PaymentRow label="LC Cash Amt" amount={form.lcCashAmt} date={form.lcCashDate} onAmount={v => set('lcCashAmt', v)} onDate={v => set('lcCashDate', v)} />
                </div>
                <div className="invoice-field-grid" style={{ marginTop: 12 }}>
                  <Field label="Payment" value={form.payment} onChange={v => set('payment', v)} />
                  <Field label="Balance" value={form.balance} onChange={v => set('balance', v)} />
                  <div className="field">
                    <label className="field-label">Courier</label>
                    <select className="field-input field-input-sm" value={form.courierName} onChange={e => set('courierName', e.target.value)}>
                      {COURIERS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <Field label="Courier No." value={form.courierNo} onChange={v => set('courierNo', v)} />
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="step-content">
              <InvoiceReviewSummary form={form} totals={totals} />
            </div>
          )}
        </div>

        <div className="drawer-footer">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => (activeStep > 1 ? setActiveStep(activeStep - 1) : onClose())}
          >
            {activeStep === 1 ? 'Cancel' : 'Previous Step'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (activeStep < 4) setActiveStep(activeStep + 1);
              else {
                onSave?.(form);
                onClose();
              }
            }}
          >
            {activeStep === 4 ? (
              <><Save style={{ width: 14, height: 14 }} /> Save & Finalize</>
            ) : (
              <>Next Step <ArrowRight style={{ width: 14, height: 14, marginLeft: 6 }} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepItem({
  num,
  label,
  active,
  done,
  onClick,
}: {
  num: number;
  label: string;
  active: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`step-item ${active ? 'active' : ''}`} onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
      <div className="step-num">{done ? <Check style={{ width: 12, height: 12 }} /> : num}</div>
      {label}
    </button>
  );
}

function InvoiceReviewSummary({
  form,
  totals,
}: {
  form: InvoiceFormData;
  totals: { vehicleCosts: number; lcBankCost: number; cifAmount: number; profitLoss: number };
}) {
  const { vehicleCosts, lcBankCost, cifAmount, profitLoss } = totals;
  const filledLines = form.lines.map((l, i) => ({ n: i + 1, text: l })).filter(l => l.text.trim());

  return (
    <>
      <div className="form-group-title"><CheckCircle2 style={{ width: 14, height: 14 }} /> Review & Finalize</div>
      <div className="audit-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <CheckCircle2 style={{ width: 22, height: 22, color: '#16a34a', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: 14 }}>Ready for Finalization</div>
            <div style={{ fontSize: 13, color: '#15803d' }}>Review all sections below, then save to generate the formal invoice.</div>
          </div>
        </div>
      </div>

      <div className="summary-mini-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: '#64748b', fontSize: 13 }}>Total Invoice (CIF)</span>
          <span style={{ fontWeight: 800, fontSize: 22, color: '#2563eb' }}>{form.currency} {fmt(cifAmount)}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, fontSize: 13 }}>
          <div>
            <span style={{ color: '#94a3b8' }}>Total Cost</span>
            <div style={{ fontWeight: 700 }}>¥{fmt(parseNum(form.totalCost) || vehicleCosts + lcBankCost)}</div>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>Sales Price</span>
            <div style={{ fontWeight: 700, background: '#fef9c3', padding: '2px 6px', borderRadius: 4, display: 'inline-block' }}>
              ¥{fmt(parseNum(form.salesPrice))}
            </div>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>Profit / Loss</span>
            <div style={{ fontWeight: 700, color: profitLoss >= 0 ? '#16a34a' : '#dc2626' }}>
              {profitLoss >= 0 ? '+' : ''}¥{fmt(profitLoss)}
            </div>
          </div>
        </div>
      </div>

      <div className="invoice-review-sections">
        <ReviewSection title="Order & Identity" icon={<Receipt style={{ width: 12, height: 12 }} />}>
          <ReviewRow label="Order ID" value={form.orderId} />
          <ReviewRow label="Chassis No." value={form.chassisNo} mono />
          <ReviewRow label="Invoice Date" value={form.invoiceDate} />
          <ReviewRow label="Pay Terms" value={form.payTerms} />
          <ReviewRow label="HS Code" value={form.hsCode} />
        </ReviewSection>

        <ReviewSection title="Customer" icon={<User style={{ width: 12, height: 12 }} />}>
          <ReviewRow label="Customer" value={form.customerId} />
          <ReviewRow label="Notify Party" value={form.notifyParty} />
          <ReviewRow label="Address" value={form.customerAddress} full />
          <ReviewRow label="Docs" value={form.docsStatus} warn={form.docsStatus === 'No'} />
        </ReviewSection>

        <ReviewSection title="Financials & LC" icon={<Landmark style={{ width: 12, height: 12 }} />}>
          <ReviewRow label="CIF Amount" value={`${form.currency} ${fmt(cifAmount)}`} bold />
          <ReviewRow label="LC No." value={form.lcNo || '—'} />
          <ReviewRow label="Bank" value={form.bank} />
          <ReviewRow label="Vehicle Costs" value={`¥${fmt(vehicleCosts)}`} />
          <ReviewRow label="LC/Bank Costs" value={`¥${fmt(lcBankCost)}`} />
          <ReviewRow label="Shipper" value={form.shipper} />
          <ReviewRow label="Salesman" value={form.salesman} />
        </ReviewSection>

        <ReviewSection title="Shipping" icon={<Ship style={{ width: 12, height: 12 }} />}>
          <ReviewRow label="Ship Name" value={form.shipName || '—'} />
          <ReviewRow label="BL No." value={form.blNo || '—'} />
          <ReviewRow label="Destination" value={form.destinationPort || '—'} />
          <ReviewRow label="Country" value={form.country} />
          <ReviewRow label="ETA" value={form.eta || '—'} />
        </ReviewSection>

        {filledLines.length > 0 && (
          <ReviewSection title="Invoice Lines" icon={<FileText style={{ width: 12, height: 12 }} />} full>
            {filledLines.map(l => (
              <div key={l.n} className="invoice-review-line">
                <span className="invoice-review-line-num">LINE {l.n}</span>
                <span>{l.text}</span>
              </div>
            ))}
          </ReviewSection>
        )}

        <ReviewSection title="Payments & Courier" icon={<Truck style={{ width: 12, height: 12 }} />}>
          <ReviewRow label="Deposit" value={form.deposit ? `¥${form.deposit}` : '—'} />
          <ReviewRow label="Payment" value={form.payment ? `¥${form.payment}` : '—'} />
          <ReviewRow label="Balance" value={form.balance ? `¥${form.balance}` : '—'} />
          <ReviewRow label="Courier" value={form.courierName} />
          <ReviewRow label="BL Check" value={form.blCheck ? 'Yes' : 'No'} />
          <ReviewRow label="Inspection Check" value={form.inspectionCheck ? 'Yes' : 'No'} />
        </ReviewSection>
      </div>

      <div className="modal-summary-bar" style={{ marginTop: 20, borderRadius: 10 }}>
        <div className="summary-item">
          <span className="label">Vehicle Costs</span>
          <span className="value">¥{fmt(vehicleCosts)}</span>
        </div>
        <div className="summary-item">
          <span className="label">LC/Bank</span>
          <span className="value">¥{fmt(lcBankCost)}</span>
        </div>
        <div className="summary-item highlight">
          <span className="label">CIF</span>
          <span className="value">{form.currency} {fmt(cifAmount)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Profit/Loss</span>
          <span className={`value ${profitLoss >= 0 ? 'positive' : ''}`} style={profitLoss < 0 ? { color: '#f87171' } : undefined}>
            {profitLoss >= 0 ? '+' : ''}¥{fmt(profitLoss)}
          </span>
        </div>
      </div>
    </>
  );
}

function ReviewSection({
  title,
  icon,
  children,
  full,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`invoice-review-section ${full ? 'invoice-review-section-full' : ''}`}>
      <div className="invoice-review-section-title">{icon} {title}</div>
      <div className="invoice-review-section-body">{children}</div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  mono,
  full,
  bold,
  warn,
}: {
  label: string;
  value: string;
  mono?: boolean;
  full?: boolean;
  bold?: boolean;
  warn?: boolean;
}) {
  return (
    <div className={`invoice-review-row ${full ? 'invoice-review-row-full' : ''}`}>
      <span className="invoice-review-label">{label}</span>
      <span
        className={`invoice-review-value ${mono ? 'invoice-mono' : ''} ${bold ? 'invoice-review-bold' : ''} ${warn ? 'invoice-docs-no' : ''}`}
        style={warn ? { background: 'transparent', border: 'none', padding: 0 } : undefined}
      >
        {value || '—'}
      </span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  number,
  mono,
  full,
  compact,
  highlight,
  sales,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  number?: boolean;
  mono?: boolean;
  full?: boolean;
  compact?: boolean;
  highlight?: boolean;
  sales?: boolean;
}) {
  return (
    <div className={`field ${full ? 'invoice-field-full' : ''}`} style={compact ? { marginBottom: 0 } : undefined}>
      <label className="field-label">{label}</label>
      <input
        type={type}
        className={`field-input field-input-sm ${mono ? 'invoice-mono' : ''} ${highlight ? 'invoice-highlight' : ''} ${sales ? 'invoice-sales' : ''}`}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function CostField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="charge-row">
      <span className="charge-label">{label}</span>
      <input className="charge-input" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function PaymentRow({
  label,
  amount,
  date,
  onAmount,
  onDate,
}: {
  label: string;
  amount: string;
  date: string;
  onAmount: (v: string) => void;
  onDate: (v: string) => void;
}) {
  return (
    <div className="invoice-payment-row">
      <span className="charge-label" style={{ minWidth: 88 }}>{label}</span>
      <input className="charge-input" style={{ flex: 1 }} value={amount} onChange={e => onAmount(e.target.value)} />
      <input className="field-input field-input-sm" type="date" style={{ width: 130 }} value={date} onChange={e => onDate(e.target.value)} />
    </div>
  );
}
