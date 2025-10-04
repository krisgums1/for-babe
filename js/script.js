const envelope = document.getElementById('envelope');
const seal = document.getElementById('seal');
const redirectUrl = "message.html"; 
const flapOpenDuration = 1000;   

seal.addEventListener('click', () => {
  envelope.classList.add('open'); 
  seal.disabled = true;
   
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, flapOpenDuration);
});
