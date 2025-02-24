(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();class f{constructor(e=["","","","","","","","",""]){this.state=e}isEmpty(){return this.state.every(e=>!e)}isFull(){return this.state.every(e=>e)}insert(e,r){if(![0,1,2,3,4,5,6,7,8].includes(r))throw new Error(`Cell index ${r} does not exist!`);if(!["x","o"].includes(e))throw new Error("The symbol can only be x or o!");return this.state[r]?!1:(this.state[r]=e,!0)}getAvailableMoves(){const e=[];return this.state.forEach((r,i)=>{r||e.push(i)}),e}isTerminal(){return this.isEmpty()?!1:this.state[0]===this.state[1]&&this.state[0]===this.state[2]&&this.state[0]?{winner:this.state[0],direction:"H",row:1}:this.state[3]===this.state[4]&&this.state[3]===this.state[5]&&this.state[3]?{winner:this.state[3],direction:"H",row:2}:this.state[6]===this.state[7]&&this.state[6]===this.state[8]&&this.state[6]?{winner:this.state[6],direction:"H",row:3}:this.state[0]===this.state[3]&&this.state[0]===this.state[6]&&this.state[0]?{winner:this.state[0],direction:"V",column:1}:this.state[1]===this.state[4]&&this.state[1]===this.state[7]&&this.state[1]?{winner:this.state[1],direction:"V",column:2}:this.state[2]===this.state[5]&&this.state[2]===this.state[8]&&this.state[2]?{winner:this.state[2],direction:"V",column:3}:this.state[0]===this.state[4]&&this.state[0]===this.state[8]&&this.state[0]?{winner:this.state[0],direction:"D",diagonal:"main"}:this.state[2]===this.state[4]&&this.state[2]===this.state[6]&&this.state[2]?{winner:this.state[2],direction:"D",diagonal:"counter"}:this.isFull()?{winner:"draw"}:!1}}class w{constructor(e=-1){this.maxDepth=e,this.nodesMap=new Map}getBestMove(e,r=!0,i=()=>{},t=0){t===0&&this.nodesMap.clear();const s=e.isTerminal();if(s||t===this.maxDepth)return s.winner==="x"?100-t:s.winner==="o"?-100+t:0;let n=r?-1/0:1/0;if(e.getAvailableMoves().forEach(o=>{const h=new f([...e.state]);h.insert(r?"x":"o",o);const p=this.getBestMove(h,!r,i,t+1);if(n=r?Math.max(n,p):Math.min(n,p),t===0){const m=this.nodesMap.has(p)?`${this.nodesMap.get(p)},${o}`:`${o}`;this.nodesMap.set(p,m)}}),t===0){const o=this.selectBestMove(n);return i(o),o}return n}selectBestMove(e){const r=this.nodesMap.get(e).toString().split(","),i=Math.floor(Math.random()*r.length);return parseInt(r[i])}}function b(d=-1,e=1){const r=document.querySelector(".game_setting_opponents"),i=document.querySelector(".board_row"),t=["o","x"];let s=parseInt(e),n={play:!0,players:["human"],winner:""},o=new f,h=new w;r.addEventListener("click",c=>{const l=c.target.closest("button");if(!l)return;const u=l.dataset.player.toLowerCase();n.players=[...n.players,u],Array.from(r.children).forEach(a=>{a.classList.remove("active_opponent"),a.setAttribute("disabled","true")}),l.classList.add("active_opponent")}),i.addEventListener("click",c=>{const l=c.target;let u=-1;const a=n.players.length===2;if(n.players[s-1]==="human"&&a){if(u=parseInt(l.dataset.boardCell)-1,isNaN(u)||u<0||!n.play)return;p(u,"human",l)}else return;s=3-s,n.players[s-1]==="ai"&&a&&n.play&&(h.getBestMove(o,!0,p,0),s=3-s,console.log("after an AI",o.state))});function p(c,l="",u){const a=parseInt(c);console.log("selected",a,c);const y=l.toLowerCase()==="human"?u:document.querySelector(`[data-board-cell="${a+1}"]`);o.insert(t[s-1],a)&&(y.textContent=t[s-1],y.setAttribute("disabled","true"),n.winner=o.isTerminal(),n.winner&&n.winner.winner&&(n.play=!1,m()))}const m=()=>{Array.from(r.children).forEach(a=>{a.classList.remove("active_opponent"),a.removeAttribute("disabled")});const c=document.querySelector(".popup");c.style.display="block";const l=document.querySelector(".popup_message");l.textContent=n.winner.winner==="draw"?"It's a draw!":`Player  ${n.winner.winner.toUpperCase()}  wins!`,document.querySelector(".popup_btn").addEventListener("click",a=>{o=new f,c.style.display="none",v(),n={play:!0,players:["human"],winner:""}})}}function g(d){d.innerHTML=`
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
  
  `,v(),b()}function v(){const d=document.querySelector(".board");d.innerHTML="";let e=document.createElement("div");e.className="board_row",Array.from({length:9}).forEach((r,i)=>{let t=document.createElement("button");t.className="board_cell",t.setAttribute("data-board-cell",`${i+1}`),e.appendChild(t)}),d.appendChild(e)}document.querySelector("#app").innerHTML=`
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
`;g(document.querySelector("#game"));
