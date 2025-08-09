import { Button } from "@/components/ui/button";
import { Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Saturated savings",
    desc: "We highlight bold, high‑value fares across 1000+ routes daily.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    desc: "Find, compare, and checkout in seconds with streamlined flows.",
  },
  {
    icon: Users,
    title: "Support that soars",
    desc: "24/7 global assistance from real humans—before and after you fly.",
  },
];

export default function WhySection() {
  return (
    <section id="why" className="w-full">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="font-display text-4xl md:text-5xl">
          Why choose SKYLINE
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.desc}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-10">
          <Button size="lg" variant="hero">
            Get started
          </Button>
        </div>
      </div>
    </section>
  );
}
