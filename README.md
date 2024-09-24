# Mise en place d'un environnement de développement Node.js et Express.js

Node.js est un environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome.

Ce projet montre comment mettre en place un environnement de développement avec Node.js 20.17, en utilisant Express.js pour servir un front-end simple. L'application affiche une variable d'environnement en fonction du mode de démarrage (développement ou production).

## Prérequis

- Node.js version 20.17 ou plus récent
- npm (inclus avec Node.js)

## Installation

### 1. Installer Node.js

Si vous n'avez pas encore Node.js installé, suivez ces étapes :

- Rendez-vous sur le site officiel de [Node.js](https://nodejs.org).
- Téléchargez et installez la version 20.17.
- Vérifiez l'installation en exécutant les commandes suivantes dans votre terminal :
  
```bash
  node -v
  npm -v
```
Cela devrait afficher les versions de Node.js et npm installées.

### 2. Initialiser un projet Node.js

Dans votre répertoire de projet, exécutez la commande suivante pour initialiser un nouveau projet Node.js :

```bash
npm init -y
```
Cela crée un fichier package.json qui contient les métadonnées de votre projet.

### 3. Installer les dépendances

- **Express.js** est un framework léger qui simplifie la création d'applications web avec Node.js. Nous allons l'utiliser pour servir le front-end de notre projet.

Pour installer Express.js, exécutez la commande suivante dans votre terminal : 
```bash
npm install express
```
Cette commande va ajouter Express.js comme dépendance à votre projet.

- **Cross-env** est un outil qui permet de définir des variables d'environnement dans vos scripts.

Pour installer cross-env, exécutez la commande suivante dans votre terminal : 
```bash
npm install --save-dev cross-env
```
Cette commande va ajouter cross-env comme dépendance à votre projet.

> L'option **--save-dev** lors de l'installation d'une dépendance avec npm indique que celle-ci est nécessaire uniquement pour le développement, permettant de réduire la taille du déploiement et d'améliorer la gestion des dépendances.
>
> Dans notre cas, on utilise **cross-env** uniquement pour lancer le script dev.

### 4. Créer la structure du projet

Voici la structure que vous allez mettre en place :

```
/project-root
├── /public
│   ├── index.html        # Page HTML du front-end
│   ├── style.css         # Style pour la page HTML
│   └── script.js         # Script JS pour afficher l'environnement
└── index.js
```

### 5. Créer la partie Back/Serveur

Dans le fichier `index.js`, vous allez configurer votre serveur Node.js avec Express pour servir les fichiers statiques et afficher l'environnement :

```typescript
// Importer la dépendance express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Récupérer l'environnement courant (dev ou prod)
const env = process.env.NODE_ENV || 'development';

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
```

### 6. Créer la partie Front-End

Dans le dossier `public`, créez trois fichiers : `index.html`, `style.css`, et `script.js`.

- `public/index.html` : Page HTML simple.

Dans le html on doit initaliser un élement html avec un id spécifique qui permettra d'intégrer notre environnement. 
Et faire un appel au script du même dossier.

```html
  <p id="env-message"></p>
  <script src="script.js"></script>
```

- `public/script.js` : Script pour afficher l'environnement.

Le script récupère l'environnement actuel depuis l'API `/env` du serveur et affiche le résultat dans un élément HTML avec l'ID `env-message`.

```javascript
fetch('/env')
  .then(response => response.text())
  .then(data => {
    document.getElementById('env-message').innerText = `Environnement : ${data}`;
  });
```

### 7. Mise à jour des scripts NPM

Dans votre fichier `package.json`, ajoutez les scripts pour lancer l'application en mode développement et production :

```json
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development node index.js"
}
```

On peut nommer les scripts npm comme on veut, sauf pour `"start"`, qui est une convention pour lancer l'application en production avec `npm start`.

### 8. Lancer l'application

#### Mode Développement

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera disponible à `http://localhost:3000`.

Le message "Environnement : Dévelop" s'affichera.

#### Mode Production

Pour lancer l'application en mode production :

```bash
npm start
```
L'application sera disponible à `http://localhost:3000`.

Le message "Environnement : Production" s'affichera.

## Ressources utiles 

Voici quelques ressources supplémentaires :

1. **Installation d'Express avec un générateur**  
   [https://kinsta.com/fr/blog/creer-application-express/](https://kinsta.com/fr/blog/creer-application-express/)

2. **Cours Microsoft sur Node.js**  
   [https://learn.microsoft.com/fr-fr/training/paths/build-javascript-applications-nodejs/](https://learn.microsoft.com/fr-fr/training/paths/build-javascript-applications-nodejs/)

3. **Cours détaillé sur Node.js**  
   [https://apprendre-nodejs.fr/](https://apprendre-nodejs.fr/)

4. **Guide sur l'utilité de Node.js selon les projets et d'autres infos**  
   [https://welovedevs.com/fr/articles/nodejs/](https://welovedevs.com/fr/articles/nodejs/)