function createHeader(user) {
    const header = document.createElement('header');
    header.className = 'navbar';

    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        menuToggle.appendChild(bar);
    }

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'EcomDeals';

    const nav = document.createElement('nav');
    nav.className = 'main-nav';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';

    const cartLink = document.createElement('a');
    cartLink.href = '#'; 
    cartLink.textContent = 'Cart';

    nav.appendChild(homeLink);
    nav.appendChild(cartLink);

    // If user is logged in, show profile pic, name and logout button
    if (user) {
        // Show profile picture if available
        if (user.picture) {
            const userPic = document.createElement('img');
            userPic.src = user.picture;
            userPic.alt = `${user.name}'s profile picture`;
            userPic.className = 'user-picture';
            nav.appendChild(userPic);
        }

        const userName = document.createElement('span');
        userName.className = 'user-name';
        userName.textContent = `Hello, ${user.name}`;

        const logoutButton = document.createElement('button');
        logoutButton.className = 'logout-button stylish-logout';
        logoutButton.textContent = 'Logout';
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            localStorage.removeItem('google_id_token');
            localStorage.removeItem('amazon_access_token');
            window.location.reload(); // Reload to update header
        });

        nav.appendChild(userName);
        nav.appendChild(logoutButton);
    } else {
        // If no user, show Login button
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html'; 
        loginLink.textContent = 'Login';
        
        loginLink.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default <a> click
            localStorage.setItem('redirectAfterLogin', window.location.href); // Save current page
            window.location.href = 'login.html'; // Redirect manually
        });

        nav.appendChild(loginLink);
    }

    header.appendChild(menuToggle);
    header.appendChild(logo);
    header.appendChild(nav);

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open');
    });

    return header;
}

// rest of your existing code below remains unchanged
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const headerElement = createHeader(storedUser);
    document.body.insertBefore(headerElement, document.body.firstChild);

    if (window.location.pathname.endsWith('login.html')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectUrl;
        }
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service worker registered.', reg))
            .catch(err => console.error('Service worker registration failed:', err));
    }

    requestIdleCallback(() => {
        import('./components/LazyComponent.js').then((module) => {
            const LazyComponent = module.default;
        });
    });
});

document.getElementById('LoginWithAmazon').onclick = function() {
    var options = { 
        scope: 'profile' 
    };

    localStorage.setItem('redirectAfterLogin', window.location.href);

    amazon.Login.authorize(options, function(response) {
        if (response.error) {
            alert('OAuth error: ' + response.error);
            return;
        }
        console.log('Amazon Access Token:', response.access_token);
        window.location.href = "amazon-auth-success.html?access_token=" + response.access_token;
    });

    return false;
};
