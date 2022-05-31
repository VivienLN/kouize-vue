<script>
  import Button from './ui/Button.vue';
  import DarkModeSelect from './ui/DarkModeSelect.vue';
  import DefaultSettings from '../utils/DefaultSettings';
  import JSON5 from 'json5';
  import { SaveIcon } from '@heroicons/vue/solid';

  export default {
    props: [

    ],
    components: {
      Button,
      DarkModeSelect,
      SaveIcon,
    },

    data() {
      return {
        channel: localStorage.getItem('channel') ?? DefaultSettings.channel,
        timer: localStorage.getItem('timer') ?? DefaultSettings.timer,
        questions: localStorage.getItem('questions') ?? JSON5.stringify(DefaultSettings.questions, null, 2),
      };
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
    <div class="grid grid-cols-6 gap-2">
      <label class="font-bold py-1" for="settings-channel">Nom de la chaîne</label>
      <div class="col-span-5">
        <input id="settings-channel" v-model="channel" class="w-full rounded border border-gray-400 dark:border-gray-900 dark:bg-gray-700 px-2 py-1 outline-primary-500" />
      </div>

      <label class="font-bold py-1" for="settings-timer">Durée des questions (secondes)</label>
      <div class="col-span-5">
        <input id="settings-timer" v-model="timer" type="number" min="0" step="5" class="w-full rounded border border-gray-400 dark:border-gray-900 dark:bg-gray-700 px-2 py-1 outline-primary-500" />
        <em>(Utilisé seulement pour afficher le timer des questions. Tant que vous ne révélez pas la réponse, les viewers peuvent jouer)</em>
      </div>

      <label class="font-bold py-1" for="settings-thememode">Mode sombre / clair</label>
      <div class="col-span-5">
        <DarkModeSelect id="settings-thememode" />
      </div>

      <label class="font-bold py-1" for="settings-question">Questions</label>
      <div class="col-span-5">
        <textarea id="settings-question" cols="80" rows="20" v-model="questions" class="w-full rounded border border-gray-400 dark:border-gray-900 dark:bg-gray-700 px-2 py-1 font-mono outline-primary-500" />
      </div>

      <div class="col-start-6">
        <Button class="w-full" color="primary" @click="save"><SaveIcon /> Save</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
