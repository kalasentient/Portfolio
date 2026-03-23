import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { jobDescription, projects } = await request.json();

    if (!jobDescription || !projects) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trimmedProjects = projects.map((p: { id: string; title: string; company: string; description: string; skills: string[]; impact: string }) => ({
      id: p.id, title: p.title, company: p.company, description: p.description, skills: p.skills, impact: p.impact
    }));

    const prompt = "You are analyzing a job description to match it with a UX designer's portfolio projects.\n\n" +
      "Job Description:\n" + jobDescription + "\n\n" +
      "Portfolio Projects:\n" + JSON.stringify(trimmedProjects) + "\n\n" +
      "Analyze this job description and:\n" +
      "1. Identify the top 3-5 key requirements (skills, experience, domain knowledge)\n" +
      "2. Rank the portfolio projects by relevance (most to least relevant)\n" +
      "3. For each project, explain why it's relevant (or not) to this role\n" +
      "4. Create a brief \"match summary\" explaining why this candidate would be a good fit\n\n" +
      "Respond ONLY with a JSON object in this exact format (no markdown, no preamble):\n" +
      "{\"keyRequirements\":[\"requirement1\"],\"matchSummary\":\"summary\",\"rankedProjects\":[{\"projectId\":1,\"relevanceScore\":95,\"relevanceReason\":\"reason\"}]}";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 600,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const text = data.content.map((item: any) => item.type === "text" ? item.text : "").join("\n");
    const cleanText = text.replace(/```json|```/g, "").trim();
    const parsedAnalysis = JSON.parse(cleanText);

    // Merge Claude's ranked results with full project data from the request
    const enrichedRankedProjects = parsedAnalysis.rankedProjects
      .map((ranked: { projectId: number; relevanceScore: number; relevanceReason: string }) => {
        const fullProject = projects.find((p: { id: string }) => p.id === String(ranked.projectId));
        if (!fullProject) return null;
        return {
          ...fullProject,
          matchScore: ranked.relevanceScore,
          reasoning: ranked.relevanceReason,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      ...parsedAnalysis,
      rankedProjects: enrichedRankedProjects,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}