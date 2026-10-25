const canvas = document.getElementById("game");
const button = document.getElementById("game_starter");
const ctx = canvas.getContext("2d");
const keys = {};
const paddle_height = 80;
const paddle_speed = 4;
let ball_speed = 4;
const paddle_width = 10;
const ball_radius = 10;
const paddle_margin = 5;
const p1_score_el = document.getElementById("p1_score");
const p2_score_el = document.getElementById("p2_score");
// ┌──────────────────────┬─────────────────────────────────┬────────────────────┐
// │        Thing         │              Size               │ Example at 800×500 │
// ├──────────────────────┼─────────────────────────────────┼────────────────────┤
// │ Paddle height        │ ~1/6 of canvas height           │ ~80px              │
// ├──────────────────────┼─────────────────────────────────┼────────────────────┤
// │ Paddle width         │ ~1/80 of canvas width (thin)    │ ~10px              │
// ├──────────────────────┼─────────────────────────────────┼────────────────────┤
// │ Paddle gap from edge │ ~2–4% of width                  │ ~20px              │
// ├──────────────────────┼─────────────────────────────────┼────────────────────┤
// │ Ball                 │ square, about paddle width      │ ~10px              │
// ├──────────────────────┼─────────────────────────────────┼────────────────────┤
// │ Center net           │ dashed line, ~half paddle width │ ~4px wide dashes   │
// └──────────────────────┴─────────────────────────────────┴────────────────────┘

document.addEventListener("keyup",(e) => {
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    keys[e.key] = false;
  }});
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    keys[e.key] = true;
  }});
 
let state = {
y_p1 : 0,
y_p2 : 0,
x_ball : 390,
y_ball : 240,
x_ball_dir: -1,
y_ball_dir: -1,
p1_score : 0,
p2_score : 0,
};

function drawRightPaddle(y) {
  ctx.fillRect(790 - paddle_margin,y,paddle_width,paddle_height);
}

function drawLeftPaddle(y) {
  ctx.fillRect(paddle_margin,y,paddle_width,paddle_height);
}

function drawBall(x,y){

  //undefined if start of game, spawn position set
  ctx.fillRect(x,y,ball_radius,ball_radius);
}

function draw(){

  //background
  ctx.fillStyle = "tan";
  // ctx.fillStyle = "tan";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  //dark brown for paddle and ball
  // ctx.fillStyle = "black";
  ctx.fillStyle = "#5e2712";
  drawLeftPaddle(state.y_p1);
  drawRightPaddle(state.y_p2);
  drawBall(state.x_ball,state.y_ball);
}


function scorePoint(pointee){
  
  if(pointee == "p1") state.p1_score++;
  if(pointee == "p2") state.p2_score++;

  ball_speed = Math.floor(Math.random() * 3) + 2;
  state.x_ball = Math.floor(Math.random() * 15) + 400;
  state.y_ball = Math.floor(Math.random() * 15) + 250;


}

function collides(){
  //return bool tuple
  let collisions = {x:false,y:false};

  //left paddle check

  if(state.x_ball <= (paddle_margin+paddle_width) && state.y_ball >= state.y_p1 && state.y_ball <= (state.y_p1 + paddle_height)) collisions.x = true;

  if(state.x_ball <= 0) scorePoint("p2");

  //right paddle check
  
  if(state.x_ball >= (800 - paddle_margin - paddle_width - ball_radius) && state.y_ball >= state.y_p2 && state.y_ball <= (state.y_p2 + paddle_height)) collisions.x = true;

  if(state.x_ball >= 800) scorePoint("p1");


  //roof check
  if(state.y_ball <= 0) collisions.y = true;

  //floor check
  if((state.y_ball + ball_radius)>= 500) collisions.y = true;
  
  return collisions;
}

function bounceBall(collisions){
  if(collisions.x) state.x_ball_dir = state.x_ball_dir * -1;
  if(collisions.y) state.y_ball_dir = state.y_ball_dir * -1;
}

function paddleAI(){

  //ai only update
  
  if (state.y_ball < (state.y_p2)) state.y_p2 = state.y_p2 - paddle_speed;
  if (state.y_ball > (state.y_p2 + paddle_height)) state.y_p2 = state.y_p2 + paddle_speed;
}


function update(){

  //read from keys dict
  if (keys.ArrowUp) state.y_p1 = state.y_p1 - paddle_speed;
  if (keys.ArrowDown) state.y_p1 = state.y_p1 + paddle_speed;

  //make bot play
  paddleAI();

  //bounds clipping for paddle coords
  if (state.y_p1 < 0) state.y_p1 = 0;
  if (state.y_p1 > 420) state.y_p1 = 420;

  if (state.y_p2 < 0) state.y_p2 = 0;
  if (state.y_p2 > 420) state.y_p2 = 420;

  //ball movement
  state.x_ball = state.x_ball + (ball_speed * state.x_ball_dir);
  state.y_ball = state.y_ball + (ball_speed * state.y_ball_dir);

  let bounces = collides();
  bounceBall(bounces);

  p1_score_el.textContent = state.p1_score;
  p2_score_el.textContent = state.p2_score;
  
}

function gameloop(state){
  update(state);
  draw(state);
  requestAnimationFrame(gameloop);
}


let unique_instance_flag = false;
button.addEventListener("click",(e) => {
  if (unique_instance_flag){
    console.log("Cant start another game");
    return;
  }
  console.log("starting game");
  unique_instance_flag = true;
  gameloop(state);
});
