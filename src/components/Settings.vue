<script>
  export default {
    data() {
      return {
        channel: localStorage.getItem('channel'),
        timer: localStorage.getItem('timer') ?? 20,
      }
    },

    methods: {
      // Save settings in local storage
      save() {        
        localStorage.setItem('timer', parseInt(this.timer));
        localStorage.setItem('channel', this.channel);
        this.$emit('onSaved');
      }
    }
  }
</script>

<template>
  <div>
    <label>
      Channel name
      <input v-model="channel" />
    </label>
    <br />
    <br />
    <label>
      Question timer
      <input v-model="timer" />
    </label>
    <br />
    <br />

    <button @click="save">Save</button>
  </div>
</template>

<style scoped>

</style>
