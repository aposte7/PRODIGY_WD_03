import Player from './class/ai.js'
import Board from './class/game.js'
import { BoardCell } from './view.js'
// import { drawWinningLine } from './helpers.js';

export function newGame(depth = -1, starter = 1) {
	const setting = document.querySelector('.game_setting_opponents')
	const row_cell = document.querySelector('.board_row')
	const player_symbol = ['o', 'x']
	let playerTurn = parseInt(starter)

	let status = {
		play: true,
		players: ['human'],
		winner: '',
	}

	let board = new Board()
	let aiPlayer = new Player()

	setting.addEventListener('click', (e) => {
		const btn = e.target.closest('button')
		if (!btn) return
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
		const continue_game = status.players.length === 2

		if (status.players[playerTurn - 1] === 'human' && continue_game) {
			index = parseInt(btnElm.dataset.boardCell) - 1

			if (isNaN(index) || index < 0 || !status.play) return

			insetIndex(index, 'human', btnElm)
		} else return

		playerTurn = 3 - playerTurn

		if (
			status.players[playerTurn - 1] === 'ai' &&
			continue_game &&
			status.play
		) {
			aiPlayer.getBestMove(board, true, insetIndex, 0)
			playerTurn = 3 - playerTurn

			console.log('after an AI', board.state)
		}
	})

	function insetIndex(selectedIndex, player = '', btn) {
		const index = parseInt(selectedIndex)

		console.log('selected', index, selectedIndex)

		const btnElm =
			player.toLowerCase() === 'human'
				? btn
				: document.querySelector(`[data-board-cell="${index + 1}"]`)

		if (board.insert(player_symbol[playerTurn - 1], index)) {
			btnElm.textContent = player_symbol[playerTurn - 1]
			btnElm.setAttribute('disabled', 'true')

			status.winner = board.isTerminal()

			if (status.winner && status.winner.winner) {
				status.play = false
				resetGame()
			}
		}
	}

	const resetGame = () => {
		Array.from(setting.children).forEach((child) => {
			child.classList.remove('active_opponent')
			child.removeAttribute('disabled') // Re-enable buttons
		})
		const popup = document.querySelector('.popup')
		popup.style.display = 'block'
		const popupMessage = document.querySelector('.popup_message')

		popupMessage.textContent =
			status.winner.winner === 'draw'
				? "It's a draw!"
				: `Player  ${status.winner.winner.toUpperCase()}  wins!`
		const continueBtn = document.querySelector('.popup_btn')

		continueBtn.addEventListener('click', (e) => {
			board = new Board()
			popup.style.display = 'none'
			BoardCell()
			status = {
				play: true,
				players: ['human'],
				winner: '',
			}
		})
	}
}
