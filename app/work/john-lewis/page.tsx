import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'John Lewis — Using Gen AI to improve a WhatsApp Chatbot · Asakala',
  description: 'Testing how AI and Gen AI can help make the WhatsApp contact experience faster and more streamlined for customers and chat agents.',
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

const processImages = [
  {
    src: '/projects/john-lewis/jl-image1.avif',
    caption: 'A conversational flow diagram',
  },
  {
    src: '/projects/john-lewis/jl-image2.avif',
    caption: 'Illustration of high level process map',
  },
  {
    src: '/projects/john-lewis/jl-image3.avif',
    caption: 'Image detailing processes for training and prototyping the AI Bot',
  },
  {
    src: '/projects/john-lewis/jl-image4.avif',
    caption: 'Accuracy classification framework — working out more accurate intent matching classifications',
  },
];

const improvementPoints = [
  'Upgrading to a newer version of the Salesforce back end which would mean we could use more of the UI interactions such as carousels for recent order look up.',
  'Whilst AI technology is constantly evolving, the ways in which we can ensure clarity and consistency of experience for users is ever improving.',
  'One of the challenges with Intent based chatbots is how to deal with queries that don\'t match an intent and what to do with those. This could be done through a combination of analysing the chatbot\'s "missed messages" that it didn\'t understand and having a feedback loop or also by using Gen AI to create example utterances.',
  'However having such large amounts of training data affects the performance of the cost of running the chatbot. There will also be intents that are: simply out of scope of the customer service capabilities or chatbot, or simply attempts to break the chatbot so it behaves in an undesirable way.',
];

const hybridApproach = [
  'The traditional intent model',
  'RAG — references closed information points like documents and is much faster to train',
  'Calls on APIs to retrieve personal info like last orders',
  'Gen AI to understand jailbreak/out of scope queries, as these can be difficult to predict with intents',
];

export default function JohnLewisProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc]">

      {/* Header */}
      <header className="w-full sticky top-0 bg-gradient-to-b from-[#f2fce2]/95 to-[#eff0fc]/95 backdrop-blur-sm z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 sm:py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-black hover:text-black/60 transition-colors text-base font-medium focus:outline-none focus:underline focus:underline-offset-4"
          >
            ← Back
          </Link>
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
            <p className="text-sm text-black/40 mb-6 tracking-wide uppercase">John Lewis · 2023</p>
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-medium leading-[106%] tracking-[-0.05em] text-black max-w-3xl">
              Using Gen AI to improve a WhatsApp Chatbot
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
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-10 sm:mb-14">
              Overview
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

              {/* Goal */}
              <div className="lg:col-span-6">
                <h3 className="text-sm font-medium text-black/40 uppercase tracking-wide mb-3">The goal</h3>
                <p className="text-lg sm:text-xl lg:text-[22px] leading-[155%] tracking-[-0.03em] text-black mb-6">
                  Understand and test how AI and Gen AI can help make the WhatsApp contact experience faster and more streamlined, for both customers and chat agents.
                </p>
                <p className="text-lg sm:text-xl lg:text-[22px] leading-[155%] tracking-[-0.03em] text-black/60">
                  Throughout the process I focused on addressing the unique problems within the human agent teams and for customers of John Lewis. With the advancements of this technology it can be easy to want to make fancy features for the sake of features and so I was keen for the project&apos;s goals and outcomes to be steered by the human experience (both the customer and human agents) and the intended business outcomes.
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
                  <p className="text-base lg:text-[17px] text-black/80">2023</p>
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

            {/* Laying down the groundwork */}
            <div className="mb-12 sm:mb-16 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-medium text-black mb-4">Laying down the groundwork</h3>
              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80 mb-4">
                The design process for the AI WhatsApp chatbot involved several key stages. Firstly, negotiating to conduct a time boxed discovery (through a variety of workshops / observational studies / interviews facilitated and lead by myself) to understand the needs and pain points of the agents within the customer service centres who were responding to customer messages.
              </p>
              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80 mb-4">
                <span className="font-medium">First challenge: metrics to measure.</span> I felt it important to analyse the existing messaging transcripts. As this was the first time this analysis was being done, I worked with various teams to make sure this was done safely and created a framework so the team could complete this faster in the future.
              </p>
              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                As the metrics that existed were very limited: whilst creating an initial design for a customer feedback functionality I also created a plan for implementing and baselining other metrics before launching our tests.
              </p>
            </div>

            {/* Shaping the hypotheses */}
            <div className="mb-12 sm:mb-16 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-medium text-black mb-4">Shaping the hypotheses</h3>
              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                Based on the insights from this research, I facilitated design workshops within the team to refine some of the initial ideas. These workshops helped shape the hypotheses for the design tests. I also created a working prototype of the conversation which linked up with large language models so that a more realistic experience could be shared with stakeholders. The design included features such as an order look up that didn&apos;t need an order number, instead displaying a carousel of most recent orders.
              </p>
            </div>

            {/* A continuing relationship */}
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-medium text-black mb-4">A continuing relationship with the human agents</h3>
              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                From the beginning of the project I ensured we always remained grounded and connected with the human experience of the agents in the customer service centres. This was through workshops, listening for their input into the designs and overall an open line of communication.
              </p>
            </div>
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

        {/* Improvement plans */}
        <section className="w-full border-t border-black/8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-10 sm:mb-14">
              Improvement plans
            </h2>

            <div className="max-w-2xl space-y-6">
              {improvementPoints.map((point, i) => (
                <p key={i} className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                  {point}
                </p>
              ))}

              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                I started to think about how I would in future work with the data science/machine learning engineering team to build a bot which could use a variety of different ways of functioning — a combination of:
              </p>

              <ul className="space-y-3 pl-4">
                {hybridApproach.map((item) => (
                  <li key={item} className="flex gap-3 text-lg sm:text-[20px] leading-[155%] tracking-[-0.02em] text-black/80">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-lg sm:text-[20px] leading-[160%] tracking-[-0.02em] text-black/80">
                For example, in the future we could work out more accurate classifications — how accurately is this matching with a certain intent? It would be great to work with the data science team to explore ways to classify levels of accuracy that we want to accept as a match and what falls beneath that.
              </p>
            </div>
          </div>
        </section>

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
