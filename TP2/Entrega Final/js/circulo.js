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

//--------------figura de encaje --------------------

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
