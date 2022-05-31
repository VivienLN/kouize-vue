<script>
  export default {
    props: [
      'color',
    ]
  }
</script>

<template>
  <button 
    class="transition rounded px-4 py-1 block font-bold border-b-4"
    :class="{
      [
        `bg-${color}-500 
        text-${color}-100 
        border-${color}-600
        hover:bg-${color}-400
        hover:text-gray-50 
        hover:border-${color}-500
        active:bg-${color}- 
        active:text-gray-50  
        active:border-${color}-400
        dark:bg-${color}-600 
        dark:text-${color}-100 
        dark:border-${color}-700
        dark:hover:bg-${color}-500
        dark:hover:border-${color}-600
        dark:active:bg-${color}-400
        dark:active:border-${color}-500`
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
