/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Vehicle = {
  readonly id: number;
  readonly orderId: string;
  readonly make: string;
  readonly brand: string;
  readonly model: string;
  readonly chassis: string;
  readonly year: number;
  readonly fuel: string;
  readonly mileage: number;
  readonly grade: string;
  readonly status: string;
  readonly price: number;
  readonly country: string;
  readonly color: string;
  readonly stock: string;
  readonly customerName: string;
  readonly auctionName: string;
};

/** Each order ID maps to exactly one vehicle. */
export const VEHICLES: Vehicle[] = [
  { id: 1, orderId: 'ORD-2024-001', make: 'Toyota', brand: 'Toyota', model: 'Land Cruiser', chassis: 'JZX100-0123456', year: 2021, fuel: 'Petrol', mileage: 45200, grade: 'A', status: 'Available', price: 4850000, country: 'Japan', color: 'Pearl White', stock: 'STK-0041', customerName: 'Ranasinghe Ent', auctionName: 'USS Tokyo' },
  { id: 2, orderId: 'ORD-2024-002', make: 'Nissan', brand: 'Nissan', model: 'Patrol', chassis: 'Y62-0098712', year: 2022, fuel: 'Petrol', mileage: 28100, grade: 'A+', status: 'Reserved', price: 6200000, country: 'Japan', color: 'Midnight Black', stock: 'STK-0042', customerName: 'Ranasinghe Ent', auctionName: 'USS Tokyo' },
  { id: 3, orderId: 'ORD-2024-003', make: 'Mitsubishi', brand: 'Mitsubishi', model: 'Pajero', chassis: 'V98W-0034521', year: 2020, fuel: 'Diesel', mileage: 62400, grade: 'B+', status: 'Sold', price: 3100000, country: 'Japan', color: 'Silver', stock: 'STK-0043', customerName: 'R S CAR SALES', auctionName: 'TAA Yokohama' },
  { id: 4, orderId: 'ORD-2024-004', make: 'Toyota', brand: 'Toyota', model: 'Hilux', chassis: 'GUN125-0087654', year: 2023, fuel: 'Diesel', mileage: 12300, grade: 'A+', status: 'Available', price: 3750000, country: 'Japan', color: 'White', stock: 'STK-0044', customerName: 'SUN TRADING', auctionName: 'HAA Kobe' },
  { id: 5, orderId: 'ORD-2024-005', make: 'Honda', brand: 'Honda', model: 'CR-V', chassis: 'RW1-0056432', year: 2021, fuel: 'Petrol', mileage: 38700, grade: 'A', status: 'Available', price: 2900000, country: 'Japan', color: 'Dark Blue', stock: 'STK-0045', customerName: 'SUN TRADING', auctionName: 'HAA Kobe' },
  { id: 6, orderId: 'ORD-2024-006', make: 'Lexus', brand: 'Lexus', model: 'LX 570', chassis: 'URJ201-0021987', year: 2022, fuel: 'Petrol', mileage: 19400, grade: 'A+', status: 'Reserved', price: 9400000, country: 'Japan', color: 'Black', stock: 'STK-0046', customerName: 'MR. MOHAMED NIZAR', auctionName: 'CAA Tokyo' },
  { id: 7, orderId: 'ORD-2024-007', make: 'Isuzu', brand: 'Isuzu', model: 'D-Max', chassis: 'TFR85-0043219', year: 2020, fuel: 'Diesel', mileage: 74100, grade: 'B', status: 'Sold', price: 1850000, country: 'Japan', color: 'White', stock: 'STK-0047', customerName: 'Arjuna Kumari', auctionName: 'JU Saitama' },
  { id: 8, orderId: 'ORD-2024-008', make: 'Suzuki', brand: 'Suzuki', model: 'Jimny', chassis: 'JB74W-0011234', year: 2023, fuel: 'Petrol', mileage: 5200, grade: 'A+', status: 'Available', price: 2200000, country: 'Japan', color: 'Jungle Green', stock: 'STK-0048', customerName: 'Arjuna Kumari', auctionName: 'JU Saitama' },
];

export type TransportRecord = {
  id: number;
  transporter: string;
  deliveryYard: string;
  yardInDate: string;
  cost: number;
  status: string;
  notes: string;
};

