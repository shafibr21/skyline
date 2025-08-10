export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 md:gap-4 px-6 py-2 md:flex-row">
        <span className="font-display text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">SKYLINE</span>
        <p className="text-sm text-muted-foreground text-black">
          © {new Date().getFullYear()} SKYLINE Travel Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
