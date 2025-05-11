document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Create header element
    const header = document.createElement('header');
    header.className = 'navbar';

    // Left part of the navbar (logo and menu toggle)
    const left = document.createElement('div');
    left.className = 'navbar-left';

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

    left.appendChild(menuToggle);
    left.appendChild(logo);

    // Right part of the navbar (login or user name)
    const right = document.createElement('div');
    right.className = 'navbar-right';

    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.id = 'login-link';

    // Check if user is logged in and display appropriate text
    if (storedUser && storedUser.name) {
        loginLink.textContent = `Hi, ${storedUser.name.split(' ')[0]}`;  // Only show the first name
    } else {
        loginLink.textContent = 'Login';
    }

    right.appendChild(loginLink);

    // Append left and right sections to the header
    header.appendChild(left);
    header.appendChild(right);

    // Insert header into the DOM
    document.body.insertBefore(header, document.body.firstChild);

    // Mobile menu toggle functionality
    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('.main-nav');
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open');
    });
});
