"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: "Saturated savings",
    desc: "We highlight bold, high‑value fares across 1000+ routes daily.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    desc: "Find, compare, and checkout in seconds with streamlined flows.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Support that soars",
    desc: "24/7 global assistance from real humans—before and after you fly.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with wave effect
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || "";
        titleRef.current.innerHTML = titleText
          .split(" ")
          .map((word) => `<span class="inline-block mr-4">${word}</span>`)
          .join("");

        gsap.fromTo(
          titleRef.current.querySelectorAll("span"),
          {
            opacity: 0,
            y: 80,
            rotationX: -90,
            transformOrigin: "50% 50% -50px",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Feature cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial entrance animation
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              rotationY: index % 2 === 0 ? -45 : 45,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );

          // Icon animation
          const iconContainer = iconsRef.current[index];
          if (iconContainer) {
            // Pulse effect on scroll into view
            gsap.fromTo(
              iconContainer,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                delay: index * 0.1 + 0.3,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                },
              }
            );
          }

          // Enhanced hover animations
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out",
            });

            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1.2,
                duration: 0.3,
                ease: "power2.out",
              });
            }

            // Glow effect
            gsap.to(card, {
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.1), 0 0 40px rgba(59, 130, 246, 0.3)",
              duration: 0.3,
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }

            gsap.to(card, {
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              duration: 0.3,
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });

      // Magnetic button effect
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 90%",
            },
          }
        );

        const button = buttonRef.current;
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

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          button.removeEventListener("mousemove", handleMouseMove);
          button.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="w-full perspective-1000">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl text-center"
        >
          Why choose SKYLINE
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="rounded-xl border bg-card p-6 shadow-sm cursor-pointer transform-gpu relative overflow-hidden"
                style={{ opacity: 0 }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 hover:opacity-5`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      ref={(el) => {
                        iconsRef.current[index] = el;
                      }}
                      className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-display text-xl">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button
            ref={buttonRef}
            size="lg"
            variant="hero"
            className="transform-gpu relative overflow-hidden"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10">Get started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>
      </div>
    </section>
  );
}
