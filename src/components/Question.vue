<script>
  import MCQ from './questions/MCQ.vue';
  
  export default {
    props: [
      'question',
      'step',
      'chat',
      'settings',
      'onFinished',
    ],
    components: {
      MCQ,
    }
  }
</script>

<template>
  <MCQ 
    v-if="this.question.type == 'mcq'"
    :question="question" 
    :step="step" 
    :chat="chat"
    :settings="settings"
  />
</template>