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
