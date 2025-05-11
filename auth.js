// Simple Authentication (For demo purposes only)
const users = [{ username: 'admin', password: 'password' }];

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login Successful!');
        
        // Save fake user in localStorage (for consistent handling)
        const userData = { name: username };
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirect back to where login was initiated
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    } else {
        alert('Invalid credentials!');
    }
});

// Handle Amazon login if access_token is present
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');

if (accessToken) {
    fetch('https://api.amazon.com/user/profile', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    .then(res => res.json())
    .then(profile => {
        console.log('Amazon profile:', profile);
        
        const user = {
            name: profile.name || profile.email || 'Amazon User'
        };
        localStorage.setItem('user', JSON.stringify(user));

        // Clean URL (remove access_token without reloading page)
        window.history.replaceState({}, document.title, window.location.pathname);

        // Redirect back to original page
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    })
    .catch(err => {
        console.error('Error fetching profile:', err);
        alert('Failed to fetch Amazon profile!');
    });
}
