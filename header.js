// Header.js Script
// Splash screen hide after 4 seconds
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 4000); // 4 seconds for splash screen
});

// Footer Toggle Script
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.footer-section');
    sections.forEach(section => {
        const header = section.querySelector('h4');
        const icon = header.querySelector('.toggle-icon');
        const list = section.querySelector('.footer-list');

        header.addEventListener('click', function() {
            const isActive = section.classList.contains('active');
            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.querySelector('.toggle-icon').textContent = '+';
                sec.querySelector('.footer-list').style.display = 'none';
            });

            if (!isActive) {
                section.classList.add('active');
                icon.textContent = '-';
                list.style.display = 'block';
            } else {
                section.classList.remove('active');
                icon.textContent = '+';
                list.style.display = 'none';
            }
        });
    });
});

// Menu Toggle Script
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open'); // Optional: for styling the toggle
    });
});

// Update User UI with profile image and name
function updateUserUI(name, picture) {
    document.getElementById('login-link').innerHTML = `
        <img src="${picture}" alt="Profile" style="width:30px;height:30px;border-radius:50%;vertical-align:middle;margin-right:8px;">
        Hi, ${name.split(' ')[0]}
    `;
    document.getElementById('logout-link').style.display = 'inline-block'; // Show logout button
    document.getElementById('login-link').style.display = 'none'; // Hide login button
    document.getElementById('logout-link').style.pointerEvents = 'auto'; // Enable logout button
}

// Logout function
function logout() {
    localStorage.removeItem('amazonUser'); // Clear user data from localStorage
    document.getElementById('login-link').style.display = 'inline-block'; // Show login button again
    document.getElementById('logout-link').style.display = 'none'; // Hide logout button
    document.getElementById('login-link').style.pointerEvents = 'auto'; // Enable login button
}

// On page load, check if user already logged in
document.addEventListener('DOMContentLoaded', function() {
    const storedUser = JSON.parse(localStorage.getItem('amazonUser'));
    if (storedUser) {
        updateUserUI(storedUser.name, storedUser.picture);
    }
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

// Handle logout click event
document.getElementById('logout-link').onclick = function(e) {
    e.preventDefault();
    logout();
};
