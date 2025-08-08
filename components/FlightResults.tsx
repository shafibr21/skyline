interface FlightResultsProps {
  flights: any[];
  loading: boolean;
  searchPerformed: boolean;
}

/**
 * Component for displaying flight search results
 */
export default function FlightResults({
  flights,
  loading,
  searchPerformed,
}: FlightResultsProps) {
  // Don't show anything if no search has been performed
  if (!searchPerformed) return null;

  // Show loading state
  if (loading) {
    return (
      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 text-sm text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Searching for flights...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        {flights.length > 0
          ? `Found ${flights.length} flights`
          : "No flights found"}
      </h3>

      {flights.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Flight route and price */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {flight.itineraries[0].segments[0].departure.iataCode} →{" "}
                    {
                      flight.itineraries[0].segments[
                        flight.itineraries[0].segments.length - 1
                      ].arrival.iataCode
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    Airlines: {flight.validatingAirlineCodes.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">
                    {flight.price.total} {flight.price.currency}
                  </p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>

              {/* Flight details */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                <div>
                  <p>
                    <span className="font-medium">Departure:</span>{" "}
                    {new Date(
                      flight.itineraries[0].segments[0].departure.at
                    ).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Arrival:</span>{" "}
                    {new Date(
                      flight.itineraries[0].segments[
                        flight.itineraries[0].segments.length - 1
                      ].arrival.at
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Duration:</span>{" "}
                    {flight.itineraries[0].duration
                      .replace("PT", "")
                      .replace("H", "h ")
                      .replace("M", "m")}
                  </p>
                  <p>
                    <span className="font-medium">Stops:</span>{" "}
                    {flight.itineraries[0].segments.length - 1}
                  </p>
                </div>
              </div>

              {/* Select button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Select Flight
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No flights found for your search criteria.</p>
          <p className="text-sm mt-1">
            Try adjusting your dates or destinations.
          </p>
        </div>
      )}
    </div>
  );
}
