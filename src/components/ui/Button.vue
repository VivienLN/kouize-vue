<script>
  export default {
    props: [
      'color',
    ]
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
    color: var(--neutral-50);
    border-bottom: 4px solid transparent;
    filter: brightness(1);
  }

  button:hover {
    filter: brightness(.9);
  }

  button:active, button:focus {
    filter: brightness(1.1);
  }

  button.primary {
    background-color: var(--primary-500);
    border-color: var(--primary-600);
  }

  button.secondary {
    background-color: var(--secondary-500);
    border-color: var(--secondary-600);
  }

  button.neutral {
    background-color: var(--neutral-300);
    border-color: var(--neutral-400);
  }
</style>
