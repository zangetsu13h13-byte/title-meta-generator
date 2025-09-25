const API_KEY = "YOUR_GEMINI_API_KEY"; // replace with your real key

document.getElementById("generateBtn").addEventListener("click", async () => {
  const topic = document.getElementById("topic").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "⏳ Generating...";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `Generate 5 catchy blog titles and meta descriptions for this topic: ${topic}. Output in bullet points.` }] }
          ]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    outputDiv.innerHTML = text.replace(/\n/g, "<br>");
  } catch (err) {
    outputDiv.innerHTML = "❌ Error: " + err.message;
  }
});
