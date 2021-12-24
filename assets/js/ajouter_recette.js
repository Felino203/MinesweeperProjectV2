import RecipeManager from "./recipe_manager.js";

const recipeManager = new RecipeManager();

let etapeCount = 1;

document.getElementById("ajouter-etape").addEventListener("click", ajouterEtape);
document.getElementById("ajouter-recette-form").addEventListener("submit", async (event) => { ajouterRecette(); });

/**
 * Fonction qui permet d'ajouter les champs necessaire au formulaire pour ajouter une étape suplémentaire
 */
function ajouterEtape() {
  etapeCount++;
  const etapesFieldset = document.getElementById("etapes");

  const etapeFieldset = document.createElement("fieldset");
  etapeFieldset.className = "form-control";
  const legendEtape = document.createElement("legend");
  legendEtape.textContent = "Étape #" + etapeCount;
  etapeFieldset.appendChild(legendEtape);

  const nomEtapeLabel = document.createElement("label");
  nomEtapeLabel.setAttribute("for", "nom_etape_" + etapeCount);
  nomEtapeLabel.textContent = "Nom de l'étape:";
  etapeFieldset.appendChild(nomEtapeLabel);

  const nomEtapeInput = document.createElement("input");
  nomEtapeInput.type = "text";
  nomEtapeInput.id = "nom_etape_" + etapeCount;
  nomEtapeInput.required = true;
  etapeFieldset.appendChild(nomEtapeInput);

  const descEtapeLabel = document.createElement("label");
  descEtapeLabel.setAttribute("for", "description_etape_" + etapeCount);
  descEtapeLabel.textContent = "Description de l'étape:";
  etapeFieldset.appendChild(descEtapeLabel);

  const descEtapeInput = document.createElement("input");
  descEtapeInput.type = "text";
  descEtapeInput.id = "description_etape_" + etapeCount;
  descEtapeInput.required = true;
  etapeFieldset.appendChild(descEtapeInput);

  const imgEtapeLabel = document.createElement("label");
  imgEtapeLabel.setAttribute("for", "img_etape_" + etapeCount);
  imgEtapeLabel.textContent = "Ajouter une image pour cette étape:";
  etapeFieldset.appendChild(imgEtapeLabel);

  const imgEtapeInput = document.createElement("input");
  imgEtapeInput.type = "file";
  imgEtapeInput.id = "img_etape_" + etapeCount;
  imgEtapeInput.setAttribute("accept", "image/*");

  imgEtapeInput.required = true;
  etapeFieldset.appendChild(imgEtapeInput);

  etapesFieldset.insertBefore(etapeFieldset, document.getElementById("ajouter-etape")); // inserer avant le bouton ajouter une etape
}

/**
 * Fonction qui permet d'extraire les informations du formulaire et les rajouter au localStorage des recettes
 */
async function ajouterRecette() {
  const nouvelleRecette = new Object();
  nouvelleRecette.id = recipeManager.storageManager.getData().recettes.length + 1;
  nouvelleRecette.nom = document.getElementById("name").value;
  nouvelleRecette.img = await getImageInput(document.getElementById("img"));
  nouvelleRecette.temps = document.getElementById("time").value;
  nouvelleRecette.categorie = document.getElementById("type").value;

  nouvelleRecette.ingredients = new Array();
  const listeIngredients = document.getElementById("ingrediant").value;
  let ingredientCount = 0;
  for (const paireIngrediant of listeIngredients.split(",")) {
    const nouvelIngredient = new Object();
    const ingrediant = paireIngrediant.split(":");
    nouvelIngredient.nom = paireIngrediant.split(":")[0].trim(); //retire les espaces
    let quantite = ingrediant.length === 1 ? "1" : ingrediant[1].trim();
    if (/^\d+$/.test(quantite)) //Vérifie si l'expression contient uniquement des chiffres
      nouvelIngredient.quantite = parseInt(quantite.trim());
    else nouvelIngredient.quantite = quantite.trim();
    nouvelleRecette.ingredients[ingredientCount++] = nouvelIngredient;
  }

  nouvelleRecette.outils = new Array();
  const listeOutils = document.getElementById("outil").value;
  let outilCount = 0;
  for (let outil of listeOutils.split(","))
    nouvelleRecette.outils[outilCount++] = outil.trim();

  nouvelleRecette.etapes = new Array();
  for (let etapeNb = 1; etapeNb <= etapeCount; etapeNb++) {
    const nouvelleEtape = new Object();
    nouvelleEtape.ordre = parseInt(etapeNb);
    nouvelleEtape.titre = document.getElementById("nom_etape_" + etapeNb).value;
    nouvelleEtape.image = await getImageInput(document.getElementById("img_etape_" + etapeNb));
    nouvelleEtape.texte = document.getElementById("description_etape_" + etapeNb).value;
    nouvelleRecette.etapes[etapeNb - 1] = nouvelleEtape;
  }

  recipeManager.ajouterRecette(nouvelleRecette);
  location.reload();
}

/**
 * Fonction qui permet d'extraire une image à partir d'un file input
 * @param {HTMLInputElement} input
 * @returns image ajoutée dans un formulaire
 */
async function getImageInput(input) {
  if (input && input.files && input.files[0]) {
    const image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.readAsDataURL(input.files[0]);
    });

    return image;
  }
}

/**
 * Permet de vider le LocalStorage des recettes sauvegardés localement
 * Redirige l'utilisateur à la page "recettes.html"
 * @see Window.location
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/location
 */
const resetData = () => {
  recipeManager.storageManager.resetData();
  recipeManager.storageManager.loadDataFromFile();
  location = "./recettes.html";
};
document.getElementById("reset").addEventListener("click", resetData);
