'use strict';
var inter,t;
function interval(){
    t=1;
    document.getElementsByClassName('timerOn')[0].style.visibility = 'hidden';
    dibujarMundo();
    inter=setInterval(function(){
        document.getElementById("timerdiv").innerHTML="segundos transcurridos "+t++ +" segs";
    },1000,"JavaScript");
}

function clear(){
    clearInterval(inter);
}