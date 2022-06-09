# Kouize Vue
Create quizzes for twitch chat members

## Thanks to
* https://github.com/TotoroPHD/twitch-redactle
* https://github.com/Drake62610/Redactle-Fr

## [FR] Installation

### Via navigateur
* Naviguez vers http://localhost:3000
* Cliquez sur le bouton Réglages pour démarrer la configuration

### En tant que source OBS
* Ajoutez une source "navigateur" dans OBS, avec en URL http://localhost:3000, et de la taille que vous souhaitez. Les questions seront toujours affichées **en basde l'écran**. Cependant, les pop-up de classements et réglages prendront toute la place disponible. A noter aussi qu'une fois la taille choisie, vous pourrez toujours redimensionner l'ensemble dans la scène OBS.
* En maintenant "alt" il est possible de cropper la source et cacher les boutons situés en bas de l'écran, qui sont uniquement destinés au streamer. Exemple : https://youtube.com/clip/UgkxdqdIhndKJPHckt8ADNenLhlDC-o2qZKa
* Sélectionnez la source dans votre scène et cliquez sur le bouton "Interagir", situé sous l'aperçu de la scène. Vous pouvez aussi faire un clic droit sur la source dans la liste des sources et choisir "interagir".
* Cliquez sur le bouton Réglages pour démarrer la configuration

## [FR] Configuration
Indiquez le nom de votre chaîne, et le Kouize écoutera votre chat à la recherche de réponses.

### Questions

Les questions sont à lister au format JSON. Un exemple de question est présent par défaut :

```
[
  {
    type: 'mcq',
    label: 'Comment dit-on "Groenland" en groenlandais ?',
    answers: [
      'Kalaallit Nunaat',
      'Grønland',
      'Nuukiikaalt',
      'Guuriitanaak',
    ],
  },
]
```

* type : Pour le moment, seul "mcq" est valide
* label : l'intitulé de la question
* answers : tableau contenant les réponses proposées. Seules les 4 premières de la liste seront prises en compte. **La première réponse de la liste sera la bonne réponse**. Les réponses sont mélangées au moment de l'affichage.

## Deploiement
Le Kouize est actuellement déployé via les github pages. 
Il est impossible de faire en sorte que les github pages pointent vers le dossier `dist`, il a donc fallu ruser un peu.

La branche `gh-pages` a été créée, et contient uniquement le dossier dist. Ce dossier doit donc contenir son propre repo local.

*Note: Il a été envisager de simplifier le process avec [les sous-modules git](https://git-scm.com/book/fr/v2/Utilitaires-Git-Sous-modules). En attendant de savoir si ça apportera plus de problèmes ou de solutions, et vu qu'une seule personne déploie pour le moment (et que ça restera surement comme ça), on s'en passe.*

Références :
* [Documentation github pages](https://docs.github.com/en/pages)
* [Documentation vite](https://vitejs.dev/guide/static-deploy.html#github-pages)

### Configuration intiale
```
cd dist
git init
git remote add origin https://github.com/VivienLN/kouize-vue.git
git pull origin gh-pages
```

### Déploiement
```
# avec docker
docker-compose run app npm run build
# sans docker
npm run build

# deployer
cd dist
git add .
git commit -m "deploy vXX.XX.XX"
git tag deploy-vXX.XX.XX
git push --tags
```