<script>
  import Button from './Button.vue';

  export default {
    emits: [
      'close'
    ],
    props: [
      'title',
    ],
    components: {
      Button,
    },
  }
</script>

<template>
  <div class="absolute inset-0 z-40">
    <div class="absolute inset-4 rounded-md border-b-4 border-gray-200 bg-white drop-shadow-lg p-4 flex flex-col items-stretch">
      <div class="flex justify-between items-start pl-2 pb-4">
        <h2 class="font-bold text-indigo-700">{{ title }}</h2>
        <Button class="text-tiny" color="slate" @click="this.$emit('close')">&times; Fermer</Button>
      </div>
      <div class="grow overflow-auto h-full p-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  
</style>
