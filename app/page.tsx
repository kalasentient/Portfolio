'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Volume2, Star } from 'lucide-react';
import SiteHeader from '@/app/components/SiteHeader';
import SiteFooter from '@/app/components/SiteFooter';
import { Button, Eyebrow, Figure, SectionHeader, TagList, buttonClasses } from '@/app/components/ui';

interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  impact: string;
  matchScore?: number;
  framerUrl: string;
  internalUrl?: string;
  reasoning?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'TfL Dashboard',
    company: 'Transport for London',
    description: 'Redesigned account dashboard for drivers and businesses to manage payments and discounts',
    skills: ['UX Research', 'Service Design', 'Dashboard Design', 'Public Sector'],
    impact: 'Improved account management for thousands of London drivers',
    framerUrl: 'https://asakala.framer.website/tfl-dashboard',
    internalUrl: '/work/tfl',
    image: '/tfl-dashboard.avif'
  },
  {
    id: '2',
    title: 'WhatsApp Gen AI Chatbot',
    company: 'John Lewis',
    description: 'Enhanced customer service using Gen AI through WhatsApp messaging',
    skills: ['AI/ML', 'Conversational Design', 'Gen AI', 'Customer Service'],
    impact: 'Streamlined customer interactions using Gen AI technology',
    framerUrl: 'https://asakala.framer.website/john-lewis-chatbot',
    internalUrl: '/work/john-lewis',
    image: '/johnlewis-chatbot.avif'
  },
  {
    id: '3',
    title: 'Payment System',
    company: 'UK Bank',
    description: 'Automation in business banking payment systems',
    skills: ['FinTech', 'B2B', 'Payment Systems', 'Enterprise'],
    impact: 'Reduced processing time and improved accuracy',
    framerUrl: 'https://asakala.framer.website/payment-system',
    internalUrl: '/work/payment-system',
    image: '/payment-system.avif'
  },
  {
    id: '4',
    title: 'Mortgage Backend',
    company: 'Koodoo',
    description: 'Internal tools using AI in regulated financial industries',
    skills: ['AI Tools', 'Regulatory Compliance', 'B2B SaaS', 'FinTech'],
    impact: 'Streamlined internal processes with AI assistance',
    framerUrl: 'https://asakala.framer.website/koodoo-mortgage'
  },
  {
    id: '5',
    title: 'E-commerce Checkout',
    company: 'Tesco',
    description: 'Optimized checkout experience for one of UK\'s largest retailers',
    skills: ['E-commerce', 'Conversion', 'Checkout Flow', 'Retail'],
    impact: 'Increased conversion rates and reduced cart abandonment',
    framerUrl: 'https://asakala.framer.website/tesco-checkout'
  },
  {
    id: '6',
    title: 'B2B Licensing',
    company: 'PRS for Music',
    description: 'Complex B2B licensing platform for music rights',
    skills: ['B2B SaaS', 'Complex Systems', 'Licensing', 'Music Industry'],
    impact: 'Simplified complex licensing workflows',
    framerUrl: 'https://asakala.framer.website/prs-licensing'
  },
  {
    id: '7',
    title: 'Chatbot Fintech',
    company: 'Mespo',
    description: 'Financial chatbot for customer support and transactions',
    skills: ['Chatbot', 'FinTech', 'Conversational UI', 'Customer Support'],
    impact: 'Automated customer support for financial services',
    framerUrl: 'https://asakala.framer.website/mespo-chatbot'
  },
  {
    id: '8',
    title: 'Other creative work',
    company: '',
    description: '',
    skills: [],
    impact: '',
    framerUrl: '#',
    internalUrl: '/work/other-creations',
    image: '/projects/OtherCreative-projects/Olfactory/10-IlluminumLondon-LimitedEditionCollection03.jpg'
  }
];

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedProjects, setAnalyzedProjects] = useState<Project[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [dots, setDots] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackHover, setFeedbackHover] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!analyzing) { setDots(''); return; }
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, [analyzing]);

  const playPronunciation = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio('/asakala-pronunciation.mp3');
      audioRef.current = audio;
      setIsPlaying(true);
      setAnnouncement('Playing pronunciation of Asakala');
      
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
        setAnnouncement('Could not play pronunciation');
      });
      
      audio.onended = () => {
        setIsPlaying(false);
        setAnnouncement('');
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setAnnouncement('Could not load pronunciation file');
        audioRef.current = null;
      };
    } catch (error) {
      console.error('Error with pronunciation:', error);
      setIsPlaying(false);
    }
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;

    setAnalyzing(true);
    setHasAnalyzed(false);
    setShowAllResults(false);
    setFeedbackRating(0);
    setFeedbackHover(0);
    setFeedbackText('');
    setFeedbackEmail('');
    setFeedbackSubmitted(false);
    setFeedbackLoading(false);
    setAnnouncement('Analysing job description, please wait');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, projects })
      });

      const data = await response.json();
      
      if (data.rankedProjects) {
        setAnalyzedProjects(data.rankedProjects);
        setHasAnalyzed(true);
        setAnnouncement(`Analysis complete. Found ${data.rankedProjects.length} matching projects`);
        
        setTimeout(() => {
          resultsRef.current?.focus();
        }, 100);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnnouncement('Analysis failed. Please try again');
    } finally {
      setAnalyzing(false);
    }
  };


  const copyEmail = () => {
    navigator.clipboard.writeText('asakalageraghty@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const featuredProjects = projects.filter(p => p.image);

  const inputClasses =
    'w-full rounded-lg border-2 border-input bg-card p-4 text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-ring';
  const textLink =
    'text-link underline underline-offset-4 hover:decoration-2';
  const copyButton = (
    <button
      type="button"
      onClick={copyEmail}
      className={buttonClasses('secondary', 'ml-3 min-h-11 px-4 py-1 align-middle text-base')}
      aria-label="Copy email address"
    >
      {emailCopied ? 'Copied!' : 'Copy'}
    </button>
  );

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="container-page flex flex-col gap-24 pt-8 focus:outline-none sm:pt-12 lg:pt-16 lg:gap-32">
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h1 id="hero-heading" className="text-display text-foreground">
              <span className="inline-flex items-center gap-3">
                <span>Asakala</span>
                <span className="group relative inline-flex">
                  <button
                    type="button"
                    onClick={playPronunciation}
                    disabled={isPlaying}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground transition-colors hover:bg-hover disabled:opacity-70"
                    aria-label="Play pronunciation of Asakala"
                  >
                    <Volume2 size={22} className={isPlaying ? 'motion-safe:animate-pulse' : ''} aria-hidden="true" />
                  </button>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-center text-base font-normal tracking-normal text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    How to pronounce my name
                  </span>
                </span>
              </span>
              <br />
              Product Designer
            </h1>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
            <p className="text-lead text-body">
              A recent thought: how does your product fit in or around the evolving context of the user&apos;s attention? These users maybe customers or teams working within your company.
            </p>
            <p className="text-lead text-body">
              Working with startups and FTSE 100 corporations I enjoy solving systemic challenges. For example re designing payment systems or the way delivery tracking works by understanding and helping to shape how structures work as well as how users interact with them.
            </p>
            <p className="text-lead text-body">
              I enjoy making products in the moving spaces between ideas, product experiences and just other people 🤓 Based in London, UK and working globally.
            </p>
          </div>
        </section>

        {/* Match your role */}
        <section aria-labelledby="match-heading" className="flex flex-col gap-12">
          <div className="mx-auto flex w-full max-w-[880px] flex-col gap-8">
            <SectionHeader id="match-heading" eyebrow="AI enhanced · In beta" title="Match your role with my experience" />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                analyzeJobDescription();
              }}
              className="flex flex-col gap-4"
            >
              <label htmlFor="job-description" className="text-body-lg text-body">
                Paste a job description and I&apos;ll show you my most relevant projects
              </label>
              <textarea
                id="job-description"
                name="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
                aria-describedby="job-description-hint"
                placeholder="We're looking for a Lead Product Designer with experience with AI products and user research..."
                className={`${inputClasses} resize-none text-body`}
                aria-required="true"
              />
              <span id="job-description-hint" className="sr-only">
                Enter the job description text to analyse how your requirements match with Asakala&apos;s project experience
              </span>
              <div>
                <Button type="submit" disabled={analyzing || !jobDescription.trim()} aria-busy={analyzing}>
                  {analyzing ? (
                    <>
                      <Loader2 className="motion-safe:animate-spin" size={22} aria-hidden="true" />
                      <span>Analysing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={22} aria-hidden="true" />
                      <span>Analyse Match</span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {analyzing && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary motion-safe:animate-pulse" size={20} aria-hidden="true" />
                  <p className="text-body text-body">Considering your role{dots}</p>
                </div>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="border border-border bg-card p-6 motion-safe:animate-pulse sm:p-8"
                    style={{ animationDelay: `${i * 200}ms` }}
                    aria-hidden="true"
                  >
                    <div className="mb-4 h-7 w-2/3 bg-hover" />
                    <div className="mb-4 h-16 bg-hover" />
                    <div className="mb-2 h-5 w-full bg-hover" />
                    <div className="mb-4 h-5 w-4/5 bg-hover" />
                    <div className="flex gap-2">
                      <div className="h-8 w-20 bg-hover" />
                      <div className="h-8 w-24 bg-hover" />
                      <div className="h-8 w-16 bg-hover" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasAnalyzed && analyzedProjects.length > 0 && (
              <div
                ref={resultsRef}
                tabIndex={-1}
                className="flex flex-col gap-6 focus:outline-none"
                aria-labelledby="results-heading"
                role="region"
              >
                <h3 id="results-heading" className="sr-only">Analysis Results</h3>
                <p className="text-body text-body" role="note">
                  🔮 These results are AI-generated and may not be perfect. Please review them as helpful suggestions rather than definitive assessments.
                </p>

                {(showAllResults ? analyzedProjects : analyzedProjects.slice(0, 3)).map((project) => (
                  <article
                    key={project.id}
                    className="flex flex-col gap-4 border border-border bg-card p-6 sm:p-8"
                    aria-labelledby={`project-title-${project.id}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        {project.company && <Eyebrow>{project.company}</Eyebrow>}
                        <h4 id={`project-title-${project.id}`} className="text-h3 text-card-foreground">
                          {project.internalUrl ? (
                            <a href={project.internalUrl} className="underline-offset-4 hover:underline">{project.title}</a>
                          ) : (
                            project.title
                          )}
                        </h4>
                      </div>
                      {project.matchScore && (
                        <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-label text-primary-foreground">
                          <Sparkles size={16} aria-hidden="true" />
                          {project.matchScore}% match
                        </span>
                      )}
                    </div>

                    {project.reasoning && (
                      <div className="bg-muted p-4" role="region" aria-label="AI analysis reasoning">
                        <p className="text-body-sm text-foreground">{project.reasoning}</p>
                      </div>
                    )}

                    <p className="text-body text-body">
                      <span className="font-medium text-foreground">Impact:</span> {project.impact}. {project.description}
                    </p>

                    <TagList tags={project.skills} />
                  </article>
                ))}

                {analyzedProjects.length > 3 && (
                  <div>
                    <Button type="button" variant="secondary" onClick={() => setShowAllResults(!showAllResults)}>
                      {showAllResults ? 'Show less' : 'Show more projects'}
                    </Button>
                  </div>
                )}

                {/* Feedback */}
                <div className="flex justify-end">
                  {feedbackSubmitted ? (
                    <p className="text-body-sm text-body" role="status">Thanks for the feedback 🙏</p>
                  ) : (
                    <div className="flex flex-col items-end gap-3 text-right">
                      <p className="text-label text-foreground" id="rating-label">Rate this match</p>
                      <div className="flex gap-1" role="group" aria-labelledby="rating-label">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            onMouseEnter={() => setFeedbackHover(star)}
                            onMouseLeave={() => setFeedbackHover(0)}
                            aria-label={`Rate ${star} out of 5`}
                            aria-pressed={feedbackRating === star}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary"
                          >
                            <Star
                              size={22}
                              aria-hidden="true"
                              className={(feedbackHover || feedbackRating) >= star ? 'fill-primary stroke-primary' : 'fill-transparent stroke-input'}
                            />
                          </button>
                        ))}
                      </div>

                      {feedbackRating > 0 && (
                        <div className="flex w-full max-w-sm flex-col gap-3 sm:w-80">
                          <label htmlFor="feedback-text" className="sr-only">Feedback</label>
                          <textarea
                            id="feedback-text"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={3}
                            placeholder="Any thoughts on the results? (optional)"
                            className={`${inputClasses} resize-none text-left text-base`}
                          />
                          <label htmlFor="feedback-email" className="sr-only">Your email (optional)</label>
                          <input
                            id="feedback-email"
                            type="email"
                            autoComplete="email"
                            value={feedbackEmail}
                            onChange={(e) => setFeedbackEmail(e.target.value)}
                            placeholder="Your email (optional)"
                            className={`${inputClasses} px-4 py-3 text-left text-base`}
                          />
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              disabled={feedbackLoading}
                              onClick={async () => {
                                setFeedbackLoading(true);
                                try {
                                  await fetch('/api/feedback', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ rating: feedbackRating, text: feedbackText, email: feedbackEmail }),
                                  });
                                } finally {
                                  setFeedbackLoading(false);
                                  setFeedbackSubmitted(true);
                                }
                              }}
                            >
                              {feedbackLoading ? 'Sending…' : 'Send feedback'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-border pt-12 text-center">
                  <h3 className="text-h3 text-foreground">Let&apos;s chat about your project in more detail</h3>
                  <p className="text-body-lg text-foreground">
                    <a href="mailto:asakalageraghty@gmail.com" className={textLink}>
                      asakala [at] gmail [dot] com
                    </a>
                    {copyButton}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Work */}
        <section id="work" aria-labelledby="projects-heading" className="flex flex-col gap-12">
          <SectionHeader id="projects-heading" eyebrow="Selected work" title="Featured Projects" />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-16 min-[1056px]:grid-cols-[repeat(2,minmax(0,1fr))]">
            {featuredProjects.map((project) => {
              const href = project.internalUrl ?? project.framerUrl;
              const external = !project.internalUrl;
              return (
                <li key={project.id} className="min-w-0">
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-describedby={project.impact ? `project-impact-${project.id}` : undefined}
                    className="group flex flex-col gap-4 rounded-sm outline-offset-4"
                  >
                    <div className="overflow-hidden">
                      <Figure
                        src={project.image!}
                        ratio="4:3"
                        fit="cover"
                        className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {project.company && <Eyebrow>{project.company}</Eyebrow>}
                      <h3 className="text-h3 text-foreground decoration-2 underline-offset-4 group-hover:underline group-focus-visible:underline">
                        {project.title} <span aria-hidden="true">→</span>
                      </h3>
                      {project.impact && (
                        <p id={`project-impact-${project.id}`} className="text-body-sm text-muted-foreground">
                          {project.impact}
                        </p>
                      )}
                    </div>
                    <TagList tags={project.skills} />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-heading" className="flex flex-col gap-12">
          <SectionHeader id="about-heading" title="About" />
          <div className="measure flex flex-col gap-6 text-body-lg text-body">
            <p>
              I&apos;m Asakala — a digital product designer. I care about helping people create better products and services. Currently based in London, UK.
            </p>
            <p>
              Recently working with a start up looking at how AI can help streamline internal tools and customer communication within regulated financial industries.
            </p>
            <p>
              At Transport for London, I redesigned the way an account dashboard works to help drivers and businesses better understand and manage their account, payments and discounts. I learnt about how to deliver value in public sector projects.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="flex flex-col gap-12">
          <SectionHeader id="contact-heading" title="Get in touch" />
          <div className="measure flex flex-col gap-6 text-body-lg text-body">
            <p>
              If you want to chat about a project — send me an email on{' '}
              <a href="mailto:asakalageraghty@gmail.com" className={textLink}>
                asakala [at] gmail [dot] com
              </a>
              {copyButton}
            </p>
            <p>I can help design a new digital product or consult on the best approach for your project.</p>
            <ul aria-label="Social media links" className="flex flex-wrap gap-6">
              <li>
                <a href="https://linkedin.com/in/asakala" target="_blank" rel="noopener noreferrer" className={`${textLink} inline-flex min-h-11 items-center`}>
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/kalasentient" target="_blank" rel="noopener noreferrer" className={`${textLink} inline-flex min-h-11 items-center`}>
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
