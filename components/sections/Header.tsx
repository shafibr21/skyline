import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-1 md:gap-2"
          aria-label="SKYLINE Home"
        >
          {/** Company Logo */}
          <Image src="/logo.png" alt="SKYLINE Logo" width={32} height={32} />
          <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            SKYLINE
          </span>
        </Link>
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
        <div className="flex items-center gap-1 md:gap-3">
          <ThemeToggle />
          <Button variant="hero">Sign in</Button>
          <Button variant="hero">My Trips</Button>
        </div>
      </nav>
    </header>
  );
}
