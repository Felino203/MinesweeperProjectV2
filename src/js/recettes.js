import RecipeManager from "./recipe_manager.js";

const recipeManager = new RecipeManager();
configurerFiltres();
afficherRecettes();

/**
 * Configure les boutons de filtrage en ajoutant un gestionnaire de l'événement "click" à chaque bouton.
 * Le gestionnaire permet d'appliquer un filtre sur les recettes affichées.
 * Le gestionnaire ajoute la classe "selected" au bouton cliqué et l'enlève des autres boutons.
 */
function configurerFiltres() {
    const buttonGroupChildren = document.getElementById("recettes-filtres").children;

    for (let childButton of buttonGroupChildren) {
        childButton.addEventListener("click", function () {
            let previousButton = document.getElementsByClassName("selected")[0];
            previousButton.className = "";
            childButton.className = "selected";
            afficherRecettes(childButton.id);
        });
    }
}

/**
 * Affiche les recettes qui correspondent au filtre de tri en générant le HTML approprié.
 * Met à jour le nombre de recettes affichées.
 * @param {string} category categorie de filtre
 */
function afficherRecettes(category) {

    const recipeList = recipeManager.filtrerRecettes(category);
    const parentDiv = document.getElementById("recettes-list");
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
    if (recipeList !== undefined) {
        for (let recipe of recipeList) {
            const recipeDiv = document.createElement("div");
            recipeDiv.className = "recette";
            parentDiv.appendChild(recipeDiv);

            const recipeA = document.createElement("a");
            recipeA.className = "recette-link";
            recipeA.href = "./recette.html?id=".concat(recipe.id);
            recipeA.title = "Consultez la recette détaillée";
            recipeDiv.appendChild(recipeA);

            const recipeH2 = document.createElement("h2")

            recipeH2.textContent = recipe.nom;
            recipeA.appendChild(recipeH2);

            const recipeImg = document.createElement("img");
            recipeImg.alt = recipe.nom;
            recipeImg.src = recipe.img;
            recipeA.appendChild(recipeImg);

            const recipeCookTime = document.createElement("p");
            recipeCookTime.className = "time";
            const recipeClock = document.createElement("i");
            recipeClock.className = "far fa-clock";
            recipeA.appendChild(recipeCookTime);
            const minutesNb = recipe.temps;
            let minuteText = "";
            if (minutesNb === "1")
                minuteText = document.createTextNode(" ".concat(minutesNb.concat(" minute")));
            else
                minuteText = document.createTextNode(" ".concat(minutesNb.concat(" minutes")));
            recipeCookTime.appendChild(minuteText);
            minuteText.parentNode.insertBefore(recipeClock, minuteText);
        }
    }
    updateNbRecettes(recipeList.length);
}

/**
 * Mets à jour le nombre de recettes affichées sur la page
 * @param {number} nb
 */
function updateNbRecettes(nb) {
    if (nb <= 1)
        document.getElementById("recettes-count").textContent = nb.toString().concat(" recette");
    else
        document.getElementById("recettes-count").textContent = nb.toString().concat(" recettes");
}
