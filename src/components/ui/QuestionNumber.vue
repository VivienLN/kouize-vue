<script>
  export default {
    props: [
      'number',
      'total'
    ]
  }
</script>

<template>
  <div class="number">{{ number }} / {{ total }}</div>
</template>

<style scoped>
  

  .number {
    background-color: var(--alt-bg);
    border-radius: var(--bradius-lg);
    padding: .5rem;
    line-height: 1rem;
    font-weight: var(--fw-bold);
    font-size: var(--fs-small);
    position: absolute;
    right: .5rem;
    top: .5rem;
  }
</style>