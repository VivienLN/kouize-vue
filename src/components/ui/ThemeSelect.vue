<script>
  export default {
    data() {
      return {
        themes: THEMES
      };
    },
    computed: {
      theme: {
        get() {
          return window.getTheme();
        },
        set(value) {
          if(value !== '') {
            localStorage.theme = value;
          } else {
            localStorage.removeItem('theme');
          }
          window.updateAppearance();
        }
      }
    },
  }
</script>

<template>
  <select
    v-model="theme"
    v-bind="$attrs"
  >
    <option value="">Par défaut</option>
    <template v-for="(themeLabel, theme) in themes">
      <option :value="theme">{{ themeLabel }}</option>
    </template>
  </select>
</template>
