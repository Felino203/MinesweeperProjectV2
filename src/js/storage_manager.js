import recipes from "../../data/recettes.json" assert { type: "json" };

export default class StorageManager {
  /**
   * Constructeur de la classe. Charge les données du LocalStorage
   */
  constructor() { this.loadDataFromFile(); }

  /**
   * Charge les données de "recipes" dans LocalStorage si le storage ne les contient pas déjà
   */
  loadDataFromFile() {
    if (localStorage.getItem("recipes") === null) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }

  /**
   * Récupère les recettes à partir de local storage
   * @returns les recettes du LocalStorage
   */
  getData() {
    return JSON.parse(localStorage.getItem("recipes"));
  }

  /**
   * Sauvegarde une nouvelle recette en mettant à jour l'objet dans LocalStorage
   * @param {*} newRecipe nouvelle recette à ajouter dans le storage
   */
  saveData(newRecipe) {
    const recipes = this.getData();
    recipes.recettes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }

  /**
   * Vide le LocalStorage en supprimant tout son contenu
   */
  resetData() {
    localStorage.clear();
  }
}
