import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ResumeDataSchema } from "@/lib/resume-schema";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const apiKey = formData.get("apiKey") as string;

    if (!file || !apiKey) {
      return Response.json(
        { error: "File and API key required" },
        { status: 400 }
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const result = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      schema: ResumeDataSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Parse this resume and extract structured information. Fill missing fields with empty strings/arrays. Format dates as MM/YYYY. Preserve bullet points in descriptions."
            },
            {
              type: "file",
              data: await file.arrayBuffer(),
              mediaType: file.type
            }
          ]
        }
      ]
    });

    return Response.json({ success: true, data: result.object });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to parse resume"
      },
      { status: 500 }
    );
  }
}
