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
  <div>
    <div v-if="!isStarted">...</div>
    <div v-else-if="time > 0">{{ time }}</div>
    <div v-else>Trop tard !!</div>   
  </div>
</template>

<style scoped>

</style>
