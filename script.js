// Page loader
const loader = document.createElement('div');
loader.className = 'page-loader';
loader.innerHTML = `
    <div class="loader-content">
        <img src="images/loader-logo.png" alt="Loading..." />
        <div class="loading-spinner"></div>
    </div>
`;
document.body.appendChild(loader);

// Hide loader when page is loaded
window.addEventListener('load', () => {
    loader.style.display = 'none';
});

// Show loader before navigation
function showLoader() {
    loader.style.display = 'flex';
}

// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation clicks
    const navLinks = {
        'الرئيسية': 'home.html',
        'من نحن': 'about_us.html',
        'منتجاتنا': 'products.html',
        'الأخبار': 'new.html',
        'تواصل معنا': 'contact_us.html',
        'الوظائف': 'join_us.html'
    };
    
    const navLinksFromPages = {
        'الرئيسية': 'home.html',
        'من نحن': 'about_us.html',
        'منتجاتنا': 'products.html',
        'الأخبار': 'new.html',
        'تواصل معنا': 'contact_us.html',
        'الوظائف': 'join_us.html'
    };

    // Function to highlight current page in navigation
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const pageMap = {
            'index.html': 'الرئيسية',
            'home.html': 'الرئيسية',
            'about.html': 'من نحن',
            'about_us.html': 'من نحن',
            'products.html': 'منتجاتنا',
            'news.html': 'الأخبار',
            'new.html': 'الأخبار',
            'contact.html': 'تواصل معنا',
            'contact_us.html': 'تواصل معنا',
            'careers.html': 'الوظائف',
            'join_us.html': 'الوظائف'
        };
        
        // Check if we're at the root (index.html or just '/')
        if (currentPath === '/' || currentPath.endsWith('/') || currentPath.includes('index.html')) {
            document.querySelectorAll('.navbar div, .text-wrapper-12, .text-wrapper-13').forEach(link => {
                if (link.textContent.trim() === 'الرئيسية') {
                    link.style.color = '#007bff';
                    link.style.fontWeight = '700';
                }
            });
            return;
        }

        const currentPage = Object.entries(pageMap).find(([key]) => currentPath.includes(key));
        if (currentPage) {
            document.querySelectorAll('.navbar div, .text-wrapper-12, .text-wrapper-13').forEach(link => {
                if (link.textContent.trim() === currentPage[1]) {
                    link.style.color = '#007bff';
                }
            });
        }
    }

    // Add click event listeners to all navigation items including footer
    document.querySelectorAll(`
        .navbar div, 
        .frame-19 div, 
        .frame-20 div, 
        .frame-21 div, 
        .frame-23 div, 
        .frame-24 div, 
        .text-wrapper-12, 
        .text-wrapper-13, 
        .text-wrapper-18, 
        .text-wrapper-19, 
        .text-wrapper-21, 
        .text-wrapper-22, 
        .text-wrapper-23,
        .text-wrapper-5,  /* Footer links */
        .text-wrapper-4,  /* Footer links */
        .text-wrapper,    /* Footer contact */
        [class*="text-wrapper"]
    `).forEach(link => {
        const text = link.textContent.trim();
        const isInPagesDir = window.location.pathname.includes('/');
        const currentNavLinks = isInPagesDir ? navLinksFromPages : navLinks;
        
        if (currentNavLinks[text]) {
            link.style.cursor = 'pointer';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showLoader();
                setTimeout(() => {
                    window.location.href = currentNavLinks[text];
                }, 500);
            });
        }
    });

    // Add logo click handler
    document.querySelectorAll('.logo, .logo-2').forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            showLoader();
            setTimeout(() => {
                window.location.href = navLinks['الرئيسية'];
            }, 500);
        });
    });

    // Call highlight function when page loads
    highlightCurrentPage();

    // Handle "Discover Our Products" button
    const discoverProductsBtn = document.querySelector('.text-wrapper-9');
    if (discoverProductsBtn && discoverProductsBtn.textContent.trim() === 'أكتشف منتجاتنا') {
        const productContainer = discoverProductsBtn.closest('.frame-10');
        if (productContainer) {
            productContainer.style.cursor = 'pointer';
            productContainer.addEventListener('click', (e) => {
                e.preventDefault();
                showLoader();
                setTimeout(() => {
                    window.location.href = navLinks['منتجاتنا'];
                }, 500);
            });
        }
    }

    // Banner switching functionality
    if (window.location.href.includes('home.html') || document.querySelector('.home')) {
        console.log('Initializing banner switching functionality...');

        // Banner configuration (now includes 3 images for dynamic switching)
        const banners = [
            'https://c.animaapp.com/in0BC4Oq/img/image-1@2x.png', // original main banner
            'https://c.animaapp.com/in0BC4Oq/img/image-3@2x.png', // placeholder 2
            'https://c.animaapp.com/in0BC4Oq/img/image-4@2x.png'  // placeholder 3
        ];
        let currentBannerIndex = 0;
        let isTransitioning = false;

        // Preload images
        banners.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Main banner image for dynamic switching
        const banner = document.querySelector('.image-2');
        // Use the right arrow for switching (use .arrow-outward as fallback)
        let arrow = document.querySelector('.arrow-2');
        if (!arrow) {
            // Try to use the outward arrow as the switch button
            arrow = document.querySelector('.arrow-outward');
        }

        if (!banner || !arrow) {
            console.warn('Banner elements not found, retrying in 1 second...');
            setTimeout(() => {
                const retryBanner = document.querySelector('.image-2');
                let retryArrow = document.querySelector('.arrow-2');
                if (!retryArrow) retryArrow = document.querySelector('.arrow-outward');
                if (!retryBanner || !retryArrow) {
                    console.error('Banner switching elements not found after retry');
                    return;
                }
            }, 1000);
            return;
        }

        // Setup ARIA attributes
        banner.setAttribute('role', 'img');
        banner.setAttribute('aria-label', 'Banner image');
        arrow.setAttribute('role', 'button');
        arrow.setAttribute('aria-label', 'Switch banner image');
        arrow.setAttribute('tabindex', '0');

        // Minimal infinite scrolling - ONLY adds scrolling, preserves all original styling
function initializeInfiniteScroll() {
    // Detect current page
    const isAboutPage = window.location.href.includes('about_us.html') || document.querySelector('.about-us');
    const isProductsPage = window.location.href.includes('products.html') || document.querySelector('.prouducts');
    
    if (!isAboutPage && !isProductsPage) {
        return;
    }
    
    // Select the appropriate container based on page
    let logoContainer;
    
    if (isAboutPage) {
        logoContainer = document.querySelector('.frame-13'); // About us page container
    } else if (isProductsPage) {
        logoContainer = document.querySelector('.frame-37'); // Products page container
    }
    
    if (!logoContainer) {
        return;
    }
    
    // Get all current logos
    const allLogos = Array.from(logoContainer.children);
    
    if (allLogos.length === 0) {
        return;
    }
    
    // Clone the logos for infinite effect
    allLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        logoContainer.appendChild(clone);
    });
    
    // Add ONLY the scrolling CSS
    const style = document.createElement('style');
    style.textContent = `
        .frame-13, .frame-37 {
            overflow: hidden;
            white-space: nowrap;
        }
        
        .frame-13 > *, .frame-37 > * {
            display: inline-block;
            animation: scroll-brands 20s linear infinite;
        }
        
        @keyframes scroll-brands {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the minimal infinite scroll
initializeInfiniteScroll();

        // Minimal infinite scrolling - ONLY adds scrolling, preserves all original styling
function initializeInfiniteScroll() {
    // Detect current page
    const isAboutPage = window.location.href.includes('about_us.html') || document.querySelector('.about-us');
    const isProductsPage = window.location.href.includes('products.html') || document.querySelector('.prouducts');
    
    if (!isAboutPage && !isProductsPage) {
        return;
    }
    
    // Select the appropriate container based on page
    let logoContainer;
    
    if (isAboutPage) {
        logoContainer = document.querySelector('.frame-13'); // About us page container
    } else if (isProductsPage) {
        logoContainer = document.querySelector('.frame-37'); // Products page container
    }
    
    if (!logoContainer) {
        return;
    }
    
    // Get all current logos
    const allLogos = Array.from(logoContainer.children);
    
    if (allLogos.length === 0) {
        return;
    }
    
    // Clone the logos for infinite effect
    allLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        logoContainer.appendChild(clone);
    });
    
    // Add ONLY the scrolling CSS
    const style = document.createElement('style');
    style.textContent = `
        .frame-13, .frame-37 {
            overflow: hidden;
            white-space: nowrap;
        }
        
        .frame-13 > *, .frame-37 > * {
            display: inline-block;
            animation: scroll-brands 20s linear infinite;
        }
        
        @keyframes scroll-brands {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the minimal infinite scroll
initializeInfiniteScroll();
        // Banner switching function
        const switchBanner = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            console.log('Switching banner...');
            
            // Visual feedback
            arrow.classList.add('rotating');
            banner.style.opacity = '0';
            banner.style.transform = 'scale(0.95)';

            setTimeout(() => {
                currentBannerIndex = (currentBannerIndex + 1) % banners.length;
                banner.src = banners[currentBannerIndex];
                banner.style.opacity = '1';
                banner.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    arrow.classList.remove('rotating');
                    isTransitioning = false;
                }, 400);
            }, 400);
        };

        // Event listeners
        arrow.addEventListener('click', switchBanner);
        arrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchBanner();
            }
        });

        // Add classes for styling
        banner.classList.add('banner-image');
        arrow.classList.add('banner-arrow');

        console.log('Banner switching functionality initialized successfully');
    }
    highlightCurrentPage();

    // Add specific footer contact and links handling
    document.querySelectorAll('[class*="text-wrapper"]').forEach(link => {
        const text = link.textContent.trim();
        
        // Handle contact information
        if (text.includes('@') || text === 'info@battariat.com') {
            link.style.cursor = 'pointer';
            link.addEventListener('click', () => {
                window.location.href = 'mailto:info@battariat.com';
            });
        } else if (text.match(/^\d/) || text === '800 124 0430') {
            link.style.cursor = 'pointer';
            link.addEventListener('click', () => {
                window.location.href = 'tel:' + text.replace(/\s/g, '');
            });
        } 
        // Handle footer navigation
        else if (text === 'الضمان' || text === 'شروط الأستخدام' || text === 'الخصوصية') {
            link.style.cursor = 'pointer';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('This page is coming soon!');
            });
        }
        // Handle general navigation
        else if (navLinks[text]) {
            link.style.cursor = 'pointer';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showLoader();
                setTimeout(() => {
                    window.location.href = navLinks[text];
                }, 500);
            });
        }
    });

    // Handle additional navigation buttons
    document.querySelectorAll('.frame-2, .frame, .text-wrapper-18').forEach(link => {
        const text = link.textContent.trim();
        if (text === 'من نحن') {
            link.style.cursor = 'pointer';
            link.addEventListener('click', () => {
                showLoader();
                window.location.href = navLinks['من نحن'];
            });
        } else if (text === 'المتجر الاكتروني' || text.includes('المتجر')) {
            link.style.cursor = 'pointer';
            link.addEventListener('click', () => {
                window.open('https://store.battariat.com', '_blank');
            });
        }
    });

    // Social media post hover effects - now only for images
    if (window.location.href.includes('new.html')) {
        const posts = document.querySelectorAll('.group-4 img, .frame-5 img, .frame-27 img');
        posts.forEach(img => {
            img.style.transition = 'transform 0.3s ease';
            img.style.cursor = 'pointer';
        });
    }

    // Dynamic banner switching functionality
    if (window.location.href.includes('home.html')) {
        const banners = [
            {
                src: 'https://c.animaapp.com/in0BC4Oq/img/image-1@2x.png',
                alt: 'Home Banner'
            },
            {
                src: 'https://c.animaapp.com/1lwzhgBv/img/472621177-608942485079693-2613384628443662180-n-1@2x.png',
                alt: 'About Us Banner'
            }
        ];
        let currentBannerIndex = 0;
        
        const banner = document.querySelector('.image-2');
        const arrow = document.querySelector('.arrow-2');
        
        if (banner && arrow) {
            // Set initial banner
            banner.src = banners[currentBannerIndex].src;
            banner.alt = banners[currentBannerIndex].alt;
            
            // Style the arrow for better UX
            arrow.style.cursor = 'pointer';
            arrow.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
            arrow.title = 'Switch Banner';
            
            // Add hover effect to arrow
            arrow.addEventListener('mouseenter', () => {
                arrow.style.transform = 'scale(1.1)';
                arrow.style.opacity = '0.8';
            });
            
            arrow.addEventListener('mouseleave', () => {
                arrow.style.transform = 'scale(1)';
                arrow.style.opacity = '1';
            });
            
            // Banner switching logic with smooth transition
            arrow.addEventListener('click', () => {
                // Prevent multiple clicks during transition
                arrow.style.pointerEvents = 'none';
                
                // Fade out current banner
                banner.style.transition = 'opacity 0.3s ease-in-out';
                banner.style.opacity = '0';
                
                setTimeout(() => {
                    // Switch to next banner
                    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
                    banner.src = banners[currentBannerIndex].src;
                    banner.alt = banners[currentBannerIndex].alt;
                    
                    // Fade in new banner
                    banner.style.opacity = '1';
                    
                    // Re-enable arrow clicks
                    setTimeout(() => {
                        arrow.style.pointerEvents = 'auto';
                    }, 100);
                }, 300);
            });
            
            // Optional: Auto-rotate banners every 5 seconds (uncomment if desired)
            // setInterval(() => {
            //     if (arrow.style.pointerEvents !== 'none') {
            //         arrow.click();
            //     }
            // }, 5000);
        }
    }

    // Handle "View More" button in home page
    const viewMoreButton = document.querySelector('.text-wrapper-5');
    if (viewMoreButton && viewMoreButton.textContent.trim() === 'عرض المزيد') {
        viewMoreButton.style.cursor = 'pointer';
        viewMoreButton.addEventListener('click', (e) => {
            e.preventDefault();
            showLoader();
            setTimeout(() => {
                window.location.href = navLinks['الأخبار'];
            }, 500);
        });
    }

    // Store buttons
    const storeButtons = document.querySelectorAll('.text-wrapper-10, .text-wrapper-2');
    storeButtons.forEach(button => {
        if (button.textContent.includes('المتجر')) {
            button.style.cursor = 'pointer';
            button.addEventListener('click', () => {
                // You can replace this with your actual store URL
                window.location.href = 'https://store.battariat.com';
            });
        }
    });

    // Language switcher
    const langSwitcher = document.querySelector('.text-wrapper-11');
    if (langSwitcher) {
        langSwitcher.style.cursor = 'pointer';
        langSwitcher.addEventListener('click', () => {
            // This is where you would implement language switching logic
            const currentLang = langSwitcher.textContent;
            langSwitcher.textContent = currentLang === 'EN' ? 'AR' : 'EN';
        });
    }
});



function initializeInfiniteScroll() {
    const isAboutPage = window.location.href.includes('about_us.html');
    const isProductsPage = window.location.href.includes('products.html');

    let targetFrame = null;

    if (isAboutPage) {
        targetFrame = document.querySelector('.frame-13');
    } else if (isProductsPage) {
        targetFrame = document.querySelector('.frame-37');
    }

    if (!targetFrame) return;

    // Create scrolling container
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'brands-scroll-container';

    const scrollTrack = document.createElement('div');
    scrollTrack.className = 'brands-scroll-track';

    // Move all logos inside scrollTrack
    const logos = [...targetFrame.children];
    logos.forEach(logo => scrollTrack.appendChild(logo.cloneNode(true))); // 1st copy
    logos.forEach(logo => scrollTrack.appendChild(logo.cloneNode(true))); // 2nd copy

    scrollContainer.appendChild(scrollTrack);

    // Replace original content
    targetFrame.innerHTML = '';
    targetFrame.appendChild(scrollContainer);
}

// Initialize infinite scroll after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeInfiniteScroll();
});
