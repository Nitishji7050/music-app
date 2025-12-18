document.addEventListener('DOMContentLoaded', () => {
    // Toggle between login and signup
    const loginToggle = document.getElementById('loginToggle');
    const signupToggle = document.getElementById('signupToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginToggle.addEventListener('click', () => {
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });
    signupToggle.addEventListener('click', () => {
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Animated placeholders
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });

    // Password show/hide toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const target = document.getElementById(toggle.dataset.target);
            if (target.type === 'password') {
                target.type = 'text';
                toggle.textContent = '🙈';
            } else {
                target.type = 'password';
                toggle.textContent = '👁️';
            }
        });
    });

    // Form validation and FastAPI connection
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const message = document.getElementById('loginMessage');
        message.textContent = '';
        if (!email || !password) {
            message.textContent = 'Please fill in all fields.';
            return;
        }
        if (!validateEmail(email)) {
            message.textContent = 'Invalid email format.';
            return;
        }
        // Connect to FastAPI backend
        try {
            const res = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                // Save user to localStorage
                localStorage.setItem('musicAppUser', JSON.stringify(data));
                window.location.href = 'home.html';
            } else {
                message.textContent = data.detail || 'Login failed.';
            }
        } catch (err) {
            message.textContent = 'Server error.';
        }
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const message = document.getElementById('signupMessage');
        message.textContent = '';
        if (!name || !email || !password) {
            message.textContent = 'Please fill in all fields.';
            return;
        }
        if (!validateEmail(email)) {
            message.textContent = 'Invalid email format.';
            return;
        }
        // Connect to FastAPI backend
        try {
            const res = await fetch('http://127.0.0.1:8000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                // Save user to localStorage
                localStorage.setItem('musicAppUser', JSON.stringify(data));
                window.location.href = 'home.html';
            } else {
                message.textContent = data.detail || 'Signup failed.';
            }
        } catch (err) {
            message.textContent = 'Server error.';
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
