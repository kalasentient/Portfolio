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
}

const projects: Project[] = [
  {
    id: '1',
    title: 'TfL Dashboard',
    company: 'Transport for London',
    description: 'Redesigned account dashboard for drivers and businesses to manage payments and discounts',
    skills: ['UX Research', 'Service Design', 'Dashboard Design', 'Public Sector'],
    impact: 'Improved account management for thousands of London drivers'
  },
  {
    id: '2',
    title: 'WhatsApp Gen AI Chatbot',
    company: 'John Lewis',
    description: 'Enhanced customer service using Gen AI through WhatsApp messaging',
    skills: ['AI/ML', 'Conversational Design', 'Gen AI', 'Customer Service'],
    impact: 'Streamlined customer interactions using AI technology'
  },
  {
    id: '3',
    title: 'Payment System',
    company: 'Major UK Bank',
    description: 'Automation in business banking payment systems',
    skills: ['FinTech', 'B2B', 'Payment Systems', 'Enterprise'],
    impact: 'Reduced processing time and improved accuracy'
  },
  {
    id: '4',
    title: 'Mortgage Backend',
    company: 'Koodoo',
    description: 'Internal tools using AI in regulated financial industries',
    skills: ['AI Tools', 'Regulatory Compliance', 'B2B SaaS', 'FinTech'],
    impact: 'Streamlined internal processes with AI assistance'
  },
  {
    id: '5',
    title: 'E-commerce Checkout',
    company: 'Tesco',
    description: 'Optimized checkout experience for one of UK\'s largest retailers',
    skills: ['E-commerce', 'Conversion', 'Checkout Flow', 'Retail'],
    impact: 'Increased conversion rates and reduced cart abandonment'
  },
  {
    id: '6',
    title: 'B2B Licensing',
    company: 'PRS for Music',
    description: 'Complex B2B licensing platform for music rights',
    skills: ['B2B SaaS', 'Complex Systems', 'Licensing', 'Music Industry'],
    impact: 'Simplified complex licensing workflows'
  },
  {
    id: '7',
    title: 'Chatbot Fintech',
    company: 'Mespo',
    description: 'Financial chatbot for customer support and transactions',
    skills: ['Chatbot', 'FinTech', 'Conversational UI', 'Customer Support'],
    impact: 'Automated customer support for financial services'
  }
];

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedProjects, setAnalyzedProjects] = useState<Project[]>(projects);

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;

    setAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, projects })
      });

      const data = await response.json();
      
      if (data.rankedProjects) {
        setAnalyzedProjects(data.rankedProjects);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f2fce2]">
      {/* Beta Badge */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
          AI-Powered Portfolio • In Beta
        </div>
      </div>

      {/* Header */}
      <header className="w-full border-b border-black/8 sticky top-0 bg-[#f2fce2]/80 backdrop-blur-sm z-40">
        <div className="max-w-[1440px] mx-auto px-20 py-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-full bg-[#d68170] shadow-sm" />
          </div>
          
          <nav className="flex items-center gap-10">
            <a href="#work" className="text-black hover:text-black/60 transition-colors text-[17px] font-medium tracking-[-0.03em]">
              Work
            </a>
            <a href="#about" className="text-black hover:text-black/60 transition-colors text-[17px] font-medium tracking-[-0.03em]">
              About
            </a>
            <a href="#contact" className="text-black hover:text-black/60 transition-colors text-[17px] font-medium tracking-[-0.03em]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-24">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-12 gap-20">
            <div className="col-span-8">
              <h1 className="text-[80px] font-medium leading-[106%] tracking-[-0.05em] text-black mb-12">
                Asakala<br />
                Digital Product designer
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="w-full border-t border-black/8 py-16">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-12 gap-20">
            <div className="col-span-8 col-start-5">
              <p className="text-[32px] leading-[142%] tracking-[-0.035em] text-black/66 mb-8">
                A recent thought: how does your product fit in or around the evolving context of the user&apos;s attention? These users maybe customers or teams working within your company.
              </p>
              <p className="text-[32px] leading-[142%] tracking-[-0.035em] text-black/66 mb-8">
                I&apos;m a Senior Product Designer with 8 years of experience. Based in London, UK.
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
          <div className="grid grid-cols-12 gap-8">
            <div className="col-start-5 col-span-8">
              <h2 className="text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-4">
                See how my experience matches your role
              </h2>
              
              <div className="govuk-form-group">
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
                  rows={8}
                  aria-describedby="job-description-hint"
                  placeholder="We're looking for a Senior UX Designer with experience in AI products, and user research..."
                  className="w-full bg-white border-2 border-black/20 rounded-xl p-4 text-black placeholder-black/30 focus:outline-none focus:ring-0 focus:border-black resize-none text-[18px] leading-[1.6] transition-colors"
                />
              </div>
              
              <button
                onClick={analyzeJobDescription}
                disabled={analyzing || !jobDescription.trim()}
                aria-busy={analyzing}
                className="mt-4 px-8 py-4 bg-black hover:bg-black/80 disabled:bg-black/40 disabled:cursor-not-allowed rounded-xl font-medium flex items-center gap-2 transition-all text-white text-[17px]"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={22} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={22} />
                    Analyze Match
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full border-t border-black/8 py-24" id="work">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-start-5 col-span-8">
              <div className="h-px w-full bg-black mb-6" />
              <h2 className="text-[56px] font-medium leading-[120%] tracking-[-0.04em] text-black">
                Featured Projects
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-start-5 col-span-8 space-y-12">
              {analyzedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl p-10 border border-black/8 hover:border-black/20 transition-all"
                >
                  {project.matchScore && (
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                        <Sparkles size={16} />
                        {project.matchScore}% Match
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-[32px] font-medium leading-[120%] tracking-[-0.04em] text-black mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black/66 mb-2">
                    {project.company}
                  </p>
                  
                  <p className="text-[24px] leading-[145%] tracking-[-0.03em] text-black mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-black/5 text-black rounded-lg text-base font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-[17px] leading-[145%] tracking-[-0.03em] text-black">
                    <span className="font-medium">Impact:</span> {project.impact}
                  </p>
                </div>
              ))}
            </div>
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
      <footer className="w-full border-t border-black/8 py-12 bg-[#f2fce2]">
        <div className="max-w-[1440px] mx-auto px-20">
          <p className="text-black/55 text-base tracking-[-0.03em]">
            © 2025 Asakala Geraghty
          </p>
        </div>
      </footer>
    </main>
  );
}