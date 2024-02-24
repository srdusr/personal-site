// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

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

// PHPMailer:
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const errorMessage = document.getElementById("error-message");

  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
      // If form is valid, send the data via AJAX
      const formData = new FormData(contactForm);
      sendData(formData);
    }
  });

  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === "") {
      isValid = false;
      setError("Name is required");
    }

    if (emailInput.value.trim() === "") {
      isValid = false;
      setError("Email is required");
    } else if (!isEmailValid(emailInput.value.trim())) {
      isValid = false;
      setError("Invalid email format");
    }

    if (messageInput.value.trim() === "") {
      isValid = false;
      setError("Message is required");
    }

    return isValid;
  }

  function isEmailValid(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function setError(message) {
    errorMessage.innerText = message;
    errorMessage.classList.add("error");
  }

  function clearError() {
    errorMessage.innerText = "";
    errorMessage.classList.remove("error");
  }

  function sendData(formData) {
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");

    message.textContent = "Sending message..."; // Display sending message
    messageContainer.classList.remove("success", "error");
    messageContainer.style.display = "block";

    fetch(contactForm.getAttribute("action"), {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Parse response as text
      })
      .then(data => {
        // Handle success message or any other logic after successful submission
        message.textContent = data; // Update message with server response
        messageContainer.classList.add("success");
      })
      .catch(error => {
        // Handle error
        console.error("Error:", error.message);
        message.textContent = "An error occurred. Please try again later.";
        messageContainer.classList.add("error");
      });
  }
});



//  mail()
//  Wait for the DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", function() {
//     const contactForm = document.getElementById("contact-form");
//     const nameInput = document.getElementById("name");
//     const emailInput = document.getElementById("email");
//     const messageInput = document.getElementById("message");
//     const errorMessage = document.getElementById("error-message");
//
//     contactForm.addEventListener("submit", function(event) {
//         event.preventDefault();
//         if (validateForm()) {
//             // If form is valid, send the data via AJAX
//             const formData = new FormData(contactForm);
//             sendData(formData);
//         }
//     });
//
//     function validateForm() {
//         let isValid = true;
//
//         if (nameInput.value.trim() === "") {
//             isValid = false;
//             setError("Name is required");
//         }
//
//         if (emailInput.value.trim() === "") {
//             isValid = false;
//             setError("Email is required");
//         } else if (!isEmailValid(emailInput.value.trim())) {
//             isValid = false;
//             setError("Invalid email format");
//         }
//
//         if (messageInput.value.trim() === "") {
//             isValid = false;
//             setError("Message is required");
//         }
//
//         return isValid;
//     }
//
//     function isEmailValid(email) {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     }
//
//     function setError(message) {
//         errorMessage.innerText = message;
//         errorMessage.classList.add("error");
//     }
//
//     function clearError() {
//         errorMessage.innerText = "";
//         errorMessage.classList.remove("error");
//     }
//
//     function sendData(formData) {
//         fetch(contactForm.getAttribute("action"), {
//             method: "POST",
//             body: formData
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json(); // Parse JSON response
//         })
//         .then(data => {
//             // Handle success message or any other logic after successful submission
//             console.log(data.message);
//             contactForm.reset(); // Reset form after successful submission
//             alert(data.message); // Show success message to user
//         })
//         .catch(error => {
//             // Handle error
//             console.error("Error:", error.message);
//             alert("An error occurred, please try again later.");
//         });
//     }
// });

