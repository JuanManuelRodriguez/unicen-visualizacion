document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if(keyName=="ArrowLeft" || keyName=="ArrowUp" || keyName=="ArrowRight" || keyName=="ArrowDown"){
    alert('keydown event\n\n' + 'key: ' + keyName);
  }
});
