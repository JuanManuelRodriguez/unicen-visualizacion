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

//--------------figura de encaje --------------------

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