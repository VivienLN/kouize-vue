<script>
  import Selector from './Selector.vue';

  export default {
    components: {
      Selector,
    },
    data() {
      return {
        fonts: Object.fromEntries(FONT_FAMILIES.map(item => [item, item])),
        fontClasses: Object.fromEntries(FONT_FAMILIES.map(item => [item, `font_family-${item}`])),
        defaultFont: window.getFontFamily(),
      };
    },
    methods: {
      updateFont(value) {
        if(value !== '') {
          localStorage.font_family = value;
        } else {
          localStorage.removeItem('font_family');
        }
        window.updateAppearance();
      }
    },
  }
</script>

<template>
  <Selector 
    :values="fonts" 
    :defaultValue="defaultFont"
    @selected="updateFont"
    :customClasses="this.fontClasses"
  />
</template>
