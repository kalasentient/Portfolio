const links = [
  { href: 'https://linkedin.com/in/asakala', label: 'LinkedIn', external: true },
  { href: 'https://github.com/kalasentient', label: 'GitHub', external: true },
  { href: 'mailto:asakalageraghty@gmail.com', label: 'Email', external: false },
];

export default function SiteFooter() {
  return (
    <footer className="container-page mt-24 lg:mt-40">
      <div className="flex flex-col gap-2 border-t border-border py-8 text-eyebrow text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Asakala Geraghty</p>
        <ul className="flex flex-wrap items-center" aria-label="Elsewhere">
          {links.map((l, i) => (
            <li key={l.label} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="px-1">·</span>}
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex min-h-11 items-center rounded px-1 underline-offset-4 hover:text-foreground hover:underline"
              >
                {l.label}
                {l.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
