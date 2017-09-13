var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
	x=0,
	y=0;

function colourRandom(){
	var hexa='0123456789abcdef';
	var color='#';
	for(var i=0;i<6;i++){
		color+=hexa[Math.floor(Math.random()*16)];
	}
	return color; 
}

function positionRandom(max){
	return Math.floor(Math.random()*max);
}

function borrar(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function Rectangulo(x,y,width,height,color) {
	this.posx=x;
	this.posy=y;
	this.width=width;
	this.height=height;
	this.color=color;
	this.dragging=false;
}

Rectangulo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.fillRect(this.posx, this.posy, this.width, this.height);
	ctx.closePath();
}

Rectangulo.prototype.mousedown = function(layerX,layerY){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+this.width) && x >= this.posx) && (y <= (this.posy+this.height) && y >= this.posy)){
		this.dragging = true;
	}
}

function Circulo(x,y,radio,color){
	this.posx=x;
	this.posy=y;
	this.radio=radio;
	this.color=color;
	this.dragging=false;
}

Circulo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.arc(this.posx,this.posy,this.radio,0,(Math.PI/180)*360,true);
	ctx.fill();
	ctx.closePath();
}

Circulo.prototype.mousedown = function(layerX,layerY){
	var x = Math.pow((layerX-this.posx),2);
	var y = Math.pow((layerY-this.posy),2);
	var d1 = Math.sqrt(x + y);
	if(d1 <= this.radio){
		this.dragging = true;
	}
}

function Triangulo(posx,posy,color) {
	this.posx=posx;
	this.posy=posy;
	this.color=color;
	this.dragging=false;
}

Triangulo.prototype.dibujar= function(){
	ctx.beginPath();//triangulo equilatero de 80px de base y 50px de altura
	ctx.fillStyle=this.color;
	ctx.moveTo(this.posx,this.posy);
    ctx.lineTo(this.posx+40,this.posy+50);
    ctx.lineTo(this.posx-40,this.posy+50);
    ctx.fill();
	ctx.closePath();
}

Triangulo.prototype.mousedown = function(layerX,layerY){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+40)) && (x >= (this.posx-40)) && (y >= (this.posy)) && (y <= (this.posy+50))){
		this.dragging = true;
	}
}

function BordeRectangulo(x,y,width,height,color) {
	this.posx=x;
	this.posy=y;
	this.width=width;
	this.height=height;
	this.color=color;
}

BordeRectangulo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.strokeRect(this.posx, this.posy, this.width, this.height);
	ctx.closePath();
}

function BordeCirculo(x,y,radio,color){
	this.posx=x;
	this.posy=y;
	this.radio=radio;
	this.color=color;
}

BordeCirculo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.arc(this.posx,this.posy,this.radio,0,(Math.PI/180)*360,true);
	ctx.stroke();
	ctx.closePath();
}

function BordeTriangulo(posx,posy,color) {
	this.posx=posx;
	this.posy=posy;
	this.color=color;
	this.height=80; //establecidos para poder arrastrar el triangulo desde el centro
	this.width=50;
	this.dragging=false;
}

BordeTriangulo.prototype.dibujar= function(){
	ctx.beginPath();//triangulo equilatero de 80px de base y 50px de altura
	ctx.fillStyle=this.color;
	ctx.moveTo(this.posx,this.posy);
    ctx.lineTo(this.posx+40,this.posy+50);
    ctx.lineTo(this.posx-40,this.posy+50);
    ctx.lineTo(this.posx,this.posy);
    ctx.stroke();
	ctx.closePath();
}

var rojo = "#ff0000";
var verde = "#00ff00";
var azul = "#0000ff";
var gris = "#555555";
var amarillo = "#ffff00";
var negro = "#000000"

var tablero = new Rectangulo(canvas.width/2,0,canvas.width/2,canvas.height,amarillo);

var circulo = new Circulo(50,50,50,rojo);//posicion de incio (50,50) r=50
var rectangulo = new Rectangulo(10,110,75,50,verde);//posicion de incio (10,110) w=75,h=50
var cuadrado = new Rectangulo(10,170,50,50,azul);//posicion de incio (10,170) w=50,h=50
var triangulo = new Triangulo(50,230,gris);//posicion de inicio (50,230) w=80,h=50

var bCirculo = new BordeCirculo(canvas.width*5/8,canvas.height/4,50,negro);
var bRectangulo = new BordeRectangulo(canvas.width*5/8,canvas.height*3/4,75,50,negro);
var bCuadrado = new BordeRectangulo(canvas.width*7/8,canvas.height/4,50,50,negro);
var bTriangulo = new BordeTriangulo(canvas.width*7/8,canvas.height*3/4,negro);

var figuras = [];
var bordes = [];
//hacer funciones de dificultades aca

figuras.push(circulo);
figuras.push(rectangulo);
figuras.push(cuadrado);
figuras.push(triangulo);

bordes.push(bCirculo);
bordes.push(bRectangulo);
bordes.push(bCuadrado);
bordes.push(bTriangulo);

console.log(figuras);
tablero.dibujar();
for (var i = 0; i < figuras.length; i++) {
	ctx.onload = figuras[i].dibujar();
	ctx.onload = bordes[i].dibujar();
}
console.log("lalala",figuras[0].height);
console.log("lala",figuras[1].height);
canvas.onmousedown = function(event){
	for (var i = 0; i < figuras.length; i++) {
		figuras[i].mousedown(event.layerX,event.layerY);
	}
	for (var i = 0; i < figuras.length; i++) {
		if(figuras[i].dragging == true){
			var fig = i;
			canvas.onmousemove = function(e){

				if(figuras[fig].height != undefined){ //sirve para poder saber cuales figuras tienen atributo height y width para poder centrar el mouse al arrastrar
					figuras[fig].posx=e.layerX - figuras[fig].width/2 ;
					figuras[fig].posy=e.layerY - figuras[fig].height/2;
				}else{
					figuras[fig].posx=e.layerX;
					figuras[fig].posy=e.layerY;
				}
				borrar();
				tablero.dibujar();
				for (var j = 0; j < figuras.length; j++) {
					figuras[j].dibujar();
					bordes[j].dibujar();
				}
			}
		}		
	}
}
canvas.onmouseup = function (){
	for (var i = 0; i < figuras.length; i++) {
		figuras[i].dragging=false;
	}
	canvas.onmousemove=null;
}
