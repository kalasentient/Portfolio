import type { Metadata } from 'next';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { CaseStudyHeader, Facts, Figure, Prose, Section, SectionHeader } from '@/app/components/ui';

export const metadata: Metadata = {
  title: 'John Lewis — Shipping a GenAI chatbot while the ground kept moving · Asakala',
  description: 'Using GenAI to make John Lewis WhatsApp customer service faster, for customers and for the agents who pick up conversations.',
};

const contribution = [
  'Product design and product strategy',
  'Responsible principles for AI',
  'User research',
];

const team = [
  '1 × product manager',
  '1 × product designer (me)',
  '1 × business analyst',
  '3 × engineers',
];

const shiftingBrief = [
  { label: 'Technology', text: 'GenAI was moving month to month, so what was possible kept changing.' },
  { label: 'Data', text: 'no one had safely analysed real chat transcripts before, so we didn’t know what problems we were solving.' },
  { label: 'Metrics', text: 'the existing measures were too thin to tell whether anything worked.' },
  { label: 'Platform', text: 'the current Salesforce setup limited which interactions we could build.' },
  { label: 'Timeline', text: 'a short contract with a small team (one PM, one BA, three engineers and me).' },
];

type Principle = {
  title: string;
  points: { label?: string; text: string; subPoints?: string[] }[];
};

const principles: Principle[] = [
  {
    title: '1. Learn just enough, then learn by building.',
    points: [
      { text: 'Instead of a long discovery phase, I negotiated a time-boxed one: in-person workshops, observation sessions and interviews with customer service agents.' },
      { text: 'That gave us enough grounding to form hypotheses quickly. We kept the agents involved throughout instead of handing off the research.' },
    ],
  },
  {
    title: '2. Use a working prototype for alignment, not a spec.',
    points: [
      { text: 'With requirements still moving, static mockups would have been redone every week. I built a working prototype connected to an LLM.' },
      { text: 'Stakeholders could see real responses and react to them, so decisions happened in days rather than review cycles.' },
    ],
  },
  {
    title: '3. Build the foundations the project was missing.',
    points: [
      { text: 'There was no safe way to analyse transcripts, so I worked with the privacy and data teams to create one. It became a reusable framework for future GenAI projects.' },
      { text: 'There weren’t enough meaningful metrics, so I set baselines and designed in-chat customer feedback, so that tests would produce real answers.' },
    ],
  },
  {
    title: '4. Design for the platform we had, and plan for the one coming.',
    points: [
      { text: 'Rich interactions were constrained by the current Salesforce version. I designed what could ship now and set out what would unlock on upgrade.' },
      { text: 'One example is the recent-orders carousel: customers tap an order instead of hunting for an order number.' },
    ],
  },
];

const principleFive: Principle = {
  title: '5. Let the approach evolve with what we learned.',
  points: [
    { label: 'The issue', text: 'testing showed where the intent-based bot broke, especially on unexpected or out-of-scope messages. One model wouldn’t cover every case.' },
    {
      label: 'What we moved to',
      text: 'a hybrid approach.',
      subPoints: [
        'Predictable answers from intents and API calls',
        'Policy answers from RAG (retrieval from approved documents)',
        'GenAI for messages we hadn’t anticipated',
      ],
    },
    { label: 'A confidence threshold', text: 'an accuracy framework decided when the bot should act and when it should hand over to an agent.' },
  ],
};

const images = {
  routingTest: {
    src: '/projects/john-lewis/jl-image1.webp',
    alt: "Conversation flow for an online order: the bot's greeting and questions, example customer replies, and a decision point that routes the chat to troubleshooting or customer service.",
    caption: 'Our first version testing if “routing to a team” was working and useful',
  },
  processMap: {
    src: '/projects/john-lewis/jl-image2.webp',
    alt: 'Flowchart of the phase 1 bot logic: questions about where the item was bought and whether it was damaged, leading to an order lookup, an identity check or referral to the manufacturer.',
    caption: 'Illustration of high level process map and the new phase 1/2 plan',
  },
  trainingPrototyping: {
    src: '/projects/john-lewis/jl-image3.webp',
    alt: "Bot training setup: a spreadsheet of example customer phrases for a 'report damaged item' intent, next to a prototype conversation flow with an AI-generated response step.",
    caption: 'Image detailing processes for training and prototyping the AI Bot',
  },
  accuracyFramework: {
    src: '/projects/john-lewis/jl-image4.webp',
    alt: 'Slide listing the primary and secondary metrics to measure, next to Salesforce dashboard charts of WhatsApp bot sessions.',
    caption: 'Accuracy classification framework — working out more accurate intent matching classifications',
  },
};

