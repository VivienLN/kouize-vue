<script>
  import Settings from './components/Settings.vue';
  import Chat from './utils/Chat.js';
  import JSON5 from 'json5';
  import Leaderboard from './components/Leaderboard.vue';
  import { FastForwardIcon, CogIcon } from '@heroicons/vue/solid';
  import PrizeIcon from './components/ui/icons/PrizeIcon.vue';
  import Modal from './components/ui/Modal.vue';
  import Question from './components/Question.vue';
  
  export default {
    components: {
      Question,
      Modal,
      Settings,
      Leaderboard,
      PrizeIcon,
      FastForwardIcon,
      CogIcon,
    },

    data() {
      return {
        settings: {},
        question: null,
        questionIndex: 0,
        questionStep: 0,
        chat: Chat,
        showSettings: false,
        showLeaderboardSession: false,
        showLeaderboardGlobal: false,
      }
    },

    created() {
      // Settings
      this.updateSettings();
    },

    methods: {
      nextStep() {
        this.hideAllModals();
        if(this.question === null) {
          this.setQuestion(0);
        } else {
          this.questionStep++;
        }
      },
      setQuestion(index) {
        this.questionStep = 0;
        this.questionIndex = index;
        this.question = this.settings.questions[index];
      },
      nextQuestion() {
        this.setQuestion(this.questionIndex + 1);
      },
      updateSettings() {
        var hasErrors = false;
        try {
          var questions = JSON5.parse(localStorage.getItem('questions'));
        } catch {
          var questions = [];
          hasErrors= true;
          alert('Formattage questions invalide!');
        }

        this.settings = {
          channel: localStorage.getItem('channel'),
          timer: localStorage.getItem('timer'),
          questions: questions,
        };
        // Chat
        this.chat.init(this.settings.channel);
        // Close settings
        if(!hasErrors) {
          this.showSettings = false;
        }
      },
      showModal(variableName) {
        let newValue = !this[variableName];
        this.hideAllModals();
        this[variableName] = newValue;
      },
      hideAllModals() {
        this.showSettings = false;
        this.showLeaderboardSession = false;
        this.showLeaderboardGlobal = false;
      }
    },
  }
</script>

<template>
  <main>
  <!-- Game -->
    <div class="game">
      <!-- Questions -->
      <Question
        :key="questionIndex"
        v-if="question" 
        :question="question" 
        :step="questionStep" 
        :chat="chat"
        :settings="settings"
        @onFinished="nextQuestion"
        @onForceNextStep="nextStep"
      />

      <!-- Modals -->
      <Modal v-if="showSettings" @close="showSettings = false" title="Réglages">
        <Settings @onSaved="updateSettings" />
      </Modal>
      <Modal v-if="showLeaderboardSession" @close="showLeaderboardSession = false" title="Classement">
        <Leaderboard 
          score-list="scores_session"
        />
      </Modal>
      <Modal v-if="showLeaderboardGlobal" @close="showLeaderboardGlobal = false" title="Classement général">
        <Leaderboard 
          score-list="scores_global"
          :resets="['scores_session']"
        />
      </Modal>
    </div>

    <!-- Commands -->
    <footer>
      <Button @click="nextStep" color="primary">
        <FastForwardIcon />
        Suite
      </Button>

      <Button 
        color="secondary"
        @click="showModal('showLeaderboardSession')"
      >
        <PrizeIcon />
        Classement
      </Button>
      <Button 
        color="secondary"
        @click="showModal('showLeaderboardGlobal')"
      >
        <PrizeIcon />
        Classement général
      </Button>
      <Button 
        color="secondary"
        @click="showModal('showSettings')"
      >
        <CogIcon />
        Réglages
      </Button>
    </footer>
  </main>
</template>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100vh;
    filter: var(--shadow);
  }

  .game {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;    
    flex-grow: 1;
    padding: 2rem;
  }

  footer {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;

  }
</style>