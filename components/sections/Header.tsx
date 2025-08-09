import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="/"
          className="flex items-center gap-2"
          aria-label="SKYLINE Home"
        >
          {/** Company Logo */}
          <Image src="/logo.png" alt="SKYLINE Logo" width={32} height={32} />
          <span className="font-display text-2xl font-extrabold tracking-tight text-blue-500">
            SKYLINE
          </span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-primary transition-colors" href="#search">
            Book
          </a>
          <a className="hover:text-primary transition-colors" href="#deals">
            Deals
          </a>
          <a className="hover:text-primary transition-colors" href="#why">
            Why Us
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="hero">Sign in</Button>
          <Button variant="hero">My Trips</Button>
        </div>
      </nav>
    </header>
  );
}
