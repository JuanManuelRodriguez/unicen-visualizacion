let div = document.getElementById('wrapper');
let arr = ["rotate(45deg)","translate(200px,200px)","skew(20deg,25deg)","scale(2)"];

div.addEventListener('click', ()=>{
  let random = arr[Math.floor(Math.random()*arr.length)];
  div.style.transform = random;
});
