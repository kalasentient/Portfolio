"use client";

import React, { useState } from 'react';
import { Sparkles, Briefcase, ArrowRight, Loader2, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function AIPortfolio() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Sample portfolio data - replace with your actual experience
  const portfolioData = {
    name: "Alex Morgan",
    title: "UX Product Designer",
    bio: "Product designer specializing in Gen AI experiences, design systems, and user research. Passionate about creating intuitive interfaces that leverage AI to solve real user problems.",
    contact: {
      email: "alex@example.com",
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan"
    },
    skills: {
      design: ["Figma", "Adobe XD", "Sketch", "Prototyping", "Design Systems", "Wireframing"],
      research: ["User Interviews", "Usability Testing", "A/B Testing", "Analytics", "Journey Mapping"],
      genAI: ["Prompt Engineering", "AI UX Patterns", "LLM Integration", "Claude API", "OpenAI API", "AI Product Design"],
      technical: ["HTML/CSS", "React", "Design Tokens", "API Integration", "Accessibility (WCAG)"]
    },
    projects: [
      {
        id: 1,
        title: "AI-Powered Customer Support Dashboard",
        description: "Redesigned enterprise support platform integrating Claude for intelligent ticket routing and response suggestions. Led user research with 50+ support agents to understand pain points.",
        impact: "Reduced average ticket resolution time by 40% and improved agent satisfaction scores by 65%",
        skills: ["Gen AI", "UX Research", "Dashboard Design", "Figma", "User Testing", "AI Product Design"],
        category: "GenAI Product",
        image: "🤖",
        year: "2024"
      },
      {
        id: 2,
        title: "Healthcare Mobile App Redesign",
        description: "Complete UX overhaul of patient portal app serving 2M+ users. Conducted extensive accessibility audits and user testing with diverse age groups.",
        impact: "Increased patient engagement by 85% and achieved WCAG 2.1 AA compliance",
        skills: ["Mobile Design", "Accessibility", "User Research", "Prototyping", "Design Systems", "iOS/Android"],
        category: "Mobile UX",
        image: "🏥",
        year: "2023"
      },
      {
        id: 3,
        title: "Design System for FinTech Platform",
        description: "Built comprehensive design system from scratch for B2B financial platform. Created component library, documentation, and design tokens used across 5 product teams.",
        impact: "Reduced design-to-dev handoff time by 60% and improved design consistency across products",
        skills: ["Design Systems", "Figma", "Component Design", "Documentation", "Design Tokens", "React"],
        category: "Design Systems",
        image: "💎",
        year: "2023"
      },
      {
        id: 4,
        title: "AI Writing Assistant for Marketing Teams",
        description: "Designed prompt-based writing tool leveraging GPT-4 for content creation. Led competitive analysis and developed novel UX patterns for AI feedback and iteration.",
        impact: "Adopted by 200+ marketing teams, generating 10k+ pieces of content monthly",
        skills: ["Gen AI", "Prompt Design", "UX Research", "Prototyping", "User Testing", "OpenAI API"],
        category: "GenAI Product",
        image: "✍️",
        year: "2024"
      },
      {
        id: 5,
        title: "E-commerce Checkout Optimization",
        description: "Streamlined multi-step checkout flow for fashion retailer. Conducted A/B testing and heat mapping analysis to identify friction points.",
        impact: "Increased conversion rate by 23% and reduced cart abandonment by 31%",
        skills: ["UX Research", "A/B Testing", "Conversion Optimization", "Figma", "Analytics", "Prototyping"],
        category: "E-commerce",
        image: "🛍️",
        year: "2022"
      }
    ]
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) return;
    
    setAnalyzing(true);
    setShowAllProjects(false);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are analyzing a job description to match it with a UX designer's portfolio projects.

Job Description:
${jobDescription}

Portfolio Projects:
${JSON.stringify(portfolioData.projects, null, 2)}

Portfolio Skills:
${JSON.stringify(portfolioData.skills, null, 2)}

Analyze this job description and:
1. Identify the top 3-5 key requirements (skills, experience, domain knowledge)
2. Rank the portfolio projects by relevance (most to least relevant)
3. For each project, explain why it's relevant (or not) to this role
4. Create a brief "match summary" explaining why this candidate would be a good fit

Respond ONLY with a JSON object in this exact format (no markdown, no preamble):
{
  "keyRequirements": ["requirement1", "requirement2", "requirement3"],
  "matchSummary": "2-3 sentence summary of why candidate is a good fit",
  "rankedProjects": [
    {
      "projectId": 1,
      "relevanceScore": 95,
      "relevanceReason