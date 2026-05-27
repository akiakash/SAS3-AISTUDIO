/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { RIKSO_RECORDS, type RiksoRecord, type RiksoTransport } from '../../../data/rikso/riksoData';

function cloneRiksoRecords(records: RiksoRecord[]): RiksoRecord[] {
  return records.map(r => ({
    ...r,
    transports: r.transports.map(t => ({ ...t })),
  }));
}

type RiksoRecordsContextValue = {
  records: RiksoRecord[];
  updateTransports: (recordId: number, transports: RiksoTransport[]) => void;
  getRecord: (recordId: number) => RiksoRecord | undefined;
};

const RiksoRecordsContext = createContext<RiksoRecordsContextValue | null>(null);

export function RiksoRecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<RiksoRecord[]>(() => cloneRiksoRecords(RIKSO_RECORDS));

  const updateTransports = useCallback((recordId: number, transports: RiksoTransport[]) => {
    setRecords(prev => prev.map(r => (r.id === recordId ? { ...r, transports } : r)));
  }, []);

  const getRecord = useCallback(
    (recordId: number) => records.find(r => r.id === recordId),
    [records],
  );

  const value = useMemo(
    () => ({ records, updateTransports, getRecord }),
    [records, updateTransports, getRecord],
  );

  return (
    <RiksoRecordsContext.Provider value={value}>
      {children}
    </RiksoRecordsContext.Provider>
  );
}

export function useRiksoRecords() {
  const ctx = useContext(RiksoRecordsContext);
  if (!ctx) throw new Error('useRiksoRecords must be used within RiksoRecordsProvider');
  return ctx;
}
