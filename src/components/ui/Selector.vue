<script>
  export default {
    props: [
      'values',
      'defaultValue',
      'customClasses',
    ],
    data() {
      return {
        selected: this.defaultValue,
      };
    },
    computed: {
      selectedComputed: {
        get() {
          return this.selected;
        },
        set(value) {
          this.selected = value;
          this.$emit('selected', value);
        }
      }
    },
    methods: {
      getCustomClass(value) {
        if(!this.customClasses) {
          return '';
        }
        return this.customClasses[value] ?? '';
      }
    }
  }
</script>

<template>
  <div v-bind="$attrs" class="wrapper">
    <label v-for="(label, name) in values" :key="name" :class="getCustomClass(name)">
      <input type="radio" :value="name" v-model="selectedComputed" />
      <span>{{ label }}</span>
    </label>
  </div>
</template>


<style scoped>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: .25rem;
  }
  label span {
    display: block;
    background-color: var(--input-bg);
    border: 2px solid var(--input-border);
    border-radius: var(--bradius);
    padding: .5rem 1rem;
    opacity: .6;
    transition: .2s;
    cursor: pointer;
  }

  label:hover span {
    opacity: 1;
  }

  label input {
    display: none;
  }

  input:checked + span {
    opacity: 1;
    border-color: var(--secondary-color);
  }
</style>