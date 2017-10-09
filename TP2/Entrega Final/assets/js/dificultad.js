var facil=document.getElementById("facil");
var dificil=document.getElementById("dificil");
var div = document.getElementById("dificultad");
var comenzar = document.getElementById('comenzar');

var dificultad = 0;

facil.onclick = function(){
	dificultad = 4;
	this.style.visibility = 'hidden';
	dificil.style.visibility = 'hidden';
	comenzar.style.visibility = 'visible';
} 
dificil.onclick = function(){
	dificultad = 5;
	this.style.visibility = 'hidden';
	facil.style.visibility = 'hidden';
	comenzar.style.visibility = 'visible';
} 