const impact = [
  'Fewer customers waiting in the queue at any one time',
  'A better experience for agents, with fewer repetitive queries and context at handover',
  '20% fewer agent messages needed to reach a resolution',
  'A reusable GenAI and privacy framework, adopted for future John Lewis AI projects',
];

const keptFixed = [
  'The user’s voice and access to test with them',
  'Clear measures of success',
  'Keeping accessibility and UI at a high standard',
  'Guardrails for AI ethics and safety',
];

function PrincipleBlock({ principle }: { principle: Principle }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-h3 text-foreground measure">{principle.title}</h3>
      <Prose>
        <ul>
          {principle.points.map((point) => (
            <li key={point.text}>
              {point.label && <strong>{point.label}: </strong>}
              {point.text}
              {point.subPoints && (
                <ul>
                  {point.subPoints.map((sub) => (
                    <li key={sub}>{sub}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Prose>
    </div>
  );
}

export default function JohnLewisProject() {
  let fig = 0;
  const figure = (image: { src: string; alt: string; caption: string }) => (
    <Figure src={image.src} alt={image.alt} number={++fig} caption={image.caption} />
  );

  return (
    <CaseStudyLayout>
      {/* Intro */}
      <div className="flex flex-col gap-12">
        <CaseStudyHeader
          eyebrow="John Lewis · 2023 · Senior product designer · 5-month contract"
          title="Shipping a GenAI chatbot while the ground kept moving"
        />
        <Figure src="/johnlewis-chatbot.avif" alt="John Lewis WhatsApp chatbot interface" fit="cover" priority />
        <Facts
          facts={[
            { label: 'My contribution', value: <ul className="space-y-3">{contribution.map((item) => <li key={item}>{item}</li>)}</ul> },
            { label: 'The team', value: <ul className="space-y-3">{team.map((item) => <li key={item}>{item}</li>)}</ul> },
            { label: 'Year', value: '2023' },
          ]}
        />
      </div>

      {/* Overview */}
      <Section aria-labelledby="goal-heading">
        <SectionHeader id="goal-heading" eyebrow="01 — Overview" title="The goal" />
        <Prose>
          <p className="text-body-lg text-foreground">
            John Lewis wanted to use GenAI to make its WhatsApp customer service faster, both for customers and for the agents who pick up conversations.
          </p>
          <p>The brief kept shifting as we went:</p>
          <ul>
            {shiftingBrief.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </Prose>
      </Section>

      {/* Guiding principles */}
      <Section aria-labelledby="principles-heading">
        <SectionHeader id="principles-heading" eyebrow="02 — Approach" title="Guiding principles I created for this project" />
        <PrincipleBlock principle={principles[0]} />
        <PrincipleBlock principle={principles[1]} />
        {figure(images.routingTest)}
        {figure(images.trainingPrototyping)}
        <PrincipleBlock principle={principles[2]} />
        {figure(images.accuracyFramework)}
        <PrincipleBlock principle={principles[3]} />
        <PrincipleBlock principle={principleFive} />
      </Section>

      {/* A moment the requirements changed */}
      <Section aria-labelledby="change-heading">
        <SectionHeader id="change-heading" eyebrow="03 — Change" title="A moment the requirements changed" />
        <Prose>
          <p>
            Midway through, another part of the business began changing how customers and agents troubleshoot an entire product category. That changed the bot&apos;s routing completely while its structure was already in build. I negotiated a phased approach and quickly redesigned parts of the bot&apos;s structure without compromising the overall design.
          </p>
        </Prose>
        {figure(images.processMap)}
      </Section>

      {/* Impact */}
      <Section aria-labelledby="impact-heading">
        <SectionHeader id="impact-heading" eyebrow="04 — Outcome" title="Impact" />
        <Prose>
          <ul>
            {impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Prose>
      </Section>

      {/* Reflection */}
      <Section aria-labelledby="reflection-heading">
        <SectionHeader id="reflection-heading" eyebrow="05 — Reflection" title="What this means for how I work now" />
        <Prose>
          <p>On AI products, requirements tend to keep moving. Some things I hold strong as a designer:</p>
          <ul>
            {keptFixed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Prose>
      </Section>
    </CaseStudyLayout>
  );
}
