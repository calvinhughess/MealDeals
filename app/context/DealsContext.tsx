// app/context/DealsContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export interface Deal {
  id: string;
  title: string;
  description: string;
  restaurant: string;
  isClaimed: boolean;
}

interface DealsContextProps {
  deals: Deal[];
  claimedDeals: Deal[];
  claimDeal: (id: string) => void;
}

const defaultDeals: Deal[] = [
  { id: '1', title: 'Free Fries', description: 'Get free fries with any purchase.', restaurant: 'McDonalds', isClaimed: false },
  { id: '2', title: 'Buy One Get One Free', description: 'Buy one burrito, get one free.', restaurant: 'Chipotle', isClaimed: false },
  // Add more deals here
];

export const DealsContext = createContext<DealsContextProps>({
  deals: [],
  claimedDeals: [],
  claimDeal: () => {},
});

export const DealsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>(defaultDeals);

  const claimDeal = (id: string) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === id ? { ...deal, isClaimed: true } : deal
      )
    );
  };

  const claimedDeals = deals.filter((deal) => deal.isClaimed);

  return (
    <DealsContext.Provider value={{ deals, claimedDeals, claimDeal }}>
      {children}
    </DealsContext.Provider>
  );
};
