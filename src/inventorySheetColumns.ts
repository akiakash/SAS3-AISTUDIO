/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Vehicle } from './vehicleData';

export type SheetData = {
  auctionId: string;
  auctionName: string;
  auctionCompany: string;
  auctionDate: string;
  portLetter: string;
  orderId: string;
  soldStatus: string;
  purchaseManager: string;
  auctionIdFk: string;
  posNumber: string;
  giriGiri: string;
  orderIdFk: string;
  make: string;
  brand: string;
  model: string;
  modelName: string;
  modelNumber: string;
  vehicleType: string;
  chassisNumber: string;
  chassisTick: string;
  engineNumber: string;
  manufactureYear: string;
  manufactureMonth: string;
  registerYear: string;
  registerMonth: string;
  gearType: string;
  doors: string;
  seats: string;
  fuel: string;
  kmMileage: string;
  vehicleIdFk: string;
  color: string;
  country: string;
  priceYen: string;
  transmissionType: string;
  auctionGrade: string;
  stockId: string;
  mileageUnit: string;
  availabilityStatus: string;
  mainImageUrl: string;
  description: string;
  extraDetails: string;
  transporter: string;
  deliveryYard: string;
  yardInDate: string;
  transportCost: string;
  transportStatus: string;
};

export type SheetRow = SheetData & { id: string };

export type SheetColumnDef = {
  key: keyof SheetData;
  label: string;
  width?: number;
  type?: 'text' | 'number' | 'date' | 'datetime-local' | 'url';
  input?: 'select';
  options?: string[];
};

export type SheetColumnGroup = {
  label: string;
  columns: SheetColumnDef[];
};

export const SHEET_COLUMN_GROUPS: SheetColumnGroup[] = [
  {
    label: 'Orders',
    columns: [
      { key: 'orderId', label: 'Order ID', width: 88 },
      { key: 'soldStatus', label: 'Sold Status', width: 96, input: 'select', options: ['', 'Sold', 'Unsold', 'Pending'] },
      { key: 'purchaseManager', label: 'Purchase Mgr', width: 110 },
      { key: 'auctionIdFk', label: 'Auction ID (FK)', width: 100, type: 'number' },
      { key: 'posNumber', label: 'POS Number', width: 90 },
      { key: 'giriGiri', label: 'Giri Giri', width: 80 },
    ],
  },
  {
    label: 'Auctions',
    columns: [
      { key: 'auctionId', label: 'Auction ID', width: 100 },
      { key: 'auctionName', label: 'Auction Name', width: 120 },
      { key: 'auctionCompany', label: 'Auction Company', width: 110 },
      { key: 'auctionDate', label: 'Auction Date', width: 130, type: 'datetime-local' },
      { key: 'portLetter', label: 'Port Letter', width: 90 },
    ],
  },
  {
    label: 'Vehicles',
    columns: [
      { key: 'orderIdFk', label: 'Order ID (FK)', width: 96, type: 'number' },
      { key: 'make', label: 'Make', width: 80 },
      { key: 'brand', label: 'Brand', width: 80 },
      { key: 'model', label: 'Model', width: 100 },
      { key: 'modelName', label: 'Model Name', width: 100 },
      { key: 'modelNumber', label: 'Model No.', width: 90 },
      { key: 'vehicleType', label: 'Type', width: 72 },
      { key: 'chassisNumber', label: 'Chassis No.', width: 130 },
      { key: 'chassisTick', label: 'Chassis Tick', width: 90 },
      { key: 'engineNumber', label: 'Engine No.', width: 100 },
      { key: 'manufactureYear', label: 'Mfg Year', width: 72, type: 'number' },
      { key: 'manufactureMonth', label: 'Mfg Month', width: 72 },
      { key: 'registerYear', label: 'Reg Year', width: 72, type: 'number' },
      { key: 'registerMonth', label: 'Reg Month', width: 72 },
      { key: 'gearType', label: 'Gear', width: 72 },
      { key: 'doors', label: 'Doors', width: 56, type: 'number' },
      { key: 'seats', label: 'Seats', width: 56, type: 'number' },
      { key: 'fuel', label: 'Fuel', width: 72 },
      { key: 'kmMileage', label: 'KM Mileage', width: 88, type: 'number' },
    ],
  },
  {
    label: 'Vehicle Details',
    columns: [
      { key: 'vehicleIdFk', label: 'Vehicle ID (FK)', width: 100, type: 'number' },
      { key: 'color', label: 'Color', width: 88 },
      { key: 'country', label: 'Country', width: 80 },
      { key: 'priceYen', label: 'Price (¥)', width: 96, type: 'number' },
      { key: 'transmissionType', label: 'Transmission', width: 96 },
      { key: 'auctionGrade', label: 'Auction Grade', width: 80 },
      { key: 'stockId', label: 'Stock ID', width: 96 },
      { key: 'mileageUnit', label: 'Mileage Unit', width: 88, input: 'select', options: ['', 'km', 'miles'] },
      { key: 'availabilityStatus', label: 'Availability', width: 100, input: 'select', options: ['', 'Available', 'Reserved', 'Sold'] },
      { key: 'mainImageUrl', label: 'Main Image URL', width: 140, type: 'url' },
      { key: 'description', label: 'Description', width: 140 },
      { key: 'extraDetails', label: 'Extra Details', width: 120 },
    ],
  },
  {
    label: 'Transport',
    columns: [
      { key: 'transporter', label: 'Transporter', width: 120 },
      { key: 'deliveryYard', label: 'Delivery Yard', width: 130 },
      { key: 'yardInDate', label: 'Yard In Date', width: 110, type: 'date' },
      { key: 'transportCost', label: 'Cost (¥)', width: 88, type: 'number' },
      { key: 'transportStatus', label: 'Status', width: 100, input: 'select', options: ['', 'Pending', 'In Transit', 'Delivered', 'Awaiting'] },
    ],
  },
];

