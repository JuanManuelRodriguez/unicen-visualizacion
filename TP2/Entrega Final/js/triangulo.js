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

//--------------figura de encaje --------------------


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