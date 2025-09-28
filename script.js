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
// Add these two constants at the very top of your script.js file, 
// replacing the placeholders with your actual keys from Step 1.
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL"; 
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; 


async function handleLogin() {
    const emailInput = document.getElementById('userEmail');
    const email = emailInput.value.trim();
    
    // Simple email format check
    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address to sign up.");
        return;
    }

    try {
        // --- DATA COLLECTION STEP ---
        // This attempts to save the email to your Supabase 'users' table
        const response = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email: email })
        });

        if (response.status === 201 || response.status === 409) {
            // 201 is success (new user saved)
            // 409 is conflict (user already exists in DB), which is also a success for us!
            
            // --- MOCK LOGIN SUCCESS ---
            localStorage.setItem('isLoggedIn', 'true');
            alert(`Thanks for signing up, ${email}! You are now logged in.`);
            location.reload(); 
        } else {
            console.error('Supabase Error:', await response.text());
            alert('Sign up failed due to a database error. Please try again.');
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Could not connect to the sign-up service. Please check your connection.');
    }
}
// Note: You must remove the 'setupGenerator()' call from the setupGenerator function 
// since it is now being called inside of checkAuthStatus().
// Ensure you still call checkAuthStatus() at the end of the script:
// checkAuthStatus();

function handleLogout() {
    // Clear the local login state
    localStorage.removeItem('isLoggedIn');
    // Reload the page to show the login view
    location.reload();
}

// --- GENERATOR LOGIC (Same functional template code) ---
function setupGenerator() {
    // ... (Keep all the mock auth functions: checkAuthStatus, handleLogin, handleLogout) ...

// --- API GENERATOR LOGIC ---
function setupGenerator() {
    generateBtn.addEventListener("click", async () => {
        const topic = document.getElementById("topic").value.trim();
        const output = document.getElementById("output");

        if (!topic) {
            output.innerHTML = "<p style='color:red'>⚠️ Please enter a topic.</p>";
            return;
        }

        output.innerHTML = "<p>⏳ Generating content with AI...</p>"; // New message

        try {
            // Call the Vercel Serverless Function
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: topic })
            });

            const data = await response.json();

            if (data.text) {
                // Display AI results directly (using simple pre-formatting)
                output.innerHTML = `
                    <div class="result-box" style="white-space: pre-wrap;">
                        ${data.text}
                    </div>
                `;
            } else {
                // Display error from server function
                output.innerHTML = `<p style="color:red">⚠️ AI Error: ${data.error || 'Check Vercel logs for details.'}</p>`;
            }
        } catch (err) {
            output.innerHTML = "<p style='color:red'>⚠️ Failed to connect to the server. Try refreshing.</p>";
        }
    });
}

// Start the application by checking the auth status
checkAuthStatus();
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