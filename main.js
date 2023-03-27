const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("nav ul");
const links = document.querySelectorAll("nav ul li");

hamburger.addEventListener("click", () => {
  // Toggle the navigation menu
  navLinks.classList.toggle("show");

  // Animate the hamburger icon
  hamburger.classList.toggle("active");

  // Disable scrolling on the body when the menu is open
  document.body.classList.toggle("disable-scroll");
});

// Hide the navigation menu when a link is clicked
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active");
    document.body.classList.remove("disable-scroll");
  });
});

