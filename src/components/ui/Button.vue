<script>
  export default {
    props: [
      'color',
    ]
  }
</script>

<template>
  <button 
    class="rounded px-5 py-2 block font-bold"
    :class="{
      [
        `bg-${color}-500 
        text-${color}-100 
        hover:bg-${color}-400 h
        over:text-white 
        active:bg-${color}-300`
      ]: color,
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  :slotted(svg) {
    height: 1.2em;
    vertical-align: middle;
    display: inline-block;
    margin-right: .2em;
    margin-top: -.16em;
  }
</style>
