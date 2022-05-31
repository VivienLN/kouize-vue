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
        `text-${color}-100
        bg-${color}-500          
        border-${color}-600
        hover:text-gray-50 
        hover:bg-${color}-600
        hover:border-${color}-700
        active:text-gray-50  
        active:bg-${color}-400
        active:border-${color}-500`
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
