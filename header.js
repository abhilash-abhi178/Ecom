function createHeader() {
    const header = document.createElement('header');
    header.className = 'navbar';

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

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'EcomDeals';

    const nav = document.createElement('nav');
    nav.className = 'main-nav';
    const homeLink = document.createElement('a');
    homeLink.href = '/';  // Or 'index.html' if needed
    homeLink.textContent = 'Home';
    const cartLink = document.createElement('a');
    cartLink.href = '#'; //  Replace with your cart page URL
    cartLink.textContent = 'Cart';
    const loginLink = document.createElement('a');
    loginLink.href = '#'; // Replace with your login page URL
    loginLink.textContent = 'Login';
    nav.appendChild(homeLink);
    nav.appendChild(cartLink);
    nav.appendChild(loginLink);

    header.appendChild(menuToggle);
    header.appendChild(logo);
    header.appendChild(nav);

    // Mobile menu toggle functionality (moved inside the function)
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open');
    });

    return header;
}

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

// Handle login button click
document.getElementById('login-link').onclick = function(e) {
    e.preventDefault();
    var options = { scope: 'profile' };
    amazon.Login.authorize(options, function(response) {
        if (response.error) {
            alert('Amazon login failed: ' + response.error);
            return;
        }
        // Fetch user profile
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

            // Save user data to localStorage
            localStorage.setItem('amazonUser', JSON.stringify({ name, picture }));
        })
        .catch(err => {
            console.error('Failed to fetch Amazon profile', err);
        });
    });
    return false;
};
