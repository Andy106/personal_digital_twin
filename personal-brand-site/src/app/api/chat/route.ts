import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { digitalTwinSystemPrompt, resumeFacts } from "@/lib/resumeContext";

type ChatMessage = {
  role: "user";
  content: string;
};

function readApiKeyFromParentEnvFile() {
  try {
    const envPath = path.resolve(process.cwd(), "../.env");
    if (!fs.existsSync(envPath)) return "";

    const contents = fs.readFileSync(envPath, "utf8");
    const line = contents
      .split(/\r?\n/)
      .find((item) => item.trim().startsWith("OPENAI_API_KEY="));

    if (!line) return "";
    const value = line.slice("OPENAI_API_KEY=".length).trim();
    return value.replace(/^['"]|['"]$/g, "");
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY || readApiKeyFromParentEnvFile();

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEY is not configured. Add it in personal-brand-site/.env.local or the workspace root .env file.",
        },
        { status: 500 },
      );
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "At least one user message is required." },
        { status: 400 },
      );
    }

    const userMessages = messages.filter(
      (message): message is ChatMessage =>
        message?.role === "user" &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    );

    if (userMessages.length === 0) {
      return NextResponse.json(
        { error: "At least one valid user message is required." },
        { status: 400 },
      );
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${digitalTwinSystemPrompt.trim()}\n\nResume facts:\n${resumeFacts.trim()}`,
        },
        ...userMessages.map((message) => ({
          role: "user" as const,
          content: message.content,
        })),
      ],
      temperature: 0.6,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    return NextResponse.json({ reply: reply || "I could not generate a response." });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "Failed to generate a response from the digital twin assistant.",
        details: message,
      },
      { status: 500 },
    );
  }
}
