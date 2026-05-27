/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const VEHICLES = [
  { id: 1, make: 'Toyota', brand: 'Toyota', model: 'Land Cruiser', chassis: 'JZX100-0123456', year: 2021, fuel: 'Petrol', mileage: 45200, grade: 'A', status: 'Available', price: 4850000, country: 'Japan', color: 'Pearl White', stock: 'STK-0041' },
  { id: 2, make: 'Nissan', brand: 'Nissan', model: 'Patrol', chassis: 'Y62-0098712', year: 2022, fuel: 'Petrol', mileage: 28100, grade: 'A+', status: 'Reserved', price: 6200000, country: 'Japan', color: 'Midnight Black', stock: 'STK-0042' },
  { id: 3, make: 'Mitsubishi', brand: 'Mitsubishi', model: 'Pajero', chassis: 'V98W-0034521', year: 2020, fuel: 'Diesel', mileage: 62400, grade: 'B+', status: 'Sold', price: 3100000, country: 'Japan', color: 'Silver', stock: 'STK-0043' },
  { id: 4, make: 'Toyota', brand: 'Toyota', model: 'Hilux', chassis: 'GUN125-0087654', year: 2023, fuel: 'Diesel', mileage: 12300, grade: 'A+', status: 'Available', price: 3750000, country: 'Japan', color: 'White', stock: 'STK-0044' },
  { id: 5, make: 'Honda', brand: 'Honda', model: 'CR-V', chassis: 'RW1-0056432', year: 2021, fuel: 'Petrol', mileage: 38700, grade: 'A', status: 'Available', price: 2900000, country: 'Japan', color: 'Dark Blue', stock: 'STK-0045' },
  { id: 6, make: 'Lexus', brand: 'Lexus', model: 'LX 570', chassis: 'URJ201-0021987', year: 2022, fuel: 'Petrol', mileage: 19400, grade: 'A+', status: 'Reserved', price: 9400000, country: 'Japan', color: 'Black', stock: 'STK-0046' },
  { id: 7, make: 'Isuzu', brand: 'Isuzu', model: 'D-Max', chassis: 'TFR85-0043219', year: 2020, fuel: 'Diesel', mileage: 74100, grade: 'B', status: 'Sold', price: 1850000, country: 'Japan', color: 'White', stock: 'STK-0047' },
  { id: 8, make: 'Suzuki', brand: 'Suzuki', model: 'Jimny', chassis: 'JB74W-0011234', year: 2023, fuel: 'Petrol', mileage: 5200, grade: 'A+', status: 'Available', price: 2200000, country: 'Japan', color: 'Jungle Green', stock: 'STK-0048' },
] as const;

export type Vehicle = (typeof VEHICLES)[number];
