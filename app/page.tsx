"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Github, Linkedin, Mail, Check } from 'lucide-react';

export default function AIPortfolio() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const portfolioData = {
    name: "Asakala Geraghty",
    title: "UX Product Designer",
    bio: "Product designer specialising in solving systemic challenges for global brands. Passionate about creating intuitive experiences that leverage design and insights to solve real user problems.",
    contact: {
      email: "asakalageraghty@gmail.com",
      linkedin: "linkedin.com/in/asakala",
      github: "github.com/kalasentient"
    },
    skills: {
      design: ["UX Product design", "Strategic thinking", "Figma", "Sketch", "Prototyping", "synthesis and analysis of qualitative and quantative research", "Wireframing", "UI design", "Collaboration with AI engineering teams and data scientists", "Working effectively with large groups of stakeholders", "Eager for feedback and learning"],
      research: ["User Interviews", "Usability Testing", "A/B Testing", "Analytics", "Journey Mapping"],
      genAI: ["Chatbots and conversational interfaces", "Personalisation and recommendation systems", "AI UX Patterns", "AI Product Design", "AI Ethics", "Prompt Engineering", "LLM Integration"],
      technical: ["Design in regulated industries", "Design for internal systems and B2B", "Accessibility (WCAG)", "basic HTML/CSS", "API Integration", "Retail", "Fintech", "Not for profit", "public organisations"],
    },
    projects: [
      {
        id: 1,
        title: "Dashboard re design for London drivers paying charges",
        client: "Transport for London",
        description: "Complete design overhaul of payments dashboard for all paying drivers in London and how it is discovered. Led the development of UX research strategy, facilitating early identification of fleet business and personal user needs which led to more streamlined design sprints and clearer focus on priorities. Prototyping new and improved accessible account dashboard and payment experiences through to delivering final visual designs for sets of multiple user groups.",
        impact: "Uncovered unmet user needs through interviews, usability testing, or surveys that shifted the team's direction. Identified pain points and improved design practices in an existing flow that saved the organisation from shipping something broken. Created prototypes or journey maps that got previously deadlocked teams to agree on a direction. Usability test scores improving across prototype iterations. Heuristic analysis that influenced a product pivot and stakeholder satisfaction. Created new UI components to match future design language direction ",
        skills: ["UX Research", "Dashboard Design", "Figma", "User Testing", "Wireframes", "UI design", "Accessibility (WCAG)", "Stakeholder management"],
        category: "Dashboard design",
        image: "🚗",
        year: "2024"
      },
      {
        id: 2,
        title: "WhatsApp customer service Gen AI chatbot ",
        client: "John Lewis",
        description: "Lead product designer in the Salesforce Chatbot team, designing and testing new AI functionality, which led to shorter customer wait times and improved experience for human agents. Worked with privacy and data teams and built a safe data processing and framework for future AI projects.",
        impact: "Increase in speed for human agents to accept a conversation, decrease in times a customer is moved to another queue, customer feedback rating up",
        skills: ["Chatbot design", "AI Product Design", "LLM integration", "User Research", "Prototyping", "Sentiment analysis tools for customer feedback", "Salesforce", "AI Ethics"],
        category: "Conversational and chatbot design",
        image: "🤖",
        year: "2023"
      },
      {
        id: 3,
        title: "Payment system re design",
        client: "Major UK Bank",
        description: "Payment system re design, improving experiences for both internal colleagues across a spectrum of teams and B2B business customers of the bank by reducing manual error through automation whilst allowing for human intervention when it mattered most.",
        impact: "Successfully introduced automation into something that depends on human trust and relationships. Surfaced the varied needs of internal teams and business banking customers across different company sizes, preventing a one-size-fits-all solution.",
        skills: ["Systems thinking", "High-level data and process mapping", "Stakeholder management", "Contextual enquiry", "Qualitative research", "UI and interaction design for data dashboards"],
        category: "Software as a service",
        image: "💎",
        year: "2022"
      },
      {
        id: 4,
        title: "Optimising a mortgage lenders internal back end system",
        client: "Koodoo",
        description: "Re desgined the back end tool that Mortgage underwriters use to assess and approve mortgage applications. Led research and prototype testing to aid fast design iteration.",
        impact: "Uncovered how internal teams were actually using the system versus how it was assumed to be used, directly informing the new design strategy and execution",
        skills: ["UX Research", "Prototyping", "User Testing", "Gen AI", "Process mapping"],
        category: "Fintech internal systems",
        image: "✍️",
        year: "2024"
      },
      {
        id: 5,
        title: "E-commerce Checkout Optimization",
        client: "Tesco",
        description: "Optimised multi-step checkout flow for supermarket retailer. Worked with data science team to create the groceries App's first Personalised product recommendations",
        impact: "Designed prompts at Checkout resulting in over 8million customers changing their mind and deciding not to use plastic bags. Created card management functionality facilitating a faster Checkout. 1% uplift in checkout conversion",
        skills: ["UX Research", "A/B Testing", "Conversion Optimization", "Figma", "Analytics", "Prototyping"],
        category: "E-commerce",
        image: "🛍️",
        year: "2021"
      },
      {
        id: 6,
        title: "Re design of B2B music licensing",
        client: "PRS for Music",
        description: "Re design of purchase journeys to help shape how new B2B music licensing fee structures are understood and bought.",
        impact: "Improved understanding of complex pricing models, streamlined purchase flow for business customers",
        skills: ["UX Research", "B2B Design", "Journey Mapping", "Figma", "Prototyping", "Salesforce"],
        category: "B2B purchase flows",
        image: "🎹",
        year: "2025"
      },
      {
        id: 7,
        title: "Founding designer for Chatbot fintech platform",
        client: "Mespo",
        description: "Designed conversational design for facebook chatbot flow. Researched and tested strategy of changing from B2C to B2B model. Led new branding visual concepts. Collaborated with Lloyds and Clydesdale bank UX labs and successfully made a case for the integration of the app.",
        impact: "Increased signups by 16% on in house platform. Design helped secure agreement with banks",
        skills: ["UX Research", "Usability testing", "Chatbot design", "Early AI adoption", "Analytics"],
        category: "Early stage Chatbot design",
        image: "🤖",
        year: "2018"
      }
    ]
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;
    
    setAnalyzing(true);
    setShowAllProjects(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          projects: portfolioData.projects,
          skills: portfolioData.skills
        })
      });

      const parsedAnalysis = await response.json();
      
      if (parsedAnalysis.error) {
        throw new Error(parsedAnalysis.error);
      }
      
      setAnalysis(parsedAnalysis);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Sorry, there was an error analyzing the job description. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getSortedProjects = () => {
    if (!analysis) return portfolioData.projects;
    
    const projectMap = new Map(portfolioData.projects.map(p => [p.id, p]));
    return analysis.rankedProjects
      .map((rp: any) => ({
        ...projectMap.get(rp.projectId),
        relevanceScore: rp.relevanceScore,
        relevanceReason: rp.relevanceReason
      }))
      .filter((p: any) => p.title);
  };

  const displayedProjects = showAllProjects ? getSortedProjects() : getSortedProjects().slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-base font-medium">
  <Sparkles size={18} />
  AI-Powered Portfolio • In Beta
