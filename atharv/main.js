// Initialize GSAP and ScrollTrigger
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Loader Animation
  const loaderTimeline = gsap.timeline()

  loaderTimeline
    .from(".cybertruck-logo polygon", {
      strokeDasharray: 300,
      strokeDashoffset: 300,
      duration: 1.5,
      ease: "power2.out",
    })
    .from(
      ".loader-text",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    )
    .to(
      ".loader",
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          document.querySelector(".loader").style.display = "none"
          // Start main animations after loader is gone
          initAnimations()
        },
      },
      "+=0.5",
    )
})

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")
  })
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Specs Tabs
const tabBtns = document.querySelectorAll(".tab-btn")
const specsPanels = document.querySelectorAll(".specs-panel")

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and panels
    tabBtns.forEach((b) => b.classList.remove("active"))
    specsPanels.forEach((panel) => panel.classList.remove("active"))

    // Add active class to clicked button and corresponding panel
    btn.classList.add("active")
    const model = btn.getAttribute("data-model")
    document.querySelector(`.specs-panel[data-model="${model}"]`).classList.add("active")
  })
})

// Main animations function
function initAnimations() {
  // Hero animations
  const heroTimeline = gsap.timeline()

  heroTimeline
    .from(".hero-image", {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.out",
    })
    .from(
      ".title",
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=1",
    )
    .from(
      ".subtitle",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
    .from(
      ".cta-buttons",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
    .from(
      ".scroll-indicator",
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4",
    )

  // Parallax effect for hero image
  gsap.to(".hero-image", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })

  // Overview section animations
  gsap.from(".section-title", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".overview",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".overview-item", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".overview-grid",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  // Parallax effect for overview image
  gsap.to(".parallax-image", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })

  // Specs section animations
  gsap.from(".specs-image", {
    scale: 1.1,
    duration: 1,
    scrollTrigger: {
      trigger: ".specs-image-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".specs-content", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".specs-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  // Features section animations
  gsap.from(".feature-card", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".features-grid",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".showcase-content", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".feature-showcase",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".showcase-image", {
    x: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".feature-showcase",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  // Order section animations
  gsap.from(".order-description", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".order",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".order-option", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".order-options",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  // Add hover animations for interactive elements
  const cards = document.querySelectorAll(".feature-card, .order-option, .overview-item")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "none",
      })
    })
  })

  // Add click animations for buttons
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
      })
    })

    button.addEventListener("mouseup", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.1,
      })
    })

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.1,
      })
    })
  })

  // Order button click animation
  const orderBtns = document.querySelectorAll(".order-btn")

  orderBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()

      const model = btn.closest(".order-option").getAttribute("data-model")

      // Create ripple effect
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      btn.appendChild(ripple)

      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      setTimeout(() => {
        ripple.remove()
        // Show success message or redirect to order page
        alert(`You've selected the ${model.toUpperCase()} model. This would redirect to the order page.`)
      }, 300)
    })
  })
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      // Get header height for offset
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add 3D tilt effect to cards on desktop
if (window.innerWidth > 768) {
  const cards = document.querySelectorAll(".feature-card, .order-option")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = (x / rect.width - 0.5) * 20
      const yPercent = (y / rect.height - 0.5) * 20

      gsap.to(card, {
        rotationY: xPercent,
        rotationX: -yPercent,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    })
  })
}

// Add dynamic counter animation for spec values
function animateCounters() {
  const specValues = document.querySelectorAll(".spec-value")

  specValues.forEach((value) => {
    const targetValue = Number.parseFloat(value.textContent)
    const suffix = value.textContent.replace(/[0-9.+]/g, "")
    const decimal = value.textContent.includes(".") ? 1 : 0

    gsap.fromTo(
      value,
      { textContent: 0 },
      {
        duration: 2,
        textContent: targetValue,
        roundProps: "textContent",
        ease: "power2.out",
        suffix: suffix,
        decimal: decimal,
        onUpdate: function () {
          if (decimal) {
            value.textContent = Number.parseFloat(value.textContent).toFixed(decimal) + suffix
          } else {
            value.textContent = Math.round(this.targets()[0].textContent) + suffix
          }
        },
      },
    )
  })
}

// Trigger counter animation when specs section is in view
ScrollTrigger.create({
  trigger: ".specs-details",
  start: "top 80%",
  onEnter: animateCounters,
  once: true,
})

// Back to top button
const backToTopButton = document.getElementById("back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible")
  } else {
    backToTopButton.classList.remove("visible")
  }
})

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Lazy load video iframe
document.addEventListener("DOMContentLoaded", () => {
  const videoIframe = document.querySelector(".video-wrapper iframe")

  if (videoIframe) {
    const lazyLoadVideo = () => {
      if (videoIframe.dataset.src) {
        videoIframe.src = videoIframe.dataset.src
        videoIframe.removeAttribute("data-src")
      }
    }

    // Load video when it comes into view
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lazyLoadVideo()
            videoObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    videoObserver.observe(videoIframe.parentNode)
  }
})

// Detect touch devices and adjust interactions
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

if (isTouchDevice) {
  // Disable 3D tilt effect on touch devices
  const cards = document.querySelectorAll(".feature-card, .order-option")

  cards.forEach((card) => {
    card.addEventListener("touchstart", () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      })
    })

    card.addEventListener("touchend", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "none",
      })
    })
  })
}

// Handle window resize events
let windowWidth = window.innerWidth
window.addEventListener("resize", () => {
  // Only trigger if width actually changes (avoid iOS height changes on scroll)
  if (window.innerWidth !== windowWidth) {
    windowWidth = window.innerWidth

    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh()

    // Adjust animations based on screen size
    if (windowWidth <= 768) {
      // Mobile-specific adjustments
      gsap.set(".feature-card, .order-option", {
        clearProps: "all",
      })
    }
  }
})

