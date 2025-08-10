"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const deals = [
  {
    title: "Paris",
    copy: "From $349 round‑trip",
    image: "/paris.png"
  },
  {
    title: "Tokyo",
    copy: "From $699 round‑trip",
    image: "/tokyo.png"
  },
  {
    title: "New York",
    copy: "From $199 round‑trip",
    image: "/ny.png"
  },
];

export default function DealsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - split text effect
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || "";
        titleRef.current.innerHTML = titleText
          .split("")
          .map((char) =>
            char === " " ? " " : `<span class="inline-block">${char}</span>`
          )
          .join("");

        gsap.fromTo(
          titleRef.current.querySelectorAll("span"),
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.03,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom 20%",
            },
          }
        );
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Cards animation with bounce effect
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              scale: 0.8,
              rotationY: -15,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "elastic.out(1, 0.75)",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );

          // Add floating animation to buttons
          const button = buttonsRef.current[index];
          if (button) {
            gsap.to(button, {
              y: -5,
              duration: 2,
              ease: "power2.inOut",
              yoyo: true,
              repeat: -1,
              delay: index * 0.3,
            });
          }

          // Enhanced hover effect
          const handleMouseEnter = () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              z: 50,
              duration: 0.3,
              ease: "power2.out",
            });

            const image = card.querySelector("img");
            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            const image = card.querySelector("img");
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          // Cleanup function
          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="deals"
      className="w-full bg-secondary/10 perspective-1000"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 ref={titleRef} className="font-display text-4xl md:text-5xl">
          Today&apos;s vibrant deals
        </h2>
        <p ref={subtitleRef} className="mt-2 text-muted-foreground">
          Fresh fares to spark your next getaway.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {deals.map((deal, index) => (
            <article
              key={deal.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group rounded-xl border bg-card shadow-sm overflow-hidden cursor-pointer transform-gpu"
              style={{ opacity: 0 }}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={deal.image}
                  alt={`${deal.title} destination`}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{deal.title}</h3>
                <p className="mt-2 text-muted-foreground">{deal.copy}</p>
                <Button
                  ref={(el) => {
                    buttonsRef.current[index] = el;
                  }}
                  className="mt-4"
                  variant="hero"
                  size="sm"
                >
                  View flights →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
