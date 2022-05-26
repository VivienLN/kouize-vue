<script>
  export default {
    props: [
      'totalTime',
      'isStarted',
    ],

    data() {
      return {
        time: 0,
        timeInterval: null,
      };
    },

    watch: {
      isStarted(newValue, oldValue) {
        // If we restarted timer, reset it
        if(!oldValue && newValue) {
          this.start();         
        } else if(oldValue && !newValue) {
          this.stop();
        }
      }
    },

    methods: {
      start() {
        this.stop();
        this.time = this.totalTime;
        this.timeInterval = setInterval(() => {
          this.time > 0 ? this.time-- : clearInterval(this.timeInterval);
        }, 1000);
      },
      stop() {
        this.time = 0;
        if(this.timeInterval) {
          clearInterval(this.timeInterval);
        }
      }
    },

    unmounted() {
      this.stop();
    }
  }
</script>

<template>
  <div 
    class="timer flex justify-center drop-shadow-lg"
    :class="{
      'started': isStarted,
      'scale-75': !isStarted,
      'scale-100': isStarted,
      'text-indigo-500': time >0, 
      'text-rose-500': time <= 0
    }"
  >
    <div class="relative">
      <svg viewBox="0 0 100 100" class="circle mx-auto -rotate-90">
        <circle 
          cx="50" 
          cy="50" 
          r="46" 
          fill="#fff" 
          stroke="currentColor"
          stroke-width="6"
          stroke-dasharray="290"
          :stroke-dashoffset="isStarted ? (time / totalTime * 290) : 290"
        />
      </svg>
      <div class="number absolute inset-0 text-center text-xl font-bold">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .circle {
    height: 10rem;
  }
  .circle circle {
    transition: stroke-dashoffset .8s ease-out;
  }
  .number {
    z-index: 110;
    line-height: 10rem;
  }

  .timer {
    opacity: 0;
    transition: all .5s ease-in-out;
  }

  .timer.started {
    opacity: 1;
  }
</style>
