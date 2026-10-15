import Link from 'next/link';
import type { Metadata } from 'next';
import BackButton from '@/app/components/BackButton';

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
    caption: 'Our first version testing if “routing to a team” was working and useful',
  },
  processMap: {
    src: '/projects/john-lewis/jl-image2.webp',
    caption: 'Illustration of high level process map and the new phase 1/2 plan',
  },
  trainingPrototyping: {
    src: '/projects/john-lewis/jl-image3.webp',
    caption: 'Image detailing processes for training and prototyping the AI Bot',
  },
  accuracyFramework: {
    src: '/projects/john-lewis/jl-image4.webp',
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

const bodyText = 'text-lg sm:text-[24px] leading-[145%] tracking-normal text-black';
const listItem = 'text-lg sm:text-[24px] leading-[145%] tracking-normal text-black';
const listStyle = 'list-disc pl-6 sm:pl-8 space-y-3 marker:text-black/40';
const sectionHeading = 'text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-8 sm:mb-12';

function PrincipleBlock({ principle, className = '' }: { principle: Principle; className?: string }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      <h3 className="text-2xl sm:text-[32px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-4 sm:mb-6">{principle.title}</h3>
      <ul className={listStyle}>
        {principle.points.map((point) => (
          <li key={point.text} className={listItem}>
            <div>
              {point.label && <span className="font-medium">{point.label}: </span>}
              {point.text}
              {point.subPoints && (
                <ul className={`${listStyle} mt-3 list-[circle]`}>
                  {point.subPoints.map((sub) => (
                    <li key={sub} className={listItem}>
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImageBlock({ image }: { image: { src: string; caption: string } }) {
  return (
    <section className="w-full py-8 sm:py-10">
      <img
        src={image.src}
        alt={image.caption}
        className="w-full h-auto"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 mt-4">
        <p className="text-lg sm:text-xl text-black/50 leading-[145%] max-w-3xl">{image.caption}</p>
      </div>
    </section>
  );
}

export default function JohnLewisProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc]">

      {/* Header */}
      <header className="w-full sticky top-0 bg-gradient-to-b from-[#f2fce2]/95 to-[#eff0fc]/95 backdrop-blur-sm z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 sm:py-6 flex items-center justify-between">
          <BackButton />
          <nav className="flex items-center gap-4 sm:gap-6 lg:gap-10">
            <Link href="/#work" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] lg:text-[22px] font-medium tracking-normal focus:outline-none focus:underline focus:underline-offset-4">Work</Link>
            <Link href="/#about" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] lg:text-[22px] font-medium tracking-normal focus:outline-none focus:underline focus:underline-offset-4">About</Link>
            <Link href="/#contact" className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] lg:text-[22px] font-medium tracking-normal focus:outline-none focus:underline focus:underline-offset-4">Contact</Link>
          </nav>
        </div>
      </header>

      <main>

        {/* Hero */}
        <section className="w-full py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <p className="text-lg sm:text-xl text-black/50 mb-6">John Lewis · 2023 · Senior product designer · 5-month contract</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[80px] font-medium leading-[106%] tracking-normal text-black max-w-5xl">
              Shipping a GenAI chatbot while the ground kept moving
            </h1>
          </div>
        </section>

        {/* Hero image */}
        <section className="w-full">
          <img
            src="/johnlewis-chatbot.avif"
            alt="John Lewis WhatsApp chatbot interface"
            className="w-full h-auto"
          />
        </section>

        {/* Overview */}
        <section className="w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className={sectionHeading}>
              Overview
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

              {/* Goal */}
              <div className="lg:col-span-6">
                <h3 className="text-lg sm:text-xl text-black/50 mb-3">The goal</h3>
                <p className="text-xl sm:text-2xl lg:text-[32px] leading-[142%] tracking-normal text-black mb-6 lg:mb-8">
                  John Lewis wanted to use GenAI to make its WhatsApp customer service faster, both for customers and for the agents who pick up conversations.
                </p>
                <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black/66 mb-4">
                  The brief kept shifting as we went:
                </p>
                <ul className={listStyle}>
                  {shiftingBrief.map((item) => (
                    <li key={item.label} className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black/66">
                      <span className="font-medium text-black">{item.label}:</span> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">

                <div>
                  <h3 className="text-lg sm:text-xl text-black/50 mb-3">My contribution</h3>
                  <ul className="space-y-3">
                    {contribution.map((item) => (
                      <li key={item} className="text-lg sm:text-[20px] leading-[145%] text-black">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl text-black/50 mb-3">The team</h3>
                  <ul className="space-y-3">
                    {team.map((item) => (
                      <li key={item} className="text-lg sm:text-[20px] leading-[145%] text-black">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl text-black/50 mb-3">Year</h3>
                  <p className="text-lg sm:text-[20px] leading-[145%] text-black">2023</p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Guiding principles 1–2 */}
        <section className="w-full border-t border-black/8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className={sectionHeading}>
              Guiding principles I created for this project
            </h2>
            <PrincipleBlock principle={principles[0]} className="mb-12 sm:mb-16" />
            <PrincipleBlock principle={principles[1]} />
          </div>
        </section>

        <ImageBlock image={images.routingTest} />
        <ImageBlock image={images.trainingPrototyping} />

        {/* Guiding principle 3 */}
        <section className="w-full py-8 sm:py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <PrincipleBlock principle={principles[2]} />
          </div>
        </section>

        <ImageBlock image={images.accuracyFramework} />

        {/* Guiding principles 4–5 */}
        <section className="w-full pt-8 sm:pt-10 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <PrincipleBlock principle={principles[3]} className="mb-12 sm:mb-16" />
            <PrincipleBlock principle={principleFive} />
          </div>
        </section>

        {/* A moment the requirements changed */}
        <section className="w-full border-t border-black/8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className={sectionHeading}>
              A moment the requirements changed
            </h2>
            <div className="max-w-4xl">
              <p className={bodyText}>
                Midway through, another part of the business began changing how customers and agents troubleshoot an entire product category. That changed the bot&apos;s routing completely while its structure was already in build. I negotiated a phased approach and quickly redesigned parts of the bot&apos;s structure without compromising the overall design.
              </p>
            </div>
          </div>
        </section>

        <ImageBlock image={images.processMap} />

        {/* Impact */}
        <section className="w-full border-t border-black/8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className={sectionHeading}>
              Impact
            </h2>
            <ul className={`max-w-4xl ${listStyle}`}>
              {impact.map((item) => (
                <li key={item} className={listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What this means for how I work now */}
        <section className="w-full border-t border-black/8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className={sectionHeading}>
              What this means for how I work now
            </h2>
            <div className="max-w-4xl space-y-6">
              <p className={bodyText}>
                On AI products, requirements tend to keep moving. Some things I hold strong as a designer:
              </p>
              <ul className={listStyle}>
                {keptFixed.map((item) => (
                  <li key={item} className={listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-black/8 py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-between">
            <p className="text-black/55 text-sm sm:text-base tracking-normal">© 2026 Asakala Geraghty</p>
            <Link href="/" className="text-sm sm:text-base text-black/55 hover:text-black transition-colors">← Back to portfolio</Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
