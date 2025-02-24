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
