export default {
    // Channel to listen for chat
    channel:'v4lesti',
    // Time to answer questions, as shown to users.
    // 0 to not use timer
    // This is only to display a timer, in reality, answers are still
    // accepted until you decide to show the right answer.
    // You should wait 10-15s after the timer ends, to accomodate for stream delay.
    timer: 20,
    // List of questions
    questions: [
        {
            label: 'Qui est le meilleur des streamers ?',
            answers: [
                "V4lesti",
                "V5lesti",
                "Jean-Marie Bigard",
                "Coco l'asticot"
            ],
            right_answer: 0,
        }, {
            label: 'Comment dit-on "Groenland" en groenlandais ?',
            answers: [
                "Grønland",
                "Kalaallit Nunaat",
                "Nuukiikaalt",
                "Guuriitanaak"
            ],
            right_answer: 1,
        }
    ]
};