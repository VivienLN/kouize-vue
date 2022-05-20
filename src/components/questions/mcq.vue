<script>
  export default {
    props: ['question'],

    mounted() {
      this.question.answers = this.question.answers
        .map((answer, index) => ({
          label: answer, 
          is_right: !!(index === this.question.right_answer) 
        }))
        .sort((a, b) => 0.5 - Math.random());
    },
  }
</script>

<template>
  <div>
    <h2>{{ question.label }}</h2>
    <ul>
      <li v-for="({ label, is_right }, index) in question.answers">
        {{ label }}
        <strong v-show="is_right">(correct)</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
