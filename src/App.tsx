/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactNode } from 'react';
import {
  Search, Bell, History, HelpCircle, User,
  LayoutDashboard, Car, TrendingUp, DraftingCompass,
  Settings2, Cloud, ChevronRight, Save, Gavel,
  ClipboardList, ListChecks, Image as ImageIcon,
  Zap, Shield, Plus, Eye, Pencil, Trash2, Filter,
  Download, ArrowUpDown, CheckCircle2, Clock, XCircle,
  Truck, ChevronDown, ChevronUp, MapPin, DollarSign, CalendarDays, PackageCheck,
} from 'lucide-react';

/* ── Dummy Data ─────────────────────────────────────── */
const VEHICLES = [
  { id: 1, make: 'Toyota', brand: 'Toyota', model: 'Land Cruiser', chassis: 'JZX100-0123456', year: 2021, fuel: 'Petrol', mileage: 45200, grade: 'A', status: 'Available', price: 4850000, country: 'Japan', color: 'Pearl White', stock: 'STK-0041' },
  { id: 2, make: 'Nissan', brand: 'Nissan', model: 'Patrol', chassis: 'Y62-0098712', year: 2022, fuel: 'Petrol', mileage: 28100, grade: 'A+', status: 'Reserved', price: 6200000, country: 'Japan', color: 'Midnight Black', stock: 'STK-0042' },
  { id: 3, make: 'Mitsubishi', brand: 'Mitsubishi', model: 'Pajero', chassis: 'V98W-0034521', year: 2020, fuel: 'Diesel', mileage: 62400, grade: 'B+', status: 'Sold', price: 3100000, country: 'Japan', color: 'Silver', stock: 'STK-0043' },
  { id: 4, make: 'Toyota', brand: 'Toyota', model: 'Hilux', chassis: 'GUN125-0087654', year: 2023, fuel: 'Diesel', mileage: 12300, grade: 'A+', status: 'Available', price: 3750000, country: 'Japan', color: 'White', stock: 'STK-0044' },
  { id: 5, make: 'Honda', brand: 'Honda', model: 'CR-V', chassis: 'RW1-0056432', year: 2021, fuel: 'Petrol', mileage: 38700, grade: 'A', status: 'Available', price: 2900000, country: 'Japan', color: 'Dark Blue', stock: 'STK-0045' },
  { id: 6, make: 'Lexus', brand: 'Lexus', model: 'LX 570', chassis: 'URJ201-0021987', year: 2022, fuel: 'Petrol', mileage: 19400, grade: 'A+', status: 'Reserved', price: 9400000, country: 'Japan', color: 'Black', stock: 'STK-0046' },
  { id: 7, make: 'Isuzu', brand: 'Isuzu', model: 'D-Max', chassis: 'TFR85-0043219', year: 2020, fuel: 'Diesel', mileage: 74100, grade: 'B', status: 'Sold', price: 1850000, country: 'Japan', color: 'White', stock: 'STK-0047' },
  { id: 8, make: 'Suzuki', brand: 'Suzuki', model: 'Jimny', chassis: 'JB74W-0011234', year: 2023, fuel: 'Petrol', mileage: 5200, grade: 'A+', status: 'Available', price: 2200000, country: 'Japan', color: 'Jungle Green', stock: 'STK-0048' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string; icon: ReactNode }> = {
  Available: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', icon: <CheckCircle2 style={{ width: 11, height: 11 }} /> },
  Reserved:  { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: <Clock style={{ width: 11, height: 11 }} /> },
  Sold:      { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: <XCircle style={{ width: 11, height: 11 }} /> },
};

/* Transport status styles */
const T_STATUS: Record<string, { bg: string; color: string; border: string }> = {
  'Delivered':   { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  'In Transit':  { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  'Pending':     { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  'Awaiting':    { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
};

/* Transport dummy data — multiple per vehicle */
const TRANSPORTS: Record<number, { id: number; transporter: string; deliveryYard: string; yardInDate: string; cost: number; status: string; notes: string }[]> = {
  1: [
    { id: 101, transporter: 'Al Futtaim Logistics', deliveryYard: 'Jebel Ali Free Zone', yardInDate: '2024-02-10', cost: 45000, status: 'Delivered', notes: 'Delivered on schedule' },
    { id: 102, transporter: 'GAC Shipping', deliveryYard: 'Dubai Auto Yard - Block C', yardInDate: '2024-02-18', cost: 12500, status: 'Delivered', notes: 'Final delivery to showroom' },
  ],
  2: [
    { id: 201, transporter: 'Nippon Express', deliveryYard: 'Nagoya Port Terminal', yardInDate: '2024-03-05', cost: 28000, status: 'Delivered', notes: 'Port clearance complete' },
    { id: 202, transporter: 'Emirates Shipping', deliveryYard: 'Port Rashid Yard B', yardInDate: '2024-03-22', cost: 18500, status: 'In Transit', notes: 'ETA 3 days' },
  ],
  3: [
    { id: 301, transporter: 'Kintetsu World Express', deliveryYard: 'Osaka Export Terminal', yardInDate: '2023-11-14', cost: 31000, status: 'Delivered', notes: '' },
    { id: 302, transporter: 'DSV Logistics', deliveryYard: 'Khalifa Port Yard', yardInDate: '2023-12-01', cost: 14200, status: 'Delivered', notes: 'Delivered to buyer directly' },
    { id: 303, transporter: 'Al Jadeed Transport', deliveryYard: 'Mussafah Industrial Area', yardInDate: '2023-12-09', cost: 8000, status: 'Delivered', notes: 'Final mile delivery' },
  ],
  4: [
    { id: 401, transporter: 'NYK Logistics', deliveryYard: 'Yokohama Export Dock', yardInDate: '2024-01-20', cost: 22000, status: 'Delivered', notes: '' },
    { id: 402, transporter: 'Gulf Freight Solutions', deliveryYard: 'Jebel Ali - Gate 4 Yard', yardInDate: '2024-02-07', cost: 16800, status: 'Pending', notes: 'Awaiting customs release' },
  ],
  5: [
    { id: 501, transporter: 'Hitachi Transport', deliveryYard: 'Kobe Port - Bay 7', yardInDate: '2024-01-08', cost: 19500, status: 'Delivered', notes: 'Shipped with groupage' },
  ],
  6: [
    { id: 601, transporter: 'Maersk Line', deliveryYard: 'Tokyo-Oi Terminal', yardInDate: '2024-04-02', cost: 55000, status: 'In Transit', notes: 'Container on vessel MV Atlas' },
    { id: 602, transporter: 'Emirates SkyCargo Road', deliveryYard: 'Dubai South Logistics Park', yardInDate: '2024-04-20', cost: 22000, status: 'Awaiting', notes: 'Booked - awaiting arrival' },
  ],
  7: [
    { id: 701, transporter: 'Yamato Transport', deliveryYard: 'Fukuoka Harbour Yard', yardInDate: '2023-10-05', cost: 17000, status: 'Delivered', notes: '' },
    { id: 702, transporter: 'Sharjah Shipping Agency', deliveryYard: 'Port Khalid - Zone A', yardInDate: '2023-10-28', cost: 11500, status: 'Delivered', notes: '' },
  ],
  8: [
    { id: 801, transporter: 'MOL Logistics', deliveryYard: 'Nagoya Export Terminal 2', yardInDate: '2024-03-15', cost: 24500, status: 'In Transit', notes: 'Vessel departed, ETA 12 days' },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [view, setView] = useState<'list' | 'form'>('list');
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = VEHICLES.filter(v =>
    `${v.make} ${v.model} ${v.chassis} ${v.stock}`.toLowerCase().includes(search.toLowerCase())
  );
  const counts = { total: VEHICLES.length, available: VEHICLES.filter(v => v.status === 'Available').length, reserved: VEHICLES.filter(v => v.status === 'Reserved').length, sold: VEHICLES.filter(v => v.status === 'Sold').length };
  const totalTransports = Object.values(TRANSPORTS).reduce((s, a) => s + a.length, 0);

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── Top Bar ───────────────────────────────────────── */}
      <header className="topbar">
        {/* Brand + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="topbar-brand">
            <div className="topbar-logo">
              <Gavel style={{ width: 15, height: 15, color: '#fff' }} />
            </div>
            <div>
              <div className="topbar-title">Auction OS</div>
              <div className="topbar-subtitle">Inventory Suite</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />

          <div className="topbar-search-wrap">
            <Search style={{
              position: 'absolute', left: 10,
              width: 14, height: 14, color: '#94a3b8',
              pointerEvents: 'none',
            }} />
            <input
              className="topbar-search"
              placeholder="Search chassis, stock ID…"
              type="text"
            />
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div className="status-pill">
            <div className="status-dot" />
            Live
          </div>

          <div style={{ width: 8 }} />

          <button className="topbar-icon-btn" title="Notifications">
            <Bell style={{ width: 16, height: 16 }} />
          </button>
          <button className="topbar-icon-btn" title="History">
            <History style={{ width: 16, height: 16 }} />
          </button>
          <button className="topbar-icon-btn" title="Help">
            <HelpCircle style={{ width: 16, height: 16 }} />
          </button>

          <div className="topbar-avatar" title="Account">
            <User style={{ width: 15, height: 15, color: '#fff' }} />
          </div>
        </div>
      </header>

      {/* ── Sidebar ──────────────────────────────────────── */}
      <nav className="sidebar">
        <div className="sidebar-section-label">Main Menu</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavLink
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavLink
            icon={<Car />}
            label="Inventory"
            active={activeTab === 'inventory'}
            onClick={() => setActiveTab('inventory')}
          />
          <NavLink
            icon={<TrendingUp />}
            label="Auction Intel"
            active={activeTab === 'intel'}
            onClick={() => setActiveTab('intel')}
          />
          <NavLink
            icon={<DraftingCompass />}
            label="Engineering"
            active={activeTab === 'eng'}
            onClick={() => setActiveTab('eng')}
          />
          <NavLink
            icon={<Settings2 />}
            label="Mechanical"
            active={activeTab === 'mech'}
            onClick={() => setActiveTab('mech')}
          />
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-row">
            <div className="sidebar-status-icon">
              <Cloud style={{ width: 13, height: 13, color: '#16a34a' }} />
            </div>
            <div>
              <div className="sidebar-footer-title">Systems OK</div>
              <div className="sidebar-footer-sub">v2.0.48 · All services up</div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="main-content">

        {view === 'list' ? (
          /* ════ INVENTORY LIST VIEW ════ */
          <>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div className="page-eyebrow"><span>Inventory</span></div>
                <h1 className="page-title">Vehicle Inventory</h1>
                <p className="page-subtitle">{counts.total} vehicles tracked across all auctions.</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost" style={{ color: '#475569', borderColor: '#e2e8f0' }}>
                  <Download style={{ width: 14, height: 14 }} /> Export
                </button>
                <button className="btn btn-primary" onClick={() => setView('form')}>
                  <Plus style={{ width: 14, height: 14 }} /> New Entry
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 20 }}>
              {[
                { label: 'Total Vehicles', value: counts.total,       color: '#1d4ed8', border: '#dbeafe' },
                { label: 'Available',      value: counts.available,   color: '#16a34a', border: '#bbf7d0' },
                { label: 'Reserved',       value: counts.reserved,    color: '#d97706', border: '#fde68a' },
                { label: 'Sold',           value: counts.sold,        color: '#dc2626', border: '#fecaca' },
                { label: 'Transports',     value: totalTransports,    color: '#7c3aed', border: '#ddd6fe' },
              ].map(s => (
                <div key={s.label} style={{
                  background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
                  padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  borderLeft: `3px solid ${s.color}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Table card */}
            <div className="audit-card">
              {/* Table toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
                  <Search style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#94a3b8' }} />
                  <input
                    style={{ width: '100%', height: 32, paddingLeft: 30, paddingRight: 10, border: '1px solid #e2e8f0', borderRadius: 7, fontSize: 12.5, fontFamily: 'inherit', outline: 'none', color: '#0f172a', background: '#f8fafc' }}
                    placeholder="Search vehicles…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button className="topbar-icon-btn" title="Filter" style={{ border: '1px solid #e2e8f0', borderRadius: 7 }}>
                  <Filter style={{ width: 14, height: 14 }} />
                </button>
                <button className="topbar-icon-btn" title="Sort" style={{ border: '1px solid #e2e8f0', borderRadius: 7 }}>
                  <ArrowUpDown style={{ width: 14, height: 14 }} />
                </button>
                <span style={{ fontSize: 11.5, color: '#94a3b8', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      {['', 'Stock ID','Make / Model','Chassis No.','Year','Fuel','Mileage','Grade','Price (¥)','Status','Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v, i) => {
                      const s = STATUS_STYLE[v.status];
                      const transports = TRANSPORTS[v.id] ?? [];
                      const isExpanded = expandedRow === v.id;
                      const rowBg = i % 2 === 1 ? '#fafcff' : '#fff';
                      return (
                        <React.Fragment key={v.id}>
                          {/* Main vehicle row */}
                          <tr style={{ borderBottom: isExpanded ? 'none' : '1px solid #f1f5f9', background: isExpanded ? '#f0f6ff' : rowBg, transition: 'background 0.12s' }}
                            onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = '#f0f6ff'; }}
                            onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = rowBg; }}
                          >
                            {/* Expand toggle */}
                            <td style={{ padding: '12px 8px 12px 16px', width: 36 }}>
                              <button
                                onClick={() => setExpandedRow(isExpanded ? null : v.id)}
                                title={isExpanded ? 'Collapse transports' : `View ${transports.length} transport(s)`}
                                style={{
                                  width: 24, height: 24, borderRadius: 6, border: '1px solid #e2e8f0',
                                  background: isExpanded ? '#1d4ed8' : '#f8fafc',
                                  color: isExpanded ? '#fff' : '#64748b',
                                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  transition: 'all 0.15s', position: 'relative',
                                }}
                              >
                                {isExpanded
                                  ? <ChevronUp style={{ width: 12, height: 12 }} />
                                  : <ChevronDown style={{ width: 12, height: 12 }} />
                                }
                                {/* transport count badge */}
                                {!isExpanded && transports.length > 0 && (
                                  <span style={{
                                    position: 'absolute', top: -5, right: -5,
                                    width: 14, height: 14, borderRadius: '50%',
                                    background: '#7c3aed', color: '#fff',
                                    fontSize: 8, fontWeight: 700,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  }}>{transports.length}</span>
                                )}
                              </button>
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1d4ed8', fontFamily: 'monospace', fontSize: 12 }}>{v.stock}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{v.make} {v.model}</div>
                              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{v.color}</div>
                            </td>
                            <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#334155', fontSize: 11.5 }}>{v.chassis}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{v.year}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{v.fuel}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{v.mileage.toLocaleString()} km</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, background: '#eff6ff', border: '1px solid #dbeafe', fontWeight: 800, fontSize: 12, color: '#1d4ed8' }}>{v.grade}</span>
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>¥{v.price.toLocaleString()}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 100, background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: 11, fontWeight: 600 }}>
                                {s.icon}{v.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ display: 'flex', gap: 4 }}>
                                <button className="topbar-icon-btn" title="View" style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0' }}><Eye style={{ width: 13, height: 13 }} /></button>
                                <button className="topbar-icon-btn" title="Edit" style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0' }} onClick={() => setView('form')}><Pencil style={{ width: 13, height: 13 }} /></button>
                                <button className="topbar-icon-btn" title="Delete" style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #fee2e2', color: '#dc2626' }}><Trash2 style={{ width: 13, height: 13 }} /></button>
                              </div>
                            </td>
                          </tr>

                          {/* Transport sub-rows (expanded) */}
                          {isExpanded && (
                            <tr>
                              <td colSpan={11} style={{ padding: 0, background: '#f8faff', borderBottom: '2px solid #dbeafe' }}>
                                {/* Transport section header */}
                                <div style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '10px 24px 10px 56px',
                                  borderBottom: '1px solid #e8eeff',
                                  background: '#eef3ff',
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Truck style={{ width: 13, height: 13, color: '#4f46e5' }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#4f46e5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                      Transports — {v.make} {v.model} ({v.stock})
                                    </span>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: '#7c3aed', background: '#ede9fe', border: '1px solid #ddd6fe', padding: '1px 7px', borderRadius: 100 }}>
                                      {transports.length} record{transports.length !== 1 ? 's' : ''}
                                    </span>
                                  </div>
                                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', border: '1px solid #c7d2fe', borderRadius: 6, background: '#fff', color: '#4f46e5', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                                    <Plus style={{ width: 11, height: 11 }} /> Add Transport
                                  </button>
                                </div>

                                {/* Transport table */}
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                                  <thead>
                                    <tr style={{ background: '#eef3ff', borderBottom: '1px solid #e0e7ff' }}>
                                      {[
                                        { label: '#', icon: null },
                                        { label: 'Transporter', icon: <Truck style={{ width: 10, height: 10 }} /> },
                                        { label: 'Delivery Yard', icon: <MapPin style={{ width: 10, height: 10 }} /> },
                                        { label: 'Yard In Date', icon: <CalendarDays style={{ width: 10, height: 10 }} /> },
                                        { label: 'Cost', icon: <DollarSign style={{ width: 10, height: 10 }} /> },
                                        { label: 'Status', icon: <PackageCheck style={{ width: 10, height: 10 }} /> },
                                        { label: 'Notes', icon: null },
                                        { label: '', icon: null },
                                      ].map(col => (
                                        <th key={col.label} style={{ padding: '8px 16px 8px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#6366f1', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingLeft: col.label === '#' ? 56 : 16 }}>
                                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{col.icon}{col.label}</span>
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {transports.map((t, ti) => {
                                      const ts = T_STATUS[t.status] ?? T_STATUS['Awaiting'];
                                      return (
                                        <tr key={t.id} style={{ borderBottom: ti < transports.length - 1 ? '1px solid #e8eeff' : 'none', background: ti % 2 === 0 ? '#f8faff' : '#fff', transition: 'background 0.1s' }}
                                          onMouseEnter={e => (e.currentTarget.style.background = '#eef3ff')}
                                          onMouseLeave={e => (e.currentTarget.style.background = ti % 2 === 0 ? '#f8faff' : '#fff')}
                                        >
                                          <td style={{ padding: '10px 16px 10px 56px', fontSize: 11, color: '#94a3b8', fontWeight: 600, width: 56 }}>T{ti + 1}</td>
                                          <td style={{ padding: '10px 16px' }}>
                                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{t.transporter}</div>
                                          </td>
                                          <td style={{ padding: '10px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                              <MapPin style={{ width: 11, height: 11, color: '#94a3b8', flexShrink: 0 }} />
                                              <span style={{ color: '#334155', fontWeight: 500 }}>{t.deliveryYard}</span>
                                            </div>
                                          </td>
                                          <td style={{ padding: '10px 16px', color: '#475569', fontFamily: 'monospace', fontSize: 11.5 }}>{t.yardInDate}</td>
                                          <td style={{ padding: '10px 16px', fontWeight: 700, color: '#0f172a' }}>
                                            ¥{t.cost.toLocaleString()}
                                          </td>
                                          <td style={{ padding: '10px 16px' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 100, background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color, fontSize: 11, fontWeight: 600 }}>
                                              {t.status}
                                            </span>
                                          </td>
                                          <td style={{ padding: '10px 16px', color: '#64748b', fontSize: 11.5, fontStyle: t.notes ? 'normal' : 'italic', maxWidth: 220 }}>
                                            {t.notes || '—'}
                                          </td>
                                          <td style={{ padding: '10px 16px' }}>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                              <button className="topbar-icon-btn" style={{ width: 26, height: 26, borderRadius: 5, border: '1px solid #e2e8f0' }}><Pencil style={{ width: 11, height: 11 }} /></button>
                                              <button className="topbar-icon-btn" style={{ width: 26, height: 26, borderRadius: 5, border: '1px solid #fee2e2', color: '#dc2626' }}><Trash2 style={{ width: 11, height: 11 }} /></button>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>

                                {/* Transport cost total */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px', borderTop: '1px solid #e0e7ff', background: '#eef3ff' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Transport Cost:</span>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#1e293b' }}>
                                      ¥{transports.reduce((s, t) => s + t.cost, 0).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>Showing {filtered.length} of {counts.total} entries</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['Prev','1','2','Next'].map(p => (
                    <button key={p} style={{ height: 30, minWidth: 30, padding: '0 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: p === '1' ? '#1d4ed8' : '#fff', color: p === '1' ? '#fff' : '#475569', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ════ NEW ENTRY FORM VIEW ════ */
          <>
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div className="page-eyebrow">
                  <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1d4ed8', fontWeight: 600, fontSize: 12, padding: 0, fontFamily: 'inherit' }}>Inventory</button>
                  <ChevronRight style={{ width: 12, height: 12 }} />
                  <span>New Entry</span>
                </div>
                <h1 className="page-title">Auction → Order → Vehicle</h1>
                <p className="page-subtitle">Form layout mirrors the database: auctions, orders, vehicles, and vehicle_details.</p>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button className="btn btn-ghost" onClick={() => setView('list')}>Cancel</button>
                <button className="btn btn-primary"><Save style={{ width: 14, height: 14 }} />Save Entry</button>
              </div>
            </div>

        {/* ── Auctions + Orders (side-by-side) ─────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Auctions Card */}
          <div className="form-card">
            <div className="form-section">
              <div className="form-section-header">
                <div className="form-section-icon">
                  <Gavel style={{ width: 14, height: 14, color: '#1d4ed8' }} />
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

          {/* Orders Card */}
          <div className="form-card">
            <div className="form-section">
              <div className="form-section-header">
                <div className="form-section-icon">
                  <ClipboardList style={{ width: 14, height: 14, color: '#1d4ed8' }} />
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

        {/* ── Vehicles Card ─────────────────────────────── */}
        <div className="form-card" style={{ marginBottom: 16 }}>
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon">
                <Car style={{ width: 14, height: 14, color: '#1d4ed8' }} />
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

        {/* ── Vehicle Details Card ──────────────────────── */}
        <div className="form-card" style={{ marginBottom: 24 }}>
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon">
                <ListChecks style={{ width: 14, height: 14, color: '#1d4ed8' }} />
              </div>
              <span className="form-section-title">Vehicle Details</span>
              <span className="form-section-tag">vehicle_details</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="field-label">Vehicle ID (FK)</label>
              <input className="field-input" type="number" placeholder="Parent vehicle id" style={{ maxWidth: 220 }} />
            </div>

            {/* Equipment flags */}
            <div style={{ marginBottom: 24 }}>
              <div className="flags-heading">
                <Zap style={{ width: 12, height: 12 }} />
                Equipment Flags
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: 8,
              }}>
                {['Airbag', 'ABS', 'Air Condition', 'Power Mirror', 'Power Steering', 'Power Window', 'Rear Wiper', 'Sun Roof', 'Stereo'].map(flag => (
                  <label key={flag} className="check-pill">
                    <input type="checkbox" />
                    {flag}
                  </label>
                ))}
              </div>
            </div>

            {/* Horizontal rule */}
            <div style={{ height: 1, background: '#f1f5f9', margin: '0 -28px 24px' }} />

            {/* Detail fields */}
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

            {/* Image fields */}
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
                <textarea
                  className="field-input"
                  style={{ minHeight: 68 }}
                  placeholder="JSON or newline-separated URLs"
                />
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

        {/* ── Transport Records ──────────────────────────── */}
        <div className="form-card" style={{ marginBottom: 16 }}>
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon" style={{ background: '#ede9fe', border: '1px solid #ddd6fe' }}>
                <Truck style={{ width: 14, height: 14, color: '#7c3aed' }} />
              </div>
              <span className="form-section-title">Transport Records</span>
              <span className="form-section-tag" style={{ color: '#7c3aed', background: '#ede9fe', borderColor: '#ddd6fe' }}>transports</span>
              <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 8 }}>One order can have multiple transport legs</span>
            </div>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 140px 120px 1fr 36px', gap: 10, marginBottom: 8, padding: '0 4px' }}>
              {['Transporter', 'Delivery Yard', 'Yard In Date', 'Cost (¥)', 'Status', ''].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
              ))}
            </div>

            {/* Default 2 transport rows */}
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
                <button style={{ width: 32, height: 32, flexShrink: 0, border: '1px solid #fee2e2', borderRadius: 7, background: '#fef2f2', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 style={{ width: 13, height: 13 }} />
                </button>
              </div>
            ))}

            {/* Add row button */}
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', border: '1.5px dashed #c7d2fe', borderRadius: 8, background: 'transparent', color: '#6366f1', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4, transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#eef2ff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <Plus style={{ width: 13, height: 13 }} /> Add Another Transport Leg
            </button>
          </div>
        </div>

        {/* ── Audit Trail ───────────────────────────────── */}
        <div className="audit-card">
          <div className="audit-card-header">
            <Shield style={{ width: 13, height: 13, color: '#64748b' }} />
            Audit Trail
          </div>
          <AuditRow
            label="System initialized ledger record"
            time="2023-11-24 09:12:44"
            dotColor="#94a3b8"
          />
          <AuditRow
            label={<span>Chassis validation: <span style={{ color: '#16a34a', fontWeight: 700 }}>SUCCESS</span></span>}
            time="2023-11-24 09:12:45"
            dotColor="#1d4ed8"
            highlight
          />
        </div>

        </> /* end form view */
        )} {/* end ternary */}

      </main>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function NavLink({ icon, label, active, onClick }: {
  icon: ReactNode; label: string; active?: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={`nav-link${active ? ' active' : ''}`}>
      <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function FlagCheckbox({ label }: { label: string }) {
  return (
    <label className="check-pill">
      <input type="checkbox" />
      {label}
    </label>
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
