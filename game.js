var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp()
{
    yPos -= 25;
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;