export const SHEET_COLUMNS = SHEET_COLUMN_GROUPS.flatMap(g => g.columns);

const EMPTY_SHEET_DATA: SheetData = {
  auctionId: '', auctionName: '', auctionCompany: '', auctionDate: '', portLetter: '',
  orderId: '', soldStatus: '', purchaseManager: '', auctionIdFk: '', posNumber: '', giriGiri: '',
  orderIdFk: '', make: '', brand: '', model: '', modelName: '', modelNumber: '', vehicleType: '',
  chassisNumber: '', chassisTick: '', engineNumber: '', manufactureYear: '', manufactureMonth: '',
  registerYear: '', registerMonth: '', gearType: '', doors: '', seats: '', fuel: '', kmMileage: '',
  vehicleIdFk: '', color: '', country: '', priceYen: '', transmissionType: '', auctionGrade: '',
  stockId: '', mileageUnit: '', availabilityStatus: '', mainImageUrl: '', description: '', extraDetails: '',
  transporter: '', deliveryYard: '', yardInDate: '', transportCost: '', transportStatus: '',
};

let nextRowId = 1;

export function createEmptySheetRow(): SheetRow {
  return { id: String(nextRowId++), ...EMPTY_SHEET_DATA };
}

export function vehicleToSheetData(v: Vehicle): SheetData {
  return {
    ...EMPTY_SHEET_DATA,
    make: v.make,
    brand: v.brand,
    model: v.model,
    chassisNumber: v.chassis,
    manufactureYear: String(v.year),
    fuel: v.fuel,
    kmMileage: String(v.mileage),
    auctionGrade: v.grade,
    priceYen: String(v.price),
    color: v.color,
    country: v.country,
    stockId: v.stock,
    availabilityStatus: v.status,
    mileageUnit: 'km',
  };
}

export function rowHasEntryData(row: SheetData): boolean {
  return Boolean(
    row.stockId || row.chassisNumber || row.make || row.model || row.auctionId || row.orderId
  );
}
