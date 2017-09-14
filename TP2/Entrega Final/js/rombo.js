function Rombo(posx,posy,color,name) {
	this.posx=posx;
	this.posy=posy;
	this.name=name;
	this.color=color;
	this.dragging=false;
	this.selected=0;
}

Rombo.prototype.dibujar= function(){
	ctx.beginPath();//rombo equilatero de 80px de base y 100px de altura
	ctx.fillStyle=this.color;
	ctx.moveTo(this.posx,this.posy);
    ctx.lineTo(this.posx+40,this.posy+50);
    ctx.lineTo(this.posx,this.posy+100);
    ctx.lineTo(this.posx-40,this.posy+50);
    ctx.lineTo(this.posx,this.posy);
    ctx.fill();
	ctx.closePath();
}

Rombo.prototype.mousedown = function(layerX, layerY){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+40)) && (x >= (this.posx-40)) && (y >= (this.posy)) && (y <= (this.posy+100))){
		this.dragging = true;
		this.selected = 1;
	}
}

Rombo.prototype.unselected = function(){
	if(this.selected == 1){
		this.selected=0;
	}	
}

//--------------figura de encaje --------------------


function BordeRombo(posx,posy,color,name) {
	this.posx=posx;
	this.posy=posy;
	this.name=name;
	this.color=color;
	this.height=100; //establecidos para poder arrastrar el triangulo desde el centro
	this.width=80;
	this.figIn=false;
}

BordeRombo.prototype.dibujar= function(){
	ctx.beginPath();//rombo equilatero de 80px de base y 100px de altura
	ctx.fillStyle=this.color;
	ctx.moveTo(this.posx,this.posy);
    ctx.lineTo(this.posx+40,this.posy+50);
    ctx.lineTo(this.posx,this.posy+100);
    ctx.lineTo(this.posx-40,this.posy+50);
    ctx.lineTo(this.posx,this.posy);
    ctx.stroke();
	ctx.closePath();
}

BordeRombo.prototype.mouseup = function(layerX,layerY, figura){
	var x = layerX;
	var y = layerY;
	if((x <= (this.posx+40)) && (x >= (this.posx-40)) && (y >= (this.posy)) && (y <= (this.posy+100)) && (this.name === figura.name) && (figura.selected == 1)){

		figura.posx = this.posx;
		figura.posy = this.posy;
		figura.selected=2;
		borrar();
		dibujarMundo();
		this.figIn=true;
	}
}