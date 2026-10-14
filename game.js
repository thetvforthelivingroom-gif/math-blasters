const enemyInterval = 1500;
const answerBuffer = '';
let score = 0;
let hp = 3;
let high = localStorage.getItem('highscore')||0;
const status=document.getElementById('score'),hpElem=document.getElementById('hp'),highElem=document.getElementById('highScore'),question=document.getElementById('question');

function updateStatus(){
  status.textContent=`Score: ${score}`;
  hpElem.textContent=`HP: ${'♥'.repeat(hp)}`;
  highElem.textContent=`High Score: ${high}`;
}

let current;
function nextQuestion(){
  const a=Math.ceil(Math.random()*10);
  const b=Math.ceil(Math.random()*10);
  const op=Math.random()<0.5?'+':'-';
  current= op==='+'?a+b:a-b;
  question.textContent=`${a} ${op} ${b} = ?`;
}

function spawnEnemy(){
  const e=document.createElement('div');
  e.className='enemy';
  e.style.left=Math.random()*60+'%';
  document.getElementById('enemyContainer').appendChild(e);
  e.addEventListener('animationend',()=>{e.remove();});
}

let gameInterval=null;
function startGame(){
  score=0;hp=3;high=localStorage.getItem('highscore')||0;updateStatus();nextQuestion();
  clearInterval(gameInterval);gameInterval=setInterval(()=>{spawnEnemy();},enemyInterval);
  document.addEventListener('keydown',handleKey);
}

function handleKey(e){
  const val=parseInt(e.key,10);
  if(isNaN(val))return;
  if(val===current){
    score+=10;updateStatus();nextQuestion();
  }else{
    hp--;updateStatus();if(hp===0){endGame(false);}else{nextQuestion();}
  }
}

function endGame(win){
  clearInterval(gameInterval);
  document.removeEventListener('keydown',handleKey);
  if(win && score>high){localStorage.setItem('highscore',score);high=score;updateStatus();}
  alert(win?'You win!':'Game over');
}

document.getElementById('startBtn')?.addEventListener('click',()=>{console.log('start');});
startGame();