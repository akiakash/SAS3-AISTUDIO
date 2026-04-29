import React, { useState, ReactNode } from 'react';
import {
  Search, Filter, Download, ChevronLeft, ChevronRight,
  Eye, Pencil, Trash2, Upload, FileText, Image as ImageIcon,
  Tag, Receipt, LayoutList, LayoutGrid, Plus, X,
  Car, MapPin, Calendar, Fuel, Gauge, Hash, Palette, Settings2,
  Building2, Gavel, DollarSign, Globe, CheckCircle2, Clock, XCircle, AlertCircle,
  FileUp, MessageSquare, StickyNote, Layers,
} from 'lucide-react';

/* ── Extended Vehicle Data ──────────────────────────────── */
interface ManagedVehicle {
  id: number;
  stockNumber: string;
  company: string;
  stockLocation: string;
  mfgYearMonth: string;
  bodyColor: string;
  mileageKm: number;
  createdOn: string;
  chassis: string;
  engineCC: string;
  regYearMonth: string;
  transmission: string;
  fuelType: string;
  status: 'Now On Sale' | 'Deactive' | 'Sold' | 'Reserved';
  modelCode: string;
  purchasedFrom: string;
  auctionDate: string;
  lotNumber: string;
  auctionPrice: string;
  auctionPriceCurrency: string;
  auctionNumber: string;
  auctionSystem: string;
  views: number;
  inquiries: number;
  totalPrice: string;
  vehicleName: string;
  nowOnSaleLocations?: string[];
  image?: string;
}

