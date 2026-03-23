import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TfL — Payments for individual and fleet drivers · Asakala',
  description: 'Redesigning the payments and account landing page for Transport for London drivers.',
};

const contribution = [
  'Advocating good design practices with various stakeholders',
  'Briefing and planning user research with external agency',
  'Mapping out complex use cases',
  'Creation of new UI patterns for this use case',
];

const team = [
  '1 × product manager',
  '1 × product designer (me)',
  '1 × business analyst',
  '1 × business process manager',
];

const impact = [
  'Achieving positive change in ways of working between siloed teams',
  'Created UI patterns that were accessible, worked for the use case and worked with future design direction',
  'Successfully negotiated testing and user centred practices',
  'Delivered final designs that can be utilised for other journeys within the space',
];

const processImages = [
  {
    src: '/projects/tfl/Tfl-image1.avif',
    caption: 'Existing live experience and what the project team were considering to implement before I joined (using existing library components)',
  },
  {
    src: '/projects/tfl/Tfl-image2.avif',
    caption: 'Workshops I led to understand and organise the account statuses and actions',
  },
  {
    src: '/projects/tfl/Tfl-image3.avif',
    caption: 'Illustration of high level process map',
  },
  {
    src: '/projects/tfl/Tfl-image4.avif',
    caption: 'Initial wireframes and permutations of status',
  },
  {
    src: '/projects/tfl/Tfl-image5.avif',
    caption: 'Exploring visual language for notification states',
  },
  {
    src: '/projects/tfl/Tfl-image6.avif',
    caption: 'Considering future states of the wider changes to the TfL architecture as a whole',
  },
  {
    src: '/projects/tfl/Tfl-image7.avif',
    caption: 'Refining notification states and language',
  },
  {
    src: '/projects/tfl/Tfl-image8.avif',
    caption: 'Final state and specifications',
  },
];

export default function TflProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc]">

      {/* Header */}
      <header className="w-full sticky top-0 bg-gradient-to-b from-[#f2fce2]/95 to-[#eff0fc]/95 backdrop-blur-sm z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 sm:py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-black hover:text-black/60 transition-colors text-base font-medium focus:outline-none focus:underline focus:underline-offset-4"
          >
            ← Back
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 lg:gap-10">
            <Link href="/#work" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] font-medium focus:outline-none focus:underline focus:underline-offset-4">Work</Link>
            <Link href="/#about" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] font-medium focus:outline-none focus:underline focus:underline-offset-4">About</Link>
            <Link href="/#contact" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] font-medium focus:outline-none focus:underline focus:underline-offset-4">Contact</Link>
          </nav>
        </div>
      </header>

      <main>

        {/* Hero */}
        <section className="w-full py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <p className="text-sm text-black/40 mb-6 tracking-wide uppercase">Transport for London · 2024</p>
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-medium leading-[106%] tracking-[-0.05em] text-black max-w-3xl">
              Payments for individual and fleet drivers
            </h1>
          </div>
        </section>

        {/* Hero image */}
        <section className="w-full">
          <img
            src="/tfl-dashboard.avif"
            alt="TfL payments dashboard interface"
            className="w-full h-auto"
          />
        </section>

        {/* Overview */}
        <section className="w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-10 sm:mb-14">
              Overview
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

              {/* Goal */}
              <div className="lg:col-span-6">
                <h3 className="text-sm font-medium text-black/40 uppercase tracking-wide mb-3">The goal</h3>
                <p className="text-lg sm:text-xl lg:text-[22px] leading-[155%] tracking-[-0.03em] text-black mb-4">
                  Re design the payments and account landing page so that drivers in London can understand their account with ease and confidently make payments and take needed actions on their account.
                </p>
                <p className="text-lg sm:text-xl lg:text-[22px] leading-[155%] tracking-[-0.03em] text-black/60">
                  The overarching challenge: an impending platform change and an already overwhelmed project team.
                </p>
              </div>

              {/* Meta */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">

                <div>
                  <h3 className="text-sm font-medium text-black/40 uppercase tracking-wide mb-4">My contribution</h3>
                  <ul className="space-y-3">
                    {contribution.map((item) => (
                      <li key={item} className="text-base lg:text-[17px] leading-[150%] text-black/80">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black/40 uppercase tracking-wide mb-4">The team</h3>
                  <ul className="space-y-3">
                    {team.map((item) => (
                      <li key={item} className="text-base lg:text-[17px] leading-[150%] text-black/80">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black/40 uppercase tracking-wide mb-4">Year</h3>
                  <p className="text-base lg:text-[17px] text-black/80">2024</p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="w-full border-t border-black/8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-10 sm:mb-14">
              Process
            </h2>

            {/* Impact */}
            <div className="mb-16 sm:mb-20">
              <h3 className="text-xl sm:text-2xl font-medium text-black mb-6">Impact</h3>
              <ul className="space-y-4 max-w-2xl">
                {impact.map((item) => (
                  <li key={item} className="flex gap-3 text-lg sm:text-[20px] leading-[150%] tracking-[-0.02em] text-black/80">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process image grid */}
          </div>
        </section>

        {processImages.map((item, i) => (
          <section key={i} className="w-full py-8 sm:py-10">
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-auto"
            />
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 mt-4">
              <p className="text-sm sm:text-base text-black/40 leading-[150%] max-w-xl">{item.caption}</p>
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="w-full border-t border-black/8 py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-between">
            <p className="text-black/55 text-sm tracking-[-0.03em]">© 2026 Asakala Geraghty</p>
            <Link href="/" className="text-sm text-black/55 hover:text-black transition-colors">← Back to portfolio</Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
