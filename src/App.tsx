/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import {
  Search,
  Bell,
  History,
  HelpCircle,
  User,
  LayoutDashboard,
  Car,
  TrendingUp,
  DraftingCompass,
  Settings2,
  Cloud,
  ChevronRight,
  Save,
  Gavel,
  ClipboardList,
  ListChecks,
  Image as ImageIcon,
  Zap,
  Shield,
  Activity,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');

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

        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div className="page-eyebrow">
              <span>Inventory</span>
              <ChevronRight style={{ width: 12, height: 12 }} />
              <a href="#">New Entry</a>
            </div>
            <h1 className="page-title">Auction → Order → Vehicle</h1>
            <p className="page-subtitle">
              Form layout mirrors the database: auctions, orders, vehicles, and vehicle_details.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button className="btn btn-ghost">Delete Draft</button>
            <button className="btn btn-primary">
              <Save style={{ width: 14, height: 14 }} />
              Save Entry
            </button>
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
                  <FlagCheckbox key={flag} label={flag} />
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
