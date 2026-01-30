// Portfolio data - EDIT THIS OBJECT to customize your portfolio items
let portfolioData = {
    1: {
        title: "Digital Illustrations",
        description: "My most recent works and projects, done in Photoshop and Krita.",
        images: [
            "Media/meow.jpg",
            "Media/114.jpg",
            "Media/731.jpg",
            "Media/812.jpg",
            "Media/95.jpg",
            "Media/heron.jpg",
            "Media/jester.jpg",
            "Media/lady.jpg",
            "Media/gladiator.png",
            "Media/723.jpg",
            "Media/79.jpg",
            "Media/Digital1.png",
            "Media/Digital3.PNG",
            "Media/916.jpg",
        ],
        videos: [
            // "https://example.com/your-video.mp4"  // Add video URLs here
        ]
    },
    2: {
        title: "Animations and Renders",
        description: "Several projects that I've created using Photoshop, Blender, and After Effects.",
        images: [],
        videos: [
            "Media/2025V5.mp4",
            "Media/reflect.mp4",
            "Media/Bluejay2023.mp4",
            "Media/FINAL_Animation_Demo.mp4",
            "Media/robot.mp4",
        ]
    },
    3: {
        title: "Traditional Art",
        description: "Projects I made from 2020-2022, during my middle-school years when I was learning the fundamentals of art and drawing.",
        images: [
            "Media/colorpencil2022.JPG",
            "Media/GraphitePortrait.jpg",
            "Media/IMG_0835.PNG",
            "Media/IMG_0607.JPG",
            "Media/IMG_0544.JPG",
            "Media/IMG_0642.JPG",
            "Media/IMG_0822.jpg",
            "Media/IMG_0653.JPG",
            "Media/IMG_0463.JPG",
            "Media/IMG_0821.jpg",
            "Media/IMG_0637.JPG",
            "Media/IMG_0820.jpg",
            "Media/IMG_0824.jpg",
        ],
        videos: []
    }
};

// Track if modal is open
let isModalOpen = false;
// Save portfolio content when going fullscreen
let savedPortfolioContent = '';

// Portfolio Functions
function openPortfolio(id) {
    const portfolio = portfolioData[id];
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    
    let mediaHTML = '';
    
    // Add images
    if (portfolio.images && portfolio.images.length > 0) {
        mediaHTML += '<div class="media-grid">';
        portfolio.images.forEach(img => {
            mediaHTML += `<div class="media-item"><img src="${img}" alt="Portfolio image"></div>`;
        });
        mediaHTML += '</div>';
    }
    
    // Add videos
    if (portfolio.videos && portfolio.videos.length > 0) {
        mediaHTML += '<div class="media-grid">';
        portfolio.videos.forEach(video => {
            mediaHTML += `<div class="media-item"><video controls src="${video}"></video></div>`;
        });
        mediaHTML += '</div>';
    }
    
    modalBody.innerHTML = `
        <div class="portfolio-detail">
            <h2>${portfolio.title}</h2>
            <p>${portfolio.description}</p>
            ${mediaHTML}
        </div>
    `;
    
    // Remove fullscreen class to ensure normal modal display
    modal.classList.remove('fullscreen');
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('fullscreen-image');
    
    modal.style.display = 'block';
    isModalOpen = true;
    
    // Attach click listeners to images
    setTimeout(attachImageClickListeners, 0);
}

function closePortfolio() {
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Reset all classes and styles
    modal.classList.remove('fullscreen');
    modalContent.classList.remove('fullscreen-image');
    modal.style.display = 'none';
    
    // Restore the modal structure with close button and modal-body
    modalContent.innerHTML = '<span class="close" onclick="closePortfolio()">&times;</span><div id="modal-body"></div>';
    
    isModalOpen = false;
}

// Open image in fullscreen
function openImageFullscreen(imageSrc) {
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Save the current portfolio content before replacing it
    savedPortfolioContent = modalContent.innerHTML;
    
    modal.classList.add('fullscreen');
    modalContent.classList.add('fullscreen-image');
    modalContent.innerHTML = `
        <div class="fullscreen-image-wrap">
            <img src="${imageSrc}" alt="Enlarged image">
            <span class="close" onclick="goBackToPortfolio()">&times;</span>
        </div>
    `;

    modal.style.display = 'flex';

    // prevent clicks inside the image wrapper from bubbling to the overlay
    setTimeout(() => {
        const wrapper = modalContent.querySelector('.fullscreen-image-wrap');
        if (wrapper) wrapper.addEventListener('click', e => e.stopPropagation());
    }, 0);
}

// Go back to portfolio from fullscreen image
function goBackToPortfolio() {
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Remove fullscreen classes and restore the portfolio view
    modal.classList.remove('fullscreen');
    modalContent.classList.remove('fullscreen-image');
    modalContent.innerHTML = savedPortfolioContent;
    modal.style.display = 'block';
    
    // Reattach click listeners to images
    setTimeout(attachImageClickListeners, 0);
}

// Add click listeners to images after modal is populated
function attachImageClickListeners() {
    const mediaItems = document.querySelectorAll('.media-item img');
    mediaItems.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageFullscreen(this.src);
        });
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const portfolioModal = document.getElementById('portfolio-modal');
    
    // Only handle clicks if modal is actually open
    if (!isModalOpen) {
        return;
    }
    
    // Close on background click (only if clicking the modal background, not content)
    if (event.target === portfolioModal) {
        // If in fullscreen mode, go back to portfolio
        if (portfolioModal.classList.contains('fullscreen')) {
            goBackToPortfolio();
        } else {
            // Otherwise close the modal completely
            closePortfolio();
        }
    }
}

// EmailJS Form Handler
// SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. In the EmailJS dashboard, add an Email Service (e.g., Gmail)
// 3. Create an Email Template with the following placeholders:
//    - {{from_email}}
//    - {{student_count}}
//    - {{student_age}}
//    - {{comment}}
// 4. Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID below

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS after DOM is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init("IVDHemarrwDCE05S_");
    }
    
    const classForm = document.getElementById('classForm');
    if (classForm) {
        classForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const studentCount = document.getElementById('studentCount').value;
            const studentAge = document.getElementById('studentAge').value;
            const comment = document.getElementById('comment').value;
            
            // Prepare email data
            const templateParams = {
                from_email: email,
                student_count: studentCount,
                student_age: studentAge,
                comment: comment
            };
            
            // Send email using your EmailJS service and template
            emailjs.send("service_92pgpt6", "template_vjwvrhj", templateParams)
                .then(function(response) {
                    // Success message
                    const messageDiv = document.getElementById('formMessage');
                    messageDiv.textContent = 'Thank you! Your inquiry has been sent successfully. I\'ll be in touch soon!';
                    messageDiv.classList.add('success');
                    messageDiv.classList.remove('error');
                    
                    // Reset form
                    classForm.reset();
                    
                    // Clear message after 5 seconds
                    setTimeout(() => {
                        messageDiv.textContent = '';
                        messageDiv.classList.remove('success');
                    }, 5000);
                }, function(error) {
                    // Error message
                    const messageDiv = document.getElementById('formMessage');
                    messageDiv.textContent = 'There was an error sending your inquiry. Please try again or contact me directly.';
                    messageDiv.classList.add('error');
                    messageDiv.classList.remove('success');
                    console.error('EmailJS error:', error);
                });
        });
    }
});
