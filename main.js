import './style.css'
import { GameUI } from './view.js'

document.querySelector('#app').innerHTML = `
  <div class="main_body">
    <div id="game"></div>
  </div>
`

GameUI(document.querySelector('#game'))
