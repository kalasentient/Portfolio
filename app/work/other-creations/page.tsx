'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import BackButton from '@/app/components/BackButton';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const tabs = [
  {
    id: 'olfactory',
    label: 'Olfactory',
    heading: 'Olfactory',
    description: 'Creative and Art direction for niche perfume house Illuminum London.',
    images: [
      '/projects/OtherCreative-projects/Olfactory/06-IlluminumLondon-CoreCollection07.jpg',
      '/projects/OtherCreative-projects/Olfactory/07-IlluminumLondon-CoreCollection02.jpg',
      '/projects/OtherCreative-projects/Olfactory/08-IlluminumLondon-CoreCollection01.jpg',
      '/projects/OtherCreative-projects/Olfactory/09-IlluminumLondon-LimitedEditionCollection01.jpg',
      '/projects/OtherCreative-projects/Olfactory/10-IlluminumLondon-LimitedEditionCollection03.jpg',
      '/projects/OtherCreative-projects/Olfactory/11-IlluminumLondon-LimitedEditionCollection02.jpg',
      '/projects/OtherCreative-projects/Olfactory/12-IlluminumLondon-95PercentCollection03.jpg',
      '/projects/OtherCreative-projects/Olfactory/13-IlluminumLondon-95PercentCollection01.jpg',
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion & Textiles',
    heading: 'Fashion and Textiles',
    description: 'Designed and constructed collections of textiles and garments.',
    images: [
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/asakala-driftcollection.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/asakala-muaythai-%20fashioncollection.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/asakala1.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/asakala2.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/asakala3.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/asakala4.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/EddiePeakeKnitwear.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/csm-kp08-750.jpg',
      '/projects/OtherCreative-projects/Fashion%20and%20Textiles/%C2%A9Sylvain-Deleu-%2011.jpg',
    ],
  },
];

export default function OtherCreations() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length });
  }, [lightbox]);

  const next = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prev, next]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc]">

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
            <p className="text-sm text-black/40 mb-6 tracking-wide uppercase">Creative Work</p>
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-medium leading-[106%] tracking-normal text-black max-w-3xl">
              My other creations
            </h1>
          </div>
        </section>

        {/* Tabs */}
        <section className="w-full border-t border-black/8">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div
              role="tablist"
              aria-label="Creative work categories"
              className="flex gap-0 border-b border-black/10"
            >
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-base sm:text-lg font-medium transition-colors focus:outline-none focus:underline focus:underline-offset-4 border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-black/40 hover:text-black/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab panels */}
        {tabs.map(tab => (
          <section
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="w-full py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
              <div className="mb-10 sm:mb-14 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-4">
                  {tab.heading}
                </h2>
                <p className="text-lg sm:text-[20px] leading-[150%] tracking-normal text-black/80">
                  {tab.description}
                </p>
                {tab.id === 'olfactory' && (
                  <a
                    href="https://www.wallpaper.com/lifestyle/colour-as-a-narrative-perfume-brand-illuminum-explores-realm-of-scent-through-architecture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-base sm:text-lg text-black underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                  >
                    Featured in Wallpaper Magazine ↗
                  </a>
                )}
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
                {tab.images.map((src, i) => (
                  <div key={i} className="break-inside-avoid mb-4 sm:mb-6">
                    <button
                      onClick={() => openLightbox(tab.images, i)}
                      className="block w-full group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-xl"
                      aria-label="Enlarge image"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-auto rounded-xl group-hover:opacity-90 transition-opacity cursor-zoom-in"
                        loading={i < 3 ? 'eager' : 'lazy'}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      </main>

      <footer className="w-full border-t border-black/8 py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-between">
          <p className="text-black/55 text-sm tracking-normal">© 2026 Asakala Geraghty</p>
          <Link href="/" className="text-sm text-black/55 hover:text-black transition-colors">← Back to portfolio</Link>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 p-2 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 p-2 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
            {lightbox.index + 1} / {lightbox.images.length}
          </p>
        </div>
      )}

    </div>
  );
}
