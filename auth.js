// Simple Authentication (For demo purposes only)
const users = [{ username: 'admin', password: 'password' }];

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login Successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials!');
    }
});
// If access_token is in URL, fetch profile
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
            name: profile.name // You can get email too if needed
        };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = window.location.pathname; // Reload clean URL (remove access_token)
    })
    .catch(err => {
        console.error('Error fetching profile:', err);
    });
}

