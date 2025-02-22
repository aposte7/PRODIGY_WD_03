import Game from './class/game.js'
// import { drawWinningLine, hasClass, addClass } from './helpers.js'

export function newGame(depth = -1, starter = 1) {
	let status = {
		play: true,
		winner: '',
	}

	const player_symbol = ['X', 'O']
	const startingPlayer = parseInt(starter)
	let playerTurn = starter

	const game = new Game()

	const row_cell = document.querySelector('.board_row')
	row_cell.addEventListener('click', (e) => {
		const btnElm = e.target
		const index = parseInt(btnElm.dataset.boardCell) - 1
		console.log('cell index', index)
		if (isNaN(index) || index < 0 || !status.play) return

		const con = game.insert(player_symbol[playerTurn - 1], index)

		if (con) {
			btnElm.textContent = player_symbol[playerTurn - 1]
			btnElm.setAttribute('disabled', 'true')

			const game_status = game.isTerminal()

			console.log(game_status)

			if (game_status && game_status.winner.length > 0) {
				status.play = false

				alert(`Player ${playerTurn} won ${game_status.winner}`)
			}
		}

		playerTurn = 3 - playerTurn
	})
}
