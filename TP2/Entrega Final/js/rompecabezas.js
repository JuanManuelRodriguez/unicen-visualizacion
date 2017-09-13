var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function borrar(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function Rectangulo(x,y,width,height,color,name) {
	this.posx=x;
	this.posy=y;
	this.name=name;
	this.width=width;
	this.height=height;
	this.color=color;
	this.dragging=false;
	this.selected=0;
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
		this.selected=1;
	}
}

Rectangulo.prototype.unselected = function(){
	if(this.selected == 1){
		this.selected=0;
	}	
}

function Circulo(x,y,radio,color,name){
	this.posx=x;
	this.posy=y;
	this.name=name;
	this.radio=radio;
	this.color=color;
	this.dragging=false;
	this.selected=0;
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
		this.selected=1;
	}
}

Circulo.prototype.unselected = function(){
	if(this.selected == 1){
		this.selected=0;
	}	
}

function Triangulo(posx,posy,color,name) {
	this.posx=posx;
	this.posy=posy;
	this.name=name;
	this.color=color;
	this.dragging=false;
	this.selected=0;
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

Triangulo.prototype.mousedown = function(layerX, layerY){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+40)) && (x >= (this.posx-40)) && (y >= (this.posy)) && (y <= (this.posy+50))){
		this.dragging = true;
		this.selected = 1;
	}
}

Triangulo.prototype.unselected = function(){
	if(this.selected == 1){
		this.selected=0;
	}	
}

function BordeRectangulo(x,y,width,height,color,name) {
	this.posx=x;
	this.posy=y;
	this.name=name;
	this.width=width;
	this.height=height;
	this.color=color;
	this.figIn=false;
}

BordeRectangulo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.strokeRect(this.posx, this.posy, this.width, this.height);
	ctx.closePath();
}

BordeRectangulo.prototype.mouseup = function(layerX,layerY,figura){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+this.width) && x >= this.posx) && (y <= (this.posy+this.height) && y >= this.posy) && (this.name === figura.name) && (figura.selected == 1)){

		figura.posx = this.posx;
		figura.posy = this.posy;
		figura.selected=2;
		borrar();
		dibujarMundo();
		this.figIn=true;
		console.log("rectangulo",this.name,figura.name);
	}
}

function BordeCirculo(x,y,radio,color,name){
	this.posx=x;
	this.posy=y;
	this.name=name;
	this.radio=radio;
	this.color=color;
	this.figIn=false;
}

BordeCirculo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.arc(this.posx,this.posy,this.radio,0,(Math.PI/180)*360,true);
	ctx.stroke();
	ctx.closePath();
}

BordeCirculo.prototype.mouseup = function(layerX,layerY,figura){
	var x = Math.pow((layerX-this.posx),2);
	var y = Math.pow((layerY-this.posy),2);
	var d1 = Math.sqrt(x + y);
	if((d1 <= this.radio) && (this.name === figura.name) && (figura.selected == 1)){

		figura.posx = this.posx;
		figura.posy = this.posy;
		figura.selected=2;
		borrar();
		dibujarMundo();
		this.figIn=true;
	}
}

function BordeTriangulo(posx,posy,color,name) {
	this.posx=posx;
	this.posy=posy;
	this.name=name;
	this.color=color;
	this.height=80; //establecidos para poder arrastrar el triangulo desde el centro
	this.width=50;
	this.figIn=false;
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

BordeTriangulo.prototype.mouseup = function(layerX,layerY, figura){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+40)) && (x >= (this.posx-40)) && (y >= (this.posy)) && (y <= (this.posy+50)) && (this.name === figura.name) && (figura.selected == 1)){

		figura.posx = this.posx;
		figura.posy = this.posy;
		figura.selected=2;
		console.log("figura selected",figura.selected);
		borrar();
		dibujarMundo();
		this.figIn=true;
	}
}

var rojo = "#ff0000";
var verde = "#00ff00";
var azul = "#0000ff";
var gris = "#555555";
var amarillo = "#ffff00";
var negro = "#000000";
var blanco = "#ffffff";

var tablero = new Rectangulo(canvas.width/2,0,canvas.width/2,canvas.height,amarillo,"tablero");

var circulo = new Circulo(50,50,50,rojo,"circulo");//posicion de incio (50,50) r=50
var rectangulo = new Rectangulo(10,110,75,50,verde,"rectangulo");//posicion de incio (10,110) w=75,h=50
var cuadrado = new Rectangulo(10,170,50,50,azul,"cuadrado");//posicion de incio (10,170) w=50,h=50
var triangulo = new Triangulo(50,230,gris,"triangulo");//posicion de inicio (50,230) w=80,h=50

var bCirculo = new BordeCirculo(canvas.width*5/8,canvas.height/4,50,negro,"circulo");
var bRectangulo = new BordeRectangulo(canvas.width*5/8,canvas.height*3/4,75,50,negro,"rectangulo");
var bCuadrado = new BordeRectangulo(canvas.width*7/8,canvas.height/4,50,50,negro,"cuadrado");
var bTriangulo = new BordeTriangulo(canvas.width*7/8,canvas.height*3/4,negro,"triangulo");

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

//------------dibujado de tablero y figuras --------------
function dibujarMundo(){
	tablero.dibujar();
	for (var i = 0; i < figuras.length; i++) {
		ctx.onload = figuras[i].dibujar();
		ctx.onload = bordes[i].dibujar();
	}
}
dibujarMundo();
//--------------------------------------------------------

canvas.onmousedown = function(event){
	for (var i = 0; i < figuras.length; i++) {
		figuras[i].mousedown(event.layerX,event.layerY);
	}
	for (var i = 0; i < figuras.length; i++) {
		if(figuras[i].dragging == true && figuras[i].selected == 1){
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

canvas.onmouseup = function (e){
	for (var i = 0; i < figuras.length; i++) {
		figuras[i].dragging=false;
		for (var j = 0; j < bordes.length; j++) {
			bordes[j].mouseup(e.layerX,e.layerY,figuras[i]);
		}
		figuras[i].unselected();
	}
	canvas.onmousemove=null;
	var ganaste=0;
	for(var i=0; i < bordes.length; i++){
		if(bordes[i].figIn == true){
			ganaste++;
		}
	}
	if (ganaste === 4){//si "ganaste" es igual a la cantidad de figuras del tablero 
		console.log("GANASTE!");
		var message = document.getElementById("message");
		message.innerHTML = "GANASTE!!";
	}
}
