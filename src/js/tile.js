export default class Tile {
  constructor(num) {
    this.position = num;
    this.value = 0;

    this.tileNode = document.createElement("div");
    this.tileNode.classList.add("tile");
    this.tileNode.classList.add("covered");
    this.tileNode.textContent = `${num}`;
    const minefield = document.getElementById("minefield").appendChild(this.tileNode);
  }
}
