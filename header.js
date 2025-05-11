document.addEventListener('DOMContentLoaded', () => {
    // Get the splash screen and main content elements
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // Set a delay to remove splash screen
    setTimeout(() => {
        // Add a fade-out effect
        splashScreen.classList.add('fade-out');

        // After fade-out completes, show main content and remove splash screen
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block'; // Show the main content
        }, 1000); // Matches the duration of the fade-out
    }, 3000); // Splash screen stays for 3 seconds
});

// Get references to the menu toggle and navigation links
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Add event listener for the menu toggle button
menuToggle.addEventListener('click', () => {
    // Toggle the 'open' class on the navigation menu
    navLinks.classList.toggle('open');

    // Toggle the appearance of the menu toggle bars (change to X shape on open)
    menuToggle.classList.toggle('open');
});

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

    // If user is logged in, show name and logout
    if (user) {
        const userName = document.createElement('span');
        userName.className = 'user-name';
        userName.textContent = `Hello, ${user.name}`;

        const logoutButton = document.createElement('button');
        logoutButton.className = 'logout-button';
        logoutButton.textContent = 'Logout';
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.reload(); // Reload to update header
        });

        nav.appendChild(userName);
        nav.appendChild(logoutButton);
    } else {
        // If no user, show Login button
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html'; 
        loginLink.textContent = 'Login';
        
        // SAVE redirect URL before going to login page
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

document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // { name: 'John' }
    const headerElement = createHeader(storedUser);
    document.body.insertBefore(headerElement, document.body.firstChild);

    // --- Handle post-login redirect if needed ---
    if (window.location.pathname.endsWith('login.html')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectUrl;
        }
    }
});
