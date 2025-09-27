document.getElementById("generateBtn").addEventListener("click", () => {
    const topic = document.getElementById("topic").value.trim();
    const output = document.getElementById("output");

    if (!topic) {
        output.innerHTML = "<p style='color:red'>⚠️ Please enter a topic.</p>";
        return;
    }

    output.innerHTML = "<h3>Generating...</h3>";

    // --- TEMPLATE LOGIC STARTS HERE ---
    const templates = [
        // 1. Title focused on SEO/list
        {
            title: `10 Best Tips for Mastering ${topic} in 2025`,
            meta: `Learn the essential 10 tips to master ${topic}. Boost your skills and efficiency with this comprehensive guide for beginners and experts.`
        },
        // 2. Title focused on question/solution
        {
            title: `Is ${topic} Worth Your Time? (The Complete Guide)`,
            meta: `Everything you need to know about ${topic}. We break down the costs, benefits, and why it might be the solution you're looking for.`
        },
        // 3. Title focused on speed/results
        {
            title: `How to Implement ${topic} in Under 30 Minutes`,
            meta: `A step-by-step tutorial on quickly implementing ${topic}. Achieve fast results without wasting time on complicated setups.`
        }
    ];
    // --- TEMPLATE LOGIC ENDS HERE ---

    let htmlOutput = "<h3>Generated Ideas:</h3>";

    templates.forEach((item, index) => {
        htmlOutput += `
            <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                <h4>Idea ${index + 1}:</h4>
                <p><strong>Title:</strong> ${item.title}</p>
                <p><strong>Meta Description:</strong> ${item.meta}</p>
            </div>
        `;
    });

    output.innerHTML = htmlOutput;
});
