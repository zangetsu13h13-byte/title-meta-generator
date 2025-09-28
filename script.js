// --- CONFIGURATION: FILL IN YOUR KEYS HERE ---
// NOTE: These keys look correct and have been pulled from your uploaded file.
const SUPABASE_URL = "https://bipvrqakcoswbcervejf.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpcHZycWFrY29zd2JjZXJ2ZWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNDMyOTIsImV4cCI6MjA3NDYxOTI5Mn0.e68_BQw8BdLazdMW-4G2Wrm_AhDpEwS-Dn55EwKyllI";

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
        setupGenerator(); // Start the generator functions
    } else {
        // User is logged out: SHOW LOGIN GATE
        document.title = "Sign In Required";
        authGate.style.display = 'block';
        appContent.style.display = 'none';
        authBtn.textContent = 'Sign In';
        authBtn.onclick = () => { /* No action on sign in click */ };
        loginBtn.onclick = handleLogin;
    }
}

async function handleLogin() {
    const emailInput = document.getElementById('userEmail');
    const email = emailInput.value.trim();
    
    // Simple email format check
    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address to sign up.");
        return;
    }

    // Set temporary state for user experience
    loginBtn.textContent = "Saving...";
    loginBtn.disabled = true;

    try {
        // --- DATA COLLECTION STEP: Save the email to Supabase ---
        const response = await fetch(`${SUPABASE_URL}/rest/v1/user?schema=public`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'return=minimal' 
            },
            body: JSON.stringify({ email: email })
        });

        // 201 (Created) or 409 (Conflict/Already Exists) are both success states for us.
        if (response.status === 201 || response.status === 409) {
            
            // --- MOCK LOGIN SUCCESS ---
            localStorage.setItem('isLoggedIn', 'true');
            alert(`Success! Thanks for signing up, ${email}. The tool is unlocked.`);
            location.reload(); 
        } else {
            // Log the error response text for debugging
            console.error('Supabase Error:', await response.text());
            alert('Sign up failed. Please check console or try again.');
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Could not connect to the sign-up service. Check your Supabase URL/Key.');
    } finally {
        // Ensure button state is reset if function fails before reload
        loginBtn.textContent = "Sign Up & Unlock Tool";
        loginBtn.disabled = false;
    }
}


function handleLogout() {
    // Clear the local login state
    localStorage.removeItem('isLoggedIn');
    // Reload the page to show the login view
    location.reload();
}

// --- API GENERATOR LOGIC ---
function setupGenerator() {
    generateBtn.addEventListener("click", async () => {
        const topic = document.getElementById("topic").value.trim();
        const output = document.getElementById("output");

        if (!topic) {
            output.innerHTML = "<p style='color:red'>⚠️ Please enter a topic.</p>";
            return;
        }

        output.innerHTML = "<p>⏳ Generating content with AI...</p>";

        try {
            // Call the Vercel Serverless Function (using the OpenRouter key set in Vercel)
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: topic })
            });

            const data = await response.json();

            if (data.text) {
                // Display AI results
                output.innerHTML = `
                    <div class="result-box" style="white-space: pre-wrap;">
                        ${data.text}
                    </div>
                `;
            } else {
                // Display error from server function
                output.innerHTML = `<p style="color:red">⚠️ AI Error: ${data.error || 'Check Vercel logs for OpenRouter key status.'}</p>`;
            }
        } catch (err) {
            output.innerHTML = "<p style='color:red'>⚠️ Failed to connect to the server. Try refreshing or check Vercel logs.</p>";
        }
    });
}

// Start the application by checking the auth status
checkAuthStatus();