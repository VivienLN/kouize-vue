<script>
  import Button from './ui/Button.vue';
  export default {
    props: [

    ],
    components: {
      Button,
    },
    data() {
      return {
        channel: localStorage.getItem('channel'),
        timer: localStorage.getItem('timer') ?? 20,
        questions: localStorage.getItem('questions') ?? `[
  {
    label: 'Comment dit-on "Groenland" en groenlandais ?',
    answers: [
        "Grønland",
        "Kalaallit Nunaat",
        "Nuukiikaalt",
        "Guuriitanaak"
    ],
    right_answer: 1
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
  <div class="text-tiny">
    <div class="grid grid-cols-6 gap-4">
      <label class="font-bold py-1" for="settings-channel">Nom de la chaîne</label>
      <div class="col-span-5">
        <input id="settings-channel" v-model="channel" class="w-full rounded border border-slate-300 px-2 py-1" />
      </div>

      <label class="font-bold py-1" for="settings-timer">Durée des questions (secondes)</label>
      <div class="col-span-5">
        <input id="settings-timer" v-model="timer" type="number" min="0" step="5" class="w-full rounded border border-slate-300 px-2 py-1" />
        <em>(Utilisé seulement pour afficher le timer des questions. Tant que vous ne révélez pas la réponse, les viewers peuvent jouer)</em>
      </div>

      <label class="font-bold py-1" for="settings-question">Questions</label>
      <div class="col-span-5">
        <textarea id="settings-question" cols="80" rows="20" v-model="questions" class="w-full rounded border border-slate-300 px-2 py-1 font-mono" />
      </div>

      <div class="col-start-6">
        <Button class="w-full" color="indigo" @click="save">Save</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
