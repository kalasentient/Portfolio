import Link from 'next/link';
import type { Metadata } from 'next';
import BackButton from '@/app/components/BackButton';

export const metadata: Metadata = {
  title: 'UK Bank — Designing systems with automation · Asakala',
  description: 'How do you introduce automation into a process that traditionally relies upon human relationships in business banking?',
};

const contribution = [
  'Product strategy and planning enabling delivery to timeframes',
  'Communicating and leading workshops with varying groups of stakeholders from around the business to build more cohesive communication',
  'Discovery research to better understand both internal teams and customer facing products',
  'Delivery of final UI and specifications',
];

const team = [
  '1 × product manager',
  '5 × product designer (me)',
  '1 × business analyst',
  'Various teams of engineers',
];

const processSteps = [
  {
    heading: null,
    body: 'Understanding first hand through interviews and observation how the current system is working for the various internal teams.',
  },
  {
    heading: null,
    body: 'As well as the secondary users — the business banking customers and the varied sizes and needs.',
  },
  {
    heading: null,
    body: 'Mapping out the system data (as seen above) on a high level.',
  },
  {
    heading: null,
    body: 'Creating mock ups using Azure.',
  },
  {
    heading: null,
    body: 'Testing the mockups and refining these designs into final screens for build.',
  },
];

const processImages = [
  {
    src: '/projects/payment-system/ps-image1.avif',
    caption: 'System data mapping — high level overview of the payment flows and relationships',
  },
  {
    src: '/projects/payment-system/ps-image2.avif',
    caption: 'Azure mockups and wireframes',
  },
  {
    src: '/projects/payment-system/ps-image3.avif',
    caption: 'Final screens and specifications for build',
  },
  {
    src: '/projects/payment-system/ps-image4.avif',
    caption: '',
  },
  {
    src: '/projects/payment-system/ps-image5.avif',
    caption: '',
  },
];

export default function PaymentSystemProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc]">

      {/* Header */}
      <header className="w-full sticky top-0 bg-gradient-to-b from-[#f2fce2]/95 to-[#eff0fc]/95 backdrop-blur-sm z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 sm:py-6 flex items-center justify-between">
          <BackButton />
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
            <p className="text-sm text-black/40 mb-6 tracking-wide uppercase">UK Bank · 2021/2022</p>
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-medium leading-[106%] tracking-[-0.05em] text-black max-w-3xl">
              Designing systems with automation
            </h1>
          </div>
        </section>

        {/* Hero image */}
        <section className="w-full">
          <img
            src="/payment-system.avif"
            alt="Payment system automation interface"
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
                <p className="text-lg sm:text-xl lg:text-[22px] leading-[155%] tracking-[-0.03em] text-black mb-6">
                  How do you introduce automation into a process that traditionally relies upon human relationships in business banking?
                </p>
                <p className="text-sm text-black/40 leading-[150%] mt-8 border-l-2 border-black/10 pl-4">
                  Kindly note that the assets in this project are referential and limited due to the nature of the project.
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
                  <p className="text-base lg:text-[17px] text-black/80">2021/2022</p>
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

            <ul className="max-w-2xl space-y-5">
              {processSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                  {step.body}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process images */}
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
