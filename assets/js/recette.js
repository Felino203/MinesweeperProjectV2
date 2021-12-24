import RecipeManager from "./recipe_manager.js";

const recipeManager = new RecipeManager();

/**
 * Permet d'obtenir le paramètre d'id dans l'URL
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Location/search
 * @link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */
const urlParams = parseInt(new URLSearchParams(document.location.search.substring(1)).get("id"));

afficherRecette();

/**
 * Affiche toutes les informations de la recette (nom, image, outils, ingrédients et étapes) en générant l'HTML correspondant.
 *
 * @param {*} recette recette à afficher
 */
function afficherRecette(recette) {
    const recipe = recipeManager.obtenirRecette(urlParams);

    document.getElementsByClassName("recette-header")[0].textContent = recipe.nom;
    document.getElementsByClassName("recette-image")[0].src = recipe.img;
    document.getElementsByClassName("recette-image")[0].alt = recipe.nom;

    afficherIngredients(recipe.ingredients);
    afficherOutils(recipe.outils);
    afficherEtapes(recipe.etapes, recipe.nom);
}

/**
 * Affiche les informations des outils nécessaires pour la recette
 * Génère l'HTML correspondant.
 *
 * @param {*} outils outils à afficher
 */
function afficherOutils(outils) {

    const listeOutils = document.getElementById("list-outils");
    while (listeOutils.firstChild) {
        listeOutils.removeChild(listeOutils.firstChild);
    }
    for (let i = 0; i < outils.length; i++) {

        const outilLi = document.createElement("li");
        listeOutils.appendChild(outilLi);

        const outilInput = document.createElement("input");
        outilInput.type = "checkbox";
        outilLi.appendChild(outilInput);

        const outilLabel = document.createElement("label");
        outilLabel.textContent = outils[i];
        outilLi.appendChild(outilLabel);
    }

}

/**
 * Affiche les informations des ingrédients nécessaires pour la recette
 * Génère l'HTML correspondant.
 *
 * @param {*} ingredients ingrédients à afficher
 */
function afficherIngredients(ingredients) {
    const listeIngredients = document.getElementById("list-ingrediants");
    while (listeIngredients.firstChild) {
        listeIngredients.removeChild(listeIngredients.firstChild);
    }
    for (let ingredient of ingredients) {

        const ingredientsLi = document.createElement("li");
        listeIngredients.appendChild(ingredientsLi);

        const ingredientsInput = document.createElement("input");
        ingredientsInput.type = "checkbox";
        ingredientsLi.appendChild(ingredientsInput);

        const ingredientsLabel = document.createElement("label");

        ingredientsLabel.textContent = (function () {
            let ingredientsQty = ingredient.quantite;
            if (typeof ingredientsQty == "string") {
                ingredientsQty = ingredientsQty.concat(" de");
            }
            return ingredientsQty.toString().concat(" ").concat(ingredient.nom);
        })();
        ingredientsLi.appendChild(ingredientsLabel);
    }
}


/**
 * Affiche les informations des étapes nécessaires pour la recette
 * Génère l'HTML correspondant.
 *
 * @param {*} etapes etapes à afficher
 * @param {string} nom nom de la recette
 */
function afficherEtapes(etapes, nom) {

    const listeEtapes = document.getElementsByClassName("recette-container")[0];
    while (listeEtapes.firstChild) {
        listeEtapes.removeChild(listeEtapes.firstChild);
    }
    for (let etape of etapes) {

        let etapeContainer = document.createElement("div");
        etapeContainer.className = "etape-recette";
        etapeContainer.id = "etape-recette-".concat(etape.ordre)
        listeEtapes.appendChild(etapeContainer);

        let etapeImg = document.createElement("img");
        etapeImg.className = "recette-image";
        etapeImg.alt = nom.concat(", étape ".concat(toString(etape.ordre)));
        etapeImg.src = etape.image;
        etapeContainer.appendChild(etapeImg);

        let etapeTitre = document.createElement("h2");
        etapeTitre.textContent = (etape.ordre).toString().concat(". ").concat(etape.titre)
        etapeContainer.appendChild(etapeTitre);

        let etapeText = document.createElement("p");
        etapeText.textContent = etape.texte;
        etapeContainer.appendChild(etapeText);
    }
}