</div>
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent" style={{fontFamily: 'Georgia, serif'}}>
            {portfolioData.name}
          </h1>
          <p className="text-3xl text-slate-300 mb-12" style={{fontFamily: 'Georgia, serif'}}>
            {portfolioData.title}
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {portfolioData.bio}
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <button 
  onClick={copyEmail}
  className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors text-base cursor-pointer"
>
  {emailCopied ? <Check size={20} /> : <Mail size={20} />}
  <span>{emailCopied ? 'Email copied!' : 'asakala [at] gmail [dot] com'}</span>
</button>
            <a href={'https://' + portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors text-base">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href={'https://' + portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors text-base">
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </header>

<div className="mb-28">
  <div className="grid grid-cols-12 gap-8">
  <div className="col-start-5 col-span-8">
    <h2 className="text-4xl font-bold text-slate-100 mb-4">See how my experience matches</h2>
  
    <div className="govuk-form-group">
      <label htmlFor="job-description" className="block mb-2">
        <span className="text-slate-300 text-lg font-medium leading-relaxed block">
          Paste a job description to see my most relevant projects
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
        className="w-full bg-slate-800/50 border-2 border-slate-600 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-indigo-500 resize-none text-lg"
        style={{lineHeight: '1.6'}}
      />
    </div>
    
    <button
      onClick={analyzeJobDescription}
      disabled={analyzing || !jobDescription.trim()}
      aria-busy={analyzing}
      className="mt-4 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-indigo-700 disabled:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/50 text-base"
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

        <section className="mt-20">
          <h2 className="text-4xl font-bold mb-12 text-slate-100">
            {analysis ? 'Most Relevant Projects' : 'Featured Projects'}
          </h2>
          
          <div className="space-y-8">
            {displayedProjects.map((project: any, idx: number) => (
              <div
                key={project.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all shadow-xl hover:shadow-2xl group"
                style={{
                  animation: analysis ? 'slideInUp 0.5s ease-out ' + (idx * 0.1) + 's both' : 'none'
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">{project.image}</div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors leading-tight">
                          {project.title}
                        </h3>
                        {project.client && (
                          <p className="text-lg text-slate-400 mb-2 font-medium">{project.client}</p>
                        )}
                        <p className="text-base text-slate-500">{project.category} • {project.year}</p>
                      </div>
                      {analysis && project.relevanceScore && (
                        <div className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-4 py-2 rounded-full">
                          <span className="text-indigo-300 font-semibold text-base">{project.relevanceScore}% Match</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed text-lg" style={{lineHeight: '1.7'}}>
                      {project.description}
                    </p>
                    
                    {analysis && project.relevanceReason && (
                      <div className="mb-6 p-5 bg-indigo-950/30 border-l-4 border-indigo-500 rounded">
                        <p className="text-base text-indigo-200 leading-relaxed" style={{lineHeight: '1.7'}}>
                          <strong>Why it's relevant:</strong> {project.relevanceReason}
                        </p>
                      </div>
                    )}
                    
                    <div className="mb-6 p-5 bg-slate-800/50 rounded-lg">
                      <p className="text-base text-slate-300 leading-relaxed" style={{lineHeight: '1.7'}}>
                        <span className="text-green-400 font-semibold">Impact:</span> {project.impact}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill: string, skillIdx: number) => (
                        <span
                          key={skillIdx}
                          className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-full text-base text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {analysis && !showAllProjects && getSortedProjects().length > 3 && (
            <button
              onClick={() => setShowAllProjects(true)}
              className="mt-8 mx-auto flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-indigo-500 rounded-xl transition-all text-slate-200 text-base"
            >
              View All Projects ({getSortedProjects().length})
              <ArrowRight size={20} />
            </button>
          )}
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-700/50 text-center text-slate-500 text-base">
          <p>Built with React + Claude API • This portfolio adapts to show you what's most relevant</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}