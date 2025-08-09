"use client";

import { useEffect, useMemo } from "react";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";
import Header from "./sections/Header";
import HeroSection from "./sections/HeroSection";
import SearchSection from "./sections/SearchSection";
import ResultsSection from "./sections/ResultsSection";
import DealsSection from "./sections/DealsSection";
import WhySection from "./sections/WhySection";
import Footer from "./sections/Footer";

export default function HomePage() {
  useEffect(() => {
    document.title = "SKYLINE Flights – Book Flights & Travel Deals";
  }, []);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SKYLINE",
      url: "/",
      logo: "/favicon.ico",
      sameAs: [],
    }),
    []
  );

  return (
    <FlightSearchProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <Header />
        <HeroSection />
        <SearchSection />
        <ResultsSection />
        <DealsSection />
        <WhySection />
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </FlightSearchProvider>
  );
}
