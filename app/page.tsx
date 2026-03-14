"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Github, Linkedin, Mail, Copy, Check } from 'lucide-react';

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
        description: "Payment system re design, improving experiences for both internal colleagues across a spectrum of teams and B2B business customers of the bank by reducing manual error through automation whilst allowing for human intervention when it mattered most.",
        impact: "Successfully introduced automation into something that depends on human trust and relationships.Surfaced the varied needs of internal teams and business banking customers across different company sizes, preventing a one-size-fits-all solution.  ",
        skills: ["Systems thinking", "High-level data and process mapping", "Stakeholder management", "Contextual enquiry", "Qualitative research", "UI and interaction design for data dashboards"],
        category: "Software as a service",
        image: