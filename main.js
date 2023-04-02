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

//Blog search 
const search = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const blog_preview_card = document.querySelectorAll(".blog-preview-card");
  const blog_preview_info = document.querySelectorAll(".blog-preview-card h3");

  for(var i=0; i < blog_preview_info.length; i++) {
    let match = blog_preview_info[i];

    if(match){
      let textvalue = match.textContent || match.innerHTML

      if(textvalue.toUpperCase().indexOf(searchbox) > -1) {
        blog_preview_card[i].style.display = "";
      } 
      else {
        blog_preview_card[i].style.display = "none";
      }
    }
  }
}

document.getElementById("search-item").addEventListener("keyup", search);









const blogPreviewCards = document.querySelectorAll('.blog-preview-card');
const sortSelect = document.getElementById('sort');
const categorySelect = document.getElementById('category');
const tagCheckboxes = document.querySelectorAll('.tag-dropdown input[type="checkbox"]');

// Sort by recent or popular
sortSelect.addEventListener('change', () => {
  if (sortSelect.value === 'recent') {
    const sortedCards = Array.from(blogPreviewCards).sort((a, b) => {
      const dateA = new Date(a.querySelector('.blog-preview-date').textContent);
      const dateB = new Date(b.querySelector('.blog-preview-date').textContent);
      return dateB - dateA;
    });
    sortedCards.forEach((card) => {
      card.parentElement.prepend(card);
    });
  } else {
    blogPreviewCards.forEach((card) => card.style.display = '');
    Array.from(blogPreviewCards).sort((a, b) => {
      const viewsA = parseInt(a.querySelector('.blog-preview-views').textContent);
      const viewsB = parseInt(b.querySelector('.blog-preview-views').textContent);
      return viewsB - viewsA;
    }).forEach((card) => {
      card.parentElement.prepend(card);
    });
  }
});

// Filter by category
categorySelect.addEventListener('change', () => {
  if (categorySelect.value === 'all') {
    blogPreviewCards.forEach(card => card.style.display = '');
  } else {
    blogPreviewCards.forEach(card => {
      if (card.dataset.category !== categorySelect.value) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    });
  }
});

// Filter by tags
tagCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedTags = Array.from(tagCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    
    if (selectedTags.length === 0) {
      blogPreviewCards.forEach(card => card.style.display = '');
    } else {
      blogPreviewCards.forEach(card => {
        const cardTags = card.dataset.tags.split(',');
        const matches = selectedTags.filter(tag => cardTags.includes(tag));
        if (matches.length === selectedTags.length) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }
  });
});

