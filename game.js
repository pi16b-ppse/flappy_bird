/**
 * @description Получение элемента по его id
   @type {object}
*/
var cvs = document.getElementById("canvas");

/**
 * @description Установка в 2D
   @type {object}
*/
var ctx = cvs.getContext("2d");

/**
 * @description Инициализация изображения Птички
   @type {object}
*/
var bird = new Image();

/**
 * @description Инициализация изображения Заднего Фона
   @type {object}
*/
var bg = new Image();

/**
 * @description Инициализация изображения Переднего Ландшафта
   @type {object}
*/
var fg = new Image();

/**
 * @description Инициализация изображения Верхней Трубы
   @type {object}
*/
var pipeUp = new Image();

/**
 * @description Инициализация изображения Нижней трубы
   @type {object}
*/
var pipeBottom = new Image();

/**
 * @description Инициализация gap
   @type {integer}
*/
var gap = 90;

/**
 * @description Создание массива блоков
   @type {Array} 
*/
var pipe = [];

/**
 * @description Инициализация счёта в игре
   @type {integer}
*/
var score = 0;

/**
 * @description Х позиция птички
   @type {integer}
*/
var xPos = 10;

/**
 * @description Y позиция птички
   @type {integer}
*/
var yPos = 150;

/**
 * @description Значение с которым птичка будет падать
   @type {float}
*/
var grav = 1.5;

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

/**
 * @description При нажатии на какую-либо кнопку запуск функции moveUp
*/
document.addEventListener("keydown", moveUp);

/**
 * @description При нажатии на любую клавишу заставляет птичку "подпрыгнуть"
*/
function moveUp() {
    yPos -= 25;
}

/**
 * @description Создание массива блоков
*/
pipe[0] = {
    x : cvs.width,
    y : 0
}

/**
 * @description Отрисовка и главная логика игры, происходит создание блоков, отслеживание прикосновений, подсчет и вывод очков
*/
function draw() 
{
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) 
    {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
	ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

	pipe[i].x--;


	if(pipe[i].x == 125) 
	{
		pipe.push({
		x : cvs.width,
		y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
		});
	}

	// Отслеживание прикосновений
    if(xPos + bird.width >= pipe[i].x
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height
    || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) 
    {
	location.reload(); // Перезагрузка страницы
    }

    if(pipe[i].x == 5) 
    {
	score++;
    }
}

ctx.drawImage(fg, 0, cvs.height - fg.height);
ctx.drawImage(bird, xPos, yPos);

yPos += grav;

ctx.fillStyle = "#000";
ctx.font = "24px Verdana";
ctx.fillText("Счет: " + score, 10, cvs.height - 20);

requestAnimationFrame(draw);
}

/**
 * @description Обеспечивает запуск основной функции по загрузке страницы
*/
pipeBottom.onload = draw; 
