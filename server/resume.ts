"use server";

import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ResumeDataSchema } from "@/lib/resume-schema";

export async function parseResumeFromFile(fileContent: string, apiKey: string) {
  try {
    if (!apiKey) {
      throw new Error("API key is required");
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const model = google("gemini-2.0-flash-exp");

    const result = await generateObject({
      model,
      schema: ResumeDataSchema,
      prompt: `
        Parse the following resume content and extract structured information. 
        This content may be from a PDF, Word document, or text file.
        Fill in all available information from the resume content.
        
        For missing information, use empty strings for text fields and empty arrays for array fields.
        
        Guidelines:
        - Extract full name, professional title, contact information
        - Parse work experience with job titles, companies, dates, locations, and descriptions
        - Extract education details including degrees, institutions, dates, and locations
        - Identify skills mentioned in the resume
        - Find certifications and their issuers
        - Extract key achievements or accomplishments
        - Format dates as MM/YYYY or similar readable format
        - For descriptions, preserve bullet points and key information
        - Handle various resume formats and layouts
        
        Resume Content:
        ${fileContent}
      `
    });

    return {
      success: true,
      data: result.object
    };
  } catch (error) {
    console.error("Error parsing resume from file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to parse resume"
    };
  }
}
