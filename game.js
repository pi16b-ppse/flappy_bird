var cvs = document.getElementById("canvas"); /*подключение html-дока по id canvas*/
var ctx = cvs.getContext("2d"); /*вид игры*/

/*инициализация объектов изображений*/
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

/*загрузка изображений*/
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var gap = 90; /*отступ между блоками*/
var score = 0; /*счёт*/

/*При нажатии на какую-либо кнопку*/
document.addEventListener("keydown", moveUp);

function moveUp() /*подпрыгивание птички*/
{
    yPos -= 25;
}

/*создание блоков*/
var pipe = [];

pipe[0] = { /*позиция 1го блока*/
    x : cvs.width,
    y : 0
}

/*позиция птички*/
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw()
{
    ctx.drawImage(bg, 0, 0); /*отрисовка заднего фона*/
    for(var i = 0; i < pipe.length; i++) 
    {	    
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); /*отрисовка верхнего блока*/
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); /*отрисовка нижнего блока*/
        pipe[i].x--; /*блок отодвигается по х*/
        
	if(pipe[i].x == 125) /*создание нового блока если текущий находится в точке 125 по х*/
	{
	    /*добавление блоков в массив*/	
            pipe.push({
	        x : cvs.width,
	        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height });
        }
	    
	/*отслеживание прикосновений птички*/
	if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height
	|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) 
        {
	    location.reload(); /*перезагрузка страницы*/
	}
	
	if(pipe[i].x == 5) /*добавление очков*/
	{
	    score++;
	}
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height); /*отрисовка переднего фона*/
    ctx.drawImage(bird, xPos, yPos); /*отрисовка птички*/

    yPos += grav; /*птичка будет  "падать" на 1.5 пикселя вниз*/

    /*вывод счёта*/
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw); /*реализация анимации*/
}

pipeBottom.onload = draw; /*метод draw вызывается, если отрисована данная картинка*/
