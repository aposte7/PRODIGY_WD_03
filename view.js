import { newGame } from './script'

export function GameUI(element) {
	element.innerHTML = `
  <div class="game_container">
      <div class="popup">
      <div class="popup_message
      "></div>
      </div>

      <div class="board">
          
      </div>

      <div class="game_setting">
          <div class="game_setting_wrapper">
              <p>
                Choose Opponent
                <span>Player</span>
              </p>

              <div class="game_setting_opponents">
                <button data-player="ai" class="btn_opponent">AI</button>
                <button data-player="human" class="btn_opponent">Human</button>
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

	BoardCell()
	newGame()
}

export function BoardCell() {
	const boardElm = document.querySelector('.board')
	boardElm.innerHTML = ''

	let boardRowDiv = document.createElement('div')
	boardRowDiv.className = 'board_row'

	Array.from({ length: 9 }).forEach((_, index) => {
		let buttonCell = document.createElement('button')
		buttonCell.className = 'board_cell'
		buttonCell.setAttribute('data-board-cell', `${index + 1}`)
		boardRowDiv.appendChild(buttonCell)
	})

	boardElm.appendChild(boardRowDiv)
}
