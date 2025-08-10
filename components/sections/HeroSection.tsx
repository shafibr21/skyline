"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (h1Ref.current) {
      const split = new SplitText(h1Ref.current, { type: "words,chars" });
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.02,
        }
      );
    }
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }

    // Magnetic button effect for both buttons
    const buttons = [button1Ref.current, button2Ref.current].filter(Boolean);
    const eventHandlers = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();

    buttons.forEach((button) => {
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
              trigger: button,
              start: "top 90%",
            },
          }
        );

        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        eventHandlers.set(button, {
          move: handleMouseMove,
          leave: handleMouseLeave,
        });
        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    return () => {
      eventHandlers.forEach((handlers, button) => {
        button.removeEventListener("mousemove", handlers.move);
        button.removeEventListener("mouseleave", handlers.leave);
      });
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)] bg-[length:200%_200%] animate-gradient" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-4 md:grid-cols-2 md:py-24">
        <div>
          <h1
            ref={h1Ref}
            className="font-display text-5xl leading-tight tracking-tight md:text-7xl"
          >
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
              <Button size="lg" variant="hero" ref={button1Ref}>
                Book flights
              </Button>
            </a>
            <a href="#deals">
              <Button size="lg" variant="hero" ref={button2Ref}>
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
            ref={imgRef}
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
