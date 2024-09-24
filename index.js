// Importer la dépendance express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Récupérer l'environnement courant (dev ou prod)
const env = process.env.NODE_ENV || 'development';
console.log("env:", env)

// Indiquer le dossier des fichiers statistque 
app.use(express.static('public'));

// API pour renvoyer l'environnement actuel
app.get('/env', (req, res) => {
  if (env === 'development') {
    res.send('Dévelop');
  } else if (env === 'production') {
    res.send('Production');
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});