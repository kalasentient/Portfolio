import type { Metadata } from 'next';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { CaseStudyHeader, Facts, Figure, Prose, Section, SectionHeader } from '@/app/components/ui';

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
    <CaseStudyLayout>
      {/* Intro */}
      <div className="flex flex-col gap-12">
        <CaseStudyHeader eyebrow="UK Bank · 2021/2022" title="Designing systems with automation" />
        <Figure src="/payment-system.avif" alt="Payment system automation interface" fit="cover" priority />
        <Facts
          facts={[
            { label: 'My contribution', value: <ul className="space-y-3">{contribution.map((item) => <li key={item}>{item}</li>)}</ul> },
            { label: 'The team', value: <ul className="space-y-3">{team.map((item) => <li key={item}>{item}</li>)}</ul> },
            { label: 'Year', value: '2021/2022' },
          ]}
        />
      </div>

      {/* Overview */}
      <Section aria-labelledby="goal-heading">
        <SectionHeader id="goal-heading" eyebrow="01 — Overview" title="The goal" />
        <Prose>
          <p className="text-body-lg text-foreground">
            How do you introduce automation into a process that traditionally relies upon human relationships in business banking?
          </p>
          <p className="text-body-sm text-muted-foreground border-l-2 border-input pl-4">
            Kindly note that the assets in this project are referential and limited due to the nature of the project.
          </p>
        </Prose>
      </Section>

      {/* Process */}
      <Section aria-labelledby="process-heading">
        <SectionHeader id="process-heading" eyebrow="02 — Approach" title="Process" />
        <Prose>
          <ul>
            {processSteps.map((step, i) => (
              <li key={i}>{step.body}</li>
            ))}
          </ul>
        </Prose>
        {processImages.map((item, i) => (
          <Figure key={item.src} src={item.src} number={i + 1} caption={item.caption || undefined} />
        ))}
      </Section>
    </CaseStudyLayout>
  );
}
