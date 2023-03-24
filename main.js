
// Get the necessary DOM elements
const button = document.querySelector('button');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const sections = document.querySelectorAll('section');
const navMenu = document.querySelector('nav ul');
const mobileMenu = document.querySelector('.mobile-menu');
const form = document.querySelector('form');
const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const formMessage = document.querySelector('#message');
const formSubmit = document.querySelector('#submit');
const formStatus = document.querySelector('#form-status');

// Show the modal
const showModal = () => {
  modal.classList.add('show-modal');
};

// Close the modal
const closeModal = () => {
  modal.classList.remove('show-modal');
};

// Event listener for the button to show the modal
button.addEventListener('click', showModal);

// Event listener for the close button to close the modal
closeBtn.addEventListener('click', closeModal);

// Event listener for the window to close the modal when clicking outside it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Smooth scroll functionality for navigation links
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800
});

// Highlight current navigation link based on scroll position
const highlightNavLink = () => {
  const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - 100) - 1;

  navMenu.querySelector('.active').classList.remove('active');
  navMenu.querySelectorAll('li')[current].querySelector('a').classList.add('active');
};

// Event listener for scrolling to highlight the current nav link
window.addEventListener('scroll', highlightNavLink);

// Event listener for mobile menu toggle
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Disable the submit button and show "Sending..."
  formSubmit.disabled = true;
  formSubmit.textContent = 'Sending...';

  try {
    // Send the form data to the server
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formName.value,
        email: formEmail.value,
        message: formMessage.value
      })
    });

    const data = await response.json();

    // Show success or error message
    if (data.success) {
      formStatus.classList.add('success');
      formStatus.textContent = 'Message sent successfully!';
    } else {
      formStatus.classList.add('error');
      formStatus.textContent = 'There was an error sending your message. Please try again later.';
    }
  } catch (error) {
    console.error(error);

    formStatus.classList.add('error');
    formStatus.textContent = 'There was an error sending your message. Please try again later.';
  }

  // Enable the submit button and show "Send"
 
}
