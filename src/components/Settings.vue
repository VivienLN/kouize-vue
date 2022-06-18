<script>
  import Button from './ui/Button.vue';
  import ThemeSelect from './ui/ThemeSelect.vue';
  import FontSelect from './ui/FontSelect.vue';
  import DefaultSettings from '../utils/DefaultSettings';
  import JSON5 from 'json5';
  import { SaveIcon } from '@heroicons/vue/solid';
  import Modal from '../components/ui/Modal.vue';

  export default {
    props: [

    ],
    components: {
      Button,
      ThemeSelect,
      FontSelect,
      SaveIcon,
      Modal,
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
      },
      updateTextareaHeight() {
        this.$refs.questions.style.height = (this.$refs.questions.scrollHeight + 20) + 'px';
      }
    },

    mounted() {
      this.updateTextareaHeight();
    },

    watch: {
      questions() {
        this.$refs.questions.style.height = "auto";
        this.$nextTick(this.updateTextareaHeight);
      }
    }
  }
</script>

<template>
  <Modal title="Réglages">
    <div class="settings">
      <label for="settings-channel">Nom de la chaîne</label>
      <div>
        <input id="settings-channel" v-model="channel" />
      </div>

      <label for="settings-timer">Durée des questions par défaut (secondes)</label>
      <div>
        <input id="settings-timer" v-model="timer" type="number" min="0" step="5" />
        <em>(Utilisé seulement pour afficher le timer des questions. Tant que vous ne révélez pas la réponse, les viewers peuvent jouer)</em>
      </div>

      <label for="settings-theme">Thème</label>
      <div>
        <ThemeSelect id="settings-theme" />
      </div>

      <label for="settings-font">Police</label>
      <div>
        <fontSelect id="settings-font" />
      </div>

      <label for="settings-questions">Questions</label>
      <div>
        <textarea id="settings-questions" cols="80" rows="20" v-model="questions" ref="questions" />
      </div>
    </div>

    <template #footer>
      <Button color="primary" @click="save"><SaveIcon /> Sauvegarder</Button>
    </template>
  </Modal>
</template>

<style scoped>
  .settings {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    font-size: var(--fs-tiny);
  }

  label {
    font-weight: var(--fw-bold);
    padding: .5rem 0;
  }

  label + div {
    grid-column: span 5 / span 5;
  }

  input, select, textarea {
    width: 100%;
    background-color: var(--input-bg);
    border: 2px solid var(--input-border);
    border-radius: var(--bradius);
    padding: .5rem 1rem;
  }

  input:focus-visible, select:focus-visible, textarea:focus-visible {
    outline: 2px solid var(--secondary-color);
  }

  .settings button {
    width: 100%;
  }

  textarea {
    font-family: var(--ff-mono);
    font-size: .9em;
  }
</style>
