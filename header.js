// Function to create the header dynamically
function createHeader() {
    const header = document.createElement('header');
    header.className = 'navbar';

    // Mobile menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    const bar1 = document.createElement('div');
    bar1.className = 'bar';
    const bar2 = document.createElement('div');
    bar2.className = 'bar';
    const bar3 = document.createElement('div');
    bar3.className = 'bar';
    menuToggle.appendChild(bar1);
    menuToggle.appendChild(bar2);
    menuToggle.appendChild(bar3);

    // Logo
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'EcomDeals';

    // Navigation
    const nav = document.createElement('nav');
    nav.className = 'main-nav';
    const homeLink = document.createElement('a');
    homeLink.href = '/';  // Or 'index.html' if needed
    homeLink.textContent = 'Home';
    const cartLink = document.createElement('a');
    cartLink.href = '#'; // Replace with your cart page URL
    cartLink.textContent = 'Cart';

    // Login / Logout Link (initially login)
    const loginLink = document.createElement('a');
    loginLink.href = '#'; // Placeholder, it will be changed dynamically
    loginLink.textContent = 'Login';
    loginLink.id = 'login-link'; // ID to target the login button

    const logoutLink = document.createElement('a');
    logoutLink.href = '#'; // Placeholder, it will be changed dynamically
    logoutLink.textContent = 'Logout';
    logoutLink.id = 'logout-link'; // ID to target the logout button
    logoutLink.style.display = 'none'; // Hidden by default

    nav.appendChild(homeLink);
    nav.appendChild(cartLink);
    nav.appendChild(loginLink);
    nav.appendChild(logoutLink);

    // Mobile menu toggle functionality (moved inside the function)
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open');
    });

    // Handle login/logout functionality
    document.addEventListener('DOMContentLoaded', function() {
        const storedUser = JSON.parse(localStorage.getItem('amazonUser'));
        if (storedUser) {
            updateUserUI(storedUser.name, storedUser.picture);
        }
    });

    loginLink.onclick = function(e) {
        e.preventDefault();
        const options = { scope: 'profile' };
        amazon.Login.authorize(options, function(response) {
            if (response.error) {
                alert('Amazon login failed: ' + response.error);
                return;
            }

            fetch('https://api.amazon.com/user/profile', {
                headers: {
                    'Authorization': 'Bearer ' + response.access_token
                }
            })
            .then(res => res.json())
            .then(data => {
                const name = data.name || 'User';
                const picture = data.profile_picture || 'https://via.placeholder.com/30'; // fallback to placeholder
                updateUserUI(name, picture);
                localStorage.setItem('amazonUser', JSON.stringify({ name, picture }));
            })
            .catch(err => {
                console.error('Failed to fetch Amazon profile', err);
            });
        });
    };

    logoutLink.onclick = function(e) {
        e.preventDefault();
        logout();
    };

    return header;
}

// Function to update the header UI after login
function updateUserUI(name, picture) {
    document.getElementById('login-link').style.display = 'none'; // Hide login link
    document.getElementById('logout-link').style.display = 'inline-block'; // Show logout link

    document.getElementById('logout-link').style.pointerEvents = 'auto'; // Enable logout button

    // Optionally update the header with profile info
    document.getElementById('login-link').innerHTML = `
        <img src="${picture}" alt="Profile" style="width:30px;height:30px;border-radius:50%;vertical-align:middle;margin-right:8px;">
        Hi, ${name.split(' ')[0]}
    `;
}

// Function to handle logout
function logout() {
    localStorage.removeItem('amazonUser'); // Clear user data from localStorage
    document.getElementById('login-link').style.display = 'inline-block'; // Show login button again
    document.getElementById('logout-link').style.display = 'none'; // Hide logout button
    document.getElementById('login-link').style.pointerEvents = 'auto'; // Enable login button
}

// Append the header to the body after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const headerElement = createHeader();
    document.body.insertBefore(headerElement, document.body.firstChild);
});

// Amazon Login setup
window.onAmazonLoginReady = function() {
    amazon.Login.setClientId('amzn1.application-oa2-client.b4f87693d14b4c82a628824194ba48de'); // Your real Client ID
};

(function(d) {
    var a = d.createElement('script'); a.type = 'text/javascript';
    a.async = true; a.id = 'amazon-login-sdk';
    a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
    d.getElementById('amazon-root').appendChild(a);
})(document);
