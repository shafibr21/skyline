"use client";

import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import TripTypeSelector from "./TripTypeSelector";
import CityInputs from "./CityInputs";
import DateInputs from "./DateInputs";
import PassengerSelector from "./PassengerSelector";
import ClassSelector from "./ClassSelector";
import FlightResults from "./FlightResults";
import AnimationPanel from "./AnimationPanel";

// Form data interface for type safety
interface FormData {
  from: string;
  to: string;
  departure: string;
  return: string;
  adults: number;
  children: number;
  infants: number;
  class: string;
  currency: string;
}

/**
 * Main flight booking page component
 * Combines all form components and handles flight search logic
 */
export default function FlightBookingPage() {
  // Trip type state
  const [tripType, setTripType] = useState<"round" | "oneway">("round");

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    departure: "",
    return: "",
    adults: 1,
    children: 0,
    infants: 0,
    class: "economy",
    currency: "USD",
  });

  // Flight search state
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Generic input change handler
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Flight search function using existing API
  const searchFlights = async () => {
    // Validation
    if (!formData.from || !formData.to || !formData.departure) {
      setError("Please fill in all required fields");
      return;
    }

    if (tripType === "round" && !formData.return) {
      setError("Please select a return date for round trip");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      // Get access token from your existing API
      const tokenRes = await axios.post("/api/token");
      const token = tokenRes.data.access_token;

      // Search for flights using your existing API
      const res = await axios.get("/api/flights", {
        params: {
          originLocationCode: formData.from,
          destinationLocationCode: formData.to,
          departureDate: formData.departure,
          adults: formData.adults,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlights(res.data.data || []);
    } catch (err) {
      console.error("Flight search error:", err);
      setError(
        "Failed to fetch flights. Please check your input and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header component */}
      <Header />

      {/* Main content area */}
      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Left panel - Booking form */}
        <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
          <div className="p-8">
            <div className="max-w-md mx-auto">
              {/* Page title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Book a <strong className="text-blue-600">Flight</strong>
              </h1>


              {/* City inputs */}
              <CityInputs
                from={formData.from}
                to={formData.to}
                onFromChange={(value) => handleInputChange("from", value)}
                onToChange={(value) => handleInputChange("to", value)}
              />

              {/* Date inputs */}
              <DateInputs
                departure={formData.departure}
                returnDate={formData.return}
                tripType={tripType}
                onDepartureChange={(value) =>
                  handleInputChange("departure", value)
                }
                
              />

              {/* Passenger selector */}
              <PassengerSelector
                adults={formData.adults}
                children={formData.children}
                infants={formData.infants}
                onAdultsChange={(value) => handleInputChange("adults", value)}
                onChildrenChange={(value) =>
                  handleInputChange("children", value)
                }
                onInfantsChange={(value) => handleInputChange("infants", value)}
              />

              {/* Class selector */}
              <ClassSelector
                selectedClass={formData.class}
                onClassChange={(value) => handleInputChange("class", value)}
              />

              

              {/* Search button */}
              <button
                onClick={searchFlights}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                {loading ? "Searching..." : "Search Flights"}
              </button>

              {/* Error message */}
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Flight results */}
              <FlightResults
                flights={flights}
                loading={loading}
                searchPerformed={searchPerformed}
              />
            </div>
          </div>
        </div>

        {/* Right panel - Animation */}
        <AnimationPanel />
      </div>
    </div>
  );
}
