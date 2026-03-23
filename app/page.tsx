'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Volume2 } from 'lucide-react';

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
  const resultsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!analyzing) { setDots(''); return; }
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, [analyzing]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-black focus-visible:text-white focus-visible:rounded-lg"
      >
        Skip to main content
      </a>

      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>

      <main id="main-content" className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc] transition-colors duration-1000">
        <header className="w-full sticky top-0 bg-gradient-to-b from-[#f2fce2]/95 to-[#eff0fc]/95 backdrop-blur-sm z-40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 sm:py-6 flex items-center justify-between">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full"
              aria-label="Scroll to top of page"
            >
              <div 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#d68170] shadow-sm transition-all duration-300 group-hover:bg-[#e89b87] group-hover:scale-110 group-focus:ring-2 group-focus:ring-black"
                style={{
                  clipPath: 'circle(50% at 50% 50%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.clipPath = 'ellipse(60% 45% at 35% 50%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.clipPath = 'circle(50% at 50% 50%)';
                }}
              />
            </button>
            
            <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-6 lg:gap-10">
              <a 
                href="#work" 
                className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] lg:text-[22px] font-medium tracking-normal focus:outline-none focus:underline focus:underline-offset-4"
              >
                Work
              </a>
              <a 
                href="#about" 
                className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] lg:text-[22px] font-medium tracking-normal focus:outline-none focus:underline focus:underline-offset-4"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-black hover:text-black/60 transition-colors text-[18px] sm:text-[20px] lg:text-[22px] font-medium tracking-normal focus:outline-none focus:underline focus:underline-offset-4"
              >
                Contact
              </a>
            </nav>
          </div>
        </header>

        <section className="w-full py-12 sm:py-16 lg:py-24" aria-labelledby="hero-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
              <div className="lg:col-span-5">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-[80px] font-medium leading-[106%] tracking-normal text-black">
                  <span className="inline-flex items-center gap-3">
                    <span>Asakala</span>
                    <button
                      onClick={playPronunciation}
                      disabled={isPlaying}
                      className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all disabled:opacity-50"
                      aria-label="Play pronunciation of Asakala"
                    >
                      <Volume2 
                        size={20} 
                        className={`text-black ${isPlaying ? 'animate-pulse' : ''}`} 
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                  <br />
                  Product Designer
                </h1>
              </div>
              
              <div className="lg:col-span-7">
                <p className="text-xl sm:text-2xl lg:text-[32px] leading-[142%] tracking-normal text-black/66 mb-6 lg:mb-8">
                  A recent thought: how does your product fit in or around the evolving context of the user&apos;s attention? These users maybe customers or teams working within your company.
                </p>
                <p className="text-xl sm:text-2xl lg:text-[32px] leading-[142%] tracking-normal text-black/66">
                  Working with startups and FTSE 100 corporations I enjoy solving systemic challenges and making products in the moving spaces between ideas, product experiences and just other people 🤓 Based in London, UK and working globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-t border-black/8 pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-10" aria-labelledby="match-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="w-full">
              <div className="relative mb-0">
                <h2 id="match-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.01em] text-black">
                  Match your role with my experience
                </h2>

                <div
                  className="mt-4 lg:mt-0 lg:absolute lg:-top-[4.5rem] lg:right-0 inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                  role="status"
                  aria-label="This feature is AI enhanced and currently in beta"
                >
                  AI enhanced • In Beta
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  analyzeJobDescription();
                }}
                className="mt-3"
              >
              <div className="govuk-form-group">
                <label
                  htmlFor="job-description"
                  className="block mb-1"
                >
                  <span className="text-black/66 text-lg sm:text-xl lg:text-[24px] font-normal leading-relaxed block tracking-normal">
                    Paste a job description and I&apos;ll show you my most relevant projects
                  </span>
                </label>

                <textarea
                  id="job-description"
                  name="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={5}
                  aria-describedby="job-description-hint"
                  placeholder="We're looking for a Senior UX Designer with experience in AI products, and user research..."
                  className="w-full bg-white border-2 border-black/20 rounded-xl p-4 text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-none text-lg sm:text-[24px] leading-[1.6] transition-colors"
                  aria-required="true"
                />
                <span id="job-description-hint" className="sr-only">
                  Enter the job description text to analyse how your requirements match with Asakala&apos;s project experience
                </span>
              </div>
              
              <button
                type="submit"
                disabled={analyzing || !jobDescription.trim()}
                aria-busy={analyzing}
                aria-disabled={analyzing || !jobDescription.trim()}
                className="mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#8071E1] to-[#a091f1] hover:shadow-[0_0_20px_rgba(128,113,225,0.5)] disabled:from-[#9F92E8] disabled:to-[#B5A9ED] disabled:cursor-not-allowed disabled:shadow-none rounded-xl font-medium flex items-center gap-2 transition-all text-white text-base sm:text-lg lg:text-[17px] focus:outline-none focus:ring-2 focus:ring-[#8071E1] focus:ring-offset-2 min-h-[44px]"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={22} aria-hidden="true" />
                    <span>Analysing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={22} aria-hidden="true" />
                    <span>Analyse Match</span>
                  </>
                )}
              </button>

              </form>
            </div>
          </div>
        </section>

        {analyzing && (
          <section className="w-full pb-12 sm:pb-16 bg-[#f2fce2]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
              <div className="w-full">
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <Sparkles className="text-[#8071E1] animate-pulse" size={20} aria-hidden="true" />
                  <p className="text-lg sm:text-xl text-black/50">Considering your role{dots}</p>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-6 sm:p-8 border border-black/10 animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      <div className="h-7 bg-black/8 rounded-lg w-2/3 mb-4" />
                      <div className="h-16 bg-black/5 rounded-lg mb-4" />
                      <div className="h-5 bg-black/5 rounded-lg w-full mb-2" />
                      <div className="h-5 bg-black/5 rounded-lg w-4/5 mb-4" />
                      <div className="flex gap-2">
                        <div className="h-8 w-20 bg-black/5 rounded-lg" />
                        <div className="h-8 w-24 bg-black/5 rounded-lg" />
                        <div className="h-8 w-16 bg-black/5 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {hasAnalyzed && analyzedProjects.length > 0 && (
          <section 
            ref={resultsRef}
            tabIndex={-1}
            className="w-full border-t border-black/8 pt-6 sm:pt-8 pb-12 sm:pb-16 bg-[#f2fce2] focus:outline-none"
            aria-labelledby="results-heading"
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
              <h2 id="results-heading" className="sr-only">Analysis Results</h2>

              <div className="w-full">
              <p className="text-lg sm:text-xl text-black/50 mb-6 sm:mb-8" role="note">
                🔮 These results are AI-generated and may not be perfect. Please review them as helpful suggestions rather than definitive assessments.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {(showAllResults ? analyzedProjects : analyzedProjects.slice(0, 3)).map((project) => (
                  <article
                    key={project.id}
                    className="relative bg-white rounded-xl p-6 sm:p-8 pb-8 sm:pb-10 border border-black/10 hover:border-black/20 transition-all focus-within:ring-2 focus-within:ring-black"
                    aria-labelledby={`project-title-${project.id}`}
                  >
                    {project.matchScore && (
                      <div
                        className="absolute top-6 right-6 sm:top-8 sm:right-8 inline-flex items-center gap-2 bg-gradient-to-r from-[#8071E1] to-[#a091f1] text-white px-4 py-2 rounded-full text-sm font-medium"
                        role="status"
                        aria-label={`${project.matchScore} percent match`}
                      >
                        <Sparkles size={16} aria-hidden="true" />
                        <span>{project.matchScore}% Match</span>
                      </div>
                    )}

                    <div className="flex items-baseline justify-between gap-4 mb-4 pr-36 sm:pr-40">
                      <h3 id={`project-title-${project.id}`} className="text-2xl sm:text-[28px] font-medium leading-[120%] tracking-[-0.01em] text-black">
                        {project.title}
                      </h3>
                      <span className="text-lg sm:text-[20px] leading-[145%] tracking-normal text-black/66 text-right shrink-0">
                        {project.company}
                      </span>
                    </div>

                    {project.reasoning && (
                      <div
                        className="bg-[#ede9fa] rounded-lg p-4 mb-4 max-w-[75%]"
                        role="region"
                        aria-label="AI analysis reasoning"
                      >
                        <p className="text-lg sm:text-[19px] leading-[160%] tracking-normal text-black/80">
                          {project.reasoning}
                        </p>
                      </div>
                    )}

                    <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black mb-4">
                      <span className="font-medium">Impact:</span> {project.impact}. {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project skills">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-black/5 text-black rounded-lg text-base font-medium"
                          role="listitem"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {analyzedProjects.length > 3 && !showAllResults && (
                <button
                  onClick={() => setShowAllResults(true)}
                  className="mt-4 px-6 py-3 border-2 border-black/20 hover:border-black/40 rounded-xl font-medium text-black text-base sm:text-lg transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Show {analyzedProjects.length - 3} more project{analyzedProjects.length - 3 !== 1 ? 's' : ''}
                </button>
              )}
              {analyzedProjects.length > 3 && showAllResults && (
                <button
                  onClick={() => setShowAllResults(false)}
                  className="mt-4 px-6 py-3 border-2 border-black/20 hover:border-black/40 rounded-xl font-medium text-black text-base sm:text-lg transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Show less
                </button>
              )}
              </div>

              <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-black/10 flex flex-col items-center text-center">
                <h3 className="text-2xl sm:text-[32px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-4">
                  Let&apos;s chat about your project in more detail
                </h3>
                <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black">
                  <a
                    href="mailto:asakalageraghty@gmail.com"
                    className="underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                  >
                    asakala [at] gmail [dot] com
                  </a>
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="w-full border-t border-black/8 py-12 sm:py-16 lg:py-24" id="work" aria-labelledby="projects-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-8 sm:mb-12 lg:mb-16">
              Featured Projects
            </h2>

            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {featuredProjects.map((project) => (
                <article key={project.id}>
                  <a
                    href={project.internalUrl ?? project.framerUrl}
                    target={project.internalUrl ? undefined : '_blank'}
                    rel={project.internalUrl ? undefined : 'noopener noreferrer'}
                    className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-2xl active:opacity-90 transition-opacity"
                    aria-label={`View ${project.title} project details`}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden border border-black/8 hover:border-black/20 transition-all">
                      {project.image ? (
                        <div className="w-full aspect-[16/9] overflow-hidden bg-black">
                          <img 
                            src={project.image} 
                            alt={`${project.title} project screenshot`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#f2fce2] to-[#eff0fc] flex items-center justify-center p-10">
                          <img 
                            src="/designer-at-work.svg" 
                            alt="Designer at work illustration"
                            className="w-full h-full max-w-md object-contain opacity-80"
                          />
                        </div>
                      )}
                      
                      <div className="p-6 sm:p-8 lg:p-10 pb-10 sm:pb-12 lg:pb-14">
                        <h3 className="text-2xl sm:text-[32px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black/66 mb-4">
                          {project.company}
                        </p>
                        
                        <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black mb-6">
                          {project.impact}
                        </p>

                        <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Project skills">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 sm:px-4 py-2 bg-black/5 text-black rounded-lg text-sm sm:text-base font-medium"
                              role="listitem"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full border-t border-black/8 py-12 sm:py-16 lg:py-24" id="about" aria-labelledby="about-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="h-px w-full bg-black mb-6" role="presentation" />
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-8 sm:mb-12">
              About
            </h2>
            
            <div className="max-w-3xl">
              <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black mb-6 sm:mb-8">
                I&apos;m Asakala — a digital product designer. I care about helping people create better products and services. Currently based in London, UK.
              </p>

              <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black mb-6 sm:mb-8">
                Recently working with a start up looking at how AI can help streamline internal tools and customer communication within regulated financial industries.
              </p>

              <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black">
                At Transport for London, I redesigned the way an account dashboard works to help drivers and businesses better understand and manage their account, payments and discounts. I learnt about how to deliver value in public sector projects.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full border-t border-black/8 py-12 sm:py-16 lg:py-24" id="contact" aria-labelledby="contact-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="h-px w-full bg-black mb-6" role="presentation" />
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.01em] text-black mb-8 sm:mb-12">
              Get in touch
            </h2>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black mb-6 sm:mb-8">
              If you want to chat about a project — send me an email on{' '}
              <a
                href="mailto:asakalageraghty@gmail.com"
                className="underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                asakala [at] gmail [dot] com
              </a>
              <button
                onClick={copyEmail}
                className="ml-3 inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-black/5 hover:bg-black/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 align-middle"
                aria-label="Copy email address"
              >
                {emailCopied ? 'Copied!' : 'Copy'}
              </button>
            </p>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black mb-8 sm:mb-12">
              I can help design a new digital product or consult on the best approach for your project.
            </p>
            
            <nav aria-label="Social media links" className="flex flex-wrap gap-4 sm:gap-6">
              <a 
                href="https://linkedin.com/in/asakala" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/kalasentient" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg sm:text-[24px] leading-[145%] tracking-normal text-black underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              >
                GitHub
              </a>
            </nav>
          </div>
        </section>

        <footer className="w-full border-t border-black/8 py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <p className="text-black/55 text-sm sm:text-base tracking-normal">
              © 2026 Asakala Geraghty
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}