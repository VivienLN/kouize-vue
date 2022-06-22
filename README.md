# Kouize Vue
Create quizzes for twitch chat members

## Thanks to
* https://github.com/TotoroPHD/twitch-redactle
* https://github.com/Drake62610/Redactle-Fr

# [FR] Installation

## Via navigateur
* Naviguez vers http://localhost:3000
* Cliquez sur le bouton Réglages pour démarrer la configuration

## En tant que source OBS
* Ajoutez une source "navigateur" dans OBS, avec en URL http://localhost:3000, et de la taille que vous souhaitez. Les questions seront toujours affichées **en basde l'écran**. Cependant, les pop-up de classements et réglages prendront toute la place disponible. A noter aussi qu'une fois la taille choisie, vous pourrez toujours redimensionner l'ensemble dans la scène OBS.
* En maintenant "alt" il est possible de cropper la source et cacher les boutons situés en bas de l'écran, qui sont uniquement destinés au streamer. Exemple : https://youtube.com/clip/UgkxdqdIhndKJPHckt8ADNenLhlDC-o2qZKa
* Sélectionnez la source dans votre scène et cliquez sur le bouton "Interagir", situé sous l'aperçu de la scène. Vous pouvez aussi faire un clic droit sur la source dans la liste des sources et choisir "interagir".
* Cliquez sur le bouton Réglages pour démarrer la configuration

# [FR] Configuration
Indiquez le nom de votre chaîne, et le Kouize écoutera votre chat à la recherche de réponses.

## Questions

Les questions sont à lister au format JSON. Un exemple de liste de questions est présent par défaut :

```
[
  {
    type: 'mcq',
    label: 'Comment dit-on "Groenland" en groenlandais ?',
    answers: [
      "Kalaallit Nunaat",
      "Grønland",
      "Nuukiikaalt",
      "Guuriitanaak"
    ]
  }, 
  {
    type: 'open',
    label: 'Quel est le jeu zelda avec un ocarina du temps ?',
    winners: 3,
    show_letters: true,
    answers: [
      'The Legend of Zelda: Ocarina of Time',
      'Zelda: Ocarina of Time',
      'Zelda OoT',
    ],
  }
]
```

Le champ "type" défini de quel type de question il s'agit, et des autres paramètres obligatoires et obligatoire. Voir ci-dessous pour les paramètres des questions selon leur type.

## Question à choix multiples (type "mcq")

Ce sont des questions pour lesquelles les joueurs peuvent choisir entre 4 réponses maximum.
L'intitulé de la question s'affiche, puis lorsque le streamer clique sur "Suite", les réponses possibles s'affichent. Les viewers peuvent alors répondre dans le chat en tapant "A", "B", "C" ou "D".
Dès qu'il le souhaite, le streamer peut cliquer sur "Suite" pour afficher la bonne réponse et mettre à jour les scores.

**Paramètres :**
* **`type` :** Régler sur `mcq`
* **`label` :** l'intitulé de la question
* **`answers` :** tableau contenant les réponses proposées. Seules les 4 premières de la liste seront prises en compte. **La première réponse de la liste sera la bonne réponse**. Les réponses sont mélangées au moment de l'affichage.
* **`timer` (optionnel) :** La durée du chrono affiché au dessus de la question, en secondes. Si la valeur fournie est `0`, le chrono ne s'affiche pas. Si aucune valeur n'est fournie, la durée est celle spécifiée dans les réglages.
* **`points` (optionnel) :** Le nombre de points que rapporte cette question

## Question ouverte (type "open")

Ce sont des questions dont la réponse est libre. Les viewers répondent en tapant directement leur réponse dans le chat. Une tolérance est appliquée envers les fautes de frappe, et vous pouvez définir plusieurs réponses valides.

Ce type de question permet aussi de faire des blind tests, des images à reconnaître, etc.

Seuls les premiers joueurs à répondre obtiendront des points, de manière dégressive (le plus rapide obtient le plus de points). Les joueurs peuvent fournir autant de réponses qu'ils le souhaitent.

**Paramètres :**
* **`type` :** Régler sur `open`
* **`label` :** l'intitulé de la question
* **`answers` :** tableau contenant la liste des réponses acceptées. La première réponse de la liste est celle qui sera révélée à la fin de la question. Les autres réponses peuvent êtres des abréviations ou écritures alternatives. Il n'est pas nécessaire de prendre en compte les accents, ni les fautes de frappe.
* **`winners` :** Le nombre de gagnants. Une fois que suffisamment de joueurs ont trouvé la réponse, elle est révélée **automatiquement**. En outre, si par exemple ce nombre est 3, le premier joueur à repondre juste gagnera 3 points, le second 2 points, et le troisième 1 point. Les autres ne gagneront pas de point.
* **`timer` (optionnel, defaut : selon réglages généraux) :** La durée du chrono affiché au dessus de la question, en secondes. Si la valeur fournie est `0`, le chrono ne s'affiche pas. Si aucune valeur n'est fournie, la durée est celle spécifiée dans les réglages.
* **`points` (optionnel, defaut : `1`) :** Le multiplieur de points gagnés pour une bonne réponse. Par défaut, `1`. Par exemple, s'il y a 3 gagnants et que `points` vaut `10`, le plus rapide gagnera 30 points, le second 20 points, et le troisième 10 points.
* **`show_letters` (optionnel, defaut : `false`) :** `true` ou `false`. Si `true`, affiche le nombre de lettres présentes dans la réponse (la première de la liste fournie) en dessous de l'intitulé, un peu à la façon d'un jeu de pendu. Passé la moitié du temps imparti, certaines lettres seront révélées pour faciliter le jeu. Note : si timer est à zero (temps infini), les lettres vides sont bien affichées, mais les lettres ne se révéleront pas.

**Exemple de question ouverte :**
```
{
  type: 'open',
  label: 'Quel est le jeu zelda avec un ocarina du temps ?',
  winners: 3,
  show_letters: true,
  answers: [
    'The Legend of Zelda: Ocarina of Time',
    'Zelda: Ocarina of Time',
    'Zelda OoT',
  ],
}
```

# Deploiement
Le Kouize est actuellement déployé via les github pages. 
Il est impossible de faire en sorte que les github pages pointent vers le dossier `dist`, il a donc fallu ruser un peu.

La branche `gh-pages` a été créée, et contient uniquement le dossier dist. Ce dossier doit donc contenir son propre repo local.

*Note: Il a été envisager de simplifier le process avec [les sous-modules git](https://git-scm.com/book/fr/v2/Utilitaires-Git-Sous-modules). En attendant de savoir si ça apportera plus de problèmes ou de solutions, et vu qu'une seule personne déploie pour le moment (et que ça restera surement comme ça), on s'en passe.*

Références :
* [Documentation github pages](https://docs.github.com/en/pages)
* [Documentation vite](https://vitejs.dev/guide/static-deploy.html#github-pages)

## Configuration intiale
```
cd dist
git init
git remote add origin https://github.com/VivienLN/kouize-vue.git
git pull origin gh-pages
```

## Déploiement
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