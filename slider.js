// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const slidesContainer = document.querySelector('.slides-container');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    
    // Initialize slider
    function initSlider() {
        // Add event listeners to arrows
        if (prevButton) {
            prevButton.addEventListener('click', () => changeSlide(-1));
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => changeSlide(1));
        }
        
        // Add event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index));
        });
        
        // Start auto-slide
        let autoSlide = setInterval(() => changeSlide(1), 5000);
        
        // Pause auto-slide when user interacts with slider
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });
            
            slider.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => changeSlide(1), 5000);
            });
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });
    }
    
    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        currentSlideIndex = index;
        slidesContainer.style.transform = `translateX(-${currentSlideIndex * 33.333}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlideIndex);
        });
    }
    
    function changeSlide(direction) {
        showSlide(currentSlideIndex + direction);
    }
    
    function currentSlide(index) {
        showSlide(index);
    }
    
    // Initialize the slider
    initSlider();
});
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.createElement('div');
    
    // Create overlay for mobile menu
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);
    
    // Toggle mobile menu
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on overlay
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking on menu links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    // final 
    
    // Touch events for slider on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            changeSlide(1);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
});
