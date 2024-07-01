/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const mainElement = document.querySelector('main');
const header = document.querySelector('.page__header');
const sectionsFragment = document.createDocumentFragment();
const existingSections = document.querySelectorAll('section');
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const existingSectionsCount = existingSections.length;
const sections = [
    { 
        id: `section${existingSectionsCount + 1}`,
        navAttrText: `Section ${existingSectionsCount + 1}`,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.`
    },
    { 
        id: `section${existingSectionsCount + 2}`, 
        navAttrText: `Section ${existingSectionsCount + 2}`, 
        content: `Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.` 
    },
    { 
        id: `section${existingSectionsCount + 3}`,
        navAttrText: `Section ${existingSectionsCount + 3}`,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.`
    },
    { 
        id: `section${existingSectionsCount + 4}`,
        navAttrText: `Section ${existingSectionsCount + 4}`,
        content: `Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.` 
    }
];

let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const hideNavbar = () => header.classList.add('hidden');
const showNavbar = () => header.classList.remove('hidden');
const scrollToTopPage = () => {
    scrollToTopBtn.style.display = document.body.scrollTop > 50 ? "block" : "none";
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

const createSection = (id, navAttrText, content) => {
    const section = document.createElement('section');
    section.id = id;
    section.dataset.nav = navAttrText;

    const div = document.createElement('div');
    div.className = 'landing__container';

    const h2 = document.createElement('h2');
    h2.textContent = navAttrText;

    const p1 = document.createElement('p');
    p1.textContent = content;

    const p2 = document.createElement('p');
    p2.textContent = content;

    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    section.appendChild(div);

    return section;
}

sections.forEach(sectionData => {
    const section = createSection(sectionData.id, sectionData.navAttrText, sectionData.content);
    sectionsFragment.appendChild(section);
});

mainElement.appendChild(sectionsFragment);

const updateNavLinks = (activeSectionId) => {
    const navLinks = document.querySelectorAll('.menu__link');

    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href').substring(1) === activeSectionId));
};

// build the nav
 const prepareNavMenu = () => {
    const fragment = document.createDocumentFragment();
    const navBarMenuElement = document.querySelector('.navbar__menu');
    const navList = document.getElementById('navbar__list');
    const sections = document.querySelectorAll('section');
    const navIcon = document.createElement('i');

    navIcon.classList.add('fa-solid', 'fa-bars', 'menu-icon');

    navBarMenuElement.insertBefore(navIcon, navList);

    sections.forEach(section => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');

        navLink.classList.add('menu__link');
        navLink.textContent = section.dataset.nav;
        navLink.href = `#${section.id}`;

        navItem.appendChild(navLink);
        fragment.appendChild(navItem);
    });

     navList.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
    const sections = document.querySelectorAll('section');
    const minDistance = 150;
    let closestSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distanceTop = Math.abs(rect.top);

        if (distanceTop < minDistance) {
            closestSection = section;
        }

        section.classList.toggle('active-section', section === closestSection);
    });

    updateNavLinks(closestSection?.id);
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = () => {
    const navLinks = document.querySelectorAll('.menu__link');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
prepareNavMenu();

const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', () => {
    const navList = document.getElementById('navbar__list');
    
    navList.classList.toggle('active');
});

// Scroll to section on link click
scrollToSection();

// Set sections as active
window.addEventListener('scroll', setActiveSection);

// Add a scroll to top button
window.onscroll = () => {
    scrollToTopPage();
};

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hide fixed navigation bar while not scrolling 
window.addEventListener('scroll', () => {
    showNavbar();
    clearTimeout(isScrolling);
    isScrolling = setTimeout(hideNavbar, 3000);
});