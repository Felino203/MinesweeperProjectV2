import StorageManager from "./storage_manager.js";

export default class RecipeManager {
  constructor() {
    this.storageManager = new StorageManager();
  }
  /**
   * Ajouter une recette à la liste des recettes et la sauvegarde localement
   * @param {*} recette
   */
  ajouterRecette(recette) {
    this.storageManager.saveData(recette);
  }

  /**
   * Obtient une recette du storage local
   * à partir de son id ou undefined si aucune recette n'est trouvé
   * @param {number} id
   * @returns la recette ayant l'id ou undefined
   */
  obtenirRecette(id) {
    const result = this.storageManager.getData().recettes.filter(elem => elem.id === id)[0];
    if (result.length !== 0)
      return result;
    else
      return undefined;
  }

  /**
   * Filtre les recettes en fonction d'une catégorie et retourne le résultat
   * Si category est undefined ou null, toutes les recettes sont retournées
   * @param {string} category categorie de recette pour le filtre
   * @returns les recettes de la catégorie de recheche
   */
  filtrerRecettes(category) {
    const recipes = this.storageManager.getData();
    if (category === undefined || category === null || category === "")
      return recipes.recettes;
    const result = recipes.recettes.filter(elem => elem.categorie === category);
    if (result.length !== 0)
      return result;
    else
      return undefined;
  }
}
