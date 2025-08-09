"use client";

import { useCallback } from "react";
import axios from "axios";
import { useFlightSearchContext } from "@/contexts/FlightSearchContext";

export type FlightSearchParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: string;
};

export type FlightOffer = {
  id: string;
  source: string;
  itineraries: Array<{
    duration: string;
    segments: Array<{
      departure: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      duration: string;
      numberOfStops: number;
    }>;
  }>;
  price: {
    currency: string;
    total: string;
    base: string;
    fees: Array<{
      amount: string;
      type: string;
    }>;
  };
  travelerPricings: Array<{
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: {
      currency: string;
      total: string;
      base: string;
    };
  }>;
  validatingAirlineCodes: string[];
};

export type FlightSearchResult = {
  data: FlightOffer[];
  meta: {
    count: number;
    links?: {
      self: string;
    };
  };
  dictionaries: {
    locations: Record<
      string,
      {
        cityCode: string;
        countryCode: string;
      }
    >;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
};

export function useFlightSearch() {
  const { results, setResults, loading, setLoading, error, setError } =
    useFlightSearchContext();

  // Function to get access token
  const getAccessToken = useCallback(async () => {
    try {
      const response = await axios.post("/api/token");
      return response.data.access_token;
    } catch (error) {
      console.error("Failed to get access token:", error);
      throw new Error("Authentication failed");
    }
  }, []);

  const searchFlights = useCallback(
    async (params: FlightSearchParams) => {
      setLoading(true);
      setError(null);
      setResults(null);

      try {
        // Get access token first
        const accessToken = await getAccessToken();

        // Search flights using your API
        const response = await axios.get("/api/flights", {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setResults(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to search flights. Please try again.";
        setError(errorMessage);
        console.error("Flight search error:", err);
      } finally {
        setLoading(false);
      }
    },
    [getAccessToken, setLoading, setError, setResults]
  );

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, [setResults, setError]);

  return {
    loading,
    results,
    error,
    searchFlights,
    clearResults,
  };
}
