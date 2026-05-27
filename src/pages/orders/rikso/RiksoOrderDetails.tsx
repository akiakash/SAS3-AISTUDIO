/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gavel, Car, CalendarDays, FileText } from 'lucide-react';
import type { RiksoRecord, RiksoRowData } from '../../../data/rikso/riksoData';

type DetailGroup = {
  title: string;
  icon: React.ReactNode;
  fields: { key: keyof RiksoRowData; label: string }[];
};

const DETAIL_GROUPS: DetailGroup[] = [
  {
    title: 'Order & auction',
    icon: <Gavel style={{ width: 14, height: 14 }} />,
    fields: [
      { key: 'orderId', label: 'Order ID' },
      { key: 'auction', label: 'Auction' },
      { key: 'auctionDate', label: 'Auction date' },
      { key: 'auctionNumber', label: 'Auction#' },
      { key: 'posNo', label: 'Pos no' },
      { key: 'portLetter', label: 'Port letter' },
    ],
  },
  {
    title: 'Vehicle',
    icon: <Car style={{ width: 14, height: 14 }} />,
    fields: [
      { key: 'make', label: 'Make' },
      { key: 'modelName', label: 'Model name' },
      { key: 'type', label: 'Type' },
      { key: 'chassisNumber', label: 'Chassis#' },
    ],
  },
  {
    title: 'Dates & notes',
    icon: <CalendarDays style={{ width: 14, height: 14 }} />,
    fields: [
      { key: 'orderDate', label: 'Order date' },
      { key: 'paySoonDate', label: 'Pay soon date' },
      { key: 'cutOffDate', label: 'Cut off date' },
      { key: 'eyaDate', label: 'EYA date' },
      { key: 'pickNote', label: 'Pick note' },
    ],
  },
];

export default function RiksoOrderDetails({ record }: { record: RiksoRecord }) {
  return (
    <div className="rikso-order-details">
      {DETAIL_GROUPS.map(group => (
        <section key={group.title} className="rikso-detail-group">
          <div className="rikso-detail-group-head">
            <span className="rikso-detail-group-icon">{group.icon}</span>
            <h3 className="rikso-detail-group-title">{group.title}</h3>
          </div>
          <dl className="rikso-detail-dl">
            {group.fields.map(({ key, label }) => (
              <div
                key={key}
                className={`rikso-detail-dl-item${key === 'pickNote' ? ' rikso-detail-dl-item--wide' : ''}`}
              >
                <dt>{label}</dt>
                <dd>{record[key] || '—'}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

export function RiksoOrderHero({ record, transportCount }: { record: RiksoRecord; transportCount: number }) {
  return (
    <div className="rikso-detail-hero">
      <div className="rikso-detail-hero-main">
        <span className="rikso-detail-hero-label">Selected order</span>
        <h2 className="rikso-detail-hero-id">{record.orderId}</h2>
        <p className="rikso-detail-hero-vehicle">
          {record.make} {record.modelName}
          <span className="rikso-detail-hero-dot">·</span>
          {record.type}
        </p>
        <p className="rikso-detail-hero-chassis">{record.chassisNumber}</p>
      </div>
      <div className="rikso-detail-hero-chips">
        <span className="rikso-detail-chip">
          <Gavel style={{ width: 12, height: 12 }} />
          {record.auction}
        </span>
        <span className="rikso-detail-chip">
          <CalendarDays style={{ width: 12, height: 12 }} />
          {record.auctionDate || '—'}
        </span>
        <span className="rikso-detail-chip rikso-detail-chip--accent">
          <FileText style={{ width: 12, height: 12 }} />
          {transportCount} transport{transportCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
