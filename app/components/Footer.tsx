export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-neutral-500 sm:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Amineos</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/aminegames125" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            GitHub
          </a>
          <a href="#hero" className="transition-colors hover:text-white">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
