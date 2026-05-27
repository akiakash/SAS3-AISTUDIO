/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { Routes, Route, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, Bell, History, HelpCircle, User,
  LayoutDashboard, Car, TrendingUp, DraftingCompass,
  Settings2, Cloud, ChevronRight, ClipboardList,
  Plus, Eye, Pencil, Trash2, Filter,
  Download, ArrowUpDown, CheckCircle2, Clock, XCircle,
  Truck, ChevronDown, ChevronUp, MapPin, DollarSign, CalendarDays, PackageCheck,
  Layers,
} from 'lucide-react';
import ManagePage from './ManagePage';
import InvoicesPage from './InvoicesPage';
import UsedVehiclesPage from './UsedVehiclesPage';
import InventoryNewPage from './InventoryNewPage';
import Sas3Logo from './Sas3Logo';
import { VEHICLES } from './vehicleData';

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string; icon: ReactNode }> = {
  Available: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', icon: <CheckCircle2 style={{ width: 11, height: 11 }} /> },
  Reserved:  { bg: '#fffbeb', color: '#d97706', border: '#fde68a', icon: <Clock style={{ width: 11, height: 11 }} /> },
  Sold:      { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: <XCircle style={{ width: 11, height: 11 }} /> },
};

/* Transport status styles */
const T_STATUS: Record<string, { bg: string; color: string; border: string }> = {
  'Delivered':   { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  'In Transit':  { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  'Pending':     { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  'Awaiting':    { bg: '#f4f5f7', color: '#6b778c', border: '#dfe1e6' },
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
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname.startsWith('/vehicles')) {
      setExpandedNav('vehicles');
    } else if (location.pathname.startsWith('/orders')) {
      setExpandedNav('orders');
    }
  }, [location.pathname]);

  const filtered = VEHICLES.filter(v =>
    `${v.make} ${v.model} ${v.chassis} ${v.stock}`.toLowerCase().includes(search.toLowerCase())
  );
  const counts = { total: VEHICLES.length, available: VEHICLES.filter(v => v.status === 'Available').length, reserved: VEHICLES.filter(v => v.status === 'Reserved').length, sold: VEHICLES.filter(v => v.status === 'Sold').length };
  const totalTransports = Object.values(TRANSPORTS).reduce((s, a) => s + a.length, 0);

  return (
    <div style={{ minHeight: '100vh' }}>


      {/* ── Sidebar ──────────────────────────────────────── */}
      <nav className="sidebar">
        <div className="sidebar-brand">
          <Sas3Logo className="sidebar-logo-img" height={30} />
          <p className="sidebar-brand-tag">Inventory Suite</p>
        </div>

        <div className="sidebar-section-label">Main Menu</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SidebarNavLink
            icon={<LayoutDashboard />}
            label="Dashboard"
            to="/dashboard"
          />

        </div>

        <div className="sidebar-section-label" style={{ marginTop: 20 }}>Vehicles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavGroup
            icon={<Car />}
            label="Vehicles"
            expanded={expandedNav === 'vehicles'}
            onToggle={() => setExpandedNav(expandedNav === 'vehicles' ? null : 'vehicles')}
          >
            <SidebarSubNavLink
              label="Manage"
              to="/vehicles/manage"
            />
          </NavGroup>
        </div>

        <div className="sidebar-section-label" style={{ marginTop: 20 }}>Orders</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavGroup
            icon={<ClipboardList />}
            label="Orders"
            expanded={expandedNav === 'orders'}
            onToggle={() => setExpandedNav(expandedNav === 'orders' ? null : 'orders')}
          >
            <SidebarSubNavLink
              label="Inventory"
              to="/orders/inventory"
            />
            <SidebarSubNavLink
              label="Invoice"
              to="/orders/invoice"
            />
            <SidebarSubNavLink
              label="Used Vehicles"
              to="/orders/used-vehicles"
            />
          </NavGroup>
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

      <main className="main-content">

        <Routes>
          <Route path="/" element={<Navigate to="/orders/inventory" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles/manage" element={<ManagePage />} />
          <Route path="/orders/invoice" element={<InvoicesPage />} />
          <Route path="/orders/used-vehicles" element={<UsedVehiclesPage />} />
          <Route
            path="/orders/inventory"
            element={
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
                <button className="btn btn-primary" onClick={() => navigate('/orders/inventory/new')}>
                  <Plus style={{ width: 14, height: 14 }} /> New Entry
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 20 }}>
              {[
                { label: 'Total Vehicles', value: counts.total,       color: '#2563eb', border: '#bfdbfe' },
                { label: 'Available',      value: counts.available,   color: '#36b37e', border: '#bbf7d0' },
                { label: 'Reserved',       value: counts.reserved,    color: '#ffab00', border: '#fde68a' },
                { label: 'Sold',           value: counts.sold,        color: '#ff5630', border: '#fecaca' },
                { label: 'Transports',     value: totalTransports,    color: '#6554c0', border: '#ddd6fe' },
              ].map(s => (
                <div key={s.label} style={{
                  background: '#fff', border: '1px solid #ebecf0', borderRadius: 12,
                  padding: '16px 20px', boxShadow: 'none',
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
                  <Search style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#6b778c' }} />
                  <input
                    style={{ width: '100%', height: 32, paddingLeft: 30, paddingRight: 10, border: '1px solid #dfe1e6', borderRadius: 7, fontSize: 12.5, fontFamily: 'inherit', outline: 'none', color: '#172b4d', background: '#f4f5f7' }}
                    placeholder="Search vehicles…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button className="topbar-icon-btn" title="Filter" style={{ border: '1px solid #dfe1e6', borderRadius: 7 }}>
                  <Filter style={{ width: 14, height: 14 }} />
                </button>
                <button className="topbar-icon-btn" title="Sort" style={{ border: '1px solid #dfe1e6', borderRadius: 7 }}>
                  <ArrowUpDown style={{ width: 14, height: 14 }} />
                </button>
                <span style={{ fontSize: 11.5, color: '#94a3b8', marginLeft: 'auto' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ background: '#f4f5f7', borderBottom: '1px solid #ebecf0' }}>
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
                      const rowBg = i % 2 === 1 ? '#fafbfc' : '#fff';
                      return (
                        <React.Fragment key={v.id}>
                          {/* Main vehicle row */}
                          <tr style={{ borderBottom: isExpanded ? 'none' : '1px solid #f4f5f7', background: isExpanded ? '#f0f6f7' : rowBg, transition: 'background 0.12s' }}
                            onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = '#f0f6f7'; }}
                            onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = rowBg; }}
                          >
                            {/* Expand toggle */}
                            <td style={{ padding: '12px 8px 12px 16px', width: 36 }}>
                              <button
                                onClick={() => setExpandedRow(isExpanded ? null : v.id)}
                                title={isExpanded ? 'Collapse transports' : `View ${transports.length} transport(s)`}
                                style={{
                                  width: 24, height: 24, borderRadius: 6, border: '1px solid #e2e8f0',
                                  background: isExpanded ? '#2563eb' : '#f4f5f7',
                                  color: isExpanded ? '#fff' : '#6b778c',
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
                            <td style={{ padding: '12px 16px', fontWeight: 600, color: '#2563eb', fontFamily: 'monospace', fontSize: 12 }}>{v.stock}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{v.make} {v.model}</div>
                              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{v.color}</div>
                            </td>
                            <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#334155', fontSize: 11.5 }}>{v.chassis}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{v.year}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{v.fuel}</td>
                            <td style={{ padding: '12px 16px', color: '#475569' }}>{v.mileage.toLocaleString()} km</td>
                            <td style={{ padding: '12px 16px' }}>
                               <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, background: '#eff6ff', border: '1px solid #bfdbfe', fontWeight: 800, fontSize: 12, color: '#2563eb' }}>{v.grade}</span>
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>¥{v.price.toLocaleString()}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 100, background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: 11, fontWeight: 600 }}>
                                {s.icon}{v.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ display: 'flex', gap: 6 }}>
                                <button className="action-btn action-btn-view" title="View">
                                  <Eye style={{ width: 14, height: 14 }} />
                                </button>
                                <button className="action-btn action-btn-edit" title="Edit" onClick={() => navigate('/orders/inventory/new')}>
                                  <Pencil style={{ width: 14, height: 14 }} />
                                </button>
                                <button className="action-btn action-btn-delete" title="Delete">
                                  <Trash2 style={{ width: 14, height: 14 }} />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Transport sub-rows (expanded) */}
                          {isExpanded && (
                            <tr>
                              <td colSpan={11} style={{ padding: 0, background: '#f4f5f7', borderBottom: '2px solid #bfdbfe' }}>
                                {/* Transport section header */}
                                <div style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '10px 24px 10px 56px',
                                  borderBottom: '1px solid #e8eeff',
                                  background: '#eef3ff',
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Truck style={{ width: 13, height: 13, color: '#2563eb' }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                      Transports — {v.make} {v.model} ({v.stock})
                                    </span>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: '#7c3aed', background: '#ede9fe', border: '1px solid #ddd6fe', padding: '1px 7px', borderRadius: 100 }}>
                                      {transports.length} record{transports.length !== 1 ? 's' : ''}
                                    </span>
                                  </div>
                                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', border: '1px solid #bfdbfe', borderRadius: 6, background: '#fff', color: '#2563eb', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
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
                                            <div style={{ display: 'flex', gap: 6 }}>
                                              <button className="action-btn action-btn-edit" title="Edit">
                                                <Pencil style={{ width: 14, height: 14 }} />
                                              </button>
                                              <button className="action-btn action-btn-delete" title="Delete">
                                                <Trash2 style={{ width: 14, height: 14 }} />
                                              </button>
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
                    <button key={p} style={{ height: 30, minWidth: 30, padding: '0 10px', borderRadius: 6, border: '1px solid #ebecf0', background: p === '1' ? '#2563eb' : '#fff', color: p === '1' ? '#fff' : '#42526e', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </>
            }
          />
          <Route path="/orders/inventory/new/*" element={<InventoryNewPage />} />
        </Routes>

      </main>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function DashboardPage() {
  return (
    <>
      <div className="page-eyebrow"><span>Main Menu</span></div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview and quick actions for your inventory suite.</p>
    </>
  );
}

function SidebarNavLink({ icon, label, to }: {
  icon: ReactNode; label: string; to: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
    >
      <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
      {label}
    </NavLink>
  );
}

function NavGroup({ icon, label, expanded, onToggle, children }: {
  icon: ReactNode; label: string; expanded: boolean; onToggle: () => void; children: ReactNode;
}) {
  return (
    <div className="nav-group">
      <button onClick={onToggle} className={`nav-link nav-group-toggle${expanded ? ' expanded' : ''}`}>
        <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
        {label}
        <ChevronRight
          className="nav-group-chevron"
          style={{
            width: 13, height: 13,
            marginLeft: 'auto',
            transition: 'transform 0.2s ease',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            color: '#94a3b8',
          }}
        />
      </button>
      {expanded && (
        <div className="nav-group-children">
          {children}
        </div>
      )}
    </div>
  );
}

function SidebarSubNavLink({ label, to }: {
  label: string; to: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === '/orders/inventory'}
      className={({ isActive }) => `nav-sublink${isActive ? ' active' : ''}`}
    >
      <span className="nav-sublink-dot" />
      {label}
    </NavLink>
  );
}
