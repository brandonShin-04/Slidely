import { useState } from "react";

type SonarResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

type fileText = {
  fileText: string | null;
};

const SONAR_API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

export default function FileConsumer({ fileText }: fileText) {
  const [response, setResponse] = useState<string | null>(null);

  const promptSonar = async (fileText: string) => {
    const body = {
      model: "sonar-pro", // or "sonar" for the base model
      messages: [
        {
          role: "system",
          content:
            "Extract key terms and definitions from the text. Return only JSON.",
        },
        {
          role: "user",
          content: `Extract key terms with definitions from this text: ${fileText}`,
        },
      ],
      max_tokens: 256,
      temperature: 0.2,
    };

    try {
      const res = await fetch(SONAR_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data: SonarResponse = await res.json();
      setResponse(data.choices[0]?.message.content || "No response");
    } catch (error) {
      setResponse(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      {fileText && (
        <button onClick={() => promptSonar(fileText)}>Ask Sonar</button>
      )}
      <div>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
