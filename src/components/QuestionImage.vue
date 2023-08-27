<script>
  export default {
    props: [
      'question',
      'step',
    ],
  }
</script>

<template>
  <div class="image" v-if="step <= 1" :style="{ 'background-image': `url(${question.image})` }"></div>
  <div class="image" v-if="step === 2" :style="{ 'background-image': `url(${question.answer_image})` }"></div>
</template>

<style scoped>
  .image {
    flex-grow: 1;
    flex-shrink: 1;
    /* Could not get something flexible with an image tag */
    background: none no-repeat center center;
    background-size: contain;
    width: 80%;
    margin: 0 auto -1rem;
    animation: .4s ease-in-out 0s 1 normal imgIn;
  }

  @keyframes imgIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
