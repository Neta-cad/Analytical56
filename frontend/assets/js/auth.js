const API_BASE = "http://localhost:5000/api"; // we'll update this once the backend is deployed

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const messageEl = document.getElementById("signupMessage");
    messageEl.textContent = "";
    messageEl.className = "auth-message";

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const track = document.getElementById("track").value;

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, track })
      });

      const data = await res.json();

      if (!res.ok) {
        messageEl.textContent = data.message || "Signup failed. Try again.";
        messageEl.classList.add("error");
        return;
      }

      localStorage.setItem("token", data.token);
      messageEl.textContent = "Account created! Redirecting...";
      messageEl.classList.add("success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);

    } catch (err) {
      messageEl.textContent = "Server not reachable. Is the backend running?";
      messageEl.classList.add("error");
    }
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const messageEl = document.getElementById("loginMessage");
    messageEl.textContent = "";
    messageEl.className = "auth-message";

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        messageEl.textContent = data.message || "Login failed. Check your details.";
        messageEl.classList.add("error");
        return;
      }

      localStorage.setItem("token", data.token);
      messageEl.textContent = "Welcome back! Redirecting...";
      messageEl.classList.add("success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    } catch (err) {
      messageEl.textContent = "Server not reachable. Is the backend running?";
      messageEl.classList.add("error");
    }
  });
}