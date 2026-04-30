import React, { useState } from 'react';
import {
  Search, Plus, Download, FileText, Filter, ArrowUpDown,
  MoreHorizontal, Eye, Pencil, Trash2, X, Save,
  Car, Calendar, Gauge, Settings, Users, Fuel,
  MapPin, DollarSign, CheckCircle2, ChevronRight,
  Monitor, Shield, Wind, Zap, Layers
} from 'lucide-react';

interface UsedVehicle {
  id: string;
  model: string;
  yearMonth: string;
  mileage: number;
  grade: string;
  drive: string;
  seats: number;
  fuel: string;
  color: string;
  country: string;
  price: number;
  description: string;
  features: string[]; // ['AB', 'ABS', 'AC', 'PW', 'PS']
}

const DUMMY_USED: UsedVehicle[] = [
  { id: '32777', model: 'TOYOTA LAND CRUISER', yearMonth: '2024/3', mileage: 35, grade: 'A', drive: '4', seats: 5, fuel: 'Petrol', color: 'PEARL WHITE', country: 'Sri Lanka', price: 16500000, description: 'High grade luxury SUV', features: ['AB', 'ABS', 'AC', 'PW', 'PS', 'SR'] },
  { id: '32776', model: 'NISSAN PATROL', yearMonth: '2023/10', mileage: 1200, grade: 'A+', drive: '4', seats: 7, fuel: 'Diesel', color: 'BLACK', country: 'Japan', price: 15200000, description: 'Brand new condition', features: ['AB', 'ABS', 'AC', 'PW', 'SR', 'TV'] },
  { id: '32775', model: 'DAIHATSU MIRA', yearMonth: '2024/3', mileage: 35, grade: 'A', drive: '2', seats: 4, fuel: 'Petrol', color: 'SILVER', country: 'Sri Lanka', price: 677000, description: 'Compact fuel efficient car', features: ['AB', 'ABS', 'AC'] },
  { id: '32774', model: 'TOYOTA RAIZE', yearMonth: '2022/7', mileage: 7500, grade: 'A', drive: '2', seats: 5, fuel: 'Hybrid', color: 'BLACK', country: 'Sri Lanka', price: 1680000, description: 'Modern compact SUV', features: ['AB', 'ABS', 'AC', 'PW', 'PS'] },
  { id: '32773', model: 'VW T-CROSS', yearMonth: '2023/10', mileage: 1500, grade: 'A', drive: '2', seats: 5, fuel: 'Petrol', color: 'GRAY', country: 'Sri Lanka', price: 2787000, description: 'European styling', features: ['AB', 'ABS', 'AC', 'SR'] },
  { id: '32772', model: 'HONDA VEZEL', yearMonth: '2024/1', mileage: 100, grade: 'A', drive: '2', seats: 5, fuel: 'Hybrid', color: 'PEARL', country: 'Sri Lanka', price: 2880000, description: 'Popular hybrid SUV', features: ['AB', 'ABS', 'AC', 'PW', 'PS', 'RW'] },
];

export default function UsedVehiclesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="used-vehicles-page">
      {/* ── Page Header ──────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="page-eyebrow">Orders</div>
          <h1 className="page-title">Used Vehicles</h1>
          <p className="page-subtitle">Inventory of all added vehicle entries and their specifications.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline">
            <Download style={{ width: 14, height: 14 }} /> Export CSV
          </button>
          <button className="btn btn-primary">
            <Plus style={{ width: 14, height: 14 }} /> Add New Entry
          </button>
        </div>
      </div>

      {/* ── Stats Bar ────────────────────────────── */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <StatCard icon={<Car />} label="Total Entries" value="50,197" color="#1d4ed8" />
        <StatCard icon={<Layers />} label="Sri Lanka Stock" value="32,450" color="#16a34a" />
        <StatCard icon={<MapPin />} label="Japan Stock" value="17,747" color="#ea580c" />
      </div>

      {/* ── Search & Filter ──────────────────────── */}
      <div className="audit-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
            <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#94a3b8' }} />
            <input
              className="field-input"
              style={{ paddingLeft: 34 }}
              placeholder="Search Order ID, Model, Fuel, Color..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-sm btn-ghost">
            <Filter style={{ width: 14, height: 14 }} /> Advanced Filter
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
             <button className="btn-sm btn-outline">Sri Lanka</button>
             <button className="btn-sm btn-ghost">Japan</button>
          </div>
        </div>
      </div>

      {/* ── Main Data Table ──────────────────────── */}
      <div className="audit-card" style={{ overflowX: 'auto' }}>
        <table className="used-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Model</th>
              <th>Year/Month</th>
              <th>KM</th>
              <th>G/D/S</th>
              <th>Fuel</th>
              <th>Features</th>
              <th>Color</th>
              <th>Country</th>
              <th style={{ textAlign: 'right' }}>Price (YEN)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_USED.map(v => (
              <tr key={v.id}>
                <td style={{ fontWeight: 700, color: '#1d4ed8' }}>{v.id}</td>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{v.model}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>CHASSIS READY</div>
                </td>
                <td>{v.yearMonth}</td>
                <td>{v.mileage.toLocaleString()}</td>
                <td>
                   <div style={{ display: 'flex', gap: 4 }}>
                      <span className="mini-badge">{v.grade}</span>
                      <span className="mini-badge" style={{ background: '#f1f5f9' }}>{v.drive}</span>
                      <span className="mini-badge" style={{ background: '#f1f5f9' }}>{v.seats}</span>
                   </div>
                </td>
                <td>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{v.fuel}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: 100 }}>
                    {v.features.slice(0, 3).map(f => (
                      <div key={f} className="feature-dot" title={f}>{f}</div>
                    ))}
                    {v.features.length > 3 && (
                      <div className="feature-dot" style={{ background: '#f1f5f9', color: '#64748b' }}>+{v.features.length - 3}</div>
                    )}
                  </div>
                </td>
                <td>{v.color}</td>
                <td>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin style={{ width: 10, height: 10, color: '#94a3b8' }} />
                      {v.country}
                   </div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                  {v.price.toLocaleString()}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="icon-btn-sm"><Pencil style={{ width: 12, height: 12 }} /></button>
                    <button className="icon-btn-sm"><Trash2 style={{ width: 12, height: 12, color: '#dc2626' }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: 16, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ fontSize: 12, color: '#64748b' }}>Showing 1 to 6 of 50,197 entries</div>
           <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn-sm btn-outline">Prev</button>
              <button className="btn-sm btn-primary">1</button>
              <button className="btn-sm btn-ghost">2</button>
              <button className="btn-sm btn-ghost">3</button>
              <button className="btn-sm btn-outline">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="audit-card" style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
       <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.cloneElement(icon, { style: { width: 20, height: 20 } })}
       </div>
       <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{value}</div>
       </div>
    </div>
  );
}
