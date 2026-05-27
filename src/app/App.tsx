/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ManagePage from '../pages/vehicles/ManagePage';
import UsedVehiclesPage from '../pages/vehicles/UsedVehiclesPage';
import InvoicesPage from '../pages/orders/invoice/InvoicesPage';
import InventoryPage from '../pages/orders/inventory/InventoryPage';
import InventoryNewPage from '../pages/orders/inventory/InventoryNewPage';
import RiksoPage from '../pages/orders/rikso/RiksoPage';

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
