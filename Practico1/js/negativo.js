(function(root) {
   'use strict';
	function negativo(imageData){

	  for (var x=0;x<imageData.width;x++){ //convierte los colores de la imagen en negativo
		for (var y=0;y<imageData.height;y++){ 
			setPixel(imageData,x,y,255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y),255)
		}
	  }

	  if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = Sobel;
	    }
	    exports.Sobel = Sobel;
	  } else if (typeof define === 'function' && define.amd) {
	    define([], function() {
	      return Sobel;
	    });
	  }
	}
})(this);
