"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { useFlightSearch } from "@/hooks/useFlightSearch";

const airports = [
  { code: "JFK", city: "New York" },
  { code: "LAX", city: "Los Angeles" },
  { code: "SFO", city: "San Francisco" },
  { code: "ORD", city: "Chicago" },
  { code: "CDG", city: "Paris" },
  { code: "NRT", city: "Tokyo" },
  { code: "LHR", city: "London" },
  { code: "DXB", city: "Dubai" },
  { code: "SIN", city: "Singapore" },
  { code: "BOM", city: "Mumbai" },
  { code: "HKG", city: "Hong Kong" },
  { code: "IST", city: "Istanbul" },
  { code: "MUC", city: "Munich" },
  { code: "FRA", city: "Frankfurt" },
  { code: "ZRH", city: "Zurich" },
];

export default function SearchSection() {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState<number>(1);

  const { searchFlights, loading } = useFlightSearch();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!origin || !destination || !date || !passengers) {
      alert("Please fill in all fields");
      return;
    }
    if (origin === destination) {
      alert("Origin and destination must be different");
      return;
    }

    const searchParams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: format(date, "yyyy-MM-dd"),
      adults: passengers.toString(),
    };

    await searchFlights(searchParams);

    // Scroll to results
    document.getElementById("results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section id="search" className="w-full">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 md:py-12">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-3xl">
              Search flights
            </CardTitle>
            <CardDescription>
              Choose your route, date, and passengers to find the best fares.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-12"
            >
              {/* Origin */}
              <div className="md:col-span-3">
                <Label htmlFor="origin">Origin</Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger id="origin" className="mt-2">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {airports.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.city} ({a.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Destination */}
              <div className="md:col-span-3">
                <Label htmlFor="destination">Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination" className="mt-2">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {airports.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.city} ({a.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="md:col-span-3">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className="mt-2 w-full justify-start"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-50 w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Passengers */}
              <div className="md:col-span-2">
                <Label htmlFor="passengers">Passengers</Label>
                <Select
                  value={String(passengers)}
                  onValueChange={(v) => setPassengers(parseInt(v))}
                >
                  <SelectTrigger id="passengers" className="mt-2">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1} {i === 0 ? "Adult" : "Adults"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1 flex items-end">
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Searching
                    </>
                  ) : (
                    <>
                      <SearchIcon className="mr-1 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
