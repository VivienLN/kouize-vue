<script>
  import Selector from './Selector.vue';

  export default {
    components: {
      Selector,
    },
    data() {
      return {
        themes: {'': 'Défaut', ...THEMES},
        defaultTheme: window.getTheme(),
      };
    },
    methods: {
      updateTheme(value) {
        if(value !== '') {
          localStorage.theme = value;
        } else {
          localStorage.removeItem('theme');
        }
        window.updateAppearance();
      }
    }
  }
</script>

<template>
  <Selector 
    :values="themes" 
    :defaultValue="defaultTheme"
    @selected="updateTheme" 
  />
</template>
