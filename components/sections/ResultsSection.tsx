"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Plane, Clock, MapPin } from "lucide-react";
import { useFlightSearch } from "@/hooks/useFlightSearch";

// Helper function to format duration from ISO 8601 to readable format
function formatDuration(duration: string): string {
  // PT4H30M -> "4h 30m"
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return duration;

  const hours = match[1] ? `${match[1]}h` : "";
  const minutes = match[2] ? `${match[2]}m` : "";
  return [hours, minutes].filter(Boolean).join(" ");
}

// Helper function to format time from ISO string
function formatTime(isoString: string): string {
  return format(new Date(isoString), "HH:mm");
}

// Helper function to format date from ISO string
function formatDate(isoString: string): string {
  return format(new Date(isoString), "MMM dd");
}

export default function ResultsSection() {
  const { loading, results, error } = useFlightSearch();

  return (
    <section id="results" className="w-full">
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 md:pb-12">
        <h2 className="font-display text-3xl md:text-4xl">Flight results</h2>
        <p className="mt-2 text-muted-foreground">
          {results
            ? `Showing ${results.data.length} options`
            : "Search to see available flights."}
        </p>

        {/* Error State */}
        {error && (
          <div className="mt-8 p-4 rounded-lg border border-red-200 bg-red-50 text-red-800">
            <p className="font-medium">Search Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="mt-2 h-3 w-1/3" />
                  </div>
                </div>
                <Skeleton className="mt-4 h-3 w-1/2" />
                <Skeleton className="mt-2 h-3 w-3/4" />
                <Skeleton className="mt-6 h-10 w-full" />
              </Card>
            ))}
          </div>
        )}

        {/* Results State */}
        {!loading && results && results.data.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.data.map((flight) => {
              const segment = flight.itineraries[0].segments[0];
              const lastSegment =
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ];
              const carrierName =
                results.dictionaries.carriers[segment.carrierCode] ||
                segment.carrierCode;
              const totalStops = flight.itineraries[0].segments.length - 1;

              return (
                <article
                  key={flight.id}
                  className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{carrierName}</CardTitle>
                      <span className="rounded-md bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                        {flight.price.currency} {flight.price.total}
                      </span>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>{formatDate(segment.departure.at)}</span>
                      <span>•</span>
                      <span>
                        {totalStops === 0
                          ? "Nonstop"
                          : `${totalStops} stop${totalStops > 1 ? "s" : ""}`}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Flight Route */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {formatTime(segment.departure.at)}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {segment.departure.iataCode}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDuration(flight.itineraries[0].duration)}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="h-px bg-border flex-1"></div>
                          <Plane className="h-4 w-4 text-muted-foreground" />
                          <div className="h-px bg-border flex-1"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {formatTime(lastSegment.arrival.at)}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lastSegment.arrival.iataCode}
                        </div>
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>
                        Flight {segment.carrierCode}
                        {segment.number}
                      </div>
                      {totalStops > 0 && (
                        <div>
                          {totalStops} stop{totalStops > 1 ? "s" : ""} via{" "}
                          {flight.itineraries[0].segments
                            .slice(0, -1)
                            .map((s) => s.arrival.iataCode)
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full" size="sm" variant="hero">
                      Select Flight
                    </Button>
                  </CardFooter>
                </article>
              );
            })}
          </div>
        )}

        {/* No Results State */}
        {!loading && results && results.data.length === 0 && (
          <div className="mt-8 text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plane className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No flights found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search criteria or check different dates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
