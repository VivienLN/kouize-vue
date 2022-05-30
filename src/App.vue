<script>
  import MCQ from './components/questions/MCQ.vue';
  import Timer from './components/Timer.vue';
  import Settings from './components/Settings.vue';
  import Chat from './utils/Chat.js';
  import JSON5 from 'json5';
  import Leaderboard from './components/Leaderboard.vue';
  import { FastForwardIcon, CogIcon } from '@heroicons/vue/solid';
  import PrizeIcon from './components/ui/icons/PrizeIcon.vue';
  import Modal from './components/ui/Modal.vue';
  
  export default {
    components: {
      MCQ,
      Timer,
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
        timerStarted: false,
        chat: Chat,
        showSettings: false,
        showLeaderboardSession: false,
        showLeaderboardGlobal: false,
      }
    },

    computed: {
      timerDuration() {
        return this.question?.timer ?? this.settings.timer;
      }
    },

    created() {
      // Settings
      this.updateSettings();
    },

    methods: {
      nextStep() {
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
      startTimer() {
        this.timerStarted = true;
      },
      stopTimer() {
        this.timerStarted = false;
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
        this.showSettings = false;
        this.showLeaderboardSession = false;
        this.showLeaderboardGlobal = false;
        this[variableName] = newValue;
      }
    },
  }
</script>

<template>
  <div class="flex flex-col items-stretch h-screen">
  <!-- Main -->
    <div class="p-4 grow flex flex-col items-stretch justify-end relative">
      <!-- Questions -->
      <Timer :isStarted="timerStarted" :totalTime="timerDuration" class="timer z-10" />
      <MCQ 
        v-if="question" 
        :question="question" 
        :step="questionStep" 
        :chat="chat"
        @onStart="startTimer" 
        @onShowRightAnswer="stopTimer" 
        @onFinished="nextQuestion"
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
    <div class="flex justify-center gap-2 w-full text-tiny z-50 p-4">
      <Button @click="nextStep" color="indigo">
        <FastForwardIcon />
        Next
      </Button>

      <Button 
        color="sky"
        @click="showModal('showLeaderboardSession')"
      >
        <PrizeIcon />
        Classement
      </Button>
      <Button 
        color="sky"
        @click="showModal('showLeaderboardGlobal')"
      >
        <PrizeIcon />
        Classement général
      </Button>
      <Button 
        color="sky"
        @click="showModal('showSettings')"
      >
        <CogIcon />
        Settings
      </Button>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: 'Signika', sans-serif;
    font-weight: 500;
  }
  body {
    background: #f2f2f2;
  }
  .timer {
    margin-bottom: -2rem;
    position: relative;
  }
</style>
