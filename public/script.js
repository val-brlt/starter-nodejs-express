
// Récupération de l'environnement actuel
fetch('/env')
  .then(response => response.text())
  .then(data => {
    document.getElementById('env-message').innerText = `Environnement : ${data}`;
});