export const TRANSPORTS: Record<number, TransportRecord[]> = {
  1: [
    { id: 101, transporter: 'Al Futtaim Logistics', deliveryYard: 'Jebel Ali Free Zone', yardInDate: '2024-02-10', cost: 45000, status: 'Delivered', notes: 'Delivered on schedule' },
    { id: 102, transporter: 'GAC Shipping', deliveryYard: 'Dubai Auto Yard - Block C', yardInDate: '2024-02-18', cost: 12500, status: 'Delivered', notes: 'Final delivery to showroom' },
  ],
  2: [
    { id: 201, transporter: 'Nippon Express', deliveryYard: 'Nagoya Port Terminal', yardInDate: '2024-03-05', cost: 28000, status: 'Delivered', notes: 'Port clearance complete' },
    { id: 202, transporter: 'Emirates Shipping', deliveryYard: 'Port Rashid Yard B', yardInDate: '2024-03-22', cost: 18500, status: 'In Transit', notes: 'ETA 3 days' },
  ],
  3: [
    { id: 301, transporter: 'Kintetsu World Express', deliveryYard: 'Osaka Export Terminal', yardInDate: '2023-11-14', cost: 31000, status: 'Delivered', notes: '' },
    { id: 302, transporter: 'DSV Logistics', deliveryYard: 'Khalifa Port Yard', yardInDate: '2023-12-01', cost: 14200, status: 'Delivered', notes: 'Delivered to buyer directly' },
    { id: 303, transporter: 'Al Jadeed Transport', deliveryYard: 'Mussafah Industrial Area', yardInDate: '2023-12-09', cost: 8000, status: 'Delivered', notes: 'Final mile delivery' },
  ],
  4: [
    { id: 401, transporter: 'NYK Logistics', deliveryYard: 'Yokohama Export Dock', yardInDate: '2024-01-20', cost: 22000, status: 'Delivered', notes: '' },
    { id: 402, transporter: 'Gulf Freight Solutions', deliveryYard: 'Jebel Ali - Gate 4 Yard', yardInDate: '2024-02-07', cost: 16800, status: 'Pending', notes: 'Awaiting customs release' },
  ],
  5: [
    { id: 501, transporter: 'Hitachi Transport', deliveryYard: 'Kobe Port - Bay 7', yardInDate: '2024-01-08', cost: 19500, status: 'Delivered', notes: 'Shipped with groupage' },
  ],
  6: [
    { id: 601, transporter: 'Maersk Line', deliveryYard: 'Tokyo-Oi Terminal', yardInDate: '2024-04-02', cost: 55000, status: 'In Transit', notes: 'Container on vessel MV Atlas' },
    { id: 602, transporter: 'Emirates SkyCargo Road', deliveryYard: 'Dubai South Logistics Park', yardInDate: '2024-04-20', cost: 22000, status: 'Awaiting', notes: 'Booked - awaiting arrival' },
  ],
  7: [
    { id: 701, transporter: 'Yamato Transport', deliveryYard: 'Fukuoka Harbour Yard', yardInDate: '2023-10-05', cost: 17000, status: 'Delivered', notes: '' },
    { id: 702, transporter: 'Sharjah Shipping Agency', deliveryYard: 'Port Khalid - Zone A', yardInDate: '2023-10-28', cost: 11500, status: 'Delivered', notes: '' },
  ],
  8: [
    { id: 801, transporter: 'MOL Logistics', deliveryYard: 'Nagoya Export Terminal 2', yardInDate: '2024-03-15', cost: 24500, status: 'In Transit', notes: 'Vessel departed, ETA 12 days' },
  ],
};

/** One order ID → one vehicle. */
export type OrderGroup = {
  orderId: string;
  customerName: string;
  auctionName: string;
  vehicle: Vehicle;
};

export function groupVehiclesByOrder(vehicles: Vehicle[]): OrderGroup[] {
  const map = new Map<string, OrderGroup>();
  for (const v of vehicles) {
    if (map.has(v.orderId)) continue;
    map.set(v.orderId, {
      orderId: v.orderId,
      customerName: v.customerName,
      auctionName: v.auctionName,
      vehicle: v,
    });
  }
  return Array.from(map.values()).sort((a, b) => a.orderId.localeCompare(b.orderId));
}
