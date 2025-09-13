import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      text,
      prompt,
      apiKey = process.env.GEMINI_API_KEY
    } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      messages: [
        {
          role: "system",
          content: `You are a professional resume writer. Your task is to refine and improve the given text while maintaining its core meaning. Focus on clarity, impact, and professional tone. Correct any grammar issues and rephrase to make it more compelling. ${
            prompt ? "Additional instructions: " + prompt : ""
          }`
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    return NextResponse.json({ refinedText: result.content });
  } catch (error) {
    console.error("Error refining text:", error);
    return NextResponse.json(
      { error: "Failed to refine text" },
      { status: 500 }
    );
  }
}
