/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ManagePage from './ManagePage';
import InvoicesPage from './InvoicesPage';
import UsedVehiclesPage from './UsedVehiclesPage';
import InventoryNewPage from './InventoryNewPage';
import InventoryPage from './InventoryPage';
import RiksoPage from './RiksoPage';
import TopNavbar from './TopNavbar';

export default function App() {
  return (
    <div className="app-shell">
      <TopNavbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/orders/inventory" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles/manage" element={<ManagePage />} />
          <Route path="/orders/invoice" element={<InvoicesPage />} />
          <Route path="/orders/used-vehicles" element={<UsedVehiclesPage />} />
          <Route path="/orders/inventory" element={<InventoryPage />} />
          <Route path="/orders/inventory/new/*" element={<InventoryNewPage />} />
          <Route path="/orders/rikso/*" element={<RiksoPage />} />
        </Routes>
      </main>
    </div>
  );
}

function DashboardPage() {
  return (
    <p className="page-subtitle">Overview and quick actions for your inventory suite.</p>
  );
}
