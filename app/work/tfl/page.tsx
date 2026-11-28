import type { Metadata } from 'next';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { CaseStudyHeader, Facts, Figure, Prose, Section, SectionHeader } from '@/app/components/ui';

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

const goalPrinciples = [
  'Timely, bound by strict contract end date from current supplier',
  'Encourages users to adopt Autopay when more convenient',
  'Risk averse, yet not reliant on data',
  'Adaptable to the upcoming visual design vision',
  'Considered, with regards to how it fits into the Tfl ecosystem',
];

const processImages = [
  {
    src: '/projects/tfl/Tfl-image1.avif',
    alt: "Side by side: the old London Road User Charging account page with a grid of option cards, and an early 'Elena's driving hub' concept with service cards and an Auto Pay pending banner.",
    caption: 'The existing live experience, and what the project team were considering before I joined. Essentially no data was being brought forward for users to view.',
  },
  {
    src: '/projects/tfl/Tfl-status-map.avif',
    alt: 'Sticky-note map in four rows: account statuses, actions users can take, data users can access and communications, with the most urgent items numbered by priority.',
    caption: 'I led workshops to uncover and organise the account statuses, actions, data points and communications, bringing the wider business teams into how differently individual customers and fleet businesses would be affected.',
  },
  {
    src: '/projects/tfl/Tfl-image4.avif',
    alt: 'Collage of other TfL products for reference: the TfL Go Oyster card screen, notification prompts, the Status page, and a note on designing while the new visual language was still in progress.',
    caption: 'Working with other designers to understand the new visual language due for release, and how driving sat within the wider TfL ecosystem.',
  },
  {
    src: '/projects/tfl/Tfl-image5.avif',
    alt: 'Explorations of an account overview and a driving dashboard, with cards for Autopay, vehicles, discounts, recent charges and a postcode checker.',
    caption: 'Exploring how an account might look for a customer who drives and also uses public transport. Cards change position by priority, so an expiring discount comes before recent charges.',
  },
  {
    src: '/projects/tfl/Tfl-image6.avif',
    alt: 'Nine dashboard variations for personal and business accounts, showing Auto Pay and discount cards with red and amber alerts such as an expired card or a discount about to expire.',
    caption: 'Refining urgent notification states and how the card patterns scale to other scenarios, while meeting WCAG AA.',
  },
  {
    src: '/projects/tfl/Tfl-image7.avif',
    alt: 'Library of alert banners for Autopay, Fleet Autopay and discounts in blue, amber and red, next to a close-up of an Auto Pay card with a payment failed alert and spacing annotations.',
    caption: 'Refining the card layout and every language state across customer and fleet accounts.',
  },
];

export default function TflProject() {
  return (
    <CaseStudyLayout>
      {/* Intro */}
      <div className="flex flex-col gap-12">
        <CaseStudyHeader eyebrow="Transport for London · 2024" title="Payments for individual and fleet drivers" />
        <Figure src="/tfl-dashboard.avif" alt="TfL payments dashboard interface" fit="cover" priority />
        <Facts
          facts={[
            { label: 'My contribution', value: <ul className="space-y-3">{contribution.map((item) => <li key={item}>{item}</li>)}</ul> },
            { label: 'The team', value: <ul className="space-y-3">{team.map((item) => <li key={item}>{item}</li>)}</ul> },
            { label: 'Year', value: '2024' },
          ]}
        />
      </div>

      {/* Overview */}
      <Section aria-labelledby="goal-heading">
        <SectionHeader id="goal-heading" eyebrow="01 — Overview" title="The goal" />
        <Prose>
          <p className="text-foreground">
            Re design the payments and account landing page so that drivers in London can understand their account with ease and confidently make payments and take needed actions on their account.
          </p>
          <p>How can we redesign the Transport for London driving dashboard in a way that is:</p>
          <ul>
            {goalPrinciples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            The overarching challenge: an impending platform change and an already overwhelmed project team.
          </p>
        </Prose>
      </Section>

      {/* Process */}
      <Section aria-labelledby="impact-heading">
        <SectionHeader id="impact-heading" eyebrow="02 — Process" title="Impact" />
        <Prose>
          <ul>
            {impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Prose>
        {processImages.map((item, i) => (
          <Figure key={item.src} src={item.src} alt={item.alt} number={i + 1} caption={item.caption} />
        ))}
      </Section>
    </CaseStudyLayout>
  );
}
