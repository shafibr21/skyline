"use client";

import { Calendar } from "lucide-react";

interface DateInputsProps {
  departure: string;
  returnDate: string;
  tripType: "round" | "oneway";
  onDepartureChange: (value: string) => void;
}

/**
 * Component for selecting departure and return dates
 */
export default function DateInputs({
  departure,
  tripType,
  onDepartureChange,

}: DateInputsProps) {
  return (
    <div className="mb-6">
      <div
        className={`grid ${
          tripType === "round" ? "grid-cols-2" : "grid-cols-1"
        } gap-4`}
      >
        {/* Departure date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 " />
            <input
              type="date"
              value={departure}
              onChange={(e) => onDepartureChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
