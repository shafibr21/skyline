import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)] bg-[length:200%_200%] animate-gradient" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-4 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-display text-5xl leading-tight tracking-tight md:text-7xl">
            Flight booking,
            <br />
            made brilliant.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Compare fares across airlines, discover vibrant deals, and book
            flights in seconds with SKYLINE's sleek, mobile‑first experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#search">
              <Button size="lg" variant="hero">
                Book flights
              </Button>
            </a>
            <a href="#deals">
              <Button size="lg" variant="hero">
                Explore deals
              </Button>
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payments • No hidden fees • 24/7 support
          </p>
        </div>
        <div className="relative">
          <img
            src="plane.png"
            alt="SKYLINE flight booking hero – airplane above sunrise clouds"
            className="w-full rounded-xl border shadow-xl"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
