var playerWon;
var p1score = 0;
var p2score = 0;
var dir;

function paddle(x, player) {
  this.x = x;
  this.y = World.height / 2 - 20;
  this.w = 5;
  this.h = 40;
  
  this.show = function() {
    noStroke();
    fill("white");
    rect(this.x, this.y, this.w, this.h);
  };
  
  this.update = function() {
    if (player && keyDown("w")) {
      this.y -= 10;
    }
    else if (player && keyDown("s")) {
      this.y += 10;
    }
    else if (!player && keyDown("up")) {
      this.y -= 10;
    }
    else if (!player && keyDown("down")) {
      this.y += 10;
    }
  };
  
  this.check = function() {
    if (this.y + this.h <= 0) {
      this.y = World.height - 1;
    }
    else if (this.y >= World.height) {
      this.y = 0;
    }
  };
}

function power() {
  this.x = randomNumber(50, World.width - 50);
  this.y = randomNumber(10, World.height - 20);
  this.w = 20;
  
  this.show = function() {
    fill("green");
    rect(this.x, this.y, this.w, this.w);
  };
  
  this.got = function() {
    if (this.x >= this.x && this.x <= this.x + this.w &&
        this.y >= this.y && this.y <= this.y + this.w
        && dir) {
          player.h += 1;
    }
    else if (this.x >= this.x && this.x <= this.x + this.w &&
        this.y >= this.y && this.y <= this.y + this.w
        && !dir) {
          player2.h += 1;
        }
  };
}

function ball() {
  this.w = 8;
  this.x = World.width / 2;
  this.y = World.height / 2;
  this.xspeed = randomNumber(1, 4);
  this.yspeed = randomNumber(1, 4);
  
  this.show = function() {
    fill("white");
    ellipse(this.x, this.y, this.w, this.w);
  };
  
  this.update = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  };
  
  this.check = function() {
    if (this.x  - 4 <= player.x + player.w && this.x - 4 >= player.x &&
    this.y <= player.y + player.h &&
        this.y >= player.y) {
          this.xspeed = randomNumber(7, 10);
        }
    else if (this.x + 4 >= player2.x && this.x + 4 <= player2.x + player2.w &&
    this.y <= player2.y + player.h &&
             this.y >= player2.y) {
               this.xspeed = randomNumber(7, 10);
               this.xspeed *= -1;
             }
    
    if (this.y + 4 >= World.height || this.y - 4 <= 0) {
      this.yspeed *= -1;
    }
    if (this.x + 4 >= World.width) {
      this.xspeed *= -1;
      p1score++;
    }
    else if (this.x - 4 <= 0) {
      this.xspeed *= -1;
      p2score++;
    }
    //else if (this.x + 4 <= player.x) {
      //playerWon = false;
      //p2score++;
    //}
    //else if (this.x - 4 >= player2.x + 2.5) {
      //playerWon = true;
      //p1score++;
    //}
  };
}

//function checkWin() {
  //if (playerWon) {
    //text("Player 1 wins", World.width / 2 - 50, World.height / 2);
  //}
  //else if (playerWon == false) {
    //text("Player 2 Wins!", World.width / 2 - 50, World.height / 2);
  //}
//}

function displayScore() {
  text("P1: " + p1score, World.width / 2 - 50, 10);
  text("P2: " + p2score, World.width / 2, 10);
}

function checkDir() {
  if (this.xspeed / Math.abs(this.xspeed) == 1) {
    dir = true;
  }
  else if (this.xspeed / Math.abs(this.xspeed) == -1) {
    dir = false;
  }
}

var player = new paddle(20, true);
var player2 = new paddle(370, false);
//var b = new ball();
var balls = [];
for (var i = 0; i < 1; i++) {
  balls[i] = new ball();
}
var p = new power();

function draw() {
  background("black");  
  
  checkDir();
  player.show();
  player.update();
  player.check();
  player2.show();
  player2.update();
  player2.check();
  
  for (var i = 0; i < balls.length; i++) {
   balls[i].show();
   balls[i].update();
   balls[i].check();
  }
  
  //checkWin();
  displayScore();
  
  if (World.seconds >= 5 && World.seconds <= 15) {
    //p.show();
    //p.got();
  }
}
