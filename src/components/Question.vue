<script>
  import MCQ from './questions/MCQ.vue';
  import OpenQuestion from './questions/OpenQuestion.vue';
  
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
      OpenQuestion,
    }
  }
</script>

<template>
  <MCQ 
    v-bind="$attrs"
    v-if="question.type == 'mcq'"
    :question="question" 
    :step="step" 
    :chat="chat"
    :settings="settings"
  />
  <OpenQuestion
    v-bind="$attrs"
    v-if="question.type == 'open'"
    :question="question" 
    :step="step" 
    :chat="chat"
    :settings="settings"
  />
</template>