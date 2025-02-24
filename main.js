import './style.css'
import { GameUI } from './view.js'

document.querySelector('#app').innerHTML = `
  <div class="main_body">
  
    <div class="popup">
      <div class="popup_bg"></div>
      <div class="popup_text">
        <span class="popup_message">You won the game</span>
        <button class="popup_btn">Continue</button>
      </div>
    </div>

    <div id="game"></div>
  </div>
`

GameUI(document.querySelector('#game'))

const popup = document.querySelector('.popup')
const game = document.querySelector('#game')
const popupBtn = document.querySelector('.popup_btn')
const popupMessage = document.querySelector('.popup_message')

popupBtn.addEventListener('click', () => {
	popup.style.display = 'none'
	game.classList.remove('blur')
	restartGame()
})

function showPopup(message) {
	popupMessage.textContent = message
	popup.style.display = 'flex'
	game.classList.add('blur')
}

function restartGame() {
	// Logic to restart the game
	game.innerHTML = ''
	GameUI(game)
}

// Example usage: showPopup('Player X won the game')
// Call showPopup with the appropriate message when the game ends
