import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

// system prompt builder
function buildSystemPrompt(userInstructions?: string) {
  return `
You are a professional resume writer. Refine and improve the provided text while preserving its meaning. 
Ensure clarity, strong impact, and a professional tone. 
Correct grammar issues and make the writing compelling. 
The final output must be a single refined version under 1000 characters, with no explanations or conversation. 
${userInstructions ? "User instructions: " + userInstructions : ""}
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { text, prompt, apiKey: clientApiKey } = await req.json();
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(prompt)
        },
        {
          role: "user",
          content: text
        }
      ]
    });
    const content = result.content[0];
    if (content.type === "text") {
      return NextResponse.json({ refinedText: content.text });
    }

    return NextResponse.json({ refinedText: text });
  } catch (error) {
    console.error("Error refining text:", error);
    return NextResponse.json(
      { error: "Failed to refine text" },
      { status: 500 }
    );
  }
}
