<script>
  export default {
    props: [
      'totalTime',
      'isStarted',
    ],

    data() {
      return {
        time: 0,
        timeInterval: null
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
        // this.isHidden = this.totalTime > 0;
        this.time = this.totalTime;
        this.timeInterval = setInterval(() => {
          this.time > 0 ? this.time-- : clearInterval(this.timeInterval);
        }, 1000);
      },
      stop() {
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
    class="timer"
    :class="{
      'started': isStarted,
      'finished': time <= 0,
      'enabled': this.totalTime > 0,
    }"
  >
    <svg viewBox="0 0 100 100" class="circle">
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="currentColor"
        stroke-width="6"
        stroke-dasharray="290"
        :stroke-dashoffset="isStarted ? (time / totalTime * 290) : 290"
      />
    </svg>
    <div class="number">
      {{ time }}
    </div>
  </div>
</template>

<style scoped>
  .circle {
    height: 10rem;
    margin: 0 auto;
    transform: rotate(-90deg);
    fill: var(--card-bg);
  }
  .circle circle {
    transition: stroke-dashoffset .8s ease-out;
  }
  .number {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    z-index: 110;
    line-height: 10rem;
  }

  .timer {
    position: relative;
    opacity: 0;
    transition: all .5s ease-in-out;
    display: flex;
    justify-content: center;
    filter: var(--shadow);
    transform: scale(.75);
    color: var(--timer-color);
  }

  .timer.enabled.started {
    opacity: 1;
    transform: scale(1);
  }

  .timer.finished {
    color: #e11d48;
  }
</style>
