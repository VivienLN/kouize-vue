<script>
  import Button from './Button.vue';
  import { XIcon } from '@heroicons/vue/solid';

  export default {
    emits: [
      'close'
    ],
    props: [
      'title',
    ],
    components: {
      Button,
      XIcon,
    },
  }
</script>

<template>
  <div class="absolute inset-0 z-40">
    <div class="absolute inset-4 rounded-md border-b-4 border-gray-200 bg-gray-50 dark:border-gray-900 dark:bg-gray-800 drop-shadow-lg p-4 flex flex-col items-stretch">
      <div class="flex justify-between items-start px-2 pb-4">
        <h2 class="font-bold text-primary-700 dark:text-primary-300">{{ title }}</h2>
        <Button class="text-tiny px-2" color="gray" @click="this.$emit('close')"><XIcon /></Button>
      </div>
      <div class="grow overflow-auto h-full p-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  
</style>
