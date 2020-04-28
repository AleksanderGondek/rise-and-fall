export class GameStateWindow {
  constructor() {
    // Hardcoded, example of board with room 3x3
    this.board = [
      [false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, true, true, true, false, false, false, false, false],
      [false, false, false, false, true, true, true, false, false, false, false, false],
      [false, false, false, false, true, true, true, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false],
    ];
  }
  readonly board: boolean[][]
}
