/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { RiksoRowData, RiksoTransport } from './riksoData';
import { createEmptyTransport } from './riksoData';

export type RiksoColumnDef = {
  key: keyof RiksoRowData;
  label: string;
  width?: number;
  type?: 'text' | 'date';
};

export const RIKSO_COLUMNS: RiksoColumnDef[] = [
  { key: 'orderId', label: 'Order ID', width: 100 },
  { key: 'auctionDate', label: 'Auction Date', width: 110, type: 'date' },
  { key: 'auction', label: 'Auction', width: 120 },
  { key: 'posNo', label: 'Pos No', width: 88 },
  { key: 'portLetter', label: 'Port Letter', width: 88 },
  { key: 'auctionNumber', label: 'Auction#', width: 96 },
  { key: 'chassisNumber', label: 'Chassis#', width: 130 },
  { key: 'make', label: 'Make', width: 88 },
  { key: 'modelName', label: 'Model Name', width: 110 },
  { key: 'type', label: 'Type', width: 72 },
  { key: 'pickNote', label: 'Pick Note', width: 120 },
  { key: 'paySoonDate', label: 'Pay Soon Date', width: 110, type: 'date' },
  { key: 'orderDate', label: 'Order Date', width: 110, type: 'date' },
  { key: 'cutOffDate', label: 'Cut Off Date', width: 110, type: 'date' },
  { key: 'eyaDate', label: 'EYA Date', width: 110, type: 'date' },
];

const EMPTY_ROW: RiksoRowData = {
  orderId: '',
  auctionDate: '',
  auction: '',
  posNo: '',
  portLetter: '',
  auctionNumber: '',
  chassisNumber: '',
  make: '',
  modelName: '',
  type: '',
  pickNote: '',
  paySoonDate: '',
  orderDate: '',
  cutOffDate: '',
  eyaDate: '',
};

let nextRowId = 1;

export type RiksoEditableRow = RiksoRowData & {
  id: string;
  transports: RiksoTransport[];
};

export function createEmptyRiksoRow(): RiksoEditableRow {
  return { id: String(nextRowId++), ...EMPTY_ROW, transports: [createEmptyTransport()] };
}

export function rowHasRiksoData(row: RiksoRowData): boolean {
  return Boolean(row.orderId || row.chassisNumber || row.auction || row.make);
}
