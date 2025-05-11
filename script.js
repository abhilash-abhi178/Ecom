
    // Splash screen hide after 5 seconds
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
        }, 4000); // 5 seconds
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

                // Close all sections first
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
 
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');

            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('nav-open');
                menuToggle.classList.toggle('toggle-open'); // Optional: for styling the toggle
            });
        });
        
    function updateUserUI(name, picture) {
        document.getElementById('login-link').innerHTML = `
            <img src="${picture}" alt="Profile" style="width:30px;height:30px;border-radius:50%;vertical-align:middle;margin-right:8px;">
            Hi, ${name.split(' ')[0]}
        `;
        document.getElementById('login-link').style.pointerEvents = 'none'; // disable clicking after login
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
        amazon.Login.setClientId('amzn1.application-oa2-client.b4f87693d14b4c82a628824194ba48de'); // your real Client ID
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
                console.log('Amazon Profile:', data);
                const name = data.name || 'User';
                const picture = data.profile_picture || 'https://via.placeholder.com/30'; // fallback
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


    