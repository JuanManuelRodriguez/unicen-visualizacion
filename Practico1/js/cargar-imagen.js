function archivo(evt) {
  var files = evt.target.files; // FileList object
   
  //Obtenemos la imagen del campo "file". 
  if (!f.type.match('image.*')) {
      continue;
  }

  var reader = new FileReader();
   
  reader.onload = (function(theFile) {
    return function(e) {
      // Creamos la imagen.
      //document.getElementById("list").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
      image1.onload();
    };
  })(f);

  reader.readAsDataURL(f);
}
             
document.getElementById('files').addEventListener('change', archivo, false);