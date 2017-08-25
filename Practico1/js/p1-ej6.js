var ctx = document.getElementById("canvas").getContext("2d");
var width = 900;
var height = 600;

function getRed(imageData,x,y){
	indice = (x + y * imageData.width) * 4;
	return imageData.data[indice];
}
function getGreen(imageData,x,y){
	indice = (x + y * imageData.width) * 4;
	return imageData.data[indice+1];
}
function getBlue(imageData,x,y){
	indice = (x + y * imageData.width) * 4;
	return imageData.data[indice+2];
}

function setPixel(imageData,x,y,r,g,b,a){
	index = (x + y * imageData.width) * 4;
	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;

} 
function colorSepia(){
	for (var x = 0; x < imageData.width; x++) {
		for (var y =0; y < imageData.height; y++) {
			var red = Math.floor(getRed(imageData,x,y)*.393+getGreen(imageData,x,y)*.769+getBlue(imageData,x,y)*.189);
			var green = Math.floor(getRed(imageData,x,y)*.349+getGreen(imageData,x,y)*.686+getBlue(imageData,x,y)*.168);
			var blue = Math.floor(getRed(imageData,x,y)*.272+getGreen(imageData,x,y)*.534+getBlue(imageData,x,y)*.131);

			setPixel(imageData,x,y,red,green,blue,255);
		}
	}
	ctx.putImageData(imageData,0,0);
}

function colorBlancoNegro(){
	for (var x = 0; x < imageData.width; x++) {
		for (var y =0; y < imageData.height; y++) {
			var colorBN = Math.floor((getRed(imageData,x,y)+getGreen(imageData,x,y)+getBlue(imageData,x,y))/3);
			setPixel(imageData,x,y,colorBN,colorBN,colorBN,255);
		}
	}
	ctx.putImageData(imageData,0,0);
}

function colorNegativo(){
	for (var x=0;x<imageData.width;x++){ //convierte los colores de la imagen en negativo
		for (var y=0;y<imageData.height;y++){ 
			setPixel(imageData,x,y,255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y),255)
		}
	}
	ctx.putImageData(imageData,0,0);
}

function contraste(val) { 
	//val esta fijado en p1-ej6.html con un valor igual a 50
	var contrast = Math.tan(val * Math.PI / 180.0);
	var factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );

	for (var x = 0; x < imageData.width; x++) {
		for (var y = 0; y < imageData.height; y++) {
			setPixel(imageData,x,y,rangeColor(128 + (getRed(imageData,x,y) - 128) * factor),rangeColor(128 + (getGreen(imageData,x,y) - 128) * factor),rangeColor(128 + (getBlue(imageData,x,y) - 128) * factor),255)
		}	
	}
	ctx.putImageData(imageData,0,0);
}

// permite mantener el color en el rango 0-255
function rangeColor(pix) {
	if (pix < 0)
		pix = 0;
	if (pix > 255)
		pix = 255;

	return pix;
}

function brillo(level) {
	for (var x = 0; x < imageData.width; x++) {
        for (var y = 0; y < imageData.height; y++) {
        	setPixel(imageData,x,y,rangeColor(getRed(imageData,x,y)+level),rangeColor(getGreen(imageData,x,y) +level),rangeColor(getBlue(imageData,x,y)+level),255);
        }
    }
    ctx.putImageData(imageData,0,0);
}	

function segmentacion(umbral){
	console.log("segmentacion");
	var red,green,blue;
	for (var x = 0; x < imageData.width; x++) {
        for (var y = 0; y < imageData.height; y++) {
        	//var v = (0.2126*r + 0.7152*g + 0.0722*b >= umbral) ? 255 : 0;
        	(getRed(imageData,x,y) >= umbral)? red=255 : red=0;
        	(getGreen(imageData,x,y) >= umbral)? green=255 : green=0;
        	(getBlue(imageData,x,y) >= umbral)? blue=255 : blue=0;
        	setPixel(imageData,x,y,red,green,blue,255);
        }
    }
    ctx.putImageData(imageData,0,0);
}

function difuminado(){
	console.log("blur");
	var red,green,blue;
	for (var x = 1; x < imageData.width-1; x++) {
        for (var y = 1; y < imageData.height-1; y++) {
        	red=0; green=0; blue=0;

        	for(var i=x-1; i <= x+1; i++){
        		for(var j=y-1; j <= y+1; j++){
    				red += getRed(imageData,i,j);
    				green += getGreen(imageData,i,j);
    				blue += getBlue(imageData,i,j);
        		}
        	}
        
        	setPixel(imageData,x,y,Math.floor(red/9),Math.floor(green/9),Math.floor(blue/9),255);
        }
    }
    ctx.putImageData(imageData,0,0);
}

function guardar() {
    var link = window.document.createElement( 'a' ),
        url = canvas.toDataURL(),
        filename = 'imgFiltered.png';

    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.setAttribute( 'text', 'Download' );
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
};

$(function() {
    $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;
        
        if (!file.type.match(imageType))
            return;
        
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
        
    });
    
    function fileOnload(e) {
        var $img = $('<img>', { src: e.target.result });
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d');

        $img.load(function() {
            context.drawImage(this, 0, 0);
            imageData = ctx.getImageData(0,0,this.width,this.height);//width y height son tomados de la imagen	
        });
    }
});