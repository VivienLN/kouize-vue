<script>
  import MCQ from './questions/MCQ.vue';
  import OpenQuestion from './questions/OpenQuestion.vue';
  import TrueFalse from './questions/TrueFalse.vue';
  
  export default {
    props: [
      'question',
      'step',
      'chat',
      'settings',
      'onFinished',
      'questionIndex',
      'totalQuestions',
    ],
    components: {
      MCQ,
      OpenQuestion,
      TrueFalse,
    },
    computed: {
      number() {
        return this.questionIndex + 1;
      }
    }
  }
</script>

<template>
  <MCQ 
    v-bind="$attrs"
    v-if="question.type == 'mcq'"
    :question="question" 
    :number="number"
    :totalQuestions="totalQuestions"
    :step="step" 
    :chat="chat"
    :settings="settings"
  />
  <OpenQuestion
    v-bind="$attrs"
    v-if="question.type == 'open'"
    :question="question" 
    :number="number"
    :totalQuestions="totalQuestions"
    :step="step" 
    :chat="chat"
    :settings="settings"
  />
  <TrueFalse 
    v-bind="$attrs"
    v-if="question.type == 'truefalse'"
    :question="question" 
    :number="number"
    :totalQuestions="totalQuestions"
    :step="step" 
    :chat="chat"
    :settings="settings"
  />
</template>