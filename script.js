// --- MOCK AUTHENTICATION LOGIC ---
const authGate = document.getElementById('auth-gate');
const appContent = document.getElementById('app-content');
const loginBtn = document.getElementById('loginBtn');
const authBtn = document.getElementById('authBtn');
const generateBtn = document.getElementById('generateBtn');

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        // User is logged in: SHOW APP
        document.title = "Title & Meta Generator";
        authGate.style.display = 'none';
        appContent.style.display = 'block';
        authBtn.textContent = 'Sign Out';
        authBtn.onclick = handleLogout;
        setupGenerator();
    } else {
        // User is logged out: SHOW LOGIN GATE
        document.title = "Sign In Required";
        authGate.style.display = 'block';
        appContent.style.display = 'none';
        authBtn.textContent = 'Sign In';
        authBtn.onclick = () => { /* Prevent action on main button click */ };
        loginBtn.onclick = handleLogin;
    }
}

function handleLogin() {
    // This is the mock login: it saves the state locally
    localStorage.setItem('isLoggedIn', 'true');
    // Reload the page to transition to the app view
    location.reload(); 
}

function handleLogout() {
    // Clear the local login state
    localStorage.removeItem('isLoggedIn');
    // Reload the page to show the login view
    location.reload();
}

// --- GENERATOR LOGIC (Same functional template code) ---
function setupGenerator() {
    generateBtn.addEventListener("click", () => {
        const topic = document.getElementById("topic").value.trim();
        const output = document.getElementById("output");

        if (!topic) {
            output.innerHTML = "<p style='color:red'>⚠️ Please enter a topic.</p>";
            return;
        }

        output.innerHTML = "<h3>Generating...</h3>";

        // --- TEMPLATE LOGIC ---
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

        let htmlOutput = "";

        templates.forEach((item, index) => {
            htmlOutput += `
                <div class="result-box">
                    <h4>Idea ${index + 1}:</h4>
                    <p><strong>Title:</strong> ${item.title}</p>
                    <p><strong>Meta Description:</strong> ${item.meta}</p>
                </div>
            `;
        });

        output.innerHTML = htmlOutput;
    });
}

// Start the application by checking the auth status
checkAuthStatus();