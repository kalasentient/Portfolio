import type { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { ButtonLink } from './ui';

/** Shell for case study pages: header, "All work" back link, 1200px main column, footer. */
export default function CaseStudyLayout({
  children,
  extraNav,
}: {
  children: ReactNode;
  extraNav?: { href: string; label: string }[];
}) {
  return (
    <>
      <SiteHeader extraNav={extraNav} />
      <main id="main-content" tabIndex={-1} className="container-page flex flex-col gap-24 pt-6 focus:outline-none sm:pt-12">
        <div className="-mb-12">
          <ButtonLink href="/#work" variant="ghost" className="-ml-6">
            <span aria-hidden="true">←</span> All work
          </ButtonLink>
        </div>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
