"use client";

import { MapPin } from "lucide-react";

interface CityInputsProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

/**
 * Component for origin and destination city selection
 */
export default function CityInputs({
  from,
  to,
  onFromChange,
  onToChange,
}: CityInputsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Origin city input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Flying from
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Choose city (e.g., DAC)"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Destination city input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Flying to
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Choose city (e.g., JFK)"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
}
