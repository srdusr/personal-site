// Responsive hamburger menu
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

// Blog search
const search = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const blog_preview_card = document.querySelectorAll(".blog-preview-card");
  const blog_preview_info = document.querySelectorAll(".blog-preview-card h3");

  for (var i = 0; i < blog_preview_info.length; i++) {
    let match = blog_preview_info[i];

    if (match) {
      let textvalue = match.textContent || match.innerHTML

      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        blog_preview_card[i].style.display = "";
      }
      else {
        blog_preview_card[i].style.display = "none";
      }
    }
  }
}

document.getElementById("search-item").addEventListener("keyup", search);

// Blog filtering by category and sorting
const filter = () => {
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;
  const blog_preview_container = document.querySelector(".blog-preview-container");
  const blog_preview_cards = document.querySelectorAll(".blog-preview-card");

  // Filter by category
  for (let card of blog_preview_cards) {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }

  // Sort by recent or popular
  if (sort === "recent") {
    blog_preview_container.innerHTML = "";
    const cardsArray = Array.from(blog_preview_cards);
    const sortedCardsArray = cardsArray.sort((a, b) => {
      const aDate = new Date(a.querySelector(".blog-preview-date").textContent);
      const bDate = new Date(b.querySelector(".blog-preview-date").textContent);
      return bDate - aDate;
    });
    sortedCardsArray.forEach(card => {
      blog_preview_container.appendChild(card);
    });
  } else {
    blog_preview_container.innerHTML = "";
    const cardsArray = Array.from(blog_preview_cards);
    const sortedCardsArray = cardsArray.sort((a, b) => {
      const aViews = parseInt(a.querySelector(".blog-preview-views").textContent.replace(/\D/g, ""));
      const bViews = parseInt(b.querySelector(".blog-preview-views").textContent.replace(/\D/g, ""));
      return bViews - aViews;
    });
    sortedCardsArray.forEach(card => {
      blog_preview_container.appendChild(card);
    });
  }
}

document.getElementById("category").addEventListener("change", filter);
document.getElementById("sort").addEventListener("change", filter);

// Blog toggle visibility of tags based on selected option
const toggleTags = () => {
  const selectedOption = document.getElementById("toggle-tags").value;
  const tagContainer = document.querySelector(".tag-container");
  if (selectedOption === "show") {
    tagContainer.classList.add("show-tags");
  } else {
    tagContainer.classList.remove("show-tags");
  }
};

// Event listener for when the selection changes
document.getElementById("toggle-tags").addEventListener("change", toggleTags);

// Function to set the initial option on page load
const setInitialOption = () => {
  const toggleTagsSelect = document.getElementById("toggle-tags");
  if (window.innerWidth <= 768) { // For mobile view
    toggleTagsSelect.value = "hide";
    toggleTags();
  } else {
    toggleTags();
  }
};

// Call the function to set initial option on page load
window.addEventListener("load", setInitialOption);

// Blog filtering by tag selection

const tags = document.querySelectorAll(".tag-button");

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    tag.classList.toggle("selected");
    filterPosts();
  });
});

const filterPosts = () => {
  const selectedTags = document.querySelectorAll(".tag-button.selected");
  const blogPreviewCards = document.querySelectorAll(".blog-preview-card");

  blogPreviewCards.forEach(card => {
    const tags = card.getAttribute("data-tags").split(" ");
    const category = card.getAttribute("data-category");

    let visible = true;

    if (category !== document.getElementById("category").value && document.getElementById("category").value !== "all") {
      visible = false;
    }

    if (visible) {
      selectedTags.forEach(tag => {
        if (!tags.includes(tag.getAttribute("data-tag"))) {
          visible = false;
        }
      });
    }

    if (visible) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
};

document.getElementById("category").addEventListener("change", filterPosts);


// Contact form

// Pressing contact button goes a little above the contact section
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.contact-btn').addEventListener('click', function() {
    const contactSection = document.querySelector('.contact');
    const navbarHeight = document.querySelector('nav').offsetHeight;
    const offset = navbarHeight + 20;
    const contactSectionPosition = contactSection.offsetTop - offset;
    window.scrollTo({
      top: contactSectionPosition,
      behavior: 'smooth'
    });
  });
});

// Get form element and add submit event listener
const form = document.getElementById('contact-form');
form.addEventListener('submit', handleSubmit);

// Handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Validate the form
  if (validateForm()) {
    // If the form is valid, send the data
    sendForm();
  }
}

// Validate the form
function validateForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Validation
  if (nameInput.value.trim() === '') {
    alert('Please enter your name.');
    nameInput.focus();
    return false;
  }

  if (emailInput.value.trim() === '') {
    alert('Please enter your email.');
    emailInput.focus();
    return false;
  }

  if (messageInput.value.trim() === '') {
    alert('Please enter your message.');
    messageInput.focus();
    return false;
  }

  return true; // Form is valid
}

// Send form data
function sendForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Create a new FormData object and append the form data
  const formData = new FormData();
  formData.append('name', nameInput.value);
  formData.append('email', emailInput.value);
  formData.append('message', messageInput.value);

  // Send a POST request to contact.php
  fetch('contact.php', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(result => {
      if (result === 'success') {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('An error occurred. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Unknown error occurred. Please try again.');
    });
}

