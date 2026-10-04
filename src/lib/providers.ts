export type ProviderMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export interface LLMProvider {
  name: string;
  complete(messages: ProviderMessage[]): Promise<string>;
}

export class DemoProvider implements LLMProvider {
  name = "demo-deterministic";

  async complete(messages: ProviderMessage[]) {
    const latest = [...messages].reverse().find((item) => item.role === "user");
    return "Demo mode received: " + (latest?.content ?? "no input");
  }
}

export class OpenAICompatibleProvider implements LLMProvider {
  name = "openai-compatible";

  constructor(
    private readonly endpoint: string,
    private readonly apiKey: string,
    private readonly model: string,
  ) {}

  async complete(messages: ProviderMessage[]) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.apiKey,
      },
      body: JSON.stringify({ model: this.model, messages }),
    });

    if (!response.ok) {
      throw new Error("LLM provider request failed with " + response.status);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "";
  }
}