const MANAGED_VEHICLES: ManagedVehicle[] = [
  {
    id: 1,
    stockNumber: 'SAS3-3777',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: '—',
    mfgYearMonth: '—',
    bodyColor: '—',
    mileageKm: 0,
    createdOn: '2026-04-29 15:12:45',
    chassis: '—',
    engineCC: '—',
    regYearMonth: '—',
    transmission: '—',
    fuelType: '—',
    status: 'Now On Sale',
    modelCode: '—',
    purchasedFrom: '—',
    auctionDate: '2026-04-29',
    lotNumber: '—',
    auctionPrice: '—',
    auctionPriceCurrency: '',
    auctionNumber: '—',
    auctionSystem: '—',
    views: 0,
    inquiries: 0,
    totalPrice: '—',
    vehicleName: 'NEW VEHICLE ENTRY',
  },
  {
    id: 2,
    stockNumber: 'SAS3-3776',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: '—',
    mfgYearMonth: '—',
    bodyColor: '—',
    mileageKm: 0,
    createdOn: '2026-04-28 16:16:34',
    chassis: '—',
    engineCC: '—',
    regYearMonth: '—',
    transmission: '—',
    fuelType: '—',
    status: 'Now On Sale',
    modelCode: '—',
    purchasedFrom: '—',
    auctionDate: '—',
    lotNumber: '—',
    auctionPrice: '—',
    auctionPriceCurrency: '',
    auctionNumber: '—',
    auctionSystem: '—',
    views: 0,
    inquiries: 0,
    totalPrice: '—',
    vehicleName: 'NEW VEHICLE ENTRY',
  },
  {
    id: 3,
    stockNumber: 'SAS3-3775',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: '—',
    mfgYearMonth: '2024',
    bodyColor: 'SILVER',
    mileageKm: 80100,
    createdOn: '2026-04-29 16:15:33',
    chassis: 'LA350S-0361108',
    engineCC: '—',
    regYearMonth: '2024/11',
    transmission: '—',
    fuelType: 'Petrol',
    status: 'Now On Sale',
    modelCode: 'DBA-LA605S',
    purchasedFrom: 'HA Osaka',
    auctionDate: '2026-04-26',
    lotNumber: '88',
    auctionPrice: '850,000',
    auctionPriceCurrency: 'JPY',
    auctionNumber: '—',
    auctionSystem: '—',
    views: 0,
    inquiries: 0,
    totalPrice: '—',
    vehicleName: 'DAIHATSU MIRA E:S 2024',
    nowOnSaleLocations: ['Ruwanpura End, Ratnapura Wiharagama, Sri Lanka'],
  },
  {
    id: 4,
    stockNumber: 'SAS3-3774',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: '—',
    mfgYearMonth: '—',
    bodyColor: 'BLACK',
    mileageKm: 0,
    createdOn: '2026-04-29 15:12:28',
    chassis: '42104-J102',
    engineCC: '—',
    regYearMonth: '—',
    transmission: '—',
    fuelType: '—',
    status: 'Deactive',
    modelCode: '3DA-AJ10A',
    purchasedFrom: 'HA Osaka',
    auctionDate: '2026-04-29',
    lotNumber: '—',
    auctionPrice: '—',
    auctionPriceCurrency: '',
    auctionNumber: '—',
    auctionSystem: '—',
    views: 0,
    inquiries: 0,
    totalPrice: '—',
    vehicleName: 'TOYOTA RAV4 2023',
    nowOnSaleLocations: ['R S CAR SALES, R S CAR SALES, Sri Lanka'],
  },
  {
    id: 5,
    stockNumber: 'SAS3-3773',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: '—',
    mfgYearMonth: '2023',
    bodyColor: 'GRAY',
    mileageKm: 1000,
    createdOn: '2026-04-29 14:22:00',
    chassis: 'C1RKG-T4E838',
    engineCC: '—',
    regYearMonth: '2023/12',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Deactive',
    modelCode: 'C4-C1RKA',
    purchasedFrom: 'USS KOBE',
    auctionDate: '2026-04-29',
    lotNumber: '8198',
    auctionPrice: '2,740,000',
    auctionPriceCurrency: 'JPY',
    auctionNumber: '—',
    auctionSystem: '—',
    views: 0,
    inquiries: 0,
    totalPrice: '—',
    vehicleName: 'VOLKSWAGEN T-CROSS 2025',
    nowOnSaleLocations: ['CUT JAPAN AUTO TRADING (PVT) LTD, CUT JAPAN AUTO TRADING (PVT) LTD, Sri Lanka'],
  },
  {
    id: 6,
    stockNumber: 'SAS3-3772',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: '—',
    mfgYearMonth: '—',
    bodyColor: '—',
    mileageKm: 0,
    createdOn: '2026-04-28 12:00:00',
    chassis: 'RV5-1302075',
    engineCC: '—',
    regYearMonth: '—',
    transmission: '—',
    fuelType: '—',
    status: 'Now On Sale',
    modelCode: '—',
    purchasedFrom: 'USS KOBE',
    auctionDate: '2026-04-29',
    lotNumber: '—',
    auctionPrice: '—',
    auctionPriceCurrency: '',
    auctionNumber: '—',
    auctionSystem: '—',
    views: 0,
    inquiries: 0,
    totalPrice: '—',
    vehicleName: 'HONDA VEZEL 2025',
  },
  {
    id: 7,
    stockNumber: 'SAS3-3771',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: 'Tokyo',
    mfgYearMonth: '2022',
    bodyColor: 'WHITE',
    mileageKm: 35200,
    createdOn: '2026-04-27 09:30:00',
    chassis: 'ZRR80G-0234567',
    engineCC: '1797',
    regYearMonth: '2022/06',
    transmission: 'CVT',
    fuelType: 'Petrol',
    status: 'Now On Sale',
    modelCode: 'DAA-ZWR80G',
    purchasedFrom: 'USS Tokyo',
    auctionDate: '2026-04-25',
    lotNumber: '1245',
    auctionPrice: '1,350,000',
    auctionPriceCurrency: 'JPY',
    auctionNumber: 'USS-2846',
    auctionSystem: 'USS Online',
    views: 12,
    inquiries: 2,
    totalPrice: '¥1,650,000',
    vehicleName: 'TOYOTA NOAH 2022',
  },
  {
    id: 8,
    stockNumber: 'SAS3-3770',
    company: 'SAS3 Trading Co. Ltd.',
    stockLocation: 'Osaka',
    mfgYearMonth: '2021',
    bodyColor: 'BLUE',
    mileageKm: 48700,
    createdOn: '2026-04-26 14:15:00',
    chassis: 'GK3-0187654',
    engineCC: '1339',
    regYearMonth: '2021/03',
    transmission: 'CVT',
    fuelType: 'Hybrid',
    status: 'Reserved',
    modelCode: '6AA-GR3',
    purchasedFrom: 'HAA Kobe',
    auctionDate: '2026-04-24',
    lotNumber: '567',
    auctionPrice: '980,000',
    auctionPriceCurrency: 'JPY',
    auctionNumber: 'HAA-9912',
    auctionSystem: 'HAA',
    views: 28,
    inquiries: 5,
    totalPrice: '¥1,280,000',
    vehicleName: 'HONDA FIT 2021',
  },
];

