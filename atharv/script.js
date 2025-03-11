// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
  
    // Preloader Animation
    const preloaderTimeline = gsap.timeline({
      onComplete: () => {
        document.querySelector(".preloader").style.display = "none"
        // Start main animations after preloader is gone
        initAnimations()
      },
    })
  
    preloaderTimeline
      .to(".wireframe-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.2,
      })
      .to(
        ".loading-progress",
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1",
      )
      .to(".preloader", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
  
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
        mobileMenu.classList.toggle("active")
        document.body.classList.toggle("no-scroll")
      })
    }
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.classList.remove("no-scroll")
      })
    })
  
    // Header scroll effect
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header")
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Specs Tabs
    const tabButtons = document.querySelectorAll(".tab-button")
    const specsPanels = document.querySelectorAll(".specs-panel")
  
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach((b) => b.classList.remove("active"))
        specsPanels.forEach((panel) => panel.classList.remove("active"))
  
        // Add active class to clicked button and corresponding panel
        btn.classList.add("active")
        const model = btn.getAttribute("data-model")
        document.querySelector(`.specs-panel[data-model="${model}"]`).classList.add("active")
      })
    })
  
    // Gallery Slider
    const galleryTrack = document.querySelector(".gallery-track")
    const gallerySlides = document.querySelectorAll(".gallery-slide")
    const galleryPrev = document.querySelector(".gallery-prev")
    const galleryNext = document.querySelector(".gallery-next")
    const galleryDots = document.querySelector(".gallery-dots")
  
    let currentSlide = 0
    const slideCount = gallerySlides.length
  
    // Create dots
    gallerySlides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("gallery-dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      galleryDots.appendChild(dot)
    })
  
    const dots = document.querySelectorAll(".gallery-dot")
  
    // Go to specific slide
    function goToSlide(index) {
      if (index < 0) index = slideCount - 1
      if (index >= slideCount) index = 0
  
      galleryTrack.style.transform = `translateX(-${index * 100}%)`
  
      // Update active dot
      dots.forEach((dot) => dot.classList.remove("active"))
      dots[index].classList.add("active")
  
      currentSlide = index
    }
  
    // Next and previous buttons
    if (galleryPrev && galleryNext) {
      galleryPrev.addEventListener("click", () => goToSlide(currentSlide - 1))
      galleryNext.addEventListener("click", () => goToSlide(currentSlide + 1))
    }
  
    // Auto slide (optional)
    let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000)
  
    // Pause auto slide on hover
    if (galleryTrack) {
      galleryTrack.addEventListener("mouseenter", () => clearInterval(slideInterval))
      galleryTrack.addEventListener("mouseleave", () => {
        clearInterval(slideInterval)
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000)
      })
    }
  
    // Configure Section
    const modelOptions = document.querySelectorAll(".model-option")
    const colorOptions = document.querySelectorAll(".color-option")
    const summaryModel = document.querySelector(".summary-model")
    const summaryColor = document.querySelector(".summary-color")
    const summaryPrice = document.querySelector(".summary-price")
  
    // Update model selection
    modelOptions.forEach((option) => {
      option.addEventListener("click", () => {
        modelOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")
  
        const model = option.getAttribute("data-model")
        const modelName = option.querySelector(".model-name").textContent
        const price = option.querySelector(".model-price").textContent
  
        if (summaryModel) summaryModel.textContent = `CYBERTRUCK ${modelName}`
        if (summaryPrice) summaryPrice.textContent = price
  
        // Also update the specs tab to match
        tabButtons.forEach((btn) => {
          if (btn.getAttribute("data-model") === model) {
            btn.click()
          }
        })
      })
    })
  
    // Update color selection
    colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        colorOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")
  
        const colorName = option.querySelector(".color-name").textContent
        if (summaryColor) summaryColor.textContent = colorName
      })
    })
  
    // Order buttons functionality
    const orderButtons = document.querySelectorAll(".order-btn")
  
    orderButtons.forEach((button) => {
      button.addEventListener("click", () => {
        alert("Thank you for your interest in Cybertruck! This would redirect to the Tesla order page.")
      })
    })
  
    // Main animations function
    function initAnimations() {
      // Hero animations
      const heroTimeline = gsap.timeline()
  
      heroTimeline
        .from(".hero-image", {
          scale: 1.2,
          duration: 2,
          ease: "power2.out",
        })
        .from(
          ".hero-title",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.5",
        )
        .from(
          ".hero-tagline",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
  
      // Intro section animations
      gsap.from(".intro-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".intro",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".stat", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".intro-stats",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".intro-image-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".intro-image-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      // Specs section animations
      gsap.from(".specs .section-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".specs",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".specs-tabs", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".specs-tabs",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".spec-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".specs-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      // Features section animations
      gsap.from('.features .section-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
  
      gsap.from(".feature-item", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      // Gallery section animations
      gsap.from(".gallery .section-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".gallery",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".gallery-slider", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".gallery-slider",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      // Configure section animations
      gsap.from(".configure .section-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".configure",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".configure-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".configure-options",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".model-option", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".model-options",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".color-option", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".color-options",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      gsap.from(".configure-summary", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".configure-summary",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
  
      // CTA section animations
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".cta",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
  
      // Parallax effects
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
  
      gsap.to(".intro-image", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro-image-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
  
      // Animate spec values on view
      const specValues = document.querySelectorAll(".spec-value")
  
      specValues.forEach((value) => {
        const originalText = value.innerHTML
        const hasUnit = value.querySelector(".spec-unit") !== null
        let targetValue
        let unit = ""
  
        if (hasUnit) {
          const unitElement = value.querySelector(".spec-unit")
          unit = unitElement.outerHTML
          targetValue = Number.parseFloat(originalText.replace(unitElement.outerHTML, "").replace(/,/g, ""))
        } else {
          targetValue = Number.parseFloat(originalText.replace(/[^0-9.]/g, "").replace(/,/g, ""))
          unit = originalText.replace(/[0-9.,]/g, "")
        }
  
        if (!isNaN(targetValue)) {
          value.innerHTML = "0"
          if (hasUnit) value.innerHTML += unit
  
          ScrollTrigger.create({
            trigger: value,
            start: "top 90%",
            onEnter: () => {
              gsap.to(
                { value: 0 },
                {
                  duration: 2,
                  value: targetValue,
                  ease: "power2.out",
                  onUpdate: function () {
                    if (!hasUnit) {
                      value.innerHTML = Math.floor(this.targets()[0].value).toLocaleString() + unit
                    } else {
                      value.innerHTML = Math.floor(this.targets()[0].value).toLocaleString() + unit
                    }
                  },
                },
              )
            },
            once: true,
          })
        }
      })
  
      // Add hover animations for interactive elements
      const interactiveElements = document.querySelectorAll(".spec-card, .model-option, .stat")
  
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          })
        })
  
        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
  
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault()
  
          const targetId = this.getAttribute("href")
          if (targetId === "#") return
  
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            const headerHeight = document.querySelector(".header").offsetHeight
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        })
      })
    }
  
    // Handle window resize events
    window.addEventListener("resize", () => {
      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh()
    })
  })
  
  