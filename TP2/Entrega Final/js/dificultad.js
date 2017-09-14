var facil=document.getElementById("facil");
var dificil=document.getElementById("dificil");
var div = document.getElementById("dificultad");
var dificultad = 0;

facil.onclick = function(){
	dificultad = 4;
	div.style.visibility = 'hidden';
	
} 
dificil.onclick = function(){
	dificultad = 5;
	div.style.visibility = 'hidden';
	
} 
