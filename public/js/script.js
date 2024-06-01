const abc = document.getElementById('test')
document.addEventListener('DOMContentLoaded', (event) => {
  let ended = false;
  const ListBut = document.getElementById('ListBut');
  const listArea = document.getElementById('listArea');

  ListBut.onclick = function() {
      if (ended) {
          listArea.classList.remove('growing');
      } else {
          listArea.classList.add('growing');
      }
      ended = !ended; // ich weiß nicht, wie chatgpt das gemacht hat, aber es funktioniert hervorragend, also bleibt nun dieser code cF
  } //vorallem funktioniert es aber jetzt sogar im richtigen dokument :D
});