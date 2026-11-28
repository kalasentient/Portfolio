import type { Metadata } from 'next';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { CaseStudyHeader, Eyebrow } from '@/app/components/ui';

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
    <CaseStudyLayout extraNav={[{ href: '/recommendations', label: 'Recommendations' }]}>
      <CaseStudyHeader eyebrow="LinkedIn · Colleagues & collaborators" title="Recommendations" />

      <section aria-label="Recommendations" className="measure flex flex-col gap-12">
        {recommendations.map((rec, i) => (
          <figure key={i} className="flex flex-col gap-6 border-t border-border pt-6">
            <blockquote>
              <p className="text-body-lg text-foreground">&ldquo;{rec.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="flex flex-col gap-1">
              <span className="text-label text-foreground">{rec.name}</span>
              <span className="text-body-sm text-body">{rec.title}</span>
              <Eyebrow as="span">{rec.relationship} · {rec.date}</Eyebrow>
            </figcaption>
          </figure>
        ))}
      </section>
    </CaseStudyLayout>
  );
}
