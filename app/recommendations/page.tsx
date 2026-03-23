import Link from 'next/link';
import type { Metadata } from 'next';
import BackButton from '@/app/components/BackButton';

export const metadata: Metadata = {
  title: 'Recommendations · Asakala',
  description: 'What colleagues and collaborators say about working with Asakala.',
};

const recommendations = [
  {
    name: 'Placeholder Name',
    title: 'Senior Product Manager · Transport for London',
    relationship: 'Managed Asakala directly',
    date: '2024',
    quote: 'Replace this with the recommendation text from LinkedIn. You can copy each recommendation directly from your LinkedIn profile and paste it here.',
  },
  {
    name: 'Placeholder Name',
    title: 'Head of Design · John Lewis',
    relationship: 'Worked with Asakala on the same team',
    date: '2023',
    quote: 'Replace this with the recommendation text from LinkedIn. You can copy each recommendation directly from your LinkedIn profile and paste it here.',
  },
  {
    name: 'Placeholder Name',
    title: 'Product Lead · Koodoo',
    relationship: 'Managed Asakala directly',
    date: '2022',
    quote: 'Replace this with the recommendation text from LinkedIn. You can copy each recommendation directly from your LinkedIn profile and paste it here.',
  },
];

export default function RecommendationsPage() {
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
            <Link href="/recommendations" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] font-medium focus:outline-none focus:underline focus:underline-offset-4">Recommendations</Link>
          </nav>
        </div>
      </header>

      <main>

        {/* Hero */}
        <section className="w-full py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <p className="text-sm text-black/40 mb-6 tracking-wide uppercase">LinkedIn · Colleagues &amp; collaborators</p>
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-medium leading-[106%] tracking-normal text-black max-w-3xl">
              Recommendations
            </h1>
          </div>
        </section>

        {/* Recommendations list */}
        <section className="w-full border-t border-black/8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="max-w-3xl space-y-12 sm:space-y-16">
              {recommendations.map((rec, i) => (
                <article key={i} className="border-b border-black/8 pb-12 sm:pb-16 last:border-b-0 last:pb-0">
                  <blockquote className="mb-8">
                    <p className="text-lg sm:text-[22px] leading-[160%] tracking-normal text-black">
                      &ldquo;{rec.quote}&rdquo;
                    </p>
                  </blockquote>
                  <div className="flex flex-col gap-1">
                    <p className="text-base sm:text-lg font-medium text-black">{rec.name}</p>
                    <p className="text-sm sm:text-base text-black/60">{rec.title}</p>
                    <p className="text-sm text-black/40">{rec.relationship} · {rec.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-black/8 py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-between">
            <p className="text-black/55 text-sm tracking-normal">© 2026 Asakala Geraghty</p>
            <Link href="/" className="text-sm text-black/55 hover:text-black transition-colors">← Back to portfolio</Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
