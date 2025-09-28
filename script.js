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