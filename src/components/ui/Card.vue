<script>
  export default {

  }
</script>

<template>
  <div v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style scoped>
  div {
    border-bottom: 5px solid rgba(0,0,0,.12);
  }
</style>
