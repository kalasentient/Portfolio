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

const processImages = [
  {
    src: '/projects/tfl/Tfl-image1.avif',
    alt: "Side by side: the old London Road User Charging account page with a grid of option cards, and an early 'Elena's driving hub' concept with service cards and an Auto Pay pending banner.",
    caption: 'Existing live experience and what the project team were considering to implement before I joined (using existing library components) Essentially no data was being brought forward for users to view',
  },
  {
    src: '/projects/tfl/Tfl-image2.avif',
    alt: 'Workshop board mapping account statuses for Autopay and Blue Badge discount, with sticky notes for each status, the actions users can take and the data they can see.',
    caption: 'Initially the challenge was being able to sell the value of making sure we understood the business Fleet users too. I created user testing proposals and discussion guides. This was the first step to bringing the wider business teams into the impact that these changes would have on both indivudal customers and businesses who were paying for driving charges and how each of their needs were so different. I led a series of workshops to uncover and organise the account statuses, data points and user actions. Digging into what were considerd edge cases and understanding the size of their impact. For example for the various discounts and the knock on affects of customers lack of understanding on how to use them.',
  },
  {
    src: '/projects/tfl/Tfl-image3.avif',
    alt: 'Four low-fidelity wireframes of a driving account page, each tagged with a status, such as a payment card about to expire or all OK, and whether Auto Pay is set up.',
    caption: "Initial thinking wireframes and permutations of status. How do the Pay as you go features interact with the AutoPay functionalities and how do we balance the intentions of the organisation vs the customer's journey priority",
  },
  {
    src: '/projects/tfl/Tfl-image4.avif',
    alt: 'Collage of other TfL products for reference: the TfL Go Oyster card screen, notification prompts, the Status page, and a note on designing while the new visual language was still in progress.',
    caption: 'Working with other designers on the team to understand the evolving landscape of new visual language that was due to be released soon. This included looking at how "driving" was positioned within the whole Tfl ecosystem and how the data within card components were prioritised progressively expanded ',
  },
  {
    src: '/projects/tfl/Tfl-image5.avif',
    alt: 'Explorations of an account overview and a driving dashboard, with cards for Autopay, vehicles, discounts, recent charges and a postcode checker.',
    caption: "Exploring how an account might look for a customer who drives and uses other public transport regularly. The cards would change positioning based on priority. For example even if charges were not regularly due for a specific car, if the discount applied was due to expire we would need this prompt to feature first and take precedence above recent charges due to the dire consequences for the customer of non action. The scope of the project didn't allow certain penalty charge systems to communicate with account dashboard systems for example",
  },
  {
    src: '/projects/tfl/Tfl-image6.avif',
    alt: 'Nine dashboard variations for personal and business accounts, showing Auto Pay and discount cards with red and amber alerts such as an expired card or a discount about to expire.',
    caption: 'Refining urgent notification states and visual language and considering how these card patterns might scale in other scenarios and remain up to the WCAG AA guidelines standards',
  },
  {
    src: '/projects/tfl/Tfl-image7.avif',
    alt: 'Library of alert banners for Autopay, Fleet Autopay and discounts in blue, amber and red, next to a close-up of an Auto Pay card with a payment failed alert and spacing annotations.',
    caption: 'Refining the card layout, all possible language states across customer and business fleet accounts',
  },
  {
    src: '/projects/tfl/Tfl-image8.avif',
    alt: 'Specification board: for each Auto Pay status, the user actions, a given-when-then rule and an annotated screen of the dashboard.',
    caption: "Creating specification documents for each account state. Aligning with the product engineering team to ensure shared understanding. Agreeing with Product on which notifications were part of service notification and so the customer didn't need to be opted in.",
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
