var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
	draggingCir = false,
	draggingRec = false,
	draggingReCua = false,
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
		this.color=colourRandom();
		console.log("click dentro del rectangulo. El color del rectangulo cambiara");
		if(this.width === this.height){
			draggingCua = true;
		}else{
			draggingRec = true;
		}
	}
	else{
		console.log("click fuera del rectangulo");
	}
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

Circulo.prototype.mousedown = function(layerX,layerY){
	var x = Math.pow((layerX-this.posx),2);
	var y = Math.pow((layerY-this.posy),2);
	var d1 = Math.sqrt(x + y);
	if(d1 <= this.radio){
		this.color=colourRandom();
		console.log("click dentro del circulo. El color del circulo cambiara");
		draggingCir = true;
	}
	else{
		console.log("click fuera del circulo");
	}

}
var color = colourRandom();
var x = positionRandom(canvas.width);
var y = positionRandom(canvas.height);
var xr = positionRandom(canvas.width);
var yr = positionRandom(canvas.height);
var xcua = positionRandom(canvas.width);
var ycua = positionRandom(canvas.height);

var cir = new Circulo(x,y,75,color);
var rec = new Rectangulo(xr,yr,150,80);
var cua = new Rectangulo(xcua,ycua,100,100);

var figuras = [];
figuras.push(cir);
figuras.push(rec);
figuras.push(cua);


ctx.onload = cir.dibujar();
ctx.onload = rec.dibujar();
ctx.onload = rec.dibujar();

canvas.onmousedown = function(event){
	cir.mousedown(event.layerX,event.layerY);
	rec.mousedown(event.layerX,event.layerY);
	cua.mousedown(event.layerX,event.layerY);
	if(draggingCir){
		canvas.onmousemove = function(e){
			cir.posx=e.layerX;
			cir.posy=e.layerY;
			borrar();
			cir.dibujar();
			rec.dibujar();
			cua.dibujar();
		}	
	}
	if(draggingRec){
		canvas.onmousemove = function(e){
			rec.posx=e.layerX;
			rec.posy=e.layerY;
			borrar();
			rec.dibujar();
			cir.dibujar();
			cua.dibujar();
		}	
	}
	if(draggingCua){
		canvas.onmousemove = function(e){
			cua.posx=e.layerX;
			cua.posy=e.layerY;
			borrar();
			cua.dibujar();
			rec.dibujar();
			cir.dibujar();
		}	
	}
}
canvas.onmouseup = function (){
	draggingCir=false;
	draggingRec=false;
	draggingCua=false;
	canvas.onmousemove=null;
}
