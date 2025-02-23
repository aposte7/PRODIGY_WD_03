import Board from './class/game.js'
import { BoardCell } from './view.js'
// import { drawWinningLine, hasClass, addClass } from './helpers.js'

export function newGame(depth = -1, starter = 1) {
	const setting = document.querySelector('.game_setting_opponents')
	const row_cell = document.querySelector('.board_row')
	const player_symbol = ['X', 'O']
	let playerTurn = parseInt(starter)

	let status = {
		play: true,
		players: ['human'],
		winner: '',
	}

	const board = new Board()

	setting.addEventListener('click', (e) => {
		console.log('OPPONENT')

		const btn = e.target
		const opponent = btn.dataset.player.toLowerCase()
		status.players = [...status.players, opponent]

		Array.from(setting.children).forEach((child) => {
			child.classList.remove('active_opponent')
			child.setAttribute('disabled', 'true')
		})
		btn.classList.add('active_opponent')
	})

	row_cell.addEventListener('click', (e) => {
		const btnElm = e.target
		let index = -1
		const continue_game = status.players.length == 2

		if (status.players[playerTurn - 1] == 'human' && continue_game) {
			index = parseInt(btnElm.dataset.boardCell) - 1

			if (isNaN(index) || index < 0 || !status.play) return

			const con = board.insert(player_symbol[playerTurn - 1], index)

			if (con) {
				btnElm.textContent = player_symbol[playerTurn - 1]
				btnElm.setAttribute('disabled', 'true')

				const game_status = game.isTerminal()

				console.log(game_status)

				if (game_status && game_status.winner.length > 0) {
					status.play = false

					alert(`Player ${playerTurn} won ${game_status.winner}`)
					resetGame()
				}
			}
		} else return

		playerTurn = 3 - playerTurn
	})

	function aiTurn() {}

	const resetGame = () => {
		Array.from(setting.children).forEach((child) => {
			child.classList.remove('active_opponent')
			child.setAttribute('disabled', 'true')
		})

		BoardCell()
	}
}
