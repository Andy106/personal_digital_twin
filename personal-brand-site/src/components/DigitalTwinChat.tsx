"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "What are Anand's core strengths?",
  "Summarize Anand's leadership experience.",
  "What certifications does Anand hold?",
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Anand's digital twin. Ask me about his experience, leadership, and achievements.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  async function sendMessage(text: string) {
    const userMessage: Message = { role: "user", content: text.trim() };
    if (!userMessage.content) return;

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter((m) => m.role === "user"),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || typeof data.reply !== "string") {
        throw new Error(data.error ?? "Unable to generate a response.");
      }
      const assistantReply = data.reply;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;
    await sendMessage(input);
  }

  return (
    <section>
      <h2>Ask Anand&apos;s Digital Twin</h2>
      <p className="chatIntro">
        Get quick answers about Anand&apos;s profile, experience, certifications,
        and impact.
      </p>

      <div className="starterPrompts">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="promptChip"
            onClick={() => void sendMessage(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="chatBox" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`bubble ${message.role === "user" ? "user" : "assistant"}`}
          >
            {message.content}
          </div>
        ))}
        {isLoading ? <div className="bubble assistant">Thinking...</div> : null}
      </div>

      <form className="chatForm" onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Anand Sharma..."
          disabled={isLoading}
        />
        <button type="submit" className="button primary" disabled={!canSend}>
          Send
        </button>
      </form>
      {error ? <p className="chatError">{error}</p> : null}
    </section>
  );
}
