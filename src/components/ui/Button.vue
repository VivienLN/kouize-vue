<script>
  export default {
    props: [
      'color',
    ],
  }
</script>

<template>
  <button 
    :class="color"
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

  button {
    display: block;
    font-size: var(--fs-tiny);
    font-weight: var(--fw-bold);
    transition: .4s;
    border-radius: var(--bradius);
    padding: .5rem 2rem;
    color: var(--button-color);
    border-bottom: 5px solid rgba(0,0,0,.12);
  }

  button:hover {
    filter: brightness(.9);
  }

  button:active, button:focus {
    filter: brightness(1.1);
  }

  button.primary {
    background-color: var(--button-bg);
  }

  button.secondary {
    background-color: var(--button-secondary-bg);
  }

  button.neutral {
    background-color: var(--button-neutral-bg);
  }
</style>
