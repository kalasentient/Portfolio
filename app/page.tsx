'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

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
}

const projects: Project[] = [
  {
    id: '1',
    title: 'TfL Dashboard',
    company: 'Transport for London',
    description: 'Redesigned account dashboard for drivers and businesses to manage payments and discounts',
    skills: ['UX Research', 'Service Design', 'Dashboard Design', 'Public Sector'],
    impact: 'Improved account management for thousands of London drivers',
    framerUrl: 'https://asakala.framer.website/tfl-dashboard'
  },
  {
    id: '2',
    title: 'WhatsApp Gen AI Chatbot',
    company: 'John Lewis',
    description: 'Enhanced customer service using Gen AI through WhatsApp messaging',
    skills: ['AI/ML', 'Conversational Design', 'Gen AI', 'Customer Service'],
    impact: 'Streamlined customer interactions using AI technology',
    framerUrl: 'https://asakala.framer.website/john-lewis-chatbot'
  },
  {
    id: '3',
    title: 'Payment System',
    company: 'Major UK Bank',
    description: 'Automation in business banking payment systems',
    skills: ['FinTech', 'B2B', 'Payment Systems', 'Enterprise'],
    impact: 'Reduced processing time and improved accuracy',
    framerUrl: 'https://asakala.framer.website/payment-system'
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;

    setAnalyzing(true);
    setHasAnalyzed(false);

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
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  // Time slots for calendar
  const generateTimeSlots = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'];
    return days.flatMap(day => times.map(time => `${day} ${time}`));
  };

  const timeSlots = generateTimeSlots();

  const toggleTimeSlot = (slot: string) => {
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const displayProjects = hasAnalyzed ? analyzedProjects : projects.slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f2fce2] to-[#eff0fc] transition-colors duration-1000">
      {/* Header */}
      <header className="w-full sticky top-0 bg-gradient-to-b from-[#f2fce2]/95 to-[#eff0fc]/95 backdrop-blur-sm z-40">
        <div className="max-w-[1440px] mx-auto px-20 py-6 flex items-center justify-between">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-5 group cursor-pointer"
            aria-label="Scroll to top"
          >
            <div className="w-9 h-9 rounded-full bg-[#d68170] shadow-sm transition-all duration-300 group-hover:rounded-[20px] group-hover:bg-[#e89b87] group-hover:scale-110" />
          </button>
          
          <nav className="flex items-center gap-10">
            <a href="#work" className="text-black hover:text-black/60 transition-colors text-[20px] font-semibold tracking-[-0.03em]">
              Work
            </a>
            <a href="#about" className="text-black hover:text-black/60 transition-colors text-[20px] font-semibold tracking-[-0.03em]">
              About
            </a>
            <a href="#contact" className="text-black hover:text-black/60 transition-colors text-[20px] font-semibold tracking-[-0.03em]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-24">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-12 gap-20">
            <div className="col-span-5">
              <h1 className="text-[80px] font-medium leading-[106%] tracking-[-0.05em] text-black">
                Asakala.<br />
                Product Designer
              </h1>
            </div>
            
            <div className="col-span-7">
              <p className="text-[32px] leading-[142%] tracking-[-0.035em] text-black/66 mb-8">
                A recent thought: how does your product fit in or around the evolving context of the user&apos;s attention? These users maybe customers or teams working within your company.
              </p>
              <p className="text-[32px] leading-[142%] tracking-[-0.035em] text-black/66 mb-8">
                I&apos;m a Senior Product Designer with 9 years of industry experience. Based in London, UK.
              </p>
              <p className="text-[32px] leading-[142%] tracking-[-0.035em] text-black/66">
                Working with startups and FTSE 100 corporations I enjoy making products in the moving spaces between ideas, product experiences and just other people 🤓
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Match Section */}
      <section className="w-full border-t border-black/8 py-24">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-4">
              <h2 className="text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black">
                Match your role with my experience
              </h2>
              
              {/* Beta Badge - positioned above and to the right */}
              <div className="absolute -top-8 right-0 bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                AI enhanced • In Beta
              </div>
            </div>
            
            <div className="govuk-form-group mt-12">
              <label htmlFor="job-description" className="block mb-2">
                <span className="text-black/66 text-[24px] font-normal leading-relaxed block tracking-[-0.03em]">
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
                className="w-full bg-white border-2 border-black/20 rounded-xl p-4 text-black placeholder-black/30 focus:outline-none focus:ring-0 focus:border-black resize-none text-[18px] leading-[1.6] transition-colors"
              />
            </div>
            
            <button
              onClick={analyzeJobDescription}
              disabled={analyzing || !jobDescription.trim()}
              aria-busy={analyzing}
              className="mt-4 px-8 py-4 bg-gradient-to-r from-[#8071E1] to-[#a091f1] hover:shadow-[0_0_20px_rgba(128,113,225,0.5)] disabled:from-black/20 disabled:to-black/20 disabled:cursor-not-allowed disabled:shadow-none rounded-xl font-medium flex items-center gap-2 transition-all text-white text-[17px]"
            >
              {analyzing ? (
                <>
                  <Loader2 className="animate-spin" size={22} />
                  Analysing...
                </>
              ) : (
                <>
                  <Sparkles size={22} />
                  Analyse Match
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* AI Results Section */}
      {hasAnalyzed && analyzedProjects.length > 0 && (
        <section className="w-full border-t border-black/8 py-16 bg-white/50">
          <div className="max-w-[1440px] mx-auto px-20">
            <div className="max-w-4xl mx-auto">
              {/* AI Ethics Caveat */}
              <p className="text-[15px] text-black/50 mb-8 italic">
                ✨ These results are AI-generated and may not be perfect. Please review them as helpful suggestions rather than definitive assessments.
              </p>

              <div className="space-y-6">
                {analyzedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl p-8 border border-black/10 hover:border-black/20 transition-all"
                  >
                    {/* Match Score Badge */}
                    {project.matchScore && (
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8071E1] to-[#a091f1] text-white px-4 py-2 rounded-full text-sm font-medium">
                          <Sparkles size={16} />
                          {project.matchScore}% Match
                        </div>
                      </div>
                    )}
                    
                    <h3 className="text-[28px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-[20px] leading-[145%] tracking-[-0.03em] text-black/66 mb-4">
                      {project.company}
                    </p>
                    
                    {/* AI Reasoning */}
                    {project.reasoning && (
                      <div className="bg-[#f2fce2] rounded-lg p-4 mb-4">
                        <p className="text-[17px] leading-[160%] tracking-[-0.02em] text-black/80">
                          {project.reasoning}
                        </p>
                      </div>
                    )}
                    
                    <p className="text-[18px] leading-[145%] tracking-[-0.03em] text-black mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-black/5 text-black rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-[15px] leading-[145%] tracking-[-0.03em] text-black/70">
                      <span className="font-medium">Impact:</span> {project.impact}
                    </p>
                  </div>
                ))}
              </div>

              {/* Book a Call Section */}
              <div className="mt-16 pt-12 border-t border-black/10">
                <h3 className="text-[32px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-4">
                  Let&apos;s chat about your project in more detail
                </h3>
                <p className="text-[20px] leading-[145%] tracking-[-0.03em] text-black/66 mb-6">
                  I have limited availability at the moment. Please select some time slots this week when I could give you a call.
                </p>
                
                {!showCalendar ? (
                  <button
                    onClick={() => setShowCalendar(true)}
                    className="px-8 py-4 bg-black hover:bg-black/80 rounded-xl font-medium text-white text-[17px] transition-all"
                  >
                    Book a Call
                  </button>
                ) : (
                  <div className="bg-white rounded-xl p-8 border border-black/10">
                    <h4 className="text-[20px] font-medium mb-4">Select your available time slots:</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => toggleTimeSlot(slot)}
                          className={`px-4 py-3 rounded-lg text-left text-[15px] transition-all ${
                            selectedSlots.includes(slot)
                              ? 'bg-[#8071E1] text-white'
                              : 'bg-black/5 text-black hover:bg-black/10'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={selectedSlots.length === 0}
                      className="px-8 py-4 bg-gradient-to-r from-[#8071E1] to-[#a091f1] hover:shadow-[0_0_20px_rgba(128,113,225,0.5)] disabled:from-black/20 disabled:to-black/20 disabled:cursor-not-allowed disabled:shadow-none rounded-xl font-medium text-white text-[17px] transition-all"
                    >
                      Submit ({selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} selected)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      <section className="w-full border-t border-black/8 py-24" id="work">
        <div className="max-w-[1440px] mx-auto px-20">
          <h2 className="text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-16">
            Featured Projects
          </h2>

          <div className="space-y-16">
            {displayProjects.map((project) => (
              <a key={project.id} href={project.framerUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="bg-white rounded-2xl overflow-hidden border border-black/8 hover:border-black/20 transition-all">
                  <div className="w-full aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-10">
                    <div className="text-center">
                      <div className="text-[32px] font-medium text-black/40 mb-2">
                        {project.title}
                      </div>
                      <div className="text-[20px] text-black/30">
                        Project Image Here
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10">
                    <h3 className="text-[32px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black/66 mb-4">
                      {project.company}
                    </p>
                    
                    <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.skills.map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-black/5 text-black rounded-lg text-base font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-[17px] leading-[145%] tracking-[-0.03em] text-black">
                      <span className="font-medium">Impact:</span> {project.impact}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full border-t border-black/8 py-24" id="about">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-12 gap-20">
            <div className="col-start-5 col-span-8">
              <div className="h-px w-full bg-black mb-6" />
              <h2 className="text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-12">
                About
              </h2>
              
              <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-8">
                I&apos;m Asakala — a digital product designer. I care about helping people create better products and services. Currently based in London, UK.
              </p>
              
              <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-8">
                Recently working with a start up looking at how AI can help streamline internal tools and customer communication within regulated financial industries.
              </p>
              
              <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black">
                At Transport for London, I redesigned the way an account dashboard works to help drivers and businesses better understand and manage their account, payments and discounts. I learnt about how to deliver value in public sector projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full border-t border-black/8 py-24" id="contact">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-12 gap-20">
            <div className="col-start-5 col-span-8">
              <div className="h-px w-full bg-black mb-6" />
              <h2 className="text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-12">
                Get in touch
              </h2>
              
              <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-8">
                If you want to chat about a project — send me an email on{' '}
                <a 
                  href="mailto:asakalageraghty@gmail.com"
                  className="underline hover:text-black/60 transition-colors"
                >
                  asakala [at] gmail [dot] com
                </a>
              </p>
              
              <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-8">
                I can help design a new digital product or consult on the best approach for your project.
              </p>
              
              <div className="flex gap-6 mt-12">
                <a href="https://linkedin.com/in/asakala" target="_blank" rel="noopener noreferrer" className="text-[24px] leading-[145%] tracking-[-0.03em] text-black underline hover:text-black/60 transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/kalasentient" target="_blank" rel="noopener noreferrer" className="text-[24px] leading-[145%] tracking-[-0.03em] text-black underline hover:text-black/60 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-black/8 py-12">
        <div className="max-w-[1440px] mx-auto px-20">
          <p className="text-black/55 text-base tracking-[-0.03em]">
            © 2026 Asakala Geraghty
          </p>
        </div>
      </footer>
    </main>
  );
}