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
            // Logout logic (clear tokens, etc.)
            localStorage.removeItem('user'); // Example: remove from storage
            window.location.reload(); // Reload page after logout
        });

        nav.appendChild(userName);
        nav.appendChild(logoutButton);
    } else {
        // If no user, show Login button
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html'; 
        loginLink.textContent = 'Login';
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
    // Assume user info is stored in localStorage after login
    const storedUser = JSON.parse(localStorage.getItem('user')); // { name: 'John' }

    const headerElement = createHeader(storedUser);
    document.body.insertBefore(headerElement, document.body.firstChild);
});
