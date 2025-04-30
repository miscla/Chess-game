class Piece {
    constructor(name, color) {
        this.name = name;  // 'P', 'K', 'Q', etc.
        this.color = color; // 'W' or 'B'
    }
  
    toString() {
        return `${this.color}${this.name}`;
    }
  }
  
  module.exports = Piece;
  