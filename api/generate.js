// This file runs on Vercel's server, keeping your key secret.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: "No topic provided." });
    }

    // Use a reliable open-source model from OpenRouter
    const modelName = "mistralai/mistral-7b-instruct:free";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "system",
            content: "You are a professional SEO content strategist. Generate 5 unique blog titles (under 60 characters) and 5 matching meta descriptions (under 160 characters) for the user's topic. Format the response clearly with numbered lists for each."
          },
          { role: "user", content: `Generate titles and metas for the topic: ${topic}` }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      // Extract the text content from the AI response
      const aiResponseText = data.choices[0].message.content;
      res.status(200).json({ text: aiResponseText });
    } else {
      console.error('AI Response Error:', data);
      res.status(500).json({ error: "AI failed to generate content. Check logs." });
    }

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
}