/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogOut, Search } from 'lucide-react';

type ParentId = 'home' | 'vehicles' | 'orders';

type SubNavItem = {
  label: string;
  to: string;
  end?: boolean;
  matchPrefix?: boolean;
};

type ParentNavItem = {
  id: ParentId;
  label: string;
  defaultPath: string;
  children: SubNavItem[];
};

const PARENT_NAV: ParentNavItem[] = [
  {
    id: 'home',
    label: 'HOME',
    defaultPath: '/dashboard',
    children: [
      { label: 'DASHBOARD', to: '/dashboard' },
    ],
  },
  {
    id: 'vehicles',
    label: 'VEHICLES',
    defaultPath: '/vehicles/manage',
    children: [
      { label: 'MANAGE', to: '/vehicles/manage' },
    ],
  },
  {
    id: 'orders',
    label: 'ORDERS',
    defaultPath: '/orders/inventory',
    children: [
      { label: 'NEW ENTRY', to: '/orders/inventory/new', matchPrefix: true },
      { label: 'INVENTORY', to: '/orders/inventory', end: true },
      { label: 'RIKSO', to: '/orders/rikso', matchPrefix: true },
      { label: 'INVOICE', to: '/orders/invoice' },
      { label: 'USED VEHICLES', to: '/orders/used-vehicles' },
    ],
  },
];

const NEW_ENTRY_VIEWS = [
  { label: 'SHEET', to: '/orders/inventory/new' },
  { label: 'FORM', to: '/orders/inventory/new/form' },
] as const;

const RIKSO_VIEWS = [
  { label: 'LIST', to: '/orders/rikso' },
  { label: 'FORM', to: '/orders/rikso/form' },
] as const;

function parentFromPath(pathname: string): ParentId {
  if (pathname.startsWith('/vehicles')) return 'vehicles';
  if (pathname.startsWith('/orders')) return 'orders';
  return 'home';
}

function isSubNavActive(item: SubNavItem, pathname: string): boolean {
  if (item.matchPrefix) {
    return pathname.startsWith(item.to);
  }
  if (item.end) {
    return pathname === item.to || pathname === `${item.to}/`;
  }
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export default function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuSearch, setMenuSearch] = useState('');
  const [activeParent, setActiveParent] = useState<ParentId>(() => parentFromPath(location.pathname));

  useEffect(() => {
    setActiveParent(parentFromPath(location.pathname));
  }, [location.pathname]);

  const currentParent = PARENT_NAV.find(p => p.id === activeParent) ?? PARENT_NAV[0];
  const isNewEntryPage = location.pathname.startsWith('/orders/inventory/new');
  const isFormView = location.pathname.includes('/orders/inventory/new/form');
  const isRiksoPage = location.pathname.startsWith('/orders/rikso');
  const isRiksoFormView = location.pathname.includes('/orders/rikso/form');

  const filteredSubItems = currentParent.children.filter(item =>
    menuSearch === '' || item.label.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const handleParentClick = (parent: ParentNavItem) => {
    setActiveParent(parent.id);
    navigate(parent.defaultPath);
  };

  return (
    <header className="app-header has-subnav">
      <div className="nav-utility-bar">
        <div className="nav-utility-left">
          <button
            type="button"
            className="nav-utility-icon"
            title="Home"
            onClick={() => {
              setActiveParent('home');
              navigate('/dashboard');
            }}
          >
            <Home size={18} />
          </button>
          <button type="button" className="nav-utility-icon" title="Exit">
            <LogOut size={18} />
          </button>
        </div>
        <div className="nav-utility-search">
          <Search size={15} className="nav-utility-search-icon" />
          <input
            type="search"
            className="nav-utility-search-input"
            placeholder="Search menu by keywords.."
            value={menuSearch}
            onChange={e => setMenuSearch(e.target.value)}
          />
        </div>
      </div>

      <nav className="nav-parent-bar" aria-label="Main sections">
        {PARENT_NAV.map(parent => (
          <button
            key={parent.id}
            type="button"
            className={`nav-parent-tab${activeParent === parent.id ? ' active' : ''}`}
            onClick={() => handleParentClick(parent)}
          >
            {parent.label}
          </button>
        ))}
      </nav>

      <nav className="nav-sub-bar" aria-label="Section pages">
        {filteredSubItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={() =>
              `nav-sub-tab${isSubNavActive(item, location.pathname) ? ' active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}

        {isNewEntryPage && (
          <>
            <span className="nav-sub-divider" aria-hidden />
            {NEW_ENTRY_VIEWS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/orders/inventory/new'}
                className={() =>
                  `nav-sub-tab nav-sub-tab-tertiary${
                    (to.includes('/form') ? isFormView : isNewEntryPage && !isFormView) ? ' active' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </>
        )}

        {isRiksoPage && (
          <>
            <span className="nav-sub-divider" aria-hidden />
            {RIKSO_VIEWS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/orders/rikso'}
                className={() =>
                  `nav-sub-tab nav-sub-tab-tertiary${
                    (to.includes('/form') ? isRiksoFormView : isRiksoPage && !isRiksoFormView) ? ' active' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>
    </header>
  );
}
