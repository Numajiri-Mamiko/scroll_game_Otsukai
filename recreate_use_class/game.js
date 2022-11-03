'use strict'

/**
 *  main class
 */

class Game {
  /**
   *  width : canvas width
   *  height : canvas height
   */
  constructor() {
    //create canvas
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    
    this.canvas.width = 800
    this.canvas.height = 480
  }

  start(){
    this._mainloop();
  }

  _mainloop(){
    const ctx = this.canvas.getContext('2d');
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
  }
}