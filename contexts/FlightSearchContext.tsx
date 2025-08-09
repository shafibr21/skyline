"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FlightSearchResult } from "@/hooks/useFlightSearch";

interface FlightSearchContextType {
  results: FlightSearchResult | null;
  setResults: (results: FlightSearchResult | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(
  undefined
);

export function FlightSearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<FlightSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <FlightSearchContext.Provider
      value={{
        results,
        setResults,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
}

export function useFlightSearchContext() {
  const context = useContext(FlightSearchContext);
  if (context === undefined) {
    throw new Error(
      "useFlightSearchContext must be used within a FlightSearchProvider"
    );
  }
  return context;
}
