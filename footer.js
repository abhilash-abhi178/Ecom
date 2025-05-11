
function createFooter() {
    const footer = document.createElement('footer');
    footer.style.background = '#222';
    footer.style.color = '#fff';
    footer.style.padding = '40px 20px';
    footer.style.textAlign = 'center';
    footer.style.fontFamily = 'Arial, sans-serif';
    footer.style.fontSize = '14px';

    const aboutDiv = document.createElement('div');
    aboutDiv.style.marginBottom = '20px';

    const aboutHeading = document.createElement('h4');
    aboutHeading.style.marginBottom = '10px';
    aboutHeading.textContent = 'About EcomDeals:';

    aboutDiv.appendChild(aboutHeading);

    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer-container';
    footerContainer.style.maxWidth = '1000px';
    footerContainer.style.margin = 'auto';
    footerContainer.style.textAlign = 'left';

    const policiesSection = createFooterSection('POLICIES', [
        { text: 'About Us', href: 'aboutus.html' },
        { text: 'Contact Us', href: 'contact_us.html' },
        { text: 'Reviews', href: '#' },
        { text: 'Terms & Conditions', href: 'terms&conds.html' },
        { text: 'Privacy Policy', href: 'privacy_policy.html' },
        { text: 'Cookie Policy', href: 'cookie_policy.html' },
    ]);

    const supportSection = createFooterSection('SUPPORT', [
        { text: 'FAQ', href: 'faq.html' },
        { text: 'Forgot Password', href: 'fp.html' },
    ]);

    const followSection = createFooterSection('Follow Us On:', [
        { text: 'Instagram', href: 'www.instagram.com/@ecom._.deals' },
        { text: 'Facebook', href: '#' },
        { text: 'Telegram', href: '#' },
        { text: 'X(Twitter)', href: '#' },
    ]);

    footerContainer.appendChild(policiesSection);
    footerContainer.appendChild(supportSection);
    footerContainer.appendChild(followSection);

    const copyrightDiv = document.createElement('div');
    copyrightDiv.style.marginTop = '30px';
    copyrightDiv.innerHTML = '&copy; 2025 <strong>EcomDeals</strong>. All rights reserved.';

    footer.appendChild(aboutDiv);
    footer.appendChild(footerContainer);
    footer.appendChild(copyrightDiv);

    return footer;
}

function createFooterSection(title, links) {
    const section = document.createElement('div');
    section.className = 'footer-section';

    const heading = document.createElement('h4');
    heading.style.cursor = 'pointer';
    heading.style.fontSize = '18px';
    heading.style.marginBottom = '10px';
    heading.style.display = 'flex';
    heading.style.alignItems = 'center';
    heading.textContent = title;

    const toggleIcon = document.createElement('span');
    toggleIcon.className = 'toggle-icon';
    toggleIcon.textContent = '+';
    toggleIcon.style.marginRight = '8px';
    toggleIcon.style.fontSize = '20px';
    heading.insertBefore(toggleIcon, heading.firstChild); // Insert the icon before the text

    const list = document.createElement('ul');
    list.className = 'footer-list';
    list.style.listStyle = 'none';
    list.style.paddingLeft = '0';
    list.style.display = 'none';
    list.style.marginTop = '10px';

    links.forEach(linkData => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = linkData.href;
        link.textContent = linkData.text;
        link.style.color = '#ccc';
        link.style.textDecoration = 'none';
        link.addEventListener('mouseover', () => {
            link.style.textDecoration = 'underline';
        });
        link.addEventListener('mouseout', () => {
            link.style.textDecoration = 'none';
        });
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    section.appendChild(heading);
    section.appendChild(list);

    // Toggle functionality (moved inside createFooterSection for better encapsulation)
    heading.addEventListener('click', function() {
        const isActive = section.classList.contains('active');
        const allSections = document.querySelectorAll('.footer-section'); // Get all sections
        
        allSections.forEach(otherSection => {
            otherSection.classList.remove('active');
            const otherList = otherSection.querySelector('.footer-list');
            const otherIcon = otherSection.querySelector('.toggle-icon');
            if (otherList) {
                otherList.style.display = 'none';
            }
            if (otherIcon) {
                otherIcon.textContent = '+';
            }
        });

        if (!isActive) {
            section.classList.add('active');
            list.style.display = 'block';
            toggleIcon.textContent = '-';
        } else {
            section.classList.remove('active');
            list.style.display = 'none';
            toggleIcon.textContent = '+';
        }
    });

    return section;
}

// Append the footer to the body or another element
document.addEventListener('DOMContentLoaded', () => {
    const footerElement = createFooter();
    document.body.appendChild(footerElement); // Or append to a specific container
    
     // Adjust desktop view on load
    if (window.innerWidth >= 768) {
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            const list = section.querySelector('.footer-list');
            if (list) {
                list.style.display = 'block';
            }
            const toggleIcon = section.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.style.display = 'none';
            }
            section.classList.remove('active');
        });
    }

    //run on resize.
    window.addEventListener('resize', () => {
        const footerSections = document.querySelectorAll('.footer-section');
        if (window.innerWidth >= 768) {
            footerSections.forEach(section => {
                const list = section.querySelector('.footer-list');
                if (list) {
                    list.style.display = 'block';
                }
                const toggleIcon = section.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.style.display = 'none';
                }
                 section.classList.remove('active');
            });
        } else {
             footerSections.forEach(section => {
                const list = section.querySelector('.footer-list');
                if (list) {
                    list.style.display = 'none';
                }
                const toggleIcon = section.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.style.display = 'flex';
                }
            });
        }
    });
});