const STATUS_CONFIG: Record<string, { bg: string; color: string; border: string; label: string }> = {
  'Now On Sale': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', label: 'Now On Sale' },
  'Deactive':    { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', label: 'Deactive' },
  'Sold':        { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0', label: 'Sold' },
  'Reserved':    { bg: '#fffbeb', color: '#d97706', border: '#fde68a', label: 'Reserved' },
};

export default function ManagePage() {
  const [search, setSearch] = useState('');
  const [stockSearch, setStockSearch] = useState('');
  const [displayFilter, setDisplayFilter] = useState<'all' | 'active' | 'deactive'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [currency, setCurrency] = useState('JPY');

  const filtered = MANAGED_VEHICLES.filter(v => {
    const matchSearch = search === '' || `${v.vehicleName} ${v.stockNumber} ${v.chassis} ${v.company}`.toLowerCase().includes(search.toLowerCase());
    const matchStock = stockSearch === '' || v.stockNumber.toLowerCase().includes(stockSearch.toLowerCase());
    const matchDisplay =
      displayFilter === 'all' ||
      (displayFilter === 'active' && v.status !== 'Deactive') ||
      (displayFilter === 'deactive' && v.status === 'Deactive');
    return matchSearch && matchStock && matchDisplay;
  });

  const totalRecords = filtered.length;
  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map(v => v.id)));
    }
  };

  return (
    <div className="manage-page">
      {/* ── Page Header ──────────────────────────── */}
      <div className="manage-header">
        <div>
          <div className="manage-eyebrow">Manage</div>
          <h1 className="manage-title">Vehicle Management</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="manage-btn manage-btn-outline">
            <Download style={{ width: 14, height: 14 }} /> Export
          </button>
          <button className="manage-btn manage-btn-primary">
            <Plus style={{ width: 14, height: 14 }} /> Add Vehicle
          </button>
        </div>
      </div>

      {/* ── Toolbar ───────────────────────────────── */}
      <div className="manage-toolbar">
        <div className="manage-toolbar-left">
          {/* Stock Number Search */}
          <div className="manage-search-field">
            <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by Stock Number"
              value={stockSearch}
              onChange={e => { setStockSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Keywords Search */}
          <div className="manage-search-field" style={{ width: 220 }}>
            <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by Keywords"
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Display filter */}
          <div className="manage-display-filter">
            <span className="manage-filter-label">Display:</span>
            <button
              className={`manage-filter-btn${displayFilter === 'all' ? ' active' : ''}`}
              onClick={() => { setDisplayFilter('all'); setCurrentPage(1); }}
            >All</button>
            <button
              className={`manage-filter-btn${displayFilter === 'active' ? ' active' : ''}`}
              onClick={() => { setDisplayFilter('active'); setCurrentPage(1); }}
            >Active</button>
            <button
              className={`manage-filter-btn${displayFilter === 'deactive' ? ' active' : ''}`}
              onClick={() => { setDisplayFilter('deactive'); setCurrentPage(1); }}
            >Deactive</button>
          </div>
        </div>

        <div className="manage-toolbar-right">
          {/* Currency selector */}
          <div className="manage-currency">
            <span className="manage-currency-label">Currency:</span>
            {['JPY', 'USD', 'SLR', 'GBP', 'EUR'].map(c => (
              <button
                key={c}
                className={`manage-currency-btn${currency === c ? ' active' : ''}`}
                onClick={() => setCurrency(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="manage-view-toggle">
            <button
              className={`manage-view-btn${viewMode === 'list' ? ' active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <LayoutList style={{ width: 14, height: 14 }} />
            </button>
            <button
              className={`manage-view-btn${viewMode === 'grid' ? ' active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Records Count + Pagination Top ───────── */}
      <div className="manage-records-bar">
        <div className="manage-records-count">
          Total Records Found: <strong>{totalRecords}</strong>
        </div>
        <div className="manage-pagination">
          <button
            className="manage-page-btn"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft style={{ width: 14, height: 14 }} />
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`manage-page-num${currentPage === p ? ' active' : ''}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="manage-page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <ChevronRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        {/* Bulk actions */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button className="manage-btn-sm" onClick={toggleSelectAll}>
            {selectedIds.size === paginated.length ? 'Clear All' : 'Select All'}
          </button>
          {selectedIds.size > 0 && (
            <button className="manage-btn-sm manage-btn-danger">
              <Trash2 style={{ width: 12, height: 12 }} />
              Delete ({selectedIds.size})
            </button>
          )}
        </div>
      </div>

      {/* ── Vehicle Cards ─────────────────────────── */}
      <div className="manage-vehicle-list">
        {paginated.map(v => {
          const st = STATUS_CONFIG[v.status] ?? STATUS_CONFIG['Now On Sale'];
          const isSelected = selectedIds.has(v.id);

          return (
            <div
              key={v.id}
              className={`manage-vehicle-card${isSelected ? ' selected' : ''}`}
            >
              {/* Card Top Bar */}
              <div className="manage-card-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label className="manage-checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(v.id)}
                    />
                    <span className="manage-checkmark" />
                  </label>
                  <span className="manage-card-title">{v.vehicleName}</span>
                </div>
                <div className="manage-card-meta-right">
                  <span className="manage-card-stat">Views: <strong>{v.views}</strong></span>
                  <span className="manage-card-stat">Inquiries: <strong>{v.inquiries}</strong></span>
                  <span className="manage-card-stat">Total Price: <strong>{v.totalPrice}</strong></span>
                </div>
              </div>

              {/* Card Body */}
              <div className="manage-card-body">
                {/* Left: Image placeholder */}
                <div className="manage-card-image">
                  <Car style={{ width: 32, height: 32, color: '#cbd5e1' }} />
                  <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>No Image</span>
                </div>

                {/* Center: Vehicle Details Grid */}
                <div className="manage-card-details">
                  {/* Left column */}
                  <div className="manage-detail-col">
                    <DetailRow label="Stock Number" value={v.stockNumber} highlight />
                    <DetailRow label="Stock Location" value={v.stockLocation} />
                    <DetailRow label="Mfg. Year/Month" value={v.mfgYearMonth} />
                    <DetailRow label="Body Color" value={v.bodyColor} />
                    <DetailRow label="Mileage (KM)" value={v.mileageKm > 0 ? v.mileageKm.toLocaleString() : '—'} />
                    <DetailRow label="Created On" value={v.createdOn} />
                  </div>

                  {/* Center column */}
                  <div className="manage-detail-col">
                    <DetailRow label="Chassis #" value={v.chassis} />
                    <DetailRow label="Engine CC" value={v.engineCC} />
                    <DetailRow label="Reg. Year/Month" value={v.regYearMonth} />
                    <DetailRow label="Transmission" value={v.transmission} />
                    <DetailRow label="Fuel Type" value={v.fuelType} />
                    <div className="manage-detail-row">
                      <span className="manage-detail-label">Status</span>
                      <span
                        className="manage-status-badge"
                        style={{ background: st.bg, color: st.color, borderColor: st.border }}
                      >
                        {st.label}
                      </span>
                    </div>
                    <DetailRow label="Model Code" value={v.modelCode} />
                  </div>

                  {/* Right column */}
                  <div className="manage-detail-col">
                    <DetailRow label="Purchased From" value={v.purchasedFrom} />
                    <DetailRow label="Auction Date" value={v.auctionDate} />
                    <DetailRow label="Lot Number" value={v.lotNumber} />
                    <DetailRow label="Auction Price" value={v.auctionPrice ? `${v.auctionPrice}${v.auctionPriceCurrency ? ` ${v.auctionPriceCurrency}` : ''}` : '—'} />
                    <DetailRow label="Auction Number" value={v.auctionNumber} />
                    <DetailRow label="Auction System" value={v.auctionSystem} />
                  </div>
                </div>

                {/* Right side: View Detail button */}
                <div className="manage-card-actions-side">
                  <button className="manage-view-detail-btn">
                    <Eye style={{ width: 13, height: 13 }} />
                    View Detail
                  </button>
                </div>
              </div>

              {/* Now On Sale locations */}
              {v.nowOnSaleLocations && v.nowOnSaleLocations.length > 0 && (
                <div className="manage-card-locations">
                  <MapPin style={{ width: 12, height: 12, color: '#16a34a', flexShrink: 0 }} />
                  <span className="manage-locations-label">Now On Sale:</span>
                  <span className="manage-locations-text">
                    {v.nowOnSaleLocations.join(', ')}
                  </span>
                </div>
              )}

              {/* Card Footer — Actions */}
              <div className="manage-card-footer">
                <div className="manage-action-links">
                  <ActionLink icon={<Pencil style={{ width: 11, height: 11 }} />} label="Edit" />
                  <ActionLink icon={<FileUp style={{ width: 11, height: 11 }} />} label="Upload Documents" />
                  <ActionLink icon={<MessageSquare style={{ width: 11, height: 11 }} />} label="Vehicle Remark" />
                  <ActionLink icon={<ImageIcon style={{ width: 11, height: 11 }} />} label="Upload Images" />
                  <ActionLink icon={<FileText style={{ width: 11, height: 11 }} />} label="Create Proforma" />
                  <ActionLink icon={<Tag style={{ width: 11, height: 11 }} />} label="Stock Offer" />
                  <ActionLink icon={<Receipt style={{ width: 11, height: 11 }} />} label="Create Invoice" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Pagination ─────────────────────── */}
      <div className="manage-bottom-bar">
        <span className="manage-showing">Showing {((currentPage - 1) * perPage) + 1}–{Math.min(currentPage * perPage, totalRecords)} of {totalRecords} vehicles</span>
        <div className="manage-pagination">
          <button
            className="manage-page-btn"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft style={{ width: 14, height: 14 }} />
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`manage-page-num${currentPage === p ? ' active' : ''}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="manage-page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <ChevronRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────── */

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="manage-detail-row">
      <span className="manage-detail-label">{label}</span>
      <span className={`manage-detail-value${highlight ? ' highlight' : ''}`}>
        {highlight ? (
          <span className="manage-company-tag">{value}</span>
        ) : value}
      </span>
    </div>
  );
}

function ActionLink({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="manage-action-link">
      {icon}
      <span>{label}</span>
    </button>
  );
}
