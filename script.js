'use strict'

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d"); //グラフィックを描画するためのメソッドやプロパティをもつオブジェクトを返す

// canvasで画像を使うため？
const bg = new Image();
const bird = new Image(); 
const fg = new Image(); 
const pipeNorth = new Image(); 
const pipeSouth = new Image(); 
bg.src = "bg.png";
bird.src = "bird.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";

// 鳥の座標
let bX = 30;
let bY = 20;

const gap = 100;  
let constant;
let score = 0;

let endFlag = false;

const pipe = [];
pipe[0] = {
    x : cvs.width, //canvas幅
    y : 0
};

// キーボード操作
document.addEventListener("keydown",move);

function move(e){
  switch(e.keyCode) {
    case 37 : //左
      bX -= 25;
      break ;
    case 38 : //上
      bY -= 25;
      break ;
    case 39 : //右
      bX += 25;
      break ;
    case 40 : //下
      bY += 25;
      break ;
  }
    
}

function draw(){
  ctx.drawImage(bg,0,0);
  ctx.drawImage(bird, bX, bY);

  ctx.drawImage(fg,0,cvs.height - fg.height);
  
  // ctx.drawImage(pipeNorth,300,0);
  // ctx.drawImage(pipeSouth,300,200);

  for(let i = 0 ; i < pipe.length; i++){
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x -= 2;
    // pipe[i].y++;

    if( pipe[i].x == 300 ){  //ドカン左端位置が200進んだら（200 = canvas幅:500 - ドカン左端pipe[i].x 300）
      pipe.push({
          x : cvs.width,
          y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
      });
    }

    //ゲームオーバーのパターン
    if( bX + bird.width >= pipe[i].x &&
      bX <= pipe[i].x + pipeNorth.width &&
      (bY <= pipe[i].y + pipeNorth.height ||
      bY+bird.height >= pipe[i].y+constant) ||
      bY + bird.height >=  cvs.height - fg.height){

        // alert("うわっ、当たっちゃった")
        if (alert("うわっ、当たっちゃった") === undefined) {
          endFlag = true;
          break;
        }
    }

    if(pipe[i].x === bX){
      score++;
    }
  }
  bY += 1;

  if (pipe.length === 5) {
    alert("５個クリア") 
  }


  ctx.fillStyle = "#000"; //カラー
  ctx.font = "16px"; //大きさ
  ctx.fillText("点数 : " + score + ' point', 10, cvs.height - 20); //表示内容、位置
        
  if(endFlag) {
    window.location.reload();
  } else {
    requestAnimationFrame(draw);
  }
}

draw();











