document.getElementById('recipe-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const description = document.getElementById('description').value;
    const thumbnail = document.getElementById('thumbnail').files[0];

    // Find the My Recipes section
    const myRecipesSection = document.querySelector('.my-recipe-cards');
    if (!myRecipesSection) {
        console.error('Error: .my-recipe-cards container not found');
        alert('Error: Could not find the My Recipes section. Please try again.');
        return;
    }

    // Create a new recipe card for "My Recipes"
    const myRecipeCard = document.createElement('div');
    myRecipeCard.classList.add('my-recipe-card');
    myRecipeCard.setAttribute('data-recipe-id', `my-recipe-${Date.now()}`); // Unique ID for the card

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

    // Add event listener to the new favorite button
    const favoriteButton = myRecipeCard.querySelector('.favorite');
    favoriteButton.addEventListener('click', () => {
        const isFavorite = favoriteButton.getAttribute('data-favorite') === 'true';
        favoriteButton.setAttribute('data-favorite', !isFavorite);
        favoriteButton.classList.toggle('fas', !isFavorite);
        favoriteButton.classList.toggle('far', isFavorite);

        const favoritedRecipesSection = document.querySelector('.favorited-recipes');
        if (favoritedRecipesSection) {
            if (!isFavorite) {
                addRecipeToFavorite(myRecipeCard, favoritedRecipesSection);
            } else {
                removeRecipeFromFavorite(myRecipeCard, favoritedRecipesSection);
            }
        }
    });

    // Clear the form inputs
    document.getElementById('recipe-form').reset();

    // Optional: Show a success message
    alert('Recipe added successfully!');
});

// Favorite button handler for pre-existing cards
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

// Function to add recipe to favorites
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

// Function to remove recipe from favorites
function removeRecipeFromFavorite(recipeCard, favoritedRecipesSection) {
    const favoritedRecipeCards = favoritedRecipesSection.children;
    for (let i = 0; i < favoritedRecipeCards.length; i++) {
        if (favoritedRecipeCards[i].getAttribute('data-recipe-id') === recipeCard.getAttribute('data-recipe-id')) {
            favoritedRecipesSection.removeChild(favoritedRecipeCards[i]);
            break;
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
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Smooth scrolling for submit recipe button
document.querySelector('.submit-recipe-button').addEventListener('click', (e) => {
    e.preventDefault();
    const submitRecipeSection = document.getElementById('submit-recipe');
    submitRecipeSection.scrollIntoView({ behavior: 'smooth' });
});

// Smooth scrolling for learn more button
document.querySelector('.learn-more-button').addEventListener('click', (e) => {
    e.preventDefault();
    const footerSection = document.getElementById('about');
    footerSection.scrollIntoView({ behavior: 'smooth' });
});

// Handle header scroll behavior
const header = document.querySelector('header');
const featuredRecipesSection = document.querySelector('#featured-recipes');
let initialScrollPosition = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition < featuredRecipesSection.offsetTop) {
        header.style.top = '0';
        header.style.background = '#fff';
    } else {
        if (currentScrollPosition < initialScrollPosition) {
            header.style.top = '0';
            header.style.background = '#fff';
        } else {
            header.style.top = '-100px';
            header.style.background = 'transparent';
        }
    }
    initialScrollPosition = currentScrollPosition;
});

// Commented out login/signup form handlers (uncomment if forms are added to this page)

document.querySelector('.btn-login').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
});

document.querySelector('.btn-signup').addEventListener('click', () => {
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('login-toggle-password').addEventListener('click', () => {
    const passwordInput = document.getElementById('login-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

document.getElementById('signup-toggle-password').addEventListener('click', () => {
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

document.onclick = function(e) {
    if (!document.getElementById('login-form').contains(e.target) && !document.getElementById('signup-form').contains(e.target)) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
    }
};

document.getElementById('login-form').addEventListener('click', (e) => {
    e.stopPropagation();
});

document.getElementById('signup-form').addEventListener('click', (e) => {
    e.stopPropagation();
});
 