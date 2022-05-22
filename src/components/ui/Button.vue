<script>
  export default {
    props: [
      'color',
    ]
  }
</script>

<template>
  <button 
    class="rounded px-5 py-2 block font-bold border-b-2"
    :class="{
      [
        `bg-${color}-500 
        text-${color}-100 
        border-${color}-600
        hover:bg-${color}-400
        hover:text-white 
        hover:border-${color}-500
        active:bg-${color}-300
        active:text-white  
        active:border-${color}-400`
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
