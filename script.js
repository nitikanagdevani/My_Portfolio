document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.classList.add(savedTheme + "-theme")
    body.classList.remove(savedTheme === "dark" ? "light-theme" : "dark-theme")
  } else {
    // Check for preferred color scheme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      body.classList.add("dark-theme")
      body.classList.remove("light-theme")
      localStorage.setItem("theme", "dark")
    }
  }

  // Theme toggle click event
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light-theme")) {
      body.classList.remove("light-theme")
      body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.remove("dark-theme")
      body.classList.add("light-theme")
      localStorage.setItem("theme", "light")
    }
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Active navigation highlighting
  const sections = document.querySelectorAll(".section")
  const navLinksItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })

    navLinksItems.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
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
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
})

 // Resume download functionality
  const resumeButton = document.querySelector("a[download]")
  if (resumeButton) {
    resumeButton.addEventListener("click", (e) => {
      // Check if resume file exists, if not show a message
      fetch("/resume.pdf")
        .then((response) => {
          if (!response.ok) {
            e.preventDefault()
            alert("Resume file not found. Please add your resume.pdf file to the root directory.")
          }
        })
        .catch(() => {
          e.preventDefault()
          alert("Resume file not found. Please add your resume.pdf file to the root directory.")
        })
    })
  }

