document.getElementById("generateBtn").addEventListener("click", async () => {
  const topic = document.getElementById("topic").value.trim();
  const output = document.getElementById("output");

  if (!topic) {
    output.innerHTML = "<p style='color:red'>⚠️ Please enter a topic.</p>";
    return;
  }

  output.innerHTML = "<p>⏳ Generating...</p>";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });

    const data = await response.json();

    if (data.text) {
      output.innerHTML = `<p>${data.text}</p>`;
    } else {
      output.innerHTML = `<p style='color:red'>⚠️ Error: ${data.error}</p>`;
    }
  } catch (err) {
    output.innerHTML = "<p style='color:red'>⚠️ Failed to fetch response.</p>";
  }
});
