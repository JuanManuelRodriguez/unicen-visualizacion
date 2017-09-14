'use strict';
var inter,t;
function interval(){
    t=1;
    inter=setInterval(function(){
        document.getElementById("timerdiv").innerHTML="segundos transcurridos "+t++ +" segs";
    },1000,"JavaScript");
}

function clear(){
    clearInterval(inter);
}