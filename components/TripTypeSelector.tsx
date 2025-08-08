"use client";

interface TripTypeSelectorProps {
  tripType: "round" | "oneway";
  onTripTypeChange: (type: "round" | "oneway") => void;
}

/**
 * Component for selecting trip type (Round Trip or One Way)
 */
export default function TripTypeSelector({
  tripType,
  onTripTypeChange,
}: TripTypeSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex space-x-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="round"
            checked={tripType === "round"}
            onChange={(e) =>
              onTripTypeChange(e.target.value as "round" | "oneway")
            }
            className="mr-2 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">Round Trip</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={(e) =>
              onTripTypeChange(e.target.value as "round" | "oneway")
            }
            className="mr-2 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">One Way</span>
        </label>
      </div>
    </div>
  );
}
