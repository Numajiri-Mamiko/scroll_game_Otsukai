'use strict'
import { frogHight } from "../script.js";
// const frogHight = import("script");

// const { draw } = import("script");
// const { frogHight } = require("../script.js");

const { expect } = require("chai");

describe("おつかいゲームのテスト", () => {
    it("開始時のかえる位置はOKか？", () => {

        // const frogHight= 30;
        // const frogWighth = 30;
        // const earthHight = 42;
        // const canvasHight = 480;
        // const firstHight = canvasHight - frogHight- earthHight;

        // expect(bX).to.equal(30);
        // expect(bY).to.equal(firstHight);
        // expect(true).to.equal(true);
        // console.log(typeof draw);
        // expect(draw).to.equal(undefined);
        expect(frogHight).to.equal(30);
    });
});
