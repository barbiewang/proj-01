// 这是我们的玩家要躲避的敌人 
"use strict";
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83; 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = 0;
    this.x = 0;
    this.y = 0;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    //console.log("update enemy " + dt);
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = (this.x + this.speed * dt) % (TILE_WIDTH * 5)//保证小虫子不会出现在画布外
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//判断是否系相交：判断敌人图像的四个顶点是否有一个以上在玩家图像的矩形中，返回布尔值。
Enemy.prototype.isInsideRect = function (rect) {
    return (this.isPointInsideRect(this.x,this.y,rect)
    || this.isPointInsideRect(this.x + TILE_WIDTH, this.y, rect)
    || this.isPointInsideRect(this.x, this.y + TILE_HEIGHT, rect)
    || this.isPointInsideRect(this.x + TILE_WIDTH, this.y + TILE_HEIGHT, rect));
};
//判断是否相交：通过判断敌人的图像是否与玩家图像有重叠之处，返回布尔值。
Enemy.prototype.isPointInsideRect = function(px,py,rect){
    return px > rect[0] && px< (rect[0] + rect[2]) && py > rect[1] && py < (rect[1] + rect[3]);
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
// 设置玩家的头像及可能行走的位置。默认位置重置。
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.ysteps = [-10, 70, 155,235, 320, 405 ];
    this.xsteps = [0, TILE_WIDTH, 202, 303, 404];
    this.sprites =['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
    this.reset();
};

//选择玩家头像
Player.prototype.changeStyle = function (idx) {
    this.sprite = this.sprites[idx % this.sprites.length];
};

//玩家位置重置函数
Player.prototype.reset = function() {
    this.xidx = parseInt(this.xsteps.length / 2);
    this.yidx = this.ysteps.length - 1;
};


Player.prototype.update = function(dt) {

};

//画出玩家
Player.prototype.render = function () {
    var x = Resources.get(this.sprite);
    ctx.drawImage(x, this.xsteps[this.xidx], this.ysteps[this.yidx]);
};

//用于检查是否碰撞的函数，该函数返回玩家所在的位置及所占的空间
Player.prototype.playerRect = function () {
    return [this.xsteps[this.xidx], this.ysteps[this.yidx], TILE_WIDTH, TILE_HEIGHT];
};

//游戏操作函数
Player.prototype.handleInput = function (key) {
    switch(key){
        case "left":
            this.xidx = (this.xidx - 1 + this.xsteps.length) % this.xsteps.length;
            break;
        case "right":
            this.xidx = (this.xidx + 1) % this.xsteps.length;
            break;
        case "up":
            this.yidx = (this.yidx - 1 + this.ysteps.length) % this.ysteps.length;
            break;
        case "down":
            this.yidx = (this.yidx + 1) % this.ysteps.length;
            break;
    }
};

//判断玩家是否赢了，返回布尔值
Player.prototype.isWin = function () {
    return this.yidx === 0;
};

//新增一个得分函数
var Score = function(){
    this.s = 0;
    this.f = 0;
};

Score.prototype.failure = function () {
    this.f = this.f + 1;
};

Score.prototype.success = function () {
    this.s = this.s + 1;
};

Score.prototype.reset = function () {
    this.s = 0;
    this.f = 0;
};

Score.prototype.render = function(){
    ctx.font = "bold 10px Arial";
	ctx.fillStyle = "blue";
    ctx.fillText("success:" + this.s, 10,550);
	ctx.fillStyle = "red";
    ctx.fillText("failure:"+this.f,10,570);
};



// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [];
var x = -10;
var y = [75,75,155,235];
var	speed = [100,150,80,120];
for(var i =0; i<y.length;i++){
	var enemy = new Enemy();
	enemy.x = x;
	enemy.y = y[i];
	enemy.speed = speed[i];
	allEnemies.push(enemy);
}

var player = new Player();
player.changeStyle(3);

var score = new Score();





// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* var playerImage = document.getElementsByTagName("img");
var context = document.getElementsByTagName("span");
function dip(){
    for(var i = 0; i< playerImage.length; i++){
        playerImage[i].onmouseover = function(){
            context[i].style.display = "block";
    }
}
}
dip();
 */
