/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RiksoTransport = {
  id: string;
  transporter: string;
  deliveryYard: string;
  yardInDate: string;
  cost: string;
};

export type RiksoRowData = {
  orderId: string;
  auctionDate: string;
  auction: string;
  posNo: string;
  portLetter: string;
  auctionNumber: string;
  chassisNumber: string;
  make: string;
  modelName: string;
  type: string;
  pickNote: string;
  paySoonDate: string;
  orderDate: string;
  cutOffDate: string;
  eyaDate: string;
};

export type RiksoRecord = RiksoRowData & {
  id: number;
  transports: RiksoTransport[];
};

export const RIKSO_RECORDS: RiksoRecord[] = [
  {
    id: 1,
    orderId: 'ORD-2024-101',
    auctionDate: '2024-03-12',
    auction: 'USS Tokyo',
    posNo: 'POS-8812',
    portLetter: 'YOK',
    auctionNumber: 'A-44021',
    chassisNumber: 'JZX100-0123456',
    make: 'Toyota',
    modelName: 'Land Cruiser',
    type: 'SUV',
    pickNote: 'Priority yard pickup',
    paySoonDate: '2024-03-20',
    orderDate: '2024-03-10',
    cutOffDate: '2024-03-18',
    eyaDate: '2024-04-02',
    transports: [
      { id: 't1-1', transporter: 'Nippon Express', deliveryYard: 'Yokohama Export Dock', yardInDate: '2024-03-14', cost: '28000' },
      { id: 't1-2', transporter: 'GAC Shipping', deliveryYard: 'Jebel Ali Block C', yardInDate: '2024-03-28', cost: '12500' },
    ],
  },
  {
    id: 2,
    orderId: 'ORD-2024-102',
    auctionDate: '2024-03-08',
    auction: 'TAA Yokohama',
    posNo: 'POS-7721',
    portLetter: 'NGO',
    auctionNumber: 'B-11890',
    chassisNumber: 'V98W-0034521',
    make: 'Mitsubishi',
    modelName: 'Pajero',
    type: '4WD',
    pickNote: '',
    paySoonDate: '2024-03-15',
    orderDate: '2024-03-07',
    cutOffDate: '2024-03-14',
    eyaDate: '2024-03-30',
    transports: [
      { id: 't2-1', transporter: 'Kintetsu World Express', deliveryYard: 'Osaka Export Terminal', yardInDate: '2024-03-09', cost: '31000' },
    ],
  },
  {
    id: 3,
    orderId: 'ORD-2024-103',
    auctionDate: '2024-02-28',
    auction: 'HAA Kobe',
    posNo: 'POS-6604',
    portLetter: 'UKB',
    auctionNumber: 'C-90211',
    chassisNumber: 'GUN125-0087654',
    make: 'Toyota',
    modelName: 'Hilux',
    type: 'Pickup',
    pickNote: 'Awaiting invoice',
    paySoonDate: '2024-03-05',
    orderDate: '2024-02-27',
    cutOffDate: '2024-03-04',
    eyaDate: '2024-03-22',
    transports: [
      { id: 't3-1', transporter: 'NYK Logistics', deliveryYard: 'Kobe Port Bay 7', yardInDate: '2024-03-01', cost: '22000' },
      { id: 't3-2', transporter: 'Gulf Freight Solutions', deliveryYard: 'Jebel Ali Gate 4', yardInDate: '2024-03-12', cost: '16800' },
      { id: 't3-3', transporter: 'Al Jadeed Transport', deliveryYard: 'Mussafah Industrial', yardInDate: '2024-03-20', cost: '8000' },
    ],
  },
  {
    id: 4,
    orderId: 'ORD-2024-104',
    auctionDate: '2024-04-01',
    auction: 'CAA Tokyo',
    posNo: 'POS-9933',
    portLetter: 'TYO',
    auctionNumber: 'D-55002',
    chassisNumber: 'URJ201-0021987',
    make: 'Lexus',
    modelName: 'LX 570',
    type: 'SUV',
    pickNote: 'VIP customer',
    paySoonDate: '2024-04-10',
    orderDate: '2024-04-01',
    cutOffDate: '2024-04-08',
    eyaDate: '2024-04-25',
    transports: [],
  },
];

export function createEmptyTransport(): RiksoTransport {
  return {
    id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    transporter: '',
    deliveryYard: '',
    yardInDate: '',
    cost: '',
  };
}
