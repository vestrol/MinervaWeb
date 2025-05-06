// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Project Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
    
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // Reset animations
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Add staggered animation
                card.style.animation = 'fadeInUp 0.5s forwards ' + (Array.from(projectCards).indexOf(card) * 0.1) + 's';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Initialize AOS-style animations for workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    const revealWorkflowStep = () => {
        const windowHeight = window.innerHeight;
        
        workflowSteps.forEach((step, index) => {
            const stepTop = step.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (stepTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    step.classList.add('is-revealed');
                }, index * 200); // Staggered animation
            }
        });
    };
    
    // Initial check for workflow steps in view
    revealWorkflowStep();
    
    // Listen for scroll events for workflow animations
    window.addEventListener('scroll', revealWorkflowStep);
    
    // Smooth scroll for workflow navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Interactive workflow step highlighting
    const workflowSection = document.querySelector('.workflow-section');
    
    if (workflowSection) {
        window.addEventListener('scroll', () => {
            const steps = document.querySelectorAll('.workflow-step');
            const windowHeight = window.innerHeight;
            
            steps.forEach(step => {
                const stepTop = step.getBoundingClientRect().top;
                const stepBottom = step.getBoundingClientRect().bottom;
                
                if (stepTop < windowHeight * 0.7 && stepBottom > windowHeight * 0.3) {
                    step.classList.add('active-step');
                } else {
                    step.classList.remove('active-step');
                }
            });
        });
    }
    
    // Add fadeInUp keyframes for project card animations
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .active-step {
            transform: scale(1.02);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 3;
            transition: all 0.3s ease;
        }
        
        .active-step .step-number {
            transform: scale(1.2);
            transition: transform 0.3s ease;
        }
        
        .active-step .step-icon {
            color: white;
            background-color: var(--neon-blue);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Apply initial animations to project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animation = 'fadeInUp 0.5s forwards ' + (index * 0.1) + 's';
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });
    
    // Navbar scroll effect - change background on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Newsletter subscription form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Normally you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
            newsletterForm.reset();
        });
    }
}); 