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
  Package,
  Tag,
  Ruler
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Header */}
      <header className="fixed top-0 z-50 flex justify-between items-center px-4 h-10 w-full bg-white border-b border-line">
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Auction Inventory</span>
          <div className="relative flex items-center">
            <Search className="absolute left-2 w-4 h-4 text-slate-400" />
            <input 
              className="pl-8 pr-2 h-7 w-64 bg-slate-100 border-none text-[11px] focus:ring-1 focus:ring-primary-container outline-none" 
              placeholder="Global VIN search..." 
              type="text" 
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <HeaderButton icon={<Bell className="w-4 h-4" />} />
          <HeaderButton icon={<History className="w-4 h-4" />} />
          <HeaderButton icon={<HelpCircle className="w-4 h-4" />} />
          <div className="ml-2 w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer rounded-sm">
            <User className="w-5 h-5 fill-slate-600" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-10">
        {/* Sidebar */}
        <nav className="fixed left-0 top-10 h-[calc(100vh-40px)] flex flex-col py-4 w-56 bg-surface-container-low border-r border-line overflow-y-auto">
          <div className="px-6 mb-8">
            <div className="text-slate-900 font-black text-sm uppercase tracking-tight">Inventory Ops</div>
            <div className="text-[10px] text-slate-500 font-medium">V2.0.48</div>
          </div>
          
          <div className="flex flex-col gap-0.5">
            <SidebarLink 
              icon={<LayoutDashboard className="w-4 h-4" />} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
            />
            <SidebarLink 
              icon={<Car className="w-4 h-4" />} 
              label="Inventory" 
              active={activeTab === 'inventory'} 
              onClick={() => setActiveTab('inventory')}
            />
            <SidebarLink 
              icon={<TrendingUp className="w-4 h-4" />} 
              label="Auction Intel" 
              active={activeTab === 'intel'} 
              onClick={() => setActiveTab('intel')}
            />
            <SidebarLink 
              icon={<DraftingCompass className="w-4 h-4" />} 
              label="Engineering" 
              active={activeTab === 'eng'} 
              onClick={() => setActiveTab('eng')}
            />
            <SidebarLink 
              icon={<Settings2 className="w-4 h-4" />} 
              label="Mechanical" 
              active={activeTab === 'mech'} 
              onClick={() => setActiveTab('mech')}
            />
          </div>

          <div className="mt-auto px-6 py-4 border-t border-line">
            <div className="flex items-center gap-3 text-slate-400">
              <Cloud className="w-4 h-4 text-primary opacity-60" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Systems Nominal</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="ml-56 flex-1 p-6 max-w-[1200px]">
          {/* Action Toolbar */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <nav className="flex items-center gap-2 mb-1">
                <span className="text-body-sm text-outline">Inventory</span>
                <ChevronRight className="w-3 h-3 text-outline" />
                <span className="text-body-sm text-slate-600">New Entry</span>
              </nav>
              <h1 className="text-h1 text-slate-900">Vehicle Registration Ledger</h1>
            </div>
            <div className="flex gap-2">
              <button className="px-4 h-8 bg-white border border-error text-error text-label-caps uppercase hover:bg-error-container transition-colors font-semibold">
                Delete Draft
              </button>
              <button className="px-6 h-8 bg-primary text-white text-label-caps uppercase hover:bg-primary-container transition-all flex items-center gap-2 font-semibold">
                <Save className="w-4 h-4" />
                Save Entry
              </button>
            </div>
          </div>

          {/* Form Grid */}
          <div className="precision-grid-container">
            {/* Section: Inventory & Logistics */}
            <div className="col-span-8 precision-grid-cell">
              <div className="precision-section-header">
                <Package className="w-4 h-4 text-primary" />
                <h2 className="text-label-caps text-slate-600">Inventory & Logistics</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="precision-label">Stock Number</label>
                  <input className="precision-input" type="text" defaultValue="STK-99284-X" />
                </div>
                <div>
                  <label className="precision-label">Arrival Date</label>
                  <input className="precision-input" type="date" />
                </div>
                <div>
                  <label className="precision-label">Logistics Tier</label>
                  <select className="precision-input">
                    <option>Expedited Sea</option>
                    <option>Standard Rail</option>
                    <option>Direct Carrier</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Market Presentation */}
            <div className="col-span-4 precision-grid-cell bg-surface-container-low!">
              <div className="precision-section-header">
                <Tag className="w-4 h-4 text-primary" />
                <h2 className="text-label-caps text-slate-600">Market Presentation</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge color="blue">Premium Grade</Badge>
                <Badge color="slate">Export Ready</Badge>
                <Badge color="orange">Rare Config</Badge>
              </div>
              <div>
                <label className="precision-label">MSRP Estimate</label>
                <div className="flex items-center">
                  <span className="bg-slate-200 px-3 h-8 flex items-center border border-r-0 border-line text-xs font-bold">$</span>
                  <input className="precision-input" placeholder="0.00" type="text" />
                </div>
              </div>
            </div>

            {/* Section: Auction Intelligence */}
            <div className="col-span-12 precision-grid-cell">
              <div className="precision-section-header">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="text-label-caps text-slate-600">Auction Intelligence</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="precision-label">Market Value Coefficient</label>
                  <input className="precision-input" type="number" step="0.01" />
                </div>
                <div>
                  <label className="precision-label">Competitor Saturation</label>
                  <div className="h-8 flex items-center">
                    <input className="w-full accent-primary h-1.5 bg-line rounded-lg appearance-none cursor-pointer" type="range" />
                  </div>
                </div>
                <div>
                  <label className="precision-label">Historical Trend</label>
                  <select className="precision-input">
                    <option>Appreciating (High)</option>
                    <option>Stable</option>
                    <option>Depreciating (Standard)</option>
                  </select>
                </div>
                <div>
                  <label className="precision-label">Auction ID</label>
                  <input className="precision-input" placeholder="AUC-XXXXX" type="text" />
                </div>
              </div>
            </div>

            {/* Section: Structural Engineering */}
            <div className="col-span-6 precision-grid-cell">
              <div className="precision-section-header">
                <DraftingCompass className="w-4 h-4 text-primary" />
                <h2 className="text-label-caps text-slate-600">Structural Engineering</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="precision-label">Chassis Type</label>
                    <input className="precision-input" type="text" />
                  </div>
                  <div>
                    <label className="precision-label">Material Composition</label>
                    <select className="precision-input">
                      <option>Aluminium-Magnesium</option>
                      <option>High-Tensile Steel</option>
                      <option>Carbon Composite</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="precision-label">Structural Integrity Notes</label>
                  <textarea className="precision-input h-20 py-2 resize-none" />
                </div>
              </div>
            </div>

            {/* Section: Mechanical Calibration */}
            <div className="col-span-6 precision-grid-cell">
              <div className="precision-section-header">
                <Settings2 className="w-4 h-4 text-primary" />
                <h2 className="text-label-caps text-slate-600">Mechanical Calibration</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="precision-label">Powertrain Config</label>
                    <input className="precision-input" type="text" defaultValue="V8-TWIN-TURBO" />
                  </div>
                  <div>
                    <label className="precision-label">Calibration Status</label>
                    <div className="flex items-center h-8 gap-4">
                      <label className="flex items-center gap-2 text-[12px] cursor-pointer">
                        <input className="w-3.5 h-3.5 text-primary focus:ring-0" name="cal" type="radio" defaultChecked /> 
                        <span>Pass</span>
                      </label>
                      <label className="flex items-center gap-2 text-[12px] cursor-pointer">
                        <input className="w-3.5 h-3.5 text-primary focus:ring-0" name="cal" type="radio" /> 
                        <span>Pending</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="precision-label">Transmission Ratio Map</label>
                  <div className="grid grid-cols-4 gap-[1px] bg-line border border-line">
                    <input className="h-8 bg-white text-center text-[11px] outline-none focus:bg-primary-container/10" placeholder="1st" type="text" />
                    <input className="h-8 bg-white text-center text-[11px] outline-none focus:bg-primary-container/10" placeholder="2nd" type="text" />
                    <input className="h-8 bg-white text-center text-[11px] outline-none focus:bg-primary-container/10" placeholder="3rd" type="text" />
                    <input className="h-8 bg-white text-center text-[11px] outline-none focus:bg-primary-container/10" placeholder="4th" type="text" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Dimensional Ledger */}
            <div className="col-span-12 precision-grid-cell bg-surface-container-high!">
              <div className="precision-section-header">
                <Ruler className="w-4 h-4 text-primary" />
                <h2 className="text-label-caps text-slate-600">Dimensional Ledger</h2>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <DimensionField label="Wheelbase (mm)" />
                <DimensionField label="Overall Width" />
                <DimensionField label="Curb Weight" />
                <DimensionField label="Drag Coeff." />
                <DimensionField label="Ground Clear." />
                <DimensionField label="Cargo Cap." />
              </div>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="mt-8">
            <h3 className="text-label-caps text-outline uppercase mb-2">Audit Trail</h3>
            <div className="bg-white border border-line divide-y divide-line overflow-hidden">
              <AuditRow label="System initialized ledger record" time="2023-11-24 09:12:44" />
              <AuditRow 
                label={<span>VIN Validation Service: <span className="text-primary font-bold">SUCCESS</span></span>} 
                time="2023-11-24 09:12:45" 
                secondary 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function HeaderButton({ icon }: { icon: ReactNode }) {
  return (
    <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-primary transition-all rounded-sm cursor-pointer">
      {icon}
    </button>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-tight transition-colors w-full text-left ${
        active 
          ? 'bg-white text-primary border-l-2 border-primary' 
          : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Badge({ children, color }: { children: ReactNode, color: 'blue' | 'slate' | 'orange' }) {
  const styles = {
    blue: 'bg-primary-container/20 text-primary border-primary/30',
    slate: 'bg-slate-100 text-slate-600 border-line',
    orange: 'bg-orange-100 text-orange-700 border-orange-200'
  };
  
  return (
    <span className={`px-2 py-1 text-[10px] font-bold uppercase border rounded-[2px] ${styles[color]}`}>
      {children}
    </span>
  );
}

function DimensionField({ label }: { label: string }) {
  return (
    <div>
      <label className="precision-label">{label}</label>
      <input className="precision-input" type="number" />
    </div>
  );
}

function AuditRow({ label, time, secondary }: { label: ReactNode, time: string, secondary?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-2 text-body-sm ${secondary ? 'bg-surface-container-low' : ''}`}>
      <span className="text-slate-600">{label}</span>
      <span className="text-outline font-mono text-[11px]">{time}</span>
    </div>
  );
}


