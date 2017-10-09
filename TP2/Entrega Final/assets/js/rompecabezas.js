var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//------------colores------------
var rojo = "#ff0000";
var verde = "#00ff00";
var azul = "#0000ff";
var gris = "#555555";
var amarillo = "#ffff00";
var negro = "#000000";
var blanco = "#ffffff";

document.getElementById('comenzar').style.visibility= 'hidden';
document.getElementById('volverAJugar').style.visibility= 'hidden';

function borrar(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}
var tablero = new Rectangulo(canvas.width/2,0,canvas.width/2,canvas.height,amarillo,"tablero");

var circulo = new Circulo(50,50,50,rojo,"circulo");//posicion de incio (50,50) r=50
var rectangulo = new Rectangulo(10,110,75,50,verde,"rectangulo");//posicion de incio (10,110) w=75,h=50
var cuadrado = new Rectangulo(10,170,50,50,azul,"cuadrado");//posicion de incio (10,170) w=50,h=50
var triangulo = new Triangulo(50,255,gris,"triangulo");//posicion de inicio (50,230) w=80,h=50
var rombo = new Rombo(50,340,negro,"rombo");

var width=canvas.width;
var height=canvas.height;

var bCirculo = new BordeCirculo(canvas.width*5/8,canvas.height/6,50,negro,"circulo");
var bRectangulo = new BordeRectangulo(canvas.width*5/8,canvas.height*3/6,75,50,negro,"rectangulo");
var bCuadrado = new BordeRectangulo(canvas.width*7/8,canvas.height/6,50,50,negro,"cuadrado");
var bTriangulo = new BordeTriangulo(canvas.width*7/8,canvas.height*3/6,negro,"triangulo");
var bRombo = new BordeRombo(canvas.width*7/8,canvas.height*5/6,negro,"rombo");

console.log("dificultad",dificultad);
//dificultad facil = 4 espacios, dificil = 5 espacios
function divisionTablero(dificultad){
	if(dificultad === 4 ){
		bCirculo.posx = canvas.width*5/8;
		bCirculo.posy = canvas.height/4;
		bRectangulo.posx = (canvas.width*5/8)-36;
		bRectangulo.posy = (canvas.height*3/4)-25;
		bCuadrado.posx = (canvas.width*7/8)-25;
		bCuadrado.posy = (canvas.height/4)-25;
		bTriangulo.posx = canvas.width*7/8;
		bTriangulo.posy = (canvas.height*3/4)-25;
	}else{
		bCirculo.posx = canvas.width*5/8;
		bCirculo.posy = canvas.height/6;
		bRectangulo.posx = (canvas.width*5/8)-36;
		bRectangulo.posy = (canvas.height*3/6)-25;
		bCuadrado.posx = (canvas.width*7/8)-25;
		bCuadrado.posy = (canvas.height/6)-25;
		bTriangulo.posx = canvas.width*7/8;
		bTriangulo.posy = (canvas.height*3/6)-25;
		bRombo.posx = canvas.width*7/8;
		bRombo.posy = (canvas.height*5/6)-50;
	}
}

var figuras = [];
var bordes = [];
//hacer funciones de dificultades aca

figuras.push(circulo);
figuras.push(rectangulo);
figuras.push(cuadrado);
figuras.push(triangulo);
figuras.push(rombo);

bordes.push(bCirculo);
bordes.push(bRectangulo);
bordes.push(bCuadrado);
bordes.push(bTriangulo);
bordes.push(bRombo);

//------------dibujado de tablero y figuras --------------
function dibujarMundo(){
	tablero.dibujar();
	divisionTablero();
	console.log("dificultad",dificultad);
	for (var i = 0; i < dificultad; i++) { //dificultad facil = 4 piezas - dificil = 5 piezas 
		ctx.onload = figuras[i].dibujar();
		ctx.onload = bordes[i].dibujar();
	}
}
//dibujarMundo();
//--------------------------------------------------------

canvas.onmousedown = function(event){
	for (var i = 0; i < dificultad; i++) {
		figuras[i].mousedown(event.layerX,event.layerY);
	}
	for (var i = 0; i < dificultad; i++) {
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
				for (var j = 0; j < dificultad; j++) {
					figuras[j].dibujar();
					bordes[j].dibujar();
				}
			}
		}		
	}
}

canvas.onmouseup = function (e){
	for (var i = 0; i < dificultad; i++) {
		figuras[i].dragging=false;
		for (var j = 0; j < dificultad; j++) {
			bordes[j].mouseup(e.layerX,e.layerY,figuras[i]);
		}
		figuras[i].unselected();
	}
	canvas.onmousemove=null;
	var ganaste=0;
	for(var i=0; i < dificultad; i++){
		if(bordes[i].figIn == true){
			ganaste++;
		}
	}
	if (ganaste === dificultad){//si "ganaste" es igual a la cantidad de figuras del tablero 
		console.log("GANASTE!");
		var message = document.getElementById("message");
		message.innerHTML = "GANASTE!!";
		borrar();
		clear();
		document.getElementById('volverAJugar').style.visibility = 'visible';
	}
}

var volverAJugar = document.getElementById('volverAJugar');
volverAJugar.onclick= function(){
	document.getElementById("facil").style.visibility = 'visible';
	document.getElementById("dificil").style.visibility = 'visible';
	this.style.visibility = 'hidden';
};
