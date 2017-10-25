document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  let action = document.getElementById('hero');
  /*if(keyName=='ArrowLeft' || keyName=='ArrowUp' || keyName=='ArrowRight' || keyName=='ArrowDown'){
    action.classList.remove('run');
    action.classList.add('jump');
    setTimeout(function(){
      action.classList.remove('jump');
      action.classList.add('run');
    }, 1000);
  }*/

  switch(keyName){
    case 'ArrowUp':
      action.classList.remove('run');
      action.classList.add('jump');
      setTimeout(function(){
        action.classList.remove('jump');
        action.classList.add('run');
      }, 1000);
      break;
    case 'ArrowDown':
      action.classList.remove('run');
      action.classList.add('slide');
      setTimeout(function(){
        action.classList.remove('slide');
        action.classList.add('run');
      }, 1000);
      break;
  }
});
