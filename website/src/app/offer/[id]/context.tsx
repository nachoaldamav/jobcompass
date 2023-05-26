'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type OfferStatus = {
  id: string;
  updates: string[];
  candidates: number[];
  maxSalary: number[];
  minSalary: number[];
  vacancies: number[];
  active: boolean[];
  updated: string[];
  killerQuestions: number[];
  openQuestions: number[];
};

type OfferStatusContextType = {
  offerStatus: OfferStatus | null;
  setOfferStatus: React.Dispatch<React.SetStateAction<OfferStatus | null>>;
};

const OfferStatusContext = createContext<OfferStatusContextType>({
  offerStatus: null,
  setOfferStatus: () => {},
});

export function OfferStatusProvider({
  children,
}: { children: React.ReactNode }) {
  const [offerStatus, setOfferStatus] = useState<OfferStatus | null>(null);

  return (
    <OfferStatusContext.Provider value={{ offerStatus, setOfferStatus }}>
      {children}
    </OfferStatusContext.Provider>
  );
}

export function useOfferStatus() {
  const context = useContext(OfferStatusContext);
  if (context === undefined) {
    throw new Error('useOfferStatus must be used within a OfferStatusProvider');
  }
  return context;
}
