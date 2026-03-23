'use client';

import { useState, useRef } from 'react';
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
    image: '/tfl-dashboard.avif'
  },
  {
    id: '2',
    title: 'WhatsApp Gen AI Chatbot',
    company: 'John Lewis',
    description: 'Enhanced customer service using Gen AI through WhatsApp messaging',
    skills: ['AI/ML', 'Conversational Design', 'Gen AI', 'Customer Service'],
    impact: 'Streamlined customer interactions using AI technology',
    framerUrl: 'https://asakala.framer.website/john-lewis-chatbot',
    image: '/johnlewis-chatbot.avif'
  },
  {
    id: '3',
    title: 'Payment System',
    company: 'Major UK Bank',
    description: 'Automation in business banking payment systems',
    skills: ['FinTech', 'B2B', 'Payment Systems', 'Enterprise'],
    impact: 'Reduced processing time and improved accuracy',
    framerUrl: 'https://asakala.framer.website/payment-system',
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const generateTimeSlots = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'];
    return days.flatMap(day => times.map(time => `${day} ${time}`));
  };

  const timeSlots = generateTimeSlots();

  const toggleTimeSlot = (slot: string) => {
    setSelectedSlots(prev => {
      const newSlots = prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot];
      
      setAnnouncement(
        prev.includes(slot) 
          ? `Removed ${slot}` 
          : `Added ${slot}. ${newSlots.length} slots selected`
      );
      
      return newSlots;
    });
  };

  const featuredProjects = projects.filter(p => p.image);

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg"
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
                <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-[80px] font-medium leading-[106%] tracking-[-0.05em] text-black">
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
                <p className="text-xl sm:text-2xl lg:text-[32px] leading-[142%] tracking-[-0.035em] text-black/66 mb-6 lg:mb-8">
                  A recent thought: how does your product fit in or around the evolving context of the user&apos;s attention? These users maybe customers or teams working within your company.
                </p>
                <p className="text-xl sm:text-2xl lg:text-[32px] leading-[142%] tracking-[-0.035em] text-black/66 mb-6 lg:mb-8">
                  I&apos;m a Senior Product Designer with 8 years of experience. Based in London, UK.
                </p>
                <p className="text-xl sm:text-2xl lg:text-[32px] leading-[142%] tracking-[-0.035em] text-black/66">
                  Working with startups and FTSE 100 corporations I enjoy making products in the moving spaces between ideas, product experiences and just other people 🤓
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-t border-black/8 py-12 sm:py-16 lg:py-24" aria-labelledby="match-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="lg:max-w-[calc(100%-12rem)]">
              <div className="relative mb-2">
                <h2 id="match-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black">
                  Match your role with my experience
                </h2>

                <div
                  className="mt-4 lg:mt-0 lg:absolute lg:-top-8 lg:right-0 inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
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
                className="mt-6"
              >
              <div className="govuk-form-group">
                <label 
                  htmlFor="job-description" 
                  className="block mb-3"
                >
                  <span className="text-black/66 text-lg sm:text-xl lg:text-[24px] font-normal leading-relaxed block tracking-[-0.03em]">
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
                  className="w-full bg-white border-2 border-black/20 rounded-xl p-4 text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-none text-base sm:text-lg lg:text-[18px] leading-[1.6] transition-colors"
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

        {hasAnalyzed && analyzedProjects.length > 0 && (
          <section 
            ref={resultsRef}
            tabIndex={-1}
            className="w-full border-t border-black/8 py-12 sm:py-16 bg-white/50 focus:outline-none" 
            aria-labelledby="results-heading"
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
              <h2 id="results-heading" className="sr-only">Analysis Results</h2>
              
              <p className="text-lg sm:text-xl text-black/50 mb-6 sm:mb-8" role="note">
                ✨ These results are AI-generated and may not be perfect. Please review them as helpful suggestions rather than definitive assessments.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {(showAllResults ? analyzedProjects : analyzedProjects.slice(0, 3)).map((project) => (
                  <article
                    key={project.id}
                    className="relative bg-white rounded-xl p-6 sm:p-8 border border-black/10 hover:border-black/20 transition-all focus-within:ring-2 focus-within:ring-black lg:max-w-[50%]"
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
                      <h3 id={`project-title-${project.id}`} className="text-2xl sm:text-[28px] font-medium leading-[120%] tracking-[-0.04em] text-black">
                        {project.title}
                      </h3>
                      <span className="text-lg sm:text-[20px] leading-[145%] tracking-[-0.03em] text-black/66 text-right shrink-0">
                        {project.company}
                      </span>
                    </div>

                    {project.reasoning && (
                      <div
                        className="bg-[#f2fce2] rounded-lg p-4 mb-4"
                        role="region"
                        aria-label="AI analysis reasoning"
                      >
                        <p className="text-lg sm:text-[19px] leading-[160%] tracking-[-0.02em] text-black/80">
                          {project.reasoning}
                        </p>
                      </div>
                    )}

                    <p className="text-lg sm:text-[20px] leading-[145%] tracking-[-0.03em] text-black mb-4">
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

              <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-black/10">
                <h3 className="text-2xl sm:text-[32px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-4">
                  Let&apos;s chat about your project in more detail
                </h3>
                <p className="text-lg sm:text-[20px] leading-[145%] tracking-[-0.03em] text-black/66 mb-6">
                  I have limited availability at the moment. Please select some time slots this week when I could give you a call.
                </p>
                
                {!showCalendar ? (
                  <button
                    onClick={() => {
                      setShowCalendar(true);
                      setAnnouncement('Calendar opened. Please select your available time slots');
                    }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-black hover:bg-black/80 rounded-xl font-medium text-white text-base sm:text-lg lg:text-[17px] transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 min-h-[44px]"
                  >
                    Book a Call
                  </button>
                ) : (
                  <div className="bg-white rounded-xl p-6 sm:p-8 border border-black/10">
                    <h4 className="text-lg sm:text-[20px] font-medium mb-4">
                      Select your available time slots:
                    </h4>
                    <fieldset>
                      <legend className="sr-only">Available time slots for callback</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => toggleTimeSlot(slot)}
                            type="button"
                            role="checkbox"
                            aria-checked={selectedSlots.includes(slot)}
                            className={`px-4 py-3 rounded-lg text-left text-sm sm:text-[15px] transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              selectedSlots.includes(slot)
                                ? 'bg-[#8071E1] text-white focus:ring-[#8071E1]'
                                : 'bg-black/5 text-black hover:bg-black/10 focus:ring-black'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <button
                      disabled={selectedSlots.length === 0}
                      onClick={() => {
                        setAnnouncement(`Submitting ${selectedSlots.length} selected time slots`);
                      }}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#8071E1] to-[#a091f1] hover:shadow-[0_0_20px_rgba(128,113,225,0.5)] disabled:from-[#9F92E8] disabled:to-[#B5A9ED] disabled:cursor-not-allowed disabled:shadow-none rounded-xl font-medium text-white text-base sm:text-lg lg:text-[17px] transition-all focus:outline-none focus:ring-2 focus:ring-[#8071E1] focus:ring-offset-2 min-h-[44px]"
                      aria-label={`Submit ${selectedSlots.length} selected time slot${selectedSlots.length !== 1 ? 's' : ''}`}
                    >
                      Submit ({selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} selected)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="w-full border-t border-black/8 py-12 sm:py-16 lg:py-24" id="work" aria-labelledby="projects-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-8 sm:mb-12 lg:mb-16">
              Featured Projects
            </h2>

            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {featuredProjects.map((project) => (
                <article key={project.id}>
                  <a 
                    href={project.framerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4 rounded-2xl"
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
                      
                      <div className="p-6 sm:p-8 lg:p-10">
                        <h3 className="text-2xl sm:text-[32px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black/66 mb-4">
                          {project.company}
                        </p>
                        
                        <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-6">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6" role="list" aria-label="Project skills">
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
                        
                        <p className="text-sm sm:text-[17px] leading-[145%] tracking-[-0.03em] text-black">
                          <span className="font-medium">Impact:</span> {project.impact}
                        </p>
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
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-8 sm:mb-12">
              About
            </h2>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-6 sm:mb-8">
              I&apos;m Asakala — a digital product designer. I care about helping people create better products and services. Currently based in London, UK.
            </p>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-6 sm:mb-8">
              Recently working with a start up looking at how AI can help streamline internal tools and customer communication within regulated financial industries.
            </p>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black">
              At Transport for London, I redesigned the way an account dashboard works to help drivers and businesses better understand and manage their account, payments and discounts. I learnt about how to deliver value in public sector projects.
            </p>
          </div>
        </section>

        <section className="w-full border-t border-black/8 py-12 sm:py-16 lg:py-24" id="contact" aria-labelledby="contact-heading">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <div className="h-px w-full bg-black mb-6" role="presentation" />
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-8 sm:mb-12">
              Get in touch
            </h2>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-6 sm:mb-8">
              If you want to chat about a project — send me an email on{' '}
              <a 
                href="mailto:asakalageraghty@gmail.com"
                className="underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                asakala [at] gmail [dot] com
              </a>
            </p>
            
            <p className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-8 sm:mb-12">
              I can help design a new digital product or consult on the best approach for your project.
            </p>
            
            <nav aria-label="Social media links" className="flex flex-wrap gap-4 sm:gap-6">
              <a 
                href="https://linkedin.com/in/asakala" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/kalasentient" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg sm:text-[24px] leading-[145%] tracking-[-0.03em] text-black underline hover:text-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              >
                GitHub
              </a>
            </nav>
          </div>
        </section>

        <footer className="w-full border-t border-black/8 py-8 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
            <p className="text-black/55 text-sm sm:text-base tracking-[-0.03em]">
              © 2025 Asakala Geraghty
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}