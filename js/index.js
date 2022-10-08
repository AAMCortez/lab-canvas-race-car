const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let interval;

const gameArea = {
   frames: 0,
   start: () => {
      interval = setInterval(updateCanvas, 10);
   },

   stop: () => {
      clearInterval(interval);
   },
   clear: () => {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
   },
    score: () => {
       const points = Math.floor(gameArea.frames / 5);
       context.font = "10px Arial";
       context.fillStyle = "black";
       context.fillText(`Score: ${points}`, 200, 50);
    },
};

function updateCanvas() {
   gameArea.clear();
   car1.draw();
   drawObstacles();
   checkGameOver();
   gameArea.score();
}

window.onload = () => {
   document.getElementById("start-button").onclick = () => {
      canvas.removeAttribute("hidden");
      gameArea.start();
   };
};
// CREATE THE CAR
class Car {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;

      const image = new Image();
      image.src = "./images/car.png";
      image.onload = () => {
         this.image = image;
         this.draw;
      };
   }
   draw() {
      context.drawImage(this.image, this.x, this.y, 50, 100);
   }
   moveUp() {
      this.y -= 25;
   }
   moveDown() {
      this.y += 25;
   }
   moveLeft() {
      this.x -= 25;
   }
   moveRight() {
      this.x += 25;
   }
}

const car1 = new Car(225, 600);
// MOVE THE CAR
document.addEventListener("keydown", (event) => {
   switch (event.key) {
      case "ArrowUp":
         car1.moveUp();
         break;
      case "ArrowDown":
         car1.moveDown();
         break;
      case "ArrowLeft":
         car1.moveLeft();
         break;
      case "ArrowRight":
         car1.moveRight();
         break;
   }

   context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
   car1.draw();
});
// CREATE OBSTACLE CLASS
class Obstacle {
   constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
   }

   draw() {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
   }
   collisionWith(component) {
    return !(
       this.bottom() < component.top() ||
       this.top() > component.bottom() ||
       this.right() < component.left() ||
       this.left() > component.right()
    );
 }
}

// OBSTACLES
const obstacles = [];
function drawObstacles() {
   obstacles.forEach((obstacle) => {
      obstacle.y += 1;
      obstacle.draw();
   });
   gameArea.frames += 1;
   if (gameArea.frames % 200 === 0) {
      //Creating Random Top obstacle
      const minNumber = 50;
      const maxNumber = 200;
      const randomHeight = Math.floor(
         Math.random() * (maxNumber - minNumber + 1) + minNumber
      );
      const randomWidth = Math.floor(
         Math.random() * (maxNumber - minNumber + 1) + minNumber
      );
      const randomPosition = Math.floor(Math.random() * 500);
      const minGap = 50;
      const maxGap = 100;
      const randomGap = Math.floor(
         Math.random() * (maxGap - minGap + 1) + minGap
      );
      const obstacleTop = new Obstacle(
         randomWidth,
         randomHeight,
         "pink",
         randomPosition + randomGap,
         0
      );
      
      obstacles.push(obstacleTop);
   }
}
// GAME OVER
function checkGameOver() {
  const crashed = obstacles.some((obstacle) => {
     if (player.collisionWith(obstacle)) {
        return true;
     } else {
        return false;
     }
  });
  if (crashed) {
     gameArea.stop();
  }
}