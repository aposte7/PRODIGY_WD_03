import Board from './game'

export default class Player {
	constructor(maxDepth = -1) {
		this.maxDepth = maxDepth // Maximum depth for the minimax algorithm
		this.nodesMap = new Map() // Stores heuristic values and their corresponding moves
	}

	/**
	 * Recursively calculates the best move using the minimax algorithm.
	 * @param {Board} board - The current game board.
	 * @param {boolean} maximizing - Whether the current player is maximizing.
	 * @param {Function} callback - Callback to execute with the best move.
	 * @param {number} depth - Current depth in the recursion.
	 * @returns {number} - The heuristic value or the best move index.
	 */
	getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
		// Clear nodesMap at the start of a new move calculation
		if (depth === 0) this.nodesMap.clear()

		// Check for terminal state or maximum depth
		const terminalState = board.isTerminal()
		if (terminalState || depth === this.maxDepth) {
			if (terminalState.winner === 'x') return 100 - depth // Favor quicker wins
			if (terminalState.winner === 'o') return -100 + depth // Favor quicker losses
			return 0 // Draw
		}

		// Initialize best value based on player type
		let best = maximizing ? -Infinity : Infinity

		// Evaluate all available moves
		board.getAvailableMoves().forEach((index) => {
			const child = new Board([...board.state]) // Create a copy of the board
			child.insert(maximizing ? 'x' : 'o', index) // Make a move

			// Recursively calculate the heuristic value for the child board
			const nodeValue = this.getBestMove(
				child,
				!maximizing,
				callback,
				depth + 1
			)

			// Update the best value
			best = maximizing
				? Math.max(best, nodeValue)
				: Math.min(best, nodeValue)

			// Store the move and its heuristic value at the root level
			if (depth === 0) {
				const moves = this.nodesMap.has(nodeValue)
					? `${this.nodesMap.get(nodeValue)},${index}`
					: `${index}`
				this.nodesMap.set(nodeValue, moves)
			}
		})

		// If at the root level, select and return the best move
		if (depth === 0) {
			const bestMove = this.selectBestMove(best)
			callback(bestMove) // Execute the callback with the best move
			return bestMove
		}

		// Return the heuristic value for recursive calls
		return best
	}

	/**
	 * Selects the best move from the nodesMap.
	 * @param {number} bestValue - The best heuristic value.
	 * @returns {number} - The selected move index.
	 */
	selectBestMove(bestValue) {
		const moves = this.nodesMap.get(bestValue).toString().split(',')
		const randomIndex = Math.floor(Math.random() * moves.length) // Randomize if multiple moves have the same value
		return parseInt(moves[randomIndex])
	}
}
