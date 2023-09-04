<script>
  import Settings from './components/SettingsModal.vue';
  import Chat from './utils/Chat.js';
  import JSON5 from 'json5';
  import Leaderboard from './components/LeaderboardModal.vue';
  import { FastForwardIcon, CogIcon, CodeIcon } from '@heroicons/vue/solid';
  import PrizeIcon from './components/ui/icons/PrizeIcon.vue';
  import Modal from './components/ui/Modal.vue';
  import Question from './components/Question.vue';
  import Questions from './components/QuestionsModal.vue';
  

  const VERSION = 'v1.3.1';

  export default {
    components: {
      Question,
      Modal,
      Settings,
      Leaderboard,
      PrizeIcon,
      Questions,
      FastForwardIcon,
      CogIcon,
      CodeIcon,
    },

    data() {
      return {
        settings: {},
        question: null,
        questionIndex: 0,
        questionStep: 0,
        chat: Chat,
        showSettingsModal: false,
        showLeaderboardSessionModal: false,
        showLeaderboardGlobalModal: false,
        showQuestionsModal: false,
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
      updateSettings(reload = false) {
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
          this.showSettingsModal = false;
          this.showQuestionsModal = false;
        }
        // Reload?
        if(reload) {
          location.reload();
        }
      },
      showModal(variableName) {
        let newValue = !this[variableName];
        this.hideAllModals();
        this[variableName] = newValue;
      },
      hideAllModals() {
        this.showSettingsModal = false;
        this.showLeaderboardSessionModal = false;
        this.showLeaderboardGlobalModal = false;
        this.showQuestionsModal = false;
      }
    },
    computed: {
      totalQuestions() {
        return this.settings.questions.length;
      },
      version() {
        return VERSION;
      }
    }
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
        :questionIndex="questionIndex"
        :totalQuestions="totalQuestions"
        :step="questionStep" 
        :chat="chat"
        :settings="settings"
        @onFinished="nextQuestion"
        @onForceNextStep="nextStep"
      />

      <!-- Modals -->
      <Leaderboard 
        title="Classement"
        v-if="showLeaderboardSessionModal"
        @close="showLeaderboardSessionModal = false"
        score-list="scores_session"
      />
      <Leaderboard 
        title="Classement général"
        v-if="showLeaderboardGlobalModal"
        @close="showLeaderboardGlobalModal = false"
        score-list="scores_global"
        :resets="['scores_session']"
      />
      <Settings 
        v-if="showSettingsModal"
        @close="showSettingsModal = false"
        @onSaved="updateSettings(true)" 
      />
      <Questions 
        v-if="showQuestionsModal"
        @close="showQuestionsModal = false"
        @onSaved="updateSettings(true)" 
      />
    </div>

    <!-- Commands -->
    <footer>

      <Button 
        color="secondary"
        @click="showModal('showLeaderboardSessionModal')"
      >
        <PrizeIcon />
        Classement
      </Button>
      <Button 
        color="secondary"
        @click="showModal('showLeaderboardGlobalModal')"
      >
        <PrizeIcon />
        Classement général
      </Button>
      <Button 
        color="secondary"
        @click="showModal('showSettingsModal')"
      >
        <CogIcon />
        Réglages
      </Button>
      <Button 
        color="secondary"
        @click="showModal('showQuestionsModal')"
      >
        <CodeIcon />
        Questions
      </Button>
      <Button @click="nextStep" color="primary">
        <FastForwardIcon />
        Suite
      </Button>
    </footer>
    <p class="version">{{ version }}</p>
  </main>
</template>

<style scoped>
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

  .version {
    font-size: var(--fs-xs);
    padding: .2rem .4rem ;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: .5;
  }
</style>