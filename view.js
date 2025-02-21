export function GameUI(element) {
	element.innerHTML = `
  <div class="game_container">
      <div class="board">
          <div data-cell-row-1 class="board_row">
              <button data-board-col-1 class="board_cell">
                X
              </button>

              <button data-board-col-2 class="board_cell">
                O
              </button>

              <button data-board-col-3 class="board_cell">
              </button>
          </div>
          
          <div data-cell-row-2 class="board_row">
              <button data-board-col-1 class="board_cell">
              </button>

              <button data-board-col-2 class="board_cell">
              </button>

              <button data-board-col-3 class="board_cell">
              </button>
          </div>

          <div data-cell-row-3 class="board_row">
              <button data-board-col-1 class="board_cell">
              </button>

              <button data-board-col-2 class="board_cell">
              </button>

              <button data-board-col-3 class="board_cell">
              </button>
          </div>
      </div>

      <div class="game_setting">
          <div class="game_setting_wrapper">
              <p>
                Choose Opponent
                <span>Player</span>
              </p>

              <div class="game_setting_opponents">
                <button data-player-1>AI</button>
                <button data-player-2>Human</button>
              </div>
          </div>

          <div class="symbol">
            <p>You <span>X</span></p>
            <p>Player-2 <span>O</span></p>
          </div>

          <div class="level"></div>
      </div>
  </div>
  
  `
}
