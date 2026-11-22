import Link from 'next/link';

type NavItem = { href: string; label: string };

const defaultNav: NavItem[] = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

/**
 * Global header kept from the live site: coral blob (home link) on the left,
 * Work / About / Contact on the right. Sticky, page gradient at 95% + blur.
 * Nav links have 44px tall hit areas (WCAG 2.5.5 AAA).
 */
export default function SiteHeader({ extraNav = [] }: { extraNav?: NavItem[] }) {
  const nav = [...defaultNav, ...extraNav];
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm">
      <div className="container-page flex items-center justify-between py-4 sm:py-6">
        <Link href="/" aria-label="Asakala Geraghty, home" className="blob-link -m-1 rounded-full p-1">
          <span className="blob" aria-hidden="true" />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center justify-end gap-x-1 sm:gap-x-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-nav inline-flex min-h-11 min-w-12 items-center justify-center rounded-lg px-2 text-foreground underline-offset-[6px] decoration-2 hover:underline sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
