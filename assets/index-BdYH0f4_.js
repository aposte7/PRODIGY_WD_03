(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();class m{constructor(e=["","","","","","","","",""]){this.state=e}isEmpty(){return this.state.every(e=>!e)}isFull(){return this.state.every(e=>e)}insert(e,r){if(![0,1,2,3,4,5,6,7,8].includes(r))throw new Error(`Cell index ${r} does not exist!`);if(!["x","o"].includes(e))throw new Error("The symbol can only be x or o!");return this.state[r]?!1:(this.state[r]=e,!0)}getAvailableMoves(){const e=[];return this.state.forEach((r,a)=>{r||e.push(a)}),e}isTerminal(){return this.isEmpty()?!1:this.state[0]===this.state[1]&&this.state[0]===this.state[2]&&this.state[0]?{winner:this.state[0],direction:"H",row:1}:this.state[3]===this.state[4]&&this.state[3]===this.state[5]&&this.state[3]?{winner:this.state[3],direction:"H",row:2}:this.state[6]===this.state[7]&&this.state[6]===this.state[8]&&this.state[6]?{winner:this.state[6],direction:"H",row:3}:this.state[0]===this.state[3]&&this.state[0]===this.state[6]&&this.state[0]?{winner:this.state[0],direction:"V",column:1}:this.state[1]===this.state[4]&&this.state[1]===this.state[7]&&this.state[1]?{winner:this.state[1],direction:"V",column:2}:this.state[2]===this.state[5]&&this.state[2]===this.state[8]&&this.state[2]?{winner:this.state[2],direction:"V",column:3}:this.state[0]===this.state[4]&&this.state[0]===this.state[8]&&this.state[0]?{winner:this.state[0],direction:"D",diagonal:"main"}:this.state[2]===this.state[4]&&this.state[2]===this.state[6]&&this.state[2]?{winner:this.state[2],direction:"D",diagonal:"counter"}:this.isFull()?{winner:"draw"}:!1}}class g{constructor(e=-1){this.maxDepth=e,this.nodesMap=new Map}getBestMove(e,r=!0,a=()=>{},t=0){t===0&&this.nodesMap.clear();const s=e.isTerminal();if(s||t===this.maxDepth)return s.winner==="x"?100-t:s.winner==="o"?-100+t:0;let n=r?-1/0:1/0;if(e.getAvailableMoves().forEach(o=>{const h=new m([...e.state]);h.insert(r?"x":"o",o);const d=this.getBestMove(h,!r,a,t+1);if(n=r?Math.max(n,d):Math.min(n,d),t===0){const f=this.nodesMap.has(d)?`${this.nodesMap.get(d)},${o}`:`${o}`;this.nodesMap.set(d,f)}}),t===0){const o=this.selectBestMove(n);return a(o),o}return n}selectBestMove(e){const r=this.nodesMap.get(e).toString().split(","),a=Math.floor(Math.random()*r.length);return parseInt(r[a])}}function _(c=-1,e=1){const r=document.querySelector(".game_setting_opponents"),a=document.querySelector(".board_row"),t=["o","x"];let s=parseInt(e),n={play:!0,players:["human"],winner:""},o=new m,h=new g;d();function d(){r.addEventListener("click",f),a.addEventListener("click",w)}function f(u){const l=u.target.closest("button");if(!l)return;const p=l.dataset.player.toLowerCase();n.players=[...n.players,p],Array.from(r.children).forEach(i=>{i.classList.remove("active_opponent"),i.setAttribute("disabled","true")}),l.classList.add("active_opponent")}function w(u){const l=u.target,p=n.players.length===2;if(n.players[s-1]==="human"&&p){const i=parseInt(l.dataset.boardCell)-1;if(isNaN(i)||i<0||!n.play)return;y(i,"human",l)}else return;s=3-s,n.players[s-1]==="ai"&&p&&n.play&&(h.getBestMove(o,!0,y,0),s=3-s)}function y(u,l="",p){const i=parseInt(u),v=l.toLowerCase()==="human"?p:document.querySelector(`[data-board-cell="${i+1}"]`);o.insert(t[s-1],i)&&(v.textContent=t[s-1],v.setAttribute("disabled","true"),n.winner=o.isTerminal(),n.winner&&n.winner.winner&&(n.play=!1,b()))}function b(){Array.from(r.children).forEach(i=>{i.classList.remove("active_opponent"),i.removeAttribute("disabled")}),Array.from(a.children).forEach(i=>{i.textContent="",i.removeAttribute("disabled")});const u=document.querySelector(".popup");u.style.display="block";const l=document.querySelector(".popup_message");l.textContent=n.winner.winner==="draw"?"It's a draw!":`Player ${n.winner.winner.toUpperCase()} wins!`,document.querySelector(".popup_btn").addEventListener("click",()=>{o=new m,u.style.display="none",n={play:!0,players:["human"],winner:""},s=1})}}function M(c){c.innerHTML=`
  <div class="game_container">    
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
            <p>You <span>O</span></p>
            <p>Player-2 <span>X</span></p>
          </div>

          <div class="level"></div>
      </div>
  </div>
  
  `,E(),_()}function E(){const c=document.querySelector(".board");c.innerHTML="";let e=document.createElement("div");e.className="board_row",Array.from({length:9}).forEach((r,a)=>{let t=document.createElement("button");t.className="board_cell",t.setAttribute("data-board-cell",`${a+1}`),e.appendChild(t)}),c.appendChild(e)}document.querySelector("#app").innerHTML=`
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
`;M(document.querySelector("#game"));
