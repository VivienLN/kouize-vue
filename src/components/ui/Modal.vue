<script>
  import Button from './Button.vue';
  import Card from './Card.vue';
  import { XIcon } from '@heroicons/vue/solid';

  export default {
    emits: [
      'close'
    ],
    props: [
      'title',
    ],
    components: {
      Button,
      XIcon,
      Card,
    },
  }
</script>

<template>
  <div class="wrapper">
    <Card class="modal">
      <header>
        <h2>{{ title }}</h2>
        <Button color="neutral" @click="this.$emit('close')"><XIcon /></Button>
      </header>
      <div class="content">
        <slot></slot>
      </div>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </Card>
  </div>
</template>

<style scoped>
  .wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
  }
  .modal {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    left: 2rem;
    top: 2rem;
    right: 2rem;
    bottom: 2rem;
    padding: 2rem;
    border-radius: var(--bradius-lg);
  }
  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  h2 {
    font-weight: var(--fw-bold);
    color: var(--title-color);
  }
  .content {
    padding: .5rem 0;
    flex-grow: 1;
    height: 100%;
    overflow: auto;
  }
  footer {
    padding: 1rem 0;
    display: flex;
    justify-content: end;
  }
</style>
