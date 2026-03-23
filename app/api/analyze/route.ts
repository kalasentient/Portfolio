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

    const prompt = "You are analyzing a job description to match it with a UX designer's portfolio projects.\n\n" +
      "Job Description:\n" + jobDescription + "\n\n" +
      "Portfolio Projects:\n" + JSON.stringify(projects, null, 2) + "\n\n" +
      "Analyze this job description and:\n" +
      "1. Identify the top 3-5 key requirements (skills, experience, domain knowledge)\n" +
      "2. Rank the portfolio projects by relevance (most to least relevant)\n" +
      "3. For each project, explain why it's relevant (or not) to this role\n" +
      "4. Create a brief \"match summary\" explaining why this candidate would be a good fit\n\n" +
      "Respond ONLY with a JSON object in this exact format (no markdown, no preamble):\n" +
      "{\n" +
      "  \"keyRequirements\": [\"requirement1\", \"requirement2\", \"requirement3\"],\n" +
      "  \"matchSummary\": \"2-3 sentence summary of why candidate is a good fit\",\n" +
      "  \"rankedProjects\": [\n" +
      "    {\n" +
      "      \"projectId\": 1,\n" +
      "      \"relevanceScore\": 95,\n" +
      "      \"relevanceReason\": \"Why this project is relevant\"\n" +
      "    }\n" +
      "  ]\n" +
      "}";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
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