document.addEventListener('DOMContentLoaded', () => {
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const contactForm = document.getElementById('contact-form');
    const formData = document.getElementById('form-data');

    // Mission click functionality
    const missionGrid = document.querySelector('.mission-grid');
    const missionModal = document.getElementById('mission-modal');
    const modalTitle = document.getElementById('modal-mission-title');
    const modalDescription = document.getElementById('modal-mission-description');
    const modalRank = document.getElementById('modal-mission-rank');
    const modalDifficulty = document.getElementById('modal-mission-difficulty');
    const acceptMissionBtn = document.getElementById('accept-mission');
    const closeModal = document.querySelector('.close');

    // Handle responsive sidebar
    function handleResponsiveSidebar() {
        const width = window.innerWidth;
        if (width <= 992) {
            sidebar.classList.add('hidden');
            document.querySelector('main').style.marginLeft = '0';
        } else {
            sidebar.classList.remove('hidden');
            document.querySelector('main').style.marginLeft = '250px';
        }
    }

    // Initial check for responsive layout
    handleResponsiveSidebar();

    // Listen for window resize
    window.addEventListener('resize', handleResponsiveSidebar);

    // Auto-hide cover page after 5 seconds
    setTimeout(() => {
        coverPage.style.display = 'none';
        mainContent.style.display = 'block';
        handleResponsiveSidebar(); // Check responsive layout after cover page hides
    }, 5000);

    // Enter button functionality
    enterBtn.addEventListener('click', () => {
        coverPage.style.display = 'none';
        mainContent.style.display = 'block';
        handleResponsiveSidebar(); // Check responsive layout after clicking enter
    });

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('hidden');
        const toggleIcon = sidebarToggleBtn.querySelector('i');
        const mainContent = document.querySelector('main');
        
        if (sidebar.classList.contains('hidden')) {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
            mainContent.style.marginLeft = '0';
        } else {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
            if (window.innerWidth > 992) {
                mainContent.style.marginLeft = '250px';
            }
        }

        // Handle body scroll on mobile
        if (window.innerWidth <= 992) {
            document.body.style.overflow = sidebar.classList.contains('hidden') ? 'auto' : 'hidden';
        }
    }

    // Add event listener for sidebar toggle
    sidebarToggleBtn.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnToggleBtn = e.target === sidebarToggleBtn || sidebarToggleBtn.contains(e.target);

            if (!isClickInsideSidebar && !isClickOnToggleBtn && !sidebar.classList.contains('hidden')) {
                toggleSidebar();
            }
        }
    });

    // Smooth scrolling with responsive handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close sidebar on mobile after clicking a link
                if (window.innerWidth <= 992 && !sidebar.classList.contains('hidden')) {
                    toggleSidebar();
                }
            }
        });
    });

    // Contact form handling
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show alert for form submission
        alert(`Thank you for contacting us, ${name}! We'll get back to you soon regarding your ${subject.toLowerCase()} inquiry.`);

        // Display form data
        formData.innerHTML = `
            <h3>Form Submission:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        // Clear the form
        contactForm.reset();

        // Add fade-out effect and clear form data after 4 seconds
        setTimeout(() => {
            formData.style.opacity = '1';
            const fadeEffect = setInterval(() => {
                if (formData.style.opacity > '0') {
                    formData.style.opacity -= 0.1;
                } else {
                    clearInterval(fadeEffect);
                    formData.innerHTML = '';
                    formData.style.opacity = '1';
                }
            }, 50);
        }, 4000);
    });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        handleResponsiveSidebar();
        // Add a small delay to ensure proper layout after orientation change
        setTimeout(handleResponsiveSidebar, 100);
    });

    // Mission click functionality
    missionGrid.addEventListener('click', function(e) {
        const missionItem = e.target.closest('.mission-item');
        if (missionItem) {
            const rank = missionItem.dataset.rank;
            const title = missionItem.querySelector('h3').textContent;
            const description = missionItem.querySelector('p').textContent;
            const difficulty = missionItem.querySelector('.mission-difficulty').textContent;

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalRank.textContent = rank;
            modalDifficulty.textContent = difficulty;

            missionModal.style.display = 'block';
        }
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        missionModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === missionModal) {
            missionModal.style.display = 'none';
        }
    });

    // Accept mission button functionality
    acceptMissionBtn.addEventListener('click', () => {
        const missionTitle = modalTitle.textContent;
        alert(`You have accepted the mission: ${missionTitle}`);
        missionModal.style.display = 'none';
    });
});
