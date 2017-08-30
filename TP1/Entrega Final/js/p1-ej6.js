var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
var width = 900;
var height = 600;
var originalImage = new Image();

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

  function Sobel() {
    var width = imageData.width;
    var height = imageData.height;

    var kernelX = [
      [-1,0,1],
      [-2,0,2],
      [-1,0,1]
    ];

    var kernelY = [
      [-1,-2,-1],
      [0,0,0],
      [1,2,1]
    ];

    var sobelData = [];
    var grayscaleData = [];

    function bindPixelAt(data) {
      return function(x, y, i) {
        i = i || 0;
        return data[((width * y) + x) * 4 + i];
      };
    }

    var data = imageData.data;
    var pixelAt = bindPixelAt(data);
    var x, y;

    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        var r = pixelAt(x, y, 0);
        var g = pixelAt(x, y, 1);
        var b = pixelAt(x, y, 2);

        var avg = (r + g + b) / 3;
        grayscaleData.push(avg, avg, avg, 255);
      }
    }

    pixelAt = bindPixelAt(grayscaleData);
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        var pixelX = (
            (kernelX[0][0] * pixelAt(x - 1, y - 1)) +
            (kernelX[0][1] * pixelAt(x, y - 1)) +
            (kernelX[0][2] * pixelAt(x + 1, y - 1)) +
            (kernelX[1][0] * pixelAt(x - 1, y)) +
            (kernelX[1][1] * pixelAt(x, y)) +
            (kernelX[1][2] * pixelAt(x + 1, y)) +
            (kernelX[2][0] * pixelAt(x - 1, y + 1)) +
            (kernelX[2][1] * pixelAt(x, y + 1)) +
            (kernelX[2][2] * pixelAt(x + 1, y + 1))
        );

        var pixelY = (
          (kernelY[0][0] * pixelAt(x - 1, y - 1)) +
          (kernelY[0][1] * pixelAt(x, y - 1)) +
          (kernelY[0][2] * pixelAt(x + 1, y - 1)) +
          (kernelY[1][0] * pixelAt(x - 1, y)) +
          (kernelY[1][1] * pixelAt(x, y)) +
          (kernelY[1][2] * pixelAt(x + 1, y)) +
          (kernelY[2][0] * pixelAt(x - 1, y + 1)) +
          (kernelY[2][1] * pixelAt(x, y + 1)) +
          (kernelY[2][2] * pixelAt(x + 1, y + 1))
        );

        var magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;

        sobelData.push(magnitude, magnitude, magnitude, 255);
      }
    }

    var clampedArray = sobelData;
    if (typeof Uint8ClampedArray === 'function') {
      clampedArray = new Uint8ClampedArray(sobelData);
    }
    clampedArray.toImageData = function() {
      return Sobel.toImageData(clampedArray, width, height);
    };

    return clampedArray;
  }

  Sobel.toImageData = function toImageData(data, width, height) {
    if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Uint16Array]') {
      return new ImageData(data, width, height);
    } else {
      if (typeof window === 'object' && typeof window.document === 'object') {
        var canvas = document.createElement('canvas');

        if (typeof canvas.getContext === 'function') {
          var context = canvas.getContext('2d');
          var imageData = context.createImageData(width, height);
          imageData.data.set(data);
          return imageData;
        } else {
          return new FakeImageData(data, width, height);
        }
      } else {
        return new FakeImageData(data, width, height);
      }
    }
  };

  function FakeImageData(data, width, height) {
    return {
      width: width,
      height: height,
      data: data
    };
  }

function deteccionDeBordes(){
  var sobelData = Sobel();
  var sobelImageData = sobelData.toImageData();
  ctx.putImageData(sobelImageData, 0, 0);
}

function recuperarImagen(){
    ctx.drawImage(originalImage, 0, 0);
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


var fileInput = document.getElementById('file-input');

fileInput.onchange = function(event) {
  var url = window.URL.createObjectURL(event.target.files[0]);
  loadImage(url);
};

function loadImage(src) {
  var image = new Image();
  image.src = src;
  originalImage.src = src;
console.log(image);
  image.onload = drawImage;
}
function drawImage(event) {
  var image = event.target;
  console.log("imagen",image);
  var width = image.width;
  var height = image.height;

  canvas.width  = width;
  canvas.height =  height;

  ctx.drawImage(image, 0, 0);
  imageData = ctx.getImageData(0, 0, width, height);

}
