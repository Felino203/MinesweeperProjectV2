import Tile from "./tile.js";

export default class Minefield {
  constructor(x, y) {
    this.minefieldNode = document.getElementById("minefield");
    this.tiles = [];
    this.fieldX = x;
    this.fieldY = y;
    this.minefieldNode.style.gridTemplateColumns = `repeat(${this.fieldX}, auto)`;
    this.minefieldNode.style.gridTemplateRows = `repeat(${this.fieldY}, auto)`;

    for (let i = 0; i < (x * y); i++) {
      let newTile = new Tile(i);
      this.tiles.push(newTile);
    }
    this.generateMines(20);

  }

  generateMines(numMines) {
    let tilesToUpdate = [...this.tiles].sort(() => 0.5 - Math.random()).slice(0, numMines);
    for (let tile of tilesToUpdate) {
      let pos = tile.position;
      this.tiles[pos].value = -1;
    }
    this.generateValues();
  }

  generateValues() {
    for (let tile of this.tiles) {
      let position = tile.position;
      for (let direction in [1, - 1, this.fieldX, -this.fieldX, -this.fieldX - 1, -this.fieldX + 1, this.fieldX + 1, this.fieldX - 1]) {
        if (!(this.isLooping(position, position + direction)) && tile.value !== -1) {
          if (this.tiles[parseInt(position + direction)].value === -1)
            tile.value++;
        }
      }
    }
  }


  isLooping(position, nextPosition) {
    return (Math.abs((nextPosition % this.fieldX) - (position % this.fieldX)) > 1 || nextPosition < 0 || nextPosition >= (this.fieldX * this.fieldY));
  }

}
