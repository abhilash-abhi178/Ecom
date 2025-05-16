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

    if (user) {
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
            window.location.reload();
        });

        nav.appendChild(userName);
        nav.appendChild(logoutButton);
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html'; 
        loginLink.textContent = 'Login';

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('redirectAfterLogin', window.location.href);
            window.location.href = 'login.html';
        });

        nav.appendChild(loginLink);
    }

    header.appendChild(menuToggle);
    header.appendChild(logo);
    header.appendChild(nav);

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open');
    });

    return header;
}
