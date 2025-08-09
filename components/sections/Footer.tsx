export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <span className="font-display text-xl font-bold">SKYLINE</span>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SKYLINE Travel Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
