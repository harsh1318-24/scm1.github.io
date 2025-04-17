    document.querySelectorAll('.favorite').forEach(item => {
        item.addEventListener('click', () => {
            const isFavorite = item.getAttribute('data-favorite') === 'true';
            item.setAttribute('data-favorite', !isFavorite);
            item.classList.toggle('fas', !isFavorite);
            item.classList.toggle('far', isFavorite);

            const recipeCard = item.parentNode.parentNode;
            const favoritedRecipesSection = document.querySelector('.favorited-recipes');

            if (favoritedRecipesSection) {
                if (!isFavorite) {
                    addRecipeToFavorite(recipeCard, favoritedRecipesSection);
                } else {
                    removeRecipeFromFavorite(recipeCard, favoritedRecipesSection);
                }
            }
        });
    });

    function addRecipeToFavorite(recipeCard, favoritedRecipesSection) {
        const existingRecipeCard = favoritedRecipesSection.querySelector(`[data-recipe-id="${recipeCard.getAttribute('data-recipe-id')}"]`);
        if (!existingRecipeCard) {
            const recipeCardCopy = recipeCard.cloneNode(true);
            const favoriteButtonCopy = recipeCardCopy.querySelector('.favorite');
            favoriteButtonCopy.addEventListener('click', () => {
                const isFavoriteCopy = favoriteButtonCopy.getAttribute('data-favorite') === 'true';
                favoriteButtonCopy.setAttribute('data-favorite', !isFavoriteCopy);
                favoriteButtonCopy.classList.toggle('fas', !isFavoriteCopy);
                favoriteButtonCopy.classList.toggle('far', isFavoriteCopy);

                removeRecipeFromFavorite(recipeCardCopy, favoritedRecipesSection);
            });
            favoriteButtonCopy.setAttribute('data-favorite', 'true');
            favoriteButtonCopy.classList.add('fas');
            favoriteButtonCopy.classList.remove('far');

            favoritedRecipesSection.appendChild(recipeCardCopy);
        }

        const noFavoritesMessage = favoritedRecipesSection.querySelector('.no-favorites-message');
        if (noFavoritesMessage) {
            noFavoritesMessage.remove();
        }
    }

    function removeRecipeFromFavorite(recipeCard, favoritedRecipesSection) {
        const favoritedRecipeCards = favoritedRecipesSection.children;
        for (let i = 0; i < favoritedRecipeCards.length; i++) {
            if (favoritedRecipeCards[i].getAttribute('data-recipe-id') === recipeCard.getAttribute('data-recipe-id')) {
                favoritedRecipesSection.removeChild(favoritedRecipeCards[i]);
            }
        }

        if (favoritedRecipesSection.children.length === 1) {
            const noFavoritesMessage = favoritedRecipesSection.querySelector('.no-favorites-message');
            if (!noFavoritesMessage) {
                const message = document.createElement('p');
                message.classList.add('no-favorites-message');
                message.textContent = 'Add some of your favorite recipes!';
                favoritedRecipesSection.appendChild(message);
            }
        } else if (favoritedRecipesSection.children.length > 1) {
            const noFavoritesMessage = favoritedRecipesSection.querySelector('.no-favorites-message');
            if (noFavoritesMessage) {
                noFavoritesMessage.remove();
            }
        }
    }

    document.getElementById('recipe-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const recipeName = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('ingredients').value;
        const description = document.getElementById('description').value;
        const youtubeLink = document.getElementById('youtube-link').value;
        const thumbnail = document.getElementById('thumbnail').files[0];

        // You can add your logic here to handle the form data
        console.log(recipeName, ingredients, description, youtubeLink, thumbnail);
    });

    document.querySelector('.submit-recipe-button').addEventListener('click', (e) => {
        e.preventDefault();
        const submitRecipeSection = document.getElementById('submit-recipe');
        submitRecipeSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.learn-more-button').addEventListener('click', (e) => {
        e.preventDefault();
        const footerSection = document.getElementById('about');
        footerSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('nav a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Show login form when login link is clicked
    document.querySelector('.btn-login').addEventListener('click', () => {
        document.getElementById('login-form').style.display = 'block';
    });

    // Show sign up form when sign up link is clicked
    document.querySelector('.btn-signup').addEventListener('click', () => {
        document.getElementById('signup-form').style.display = 'block';
    });

    // Toggle password visibility on login form
    document.getElementById('login-toggle-password').addEventListener('click', () => {
        const passwordInput = document.getElementById('login-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    // Toggle password visibility on sign up form
    document.getElementById('signup-toggle-password').addEventListener('click', () => {
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    // Get the header element
    const header = document.querySelector('header');

    // Get the hero section
    const heroSection = document.querySelector('.hero');

    // Get the featured recipes section
    const featuredRecipesSection = document.querySelector('#featured-recipes');

    // Get the initial scroll position
    let initialScrollPosition = window.scrollY;

    // Add an event listener for scroll events
    window.addEventListener('scroll', () => {
        // Get the current scroll position
        const currentScrollPosition = window.scrollY;

        // Check if the user is at the top of the page or if the hero section is at the top of the viewport
        if (currentScrollPosition < featuredRecipesSection.offsetTop) {
            // Show the header
            header.style.top = '0';
            header.style.background = '#fff';
        } else {
            // Check if the user has scrolled up
            if (currentScrollPosition < initialScrollPosition) {
                // Show the header
                header.style.top = '0';
                header.style.background = '#fff';
            } else {
                // Hide the header
                header.style.top = '-100px';
                header.style.background = 'transparent';
            }
        }

        // Update the initial scroll position
        initialScrollPosition = currentScrollPosition;
    });

    const homeLink = document.querySelector('#home-link');

    homeLink.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });



    document.onclick = function(e){
        if (!document.getElementById('login-form').contains(e.target) && !document.getElementById('signup-form').contains(e.target)) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('signup-form').style.display = 'none';
        }
    }

    document.getElementById('login-form').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.getElementById('signup-form').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Toggle login form
document.getElementById('btn-login').addEventListener('click', function() {
  document.getElementById('login-form').classList.add('show');
});

// Toggle sign up form
document.getElementById('btn-signup').addEventListener('click', function() {
  document.getElementById('signup-form').classList.add('show');
});

// Close forms when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.login-form') && !event.target.closest('.signup-form')) {
    document.getElementById('login-form').classList.remove('show');
    document.getElementById('signup-form').classList.remove('show');
  }
});

// Toggle password visibility
document.getElementById('login-toggle-password').addEventListener('click', function() {
  const passwordInput = document.getElementById('login-password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

document.getElementById('signup-toggle-password').addEventListener('click', function() {
  const passwordInput = document.getElementById('signup-password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}); 

document.getElementById('recipe-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const description = document.getElementById('description').value;
    const thumbnail = document.getElementById('thumbnail').files[0];

    // Create a new recipe card for "My Recipes"
    const myRecipesSection = document.querySelector('.my-recipe-cards');
    const myRecipeCard = document.createElement('div');
    myRecipeCard.classList.add('my-recipe-card'); // Use the class for styling

    // Create the inner HTML for the new recipe card
    myRecipeCard.innerHTML = `
        <h3><i class="far fa-star favorite" data-favorite="false"></i> <span>${recipeName}</span></h3>
        <img src="${thumbnail ? URL.createObjectURL(thumbnail) : 'default-thumbnail.jpg'}" alt="${recipeName}" style="width: 100%; border-radius: 10px;">
        <p>${description}</p>
        <p><strong>Ingredients:</strong> ${ingredients}</p>
        <p><strong>Servings:</strong> <i class="fas fa-users fa-lg"></i> 4</p>
    `;

    // Append the new recipe card to the My Recipes section
    myRecipesSection.appendChild(myRecipeCard);

    // Clear the form inputs
    document.getElementById('recipe-form').reset();
});