// --- Data ---
const recipes = [
    {
        name: "Smoked Brisket",
        ingredients: ["Beef Brisket", "Salt", "Pepper", "MSG", "Mustard", "Wood Chips"],
        hint: "Rub with mustard before adding the spices!"
    },
    {
        name: "Honey Glazed Ribs",
        ingredients: ["Pork Ribs", "Honey Mustard", "Brown Sugar", "Salt", "Liquid Smoke"],
        hint: "Sweet and smoky is the goal."
    },
    {
        name: "Mystery Meat Loaf",
        ingredients: ["Ground Beef", "Ketchup", "Preservatives", "Salt", "Pepper", "MSG"],
        hint: "A lot of shelf-life in this one."
    }
];

const allIngredients = [
    "Beef Brisket", "Pork Ribs", "Ground Beef", "Salt", "Pepper", "MSG", 
    "Mustard", "Honey Mustard", "Ketchup", "Brown Sugar", "Wood Chips", 
    "Liquid Smoke", "Preservatives", "Soy Sauce", "Garlic Powder", "Onion Powder"
];

let currentRecipe = null;
let pot = [];

// --- Functions ---

function init() {
    // Load Recipes
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(r => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `<h3>${r.name}</h3><p>${r.ingredients.join(", ")}</p>`;
        card.onclick = () => selectRecipe(r);
        recipeList.appendChild(card);
    });

    // Load Shelf
    const shelf = document.getElementById('ingredient-shelf');
    allIngredients.forEach(ing => {
        const btn = document.createElement('button');
        btn.className = 'ingredient-btn';
        btn.innerText = ing;
        btn.onclick = () => addIngredient(ing);
        shelf.appendChild(btn);
    });
}

function toggleSidebar() {
    document.getElementById('recipe-sidebar').classList.toggle('open');
}

function selectRecipe(recipe) {
    currentRecipe = recipe;
    document.getElementById('current-target').innerText = `Cooking: ${recipe.name}`;
    resetPot();
    toggleSidebar();
}

function addIngredient(ing) {
    pot.push(ing);
    const potElement = document.getElementById('cooking-pot');
    const item = document.createElement('div');
    item.className = 'added-item';
    item.innerText = ing;
    potElement.appendChild(item);
}

function resetPot() {
    pot = [];
    document.getElementById('cooking-pot').innerHTML = '';
}

function serveDish() {
    if (!currentRecipe) {
        alert("Pick a recipe from the sidebar first!");
        return;
    }

    const feedback = document.getElementById('feedback-overlay');
    const title = document.getElementById('result-title');
    const details = document.getElementById('result-details');
    
    let missing = currentRecipe.ingredients.filter(i => !pot.includes(i));
    let extra = pot.filter(i => !currentRecipe.ingredients.includes(i));

    feedback.style.display = 'flex';
    
    if (missing.length === 0 && extra.length === 0) {
        title.innerText = "Chef's Kiss! Perfect!";
        title.className = "success";
        details.innerHTML = "You followed the recipe exactly.";
    } else if (missing.length === 0 && extra.length > 0) {
        title.innerText = "Creative... but Odd.";
        details.innerHTML = `You added everything, but the <b>${extra.join(", ")}</b> made it taste weird.`;
    } else {
        title.innerText = "Dish Incomplete!";
        title.className = "missing";
        details.innerHTML = `You forgot the following:<br><b class="missing">${missing.join("<br>")}</b>`;
    }
}

function closeFeedback() {
    document.getElementById('feedback-overlay').style.display = 'none';
    resetPot();
}

// Start the game logic
init();
