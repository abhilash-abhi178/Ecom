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
    cartLink.href = 'checkout.html'; //  Replace with your cart page URL
    cartLink.textContent = 'Cart';
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html'; // Replace with your login page URL
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
