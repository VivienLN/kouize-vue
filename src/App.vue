<script>
  import MCQ from './components/questions/MCQ.vue';
  import Timer from './components/Timer.vue';
  import Settings from './components/Settings.vue';
  import Chat from './utils/Chat.js';
  import JSON5 from 'json5';
  import Leaderboard from './components/Leaderboard.vue';
  import { FastForwardIcon, CogIcon } from '@heroicons/vue/solid';
  import PrizeIcon from './components/ui/icons/PrizeIcon.vue';
  
  export default {
    components: {
      MCQ,
      Timer,
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
      }
    },
  }
</script>

<template>
  <div class="p-8">
    <!-- Questions -->
    <Timer :isStarted="timerStarted" :totalTime="settings.timer" class="timer" />
    <MCQ 
      v-if="question" 
      :question="question" 
      :step="questionStep" 
      :chat="chat"
      @onStart="startTimer" 
      @onShowRightAnswer="stopTimer" 
      @onFinished="nextQuestion"
    />

    <!-- Commands -->
    <div class="fixed left-0 bottom-0 right-0 p-8 flex justify-center gap-4 w-full">
      <Button @click="nextStep" color="indigo">
        <FastForwardIcon />
        Next
      </Button>

      <Button 
        color="sky" 
        @click="showLeaderboardSession = !showLeaderboardSession"
      >
        <PrizeIcon />
        Classement
      </Button>
      <Button 
        color="sky" 
        @click="showLeaderboardGlobal = !showLeaderboardGlobal"
      >
        <PrizeIcon />
        Classement général
      </Button>
      <Button 
        color="sky" 
        @click="showSettings = !showSettings"
      >
        <CogIcon />
        Settings
      </Button>
    </div>

    <!-- Modals -->
    <Settings v-if="showSettings" @onSaved="updateSettings" />
    <Leaderboard 
      v-if="showLeaderboardSession" 
      score-list="scores_session" 
      display="Leaderboard"
    />
    <Leaderboard 
      v-if="showLeaderboardGlobal" 
      score-list="scores_global" 
      display="Leaderboard global"
      :resets="['scores_session']"
    />
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
  z-index: 100;
}
</style>
