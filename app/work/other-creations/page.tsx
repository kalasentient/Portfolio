'use client';

import { useState, useEffect, useCallback } from 'react';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { CaseStudyHeader } from '@/app/components/ui';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const tabs = [
  {
    id: 'olfactory',
    label: 'Olfactory',
    heading: 'Olfactory',
    description: 'Creative and Art direction for new branding of niche perfume brand Illuminum London located on Dover St, Mayfair. Included art direction, sourcing, research and product management of physical product, fragrance, physical store, website, launch event.',
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
    hidden: true,
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
  const visibleTabs = tabs.filter(t => !t.hidden);
  const [activeTab, setActiveTab] = useState(visibleTabs[0].id);
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
    <>
    <CaseStudyLayout>
      <CaseStudyHeader eyebrow="Creative work" title="Other creative work" />

      <div className="flex flex-col gap-12">
        {/* Tabs */}
        <div role="tablist" aria-label="Creative work categories" className="flex border-b border-border">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px min-h-12 border-b-2 px-6 py-3 text-label transition-colors ${
                activeTab === tab.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {visibleTabs.map(tab => (
          <section
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="flex flex-col gap-12"
          >
            <div className="measure flex flex-col gap-4">
              <span aria-hidden="true" className="block h-1 w-8 bg-accent" />
              <h2 className="text-h2 text-foreground">{tab.heading}</h2>
              <p className="text-body text-body">{tab.description}</p>
              {tab.id === 'olfactory' && (
                <a
                  href="https://www.wallpaper.com/lifestyle/colour-as-a-narrative-perfume-brand-illuminum-explores-realm-of-scent-through-architecture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center self-start text-body text-link underline underline-offset-4 hover:decoration-2"
                >
                  As featured in Wallpaper Magazine ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>

            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {tab.images.map((src, i) => (
                <div key={i} className="mb-6 break-inside-avoid">
                  <button
                    onClick={() => openLightbox(tab.images, i)}
                    className="group block w-full"
                    aria-label={`Enlarge image ${i + 1} of ${tab.images.length}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-auto w-full cursor-zoom-in transition-opacity group-hover:opacity-90"
                      loading={i < 3 ? 'eager' : 'lazy'}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </CaseStudyLayout>

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
            className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex min-h-12 min-w-12 items-center justify-center p-2 text-white hover:bg-white/10 focus-visible:outline-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 inline-flex min-h-12 min-w-12 items-center justify-center p-2 text-white hover:bg-white/10 focus-visible:outline-white rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain "
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 inline-flex min-h-12 min-w-12 items-center justify-center p-2 text-white hover:bg-white/10 focus-visible:outline-white rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-mono text-base tabular-nums">
            {lightbox.index + 1} / {lightbox.images.length}
          </p>
        </div>
      )}
    </>
  );
}
