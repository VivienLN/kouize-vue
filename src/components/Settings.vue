<script>
  export default {
    data() {
      return {
        channel: localStorage.getItem('channel'),
        timer: localStorage.getItem('timer') ?? 20,
        questions: localStorage.getItem('questions') ?? `[
  {
    "label": "Comment dit-on \\"Groenland\\" en groenlandais ?",
    "answers": [
        "Grønland",
        "Kalaallit Nunaat",
        "Nuukiikaalt",
        "Guuriitanaak"
    ],
    "right_answer": 1
  }
]`
      }
    },

    methods: {
      // Save settings in local storage
      save() {
        localStorage.setItem('timer', parseInt(this.timer));
        localStorage.setItem('channel', this.channel);
        localStorage.setItem('questions', this.questions);
        this.$emit('onSaved');
      }
    },
  }
</script>

<template>
  <div>
    <label>
      Channel name<br/>
      <input v-model="channel" />
    </label>
    <br />
    <br />
    <label>
      Question timer<br/>
      <span>(Utilisé seulement pour afficher le timer des questions. Tant que vous ne révélez pas la réponse, les viewers peuvent jouer. Il est recommandé d'attendre 10-15s après le timer, à cause du retard d'affichage entre streamer et viewers. Ainsi vous ne couperez pas la possibilité de jouer aux joueurs alors qu'ils voient encore le timer chez eux.)</span><br/>
      <input v-model="timer" />
    </label>
    <br />
    <br />
    <label>
      Questions<br/>
      <textarea cols="80" rows="20" v-model="questions" />
    </label>
    <br />
    <br />

    <button @click="save">Save</button>
  </div>
</template>

<style scoped>

</style>
