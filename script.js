import Player from './class/ai.js'
import Board from './class/game.js'
import { BoardCell } from './view.js'
// import { drawWinningLine } from './helpers.js';

export function newGame(depth = -1, starter = 1) {
	// DOM Elements
	const setting = document.querySelector('.game_setting_opponents')
	const row_cell = document.querySelector('.board_row')
	const player_symbol = ['o', 'x'] // Player symbols: 'o' for Player 1, 'x' for Player 2
	let playerTurn = parseInt(starter) // Current player's turn (1 or 2)

	// Game Status
	let status = {
		play: true,
		players: ['human'], // Default: human player
		winner: '',
	}

	// Initialize Board and AI Player
	let board = new Board()
	let aiPlayer = new Player()

	// Event Listeners
	initializeEventListeners()

	// Functions

	/**
	 * Initialize all event listeners.
	 */
	function initializeEventListeners() {
		// Opponent selection
		setting.addEventListener('click', handleOpponentSelection)

		// Cell click listener
		row_cell.addEventListener('click', handleCellClick)
	}

	/**
	 * Handle opponent selection (AI or Human).
	 * @param {Event} e - The click event.
	 */
	function handleOpponentSelection(e) {
		const btn = e.target.closest('button')
		if (!btn) return

		const opponent = btn.dataset.player.toLowerCase()
		status.players = [...status.players, opponent] // Add opponent to players array

		// Update UI for opponent selection
		Array.from(setting.children).forEach((child) => {
			child.classList.remove('active_opponent')
			child.setAttribute('disabled', 'true')
		})
		btn.classList.add('active_opponent')
	}

	/**
	 * Handle cell click events.
	 * @param {Event} e - The click event.
	 */
	function handleCellClick(e) {
		const btnElm = e.target
		const continue_game = status.players.length === 2 // Check if two players are selected

		if (status.players[playerTurn - 1] === 'human' && continue_game) {
			const index = parseInt(btnElm.dataset.boardCell) - 1 // Convert to 0-based index

			if (isNaN(index) || index < 0 || !status.play) return

			insertIndex(index, 'human', btnElm) // Human player's move
		} else return

		// Switch turns
		playerTurn = 3 - playerTurn

		// AI's turn
		if (
			status.players[playerTurn - 1] === 'ai' &&
			continue_game &&
			status.play
		) {
			aiPlayer.getBestMove(board, true, insertIndex, 0) // AI player's move
			playerTurn = 3 - playerTurn // Switch back to human player's turn
		}
	}

	/**
	 * Insert a move into the board and update the UI.
	 * @param {number} selectedIndex - The selected cell index.
	 * @param {string} player - The player type ('human' or 'ai').
	 * @param {HTMLElement} btn - The clicked button element.
	 */
	function insertIndex(selectedIndex, player = '', btn) {
		const index = parseInt(selectedIndex)

		const btnElm =
			player.toLowerCase() === 'human'
				? btn
				: document.querySelector(`[data-board-cell="${index + 1}"]`)

		if (board.insert(player_symbol[playerTurn - 1], index)) {
			btnElm.textContent = player_symbol[playerTurn - 1] // Update cell text
			btnElm.setAttribute('disabled', 'true') // Disable the cell

			// Check for a winner or draw
			status.winner = board.isTerminal()

			if (status.winner && status.winner.winner) {
				status.play = false // End the game
				resetGame() // Show winner and reset
			}
		}
	}

	/**
	 * Reset the game and show the winner/draw popup.
	 */
	function resetGame() {
		// Re-enable opponent selection buttons
		Array.from(setting.children).forEach((child) => {
			child.classList.remove('active_opponent')
			child.removeAttribute('disabled')
		})

		// Show popup with winner/draw message
		const popup = document.querySelector('.popup')
		popup.style.display = 'block'
		const popupMessage = document.querySelector('.popup_message')

		popupMessage.textContent =
			status.winner.winner === 'draw'
				? "It's a draw!"
				: `Player ${status.winner.winner.toUpperCase()} wins!`

		// Continue button to start a new game
		const continueBtn = document.querySelector('.popup_btn')
		continueBtn.addEventListener('click', () => {
			board = new Board() // Reset the board
			popup.style.display = 'none' // Hide the popup
			BoardCell() // Re-render the board cells
			status = {
				play: true,
				players: ['human'], // Reset players
				winner: '',
			}

			playerTurn = 1
		})
	}
}
