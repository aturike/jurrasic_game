import { jeepWidth, jeepHeigth, jeepX, jeepY, jeepSpeed } from "./jeep.js";
import { raptorHeigth, raptorWidth, raptorArr } from "./raptor.js";
import { canvasHeight, ctx } from "../canvas.js";
import { aimEnd, aimscope } from "./aim.js";

let bulletArr = [];
const bulletSpeed = 4;
const bulletsize = 3;

class Bullet {
  constructor() {
    this.bulletX = jeepX + jeepWidth / 2;
    this.bulletY = canvasHeight - jeepHeigth;
    this.bulletSpeed = bulletSpeed;
    this.bulletsize = bulletsize;
    this.bulletHide = false;
    this.bulletSpeedX = Math.cos(aimEnd + aimscope) * this.bulletSpeed;
    this.bulletSpeepY = Math.sin(aimEnd + aimscope) * this.bulletSpeed;
  }

  drawBullet() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(this.bulletX, this.bulletY, this.bulletsize, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  moveBullet() {
    this.bulletY += this.bulletSpeepY;
    this.bulletX += this.bulletSpeedX;
  }

  bulletRemove() {
    this.bulletHide = true;
  }
}

function newBullet() {
  bulletArr.push(new Bullet());
}

function bulletLogic(retry) {
  if (retry) {
    bulletArr = [];
  }

  bulletArr.forEach((bullet, index) => {
    bullet.drawBullet();
    bullet.moveBullet();

    if (bullet.bulletY < 0 || bullet.bulletHide) {
      bulletArr = bulletArr.filter(
        (bulletElement, bulletIndex) => bulletIndex !== index
      );
    }

    raptorArr.find((raptor) => {
      if (
        raptor.raptorY > bullet.bulletY - bullet.bulletsize &&
        raptor.raptorY - raptorHeigth < bullet.bulletY + bullet.bulletsize &&
        raptor.raptorX - bullet.bulletsize < bullet.bulletX &&
        raptor.raptorX + raptorWidth + bullet.bulletsize > bullet.bulletX &&
        !bullet.bulletHide
      ) {
        bullet.bulletRemove();
        raptor.raptordamage();
      } else return false;
    });
  });
}

export { bulletLogic, newBullet };