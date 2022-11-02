'use strict'

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d"); //グラフィックを描画するためのメソッドやプロパティをもつオブジェクトを返す

// canvasで画像を使うため？
const bg = new Image();
const bg2 = new Image();
const bgGoal = new Image();
const bird = new Image(); 
const pipeNorth = new Image(); 
const pipeSouth = new Image(); 

bg.src = "image/background.png";
bg2.src = "image/background2.png";
bgGoal.src = "image/bg_goal.png";
bird.src = "image/flogGirl.png";
pipeNorth.src = "image/pipeNorth.png";
pipeSouth.src = "image/pipeSouth.png";


// かえるサイズ
const flagHight = 20;
const flagWighth = 20;

// かえる初期位置
const earthHight = 42;
const firstHight = cvs.height - flagHight - earthHight;
let bX = 30;
let bY = firstHight;

// 通りぬけ
const gap = 100;  
let constant;

// その他
let score = 0;
let endFlag = false;
let clearFlag = false;

const pipe = [];
pipe[0] = {
    x : cvs.width, //canvas幅
    y : 0
};

// キーボード操作
document.addEventListener("keydown",move);

const leftSpeed = 25;
const upSpeed = 25;
const rightSpeed = 25;
const downSpeed = 25;
function move(e){
  switch(e.keyCode) {
    case 37 : //左
      bX -= leftSpeed;
      break ;
    case 38 : //上
      bY -= upSpeed;
      break ;
    case 39 : //右
      bX += rightSpeed;
      break ;
    case 40 : //下
      if (bY < firstHight) {
        if (bY + downSpeed < firstHight) {
          bY += downSpeed;
        } else {
          bY = firstHight;
        }
      }
      break ;
  }
}

const scrollSpeed = 2;

const returnBtn = document.getElementById("return-btn");
const nextBtn = document.getElementById("next-btn");

const returnBtn2 = document.getElementById("return2-btn");
const nextBtn2 = document.getElementById("next2-btn");

const firstImg = document.getElementById("first-img");
const after1Img = document.getElementById("after1-img");
const after2Img = document.getElementById("after2-img");

returnBtn.addEventListener("click", () => {
  firstImg.style.display = "inline";
  cvs.style.display = "none";
  nextBtn.style.display = "inline";
});

nextBtn.addEventListener("click", () => {
  firstImg.style.display = "none";
  cvs.style.display = "inline";
  nextBtn.style.display = "none";
});

nextBtn2.addEventListener("click", () => {
  after1Img.style.display = "none";
  after2Img.style.display = "inline";

  returnBtn2.style.display = "inline";
  nextBtn2.style.display = "none";
  clearFlag = true;
});

returnBtn2.addEventListener("click", () => {
  after1Img.style.display = "inline";
  after2Img.style.display = "none";

  returnBtn2.style.display = "none";
  nextBtn2.style.display = "inline";
});



const canvasWidth = 800;
let bg1X = 0;
let bg2X = canvasWidth;
let bgGoalX = 0;
let bgCount = 0;


function draw(){
  ctx.drawImage(bg, bg1X, 0);
  ctx.drawImage(bg2,bg2X, 0);

  if (score >= 1) {
    bgGoalX -= scrollSpeed;
    ctx.drawImage(bgGoal, bgGoalX, 0);
  }
  ctx.drawImage(bird, bX, bY, 20, 20);
  

  for(let i = 0 ; i < pipe.length; i++){
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x -= scrollSpeed;
    // pipe[i].y -= scrollSpeed;

    if( pipe[i].x == 300 ){  //ドカン左端位置が200進んだら（200 = canvas幅:500 - ドカン左端pipe[i].x 300）
      pipe.push({
          x : cvs.width,
          y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
      });
    }
    // if( pipe[i].x == 300 ){  //ドカン左端位置が200進んだら（200 = canvas幅:500 - ドカン左端pipe[i].x 300）
    //   pipe.push({
    //       x : cvs.width,
    //       y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
    //   });
    // }

    //ゲームオーバーのパターン
    // if( bX + bird.width >= pipe[i].x &&
    //   bX <= pipe[i].x + pipeNorth.width &&
    //   (bY <= pipe[i].y + pipeNorth.height ||
    //   bY+bird.height >= pipe[i].y+constant) ||
    //   bY + bird.height >=  cvs.height - fg.height){

        // alert("うわっ、当たっちゃった")
        // if (alert("うわっ、当たっちゃった") === undefined) {
        //   endFlag = true;
        //   break;
        // }
    // }

    if(pipe[i].x === bX){
      score++;
    }
  }

  // 重力
  if (bY < firstHight) {
    bY += 1;
  }

  bg1X -= scrollSpeed;
  bg2X -= scrollSpeed;

  if (bg1X === -canvasWidth) {
    if (score === 1) {
      bgGoalX = canvasWidth;
    } else {
      bg1X = canvasWidth;
    }
  }

  if (bg2X === -canvasWidth) {
    bg2X = canvasWidth;
  }
  
  if (bgGoalX + 750 < bX && !clearFlag) {
    firstImg.style.display = "none";
    firstImg.style.display = "none";
    after1Img.style.display = "inline";

    cvs.style.display = "none";
    nextBtn.style.display = "none";
    returnBtn.style.display = "none";

    nextBtn2.style.display = "inline";
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











