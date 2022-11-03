'use strict'

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d"); //グラフィックを描画するためのメソッドやプロパティをもつオブジェクトを返す

// canvasで画像を使うため？
const bg = new Image();
const bg2 = new Image();
const bgGoal = new Image();
const bird = new Image();  
const doutor = new Image();
const flappecino = new Image();

bg.src = "image/background.png";
bg2.src = "image/background2.png";
bgGoal.src = "image/bg_goal.png";
bird.src = "image/flogGirl.png";
doutor.src = "image/doutor.png";
flappecino.src = "image/flappecino.png";

// かえるサイズ
const frogHight= 30;
const frogWighth = 30;

// かえる初期位置
const earthHight = 42;
const firstHight = cvs.height - frogHight- earthHight;
let bX = 30;
let bY = firstHight;

// その他
let score = 0;
let endFlag = false;
let clearFlag = false;

const pipe = [];
pipe[0] = {
    x : cvs.width, //canvas幅
    y : 0
};

const staba = [];
staba[0] = {
    x : cvs.width, //canvas幅
    y : firstHight
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

const scrollSpeed = 1;

const returnBtn = document.getElementById("return-btn");
const nextBtn = document.getElementById("next-btn");

const returnBtn2 = document.getElementById("return2-btn");
const nextBtn2 = document.getElementById("next2-btn");
const nextBtn3 = document.getElementById("next3-btn");

const firstImg = document.getElementById("first-img");
const after1Img = document.getElementById("after1-img");
const after2Img = document.getElementById("after2-img");
const overImg = document.getElementById("over-img");
const crearImg = document.getElementById("crear-img");

// returnBtn.addEventListener("click", () => {
//   firstImg.style.display = "inline";
//   cvs.style.display = "none";
//   nextBtn.style.display = "inline";
// });

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
  nextBtn3.style.display = "inline";
  clearFlag = true;
});

returnBtn2.addEventListener("click", () => {
  after1Img.style.display = "inline";
  after2Img.style.display = "none";

  returnBtn2.style.display = "none";
  nextBtn2.style.display = "inline";
});

nextBtn3.addEventListener("click", () => {
  crearImg.style.display = "inline";
});

const canvasWidth = 800;
const canvasHight = 480;
let bg1X = 0;
let bg2X = canvasWidth;
let bgGoalX;
let bgCount = 0;

const sideLength = 50;
const crearPoint = 3;
let cX;
let cY;

let goalShowFlag = false;
const stabaFirstArr = [];
let doutorInterval = 150;

function draw(){
  //カエル中座標の更新
  cX = bX + frogHight/2;
  cY = bY + frogWighth/2;

  // 描画
  ctx.drawImage(bg, bg1X, 0);
  ctx.drawImage(bg2,bg2X, 0);
  if (bgGoalX !== undefined) {
    ctx.drawImage(bgGoal, bgGoalX, 0);
    bgGoalX -= scrollSpeed;
  }
  ctx.drawImage(bird, bX, bY, frogWighth, frogHight);

  // フラペチーノ
  for(let i = 0 ; i < staba.length; i++){
    if (!stabaFirstArr[i]){
      ctx.drawImage(flappecino, staba[i].x, staba[i].y);
    }
    staba[i].x -= scrollSpeed;

    if(staba[i].x === canvasWidth - 200){ 
      staba.push({
          x : cvs.width,
          y : Math.floor(Math.random()*canvasHight)
      });
    }

    // スタバあたり判定
    if (staba[i].x <= cX && cX <= staba[i].x + sideLength && staba[i].y <= cY && cY <= staba[i].y + sideLength) {
      stabaFirstArr[i] = true;
    } 
  }

  // スコア計算
  score = 0;
  for (const flag of stabaFirstArr) {
    if (flag) {
      score++;
    }
  }

  // ドトール
  for(let i = 0 ; i < pipe.length; i++){
    ctx.drawImage(doutor, pipe[i].x, pipe[i].y);
    pipe[i].x -= scrollSpeed;

    if (i % 5 === 0) {
      pipe[i].y -= scrollSpeed / 10;
    } else if (i % 5 === 1) {
      pipe[i].y += scrollSpeed / 10;
    } else if (i % 5 === 2) {
      pipe[i].y -= scrollSpeed / 5;
    } else if (i % 5 === 3) {
      pipe[i].y -= scrollSpeed / 5;
    }
    
    if(pipe[i].x === canvasWidth - doutorInterval){ 
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random()*canvasHight)
      });
    }


    // ドトールあたり判定
    if (pipe[i].x <= cX && cX <= pipe[i].x + sideLength && pipe[i].y <= cY && cY <= pipe[i].y + sideLength) {
      overImg.style.display = "inline";
      cvs.style.display = "none";
      endFlag = true;
      break;
      // if (alert("うわっ、当たっちゃった") === undefined) {
      //   endFlag = true;
      //   break;
      // }
    }
  }

  // 重力
  if (bY < firstHight) {
    bY += 1;
  }

  // 背景移動
  bg1X -= scrollSpeed;
  bg2X -= scrollSpeed;

  // 背景繰り返し
  if (bg1X === -canvasWidth) {
    if (goalShowFlag) {
      bgGoalX = canvasWidth;
    } else {
      bg1X = canvasWidth;
    }
  }
  if (bg2X === -canvasWidth) {
    bg2X = canvasWidth;
  }

  // if (score > 0) {
  //     doutorInterval = 50;
  // }

  // if (score >= 9) {
  //   doutorInterval = 30;
  // } else if (score >= 6) {
  //   doutorInterval = 50;
  // } else if (score >= 3) {
  //   doutorInterval = 100;
  // }

  // ゴール
  if (bgGoalX + 750 < bX && !clearFlag) {
    after1Img.style.display = "inline";
    cvs.style.display = "none";
    nextBtn2.style.display = "inline";
  }

  // ポイント見せる
  if(score >= crearPoint) {
    goalShowFlag = true;
    ctx.fillStyle = "red"; //カラー
    ctx.font = "32px"; //大きさ
    ctx.fillText("点数 : " + score + ' point あと少しでスタバが見えてくるよ', 10, cvs.height - 20);
  } else {
    ctx.fillStyle = "#000"; //カラー
    ctx.font = "16px"; //大きさ
    ctx.fillText("点数 : " + score + ' point', 10, cvs.height - 20);
  }

        
  if(endFlag) {
    // window.location.reload();
  } else {
    requestAnimationFrame(draw);
  }
}

draw();











