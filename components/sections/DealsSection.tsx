import { Button } from "@/components/ui/button";

const deals = [
  {
    title: "Paris",
    copy: "From $349 round‑trip",
    image:
      "http://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tokyo",
    copy: "From $699 round‑trip",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&auto=format",
  },
  {
    title: "New York",
    copy: "From $199 round‑trip",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop&auto=format",
  },
];

export default function DealsSection() {
  return (
    <section id="deals" className="w-full bg-secondary/10">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="font-display text-4xl md:text-5xl">
          Today's vibrant deals
        </h2>
        <p className="mt-2 text-muted-foreground">
          Fresh fares to spark your next getaway.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {deals.map((deal) => (
            <article
              key={deal.title}
              className="group rounded-xl border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={deal.image}
                  alt={`${deal.title} destination`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{deal.title}</h3>
                <p className="mt-2 text-muted-foreground">{deal.copy}</p>
                <Button className="mt-4" variant="hero" size="sm">
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
