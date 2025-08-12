// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !service || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('btn-primary')) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}
function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  menu.classList.toggle('active');
}

const galleryItems = Array.from(document.querySelectorAll('.portfolio-item img'));
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
let currentIndex = 0;

function openGallery(index) {
  currentIndex = index;
  modal.style.display = "flex";
  modalImg.src = galleryItems[index].src;
}

function closeGallery() {
  modal.style.display = "none";
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = galleryItems.length - 1;
  if (currentIndex >= galleryItems.length) currentIndex = 0;
  modalImg.src = galleryItems[currentIndex].src;
}

// Optional: ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGallery();
});




   // Portfolio data organized by category
const portfolioData = {
    design: [
        {
            id: 1,
            title: "Desain Menu L Coffee",
            description: "Professional menu design for coffee shop branding",
            image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1342460/pexels-photo-1342460.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 2,
            title: "Menu L Coffee Collection",
            description: "Complete branding package for restaurant chain",
            image: "https://images.pexels.com/photos/1342460/pexels-photo-1342460.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1342460/pexels-photo-1342460.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        }
    ],
    illustration: [
        {
            id: 3,
            title: "Comic Character Design",
            description: "Custom character design for comic series",
            image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 4,
            title: "Mascot Ayam Kardus",
            description: "Brand mascot illustration for packaging design",
            image: "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 5,
            title: "Character Illustrations",
            description: "Editorial illustration series for magazine",
            image: "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 6,
            title: "Outline Character Series",
            description: "Minimalist character design collection",
            image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 7,
            title: "Digital Art Collection",
            description: "Various digital artwork and illustrations",
            image: "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 8,
            title: "Editorial Illustrations",
            description: "Magazine cover illustration series",
            image: "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        }
    ],
    photography: [
        {
            id: 9,
            title: "Portrait Photography",
            description: "Professional headshots for corporate clients",
            image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 10,
            title: "Product Photography",
            description: "Commercial product photography for graduation",
            image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 11,
            title: "Portrait Session Collection",
            description: "Professional portrait photography series",
            image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 12,
            title: "Food Photography",
            description: "Culinary photography for restaurant marketing",
            image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        },
        {
            id: 13,
            title: "Spaghetti Photography",
            description: "Professional food photography for menu design",
            image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
            images: [
                "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800"
            ]
        }
    ]
};

// Category information
const categoryInfo = {
    design: {
        title: "Design Grafis",
        description: "Brand identity & menu design"
    },
    illustration: {
        title: "Illustration",
        description: "Character design & digital art"
    },
    photography: {
        title: "Photography", 
        description: "Portrait & product photography"
    }
};

// DOM elements
const folderView = document.getElementById('folderView');
const galleryView = document.getElementById('galleryView');
const portfolioGrid = document.getElementById('portfolioGrid');
const categoryTitle = document.getElementById('categoryTitle');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');

// Current state
let currentCategory = null;
let currentImageIndex = 0;
let currentImages = [];

// Initialize the app
function init() {
    updateFolderCounts();
    // Add click outside lightbox to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!lightbox.classList.contains('hidden')) {
                closeLightbox();
            } else if (currentCategory) {
                closeFolder();
            }
        } else if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                previousImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
}

// Update folder counts
function updateFolderCounts() {
    document.getElementById('designCount').textContent = `${portfolioData.design.length} items`;
    document.getElementById('illustrationCount').textContent = `${portfolioData.illustration.length} items`;
    document.getElementById('photographyCount').textContent = `${portfolioData.photography.length} items`;
}

// Open folder and show gallery
function openFolder(category) {
    currentCategory = category;
    
    // Update category title
    categoryTitle.textContent = categoryInfo[category].title;
    
    // Generate portfolio items
    generatePortfolioItems(category);
    
    // Animate transition
    folderView.classList.add('slide-out');
    
    setTimeout(() => {
        folderView.classList.add('hidden');
        galleryView.classList.remove('hidden');
        
        // Trigger reflow
        galleryView.offsetHeight;
        
        galleryView.classList.add('active');
    }, 250);
}

// Close folder and show folder view
function closeFolder() {
    galleryView.classList.remove('active');
    
    setTimeout(() => {
        galleryView.classList.add('hidden');
        folderView.classList.remove('hidden', 'slide-out');
        currentCategory = null;
    }, 250);
}

// Generate portfolio items for category
function generatePortfolioItems(category) {
    const items = portfolioData[category];
    portfolioGrid.innerHTML = '';
    
    items.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.onclick = () => openLightbox(item);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div> 
            `;
        
        portfolioGrid.appendChild(portfolioItem);
        
        // Add staggered animation
        setTimeout(() => {
            portfolioItem.style.opacity = '1';
            portfolioItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Set initial state for animation
    const allItems = portfolioGrid.querySelectorAll('.portfolio-item');
    allItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Open lightbox with image
function openLightbox(item) {
    currentImages = item.images || [item.image];
    currentImageIndex = 0;
    
    updateLightboxContent(item);
    
    lightbox.classList.remove('hidden');
    
    // Trigger reflow
    lightbox.offsetHeight;
    
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Update lightbox content
function updateLightboxContent(item) {
    lightboxImage.src = currentImages[currentImageIndex];
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    
    // Update navigation visibility
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const counter = document.querySelector('.lightbox-counter');
    
    if (currentImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        counter.style.display = 'block';
        counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counter.style.display = 'none';
    }
}

// Navigate to previous image
function previousImage() {
    if (currentImages.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        const currentItem = getCurrentItem();
        if (currentItem) {
            updateLightboxContent(currentItem);
        }
    }
}

// Navigate to next image
function nextImage() {
    if (currentImages.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        const currentItem = getCurrentItem();
        if (currentItem) {
            updateLightboxContent(currentItem);
        }
    }
}

// Get current item from portfolio data
function getCurrentItem() {
    for (const category in portfolioData) {
        for (const item of portfolioData[category]) {
            if (item.images && item.images.includes(currentImages[0])) {
                return item;
            }
        }
    }
    return null;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler for responsive behavior
const handleResize = debounce(() => {
    // Add any resize-specific logic here if needed
}, 250);

window.addEventListener('resize', handleResize);

