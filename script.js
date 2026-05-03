const searchBox = document.querySelector(".searchBox")
const searchBtn = document.querySelector("#searchBtn")
const recipeContainer = document.querySelector(".recipe-container")
const recipeDetailsContent = document.querySelector(".recipe-details-content")
const recipeCloseBtn = document.querySelector(".recipe-close-btn")

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<p>Fetching recipes...</p>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox.value.trim()}`)
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea} Dish</p>
            <p>${meal.strCategory}</p>
  `;

        const recipe = document.createElement('button');
        recipe.textContent = "View Recipe";
        recipe.addEventListener('click', () => {
            openReciepeDetails(meal);

        });
        recipeDiv.appendChild(recipe);

        recipeContainer.appendChild(recipeDiv);
    });

    const fetchIngredients = (meal) => {
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
            else {
                break
            }
        }
        return ingredientsList;
    }

    const openReciepeDetails = (meal) => {
        recipeDetailsContent.innerHTML =
            `<h2 class="recipeName">${meal.strMeal}</h2>
              <h3>Ingredients:</h3>
                <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
               <div>
               <h3>Instructions:</h3>
               <p class="recipeInstructions">${meal.strInstructions}</p>
               </div> 
            `


        recipeDetailsContent.parentElement.style.display = "block";

    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchRecipes();
});

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
