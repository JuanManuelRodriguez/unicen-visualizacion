var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
	dragging = false,
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

function Circulo(x,y,radio,color){
	this.posx=x;
	this.posy=y;
	this.radio=radio;
	this.color=color;
}

Circulo.prototype.dibujar= function(){
	ctx.fillStyle=this.color;
	ctx.beginPath();
	ctx.arc(this.posx,this.posy,this.radio,0,(Math.PI/180)*360,true);
	ctx.fill();
	ctx.closePath();
}

Circulo.prototype.mousedown = function(clientx,clienty){
	var x = Math.pow((clientx-this.posx),2);
	var y = Math.pow((clienty-this.posy),2);
	var d1 = Math.sqrt(x + y);
	if(d1 <= this.radio){
		this.color=colourRandom();
		console.log("click dentro del circulo. El color del circulo cambiara");
		dragging = true;
	}
	else{
		console.log("click fuera del circulo");
	}

}
var color = colourRandom();
var x = positionRandom(canvas.width);
var y = positionRandom(canvas.height);
var cir = new Circulo(x,y,75,color);

ctx.onload = cir.dibujar();

canvas.onmousedown = function(event){
	cir.mousedown(event.layerX,event.layerY);
	if(dragging){
		canvas.onmousemove = function(e){
			cir.posx=e.layerX;
			cir.posy=e.layerY;
			borrar();
			cir.dibujar();
		}	
	}
}
canvas.onmouseup = function (){
	dragging=false;
	canvas.onmousemove=null;
}
