/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SheetData } from './inventorySheetColumns';
import type { Vehicle } from './vehicleData';
import { TRANSPORTS } from './vehicleData';

export function buildSheetDetailsFromVehicle(v: Vehicle): SheetData {
  const transport = TRANSPORTS[v.id]?.[0];
  const month = String((v.id % 12) + 1).padStart(2, '0');

  return {
    orderId: v.orderId,
    soldStatus: v.status === 'Sold' ? 'Sold' : v.status === 'Reserved' ? 'Pending' : 'Unsold',
    purchaseManager: ['T. Yamamoto', 'K. Sato', 'M. Tanaka'][v.id % 3],
    auctionIdFk: String(1000 + v.id),
    posNumber: `POS-${2400 + v.id}`,
    giriGiri: v.id % 2 === 0 ? 'Yes' : 'No',
    auctionId: `AUC-2024-${String(v.id).padStart(4, '0')}`,
    auctionName: v.auctionName,
    auctionCompany: `${v.auctionName.split(' ')[0]} Motors`,
    auctionDate: `2024-0${(v.id % 9) + 1}-15T10:30`,
    portLetter: ['YOK', 'NGO', 'UKB', 'TYO'][v.id % 4],
    orderIdFk: String(v.id),
    make: v.make,
    brand: v.brand,
    model: v.model,
    modelName: v.model,
    modelNumber: `${v.make.slice(0, 2).toUpperCase()}-${v.year}`,
    vehicleType: v.model.includes('Jimny') ? 'SUV' : '4WD',
    chassisNumber: v.chassis,
    chassisTick: '✓',
    engineNumber: `ENG-${v.chassis.replace(/[^A-Z0-9]/gi, '').slice(-8)}`,
    manufactureYear: String(v.year),
    manufactureMonth: month,
    registerYear: String(v.year),
    registerMonth: month,
    gearType: v.fuel === 'Diesel' ? 'Manual' : 'Automatic',
    doors: v.model.includes('Jimny') ? '3' : '5',
    seats: v.model.includes('Jimny') ? '4' : '7',
    fuel: v.fuel,
    kmMileage: String(v.mileage),
    vehicleIdFk: String(v.id),
    color: v.color,
    country: v.country,
    priceYen: String(v.price),
    transmissionType: v.fuel === 'Diesel' ? 'Manual' : 'Automatic',
    auctionGrade: v.grade,
    stockId: v.stock,
    mileageUnit: 'km',
    availabilityStatus: v.status,
    mainImageUrl: `https://picsum.photos/seed/${v.stock}/400/240`,
    description: `${v.year} ${v.make} ${v.model} in ${v.color}. Grade ${v.grade}, ${v.mileage.toLocaleString()} km.`,
    extraDetails: `Customer: ${v.customerName}`,
    transporter: transport?.transporter ?? '',
    deliveryYard: transport?.deliveryYard ?? '',
    yardInDate: transport?.yardInDate ?? '',
    transportCost: transport ? String(transport.cost) : '',
    transportStatus: transport?.status ?? '',
  };
}
