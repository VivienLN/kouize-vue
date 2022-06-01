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