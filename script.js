document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     1. MOBILE MENU LOGIC
     ========================================= */
  const menuBtn = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-list");
  
  // Icon element (for animation)
  const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;

  if (menuBtn && navMenu) {

    // Toggle Menu
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Click bubble prevent
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      // Icon Switch (Bars <-> Times)
      if(menuIcon) {
        if (navMenu.classList.contains("active")) {
          menuIcon.classList.remove("fa-bars");
          menuIcon.classList.add("fa-times");
        } else {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });

    // Close Menu when a Link is clicked
    document.querySelectorAll(".nav-list a").forEach(link => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
        
        // Reset Icon
        if(menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      });
    });

    // Close Menu when Clicking Outside
    document.addEventListener("click", function(e) {
      if (document.body.classList.contains("menu-open") && 
          !navMenu.contains(e.target) && 
          !menuBtn.contains(e.target)) {
          
          navMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
          
          // Reset Icon
          if(menuIcon) {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
          }
      }
    });
  }

  /* =========================================
     2. LIGHTBOX LOGIC (Gallery Only)
     ========================================= */
  const lightbox = document.getElementById("lightbox");
  
  // Check if Lightbox exists on this page to prevent errors
  if (lightbox) {
    const images = document.querySelectorAll(".gallery-card img");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    function showImage() {
      if(images.length > 0) {
        lightboxImg.src = images[currentIndex].src;
      }
    }

    function openLightbox(index) {
      currentIndex = index;
      showImage();
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden"; // Disable scroll
    }

    function closeLightbox() {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scroll
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    }

    // Event Listeners
    images.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });

    if(closeBtn) closeBtn.onclick = closeLightbox;
    if(nextBtn) nextBtn.onclick = nextImage;
    if(prevBtn) prevBtn.onclick = prevImage;

    // Keyboard Navigation
    document.addEventListener("keydown", e => {
      if (lightbox.style.display === "flex") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    });

    // Close on clicking outside image (black area)
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

});