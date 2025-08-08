"use client";

interface PassengerSelectorProps {
  adults: number;
  children: number;
  infants: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onInfantsChange: (value: number) => void;
}

/**
 * Component for selecting number of passengers
 */
export default function PassengerSelector({
  adults,
  children,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
}: PassengerSelectorProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-4">
        {/* Adults */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adults
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{adults}</span>
            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Children
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onChildrenChange(Math.max(0, children - 1))}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{children}</span>
            <button
              type="button"
              onClick={() => onChildrenChange(children + 1)}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Infants */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Infants
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onInfantsChange(Math.max(0, infants - 1))}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{infants}</span>
            <button
              type="button"
              onClick={() => onInfantsChange(infants + 1)}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2">
        Adults: 12+ years, Children: 2-11 years, Infants: Under 2 years
      </p>
    </div>
  );
}
