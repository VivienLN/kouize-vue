export default {   
  channel: '',
  timer: 20,
  questions: [
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
}