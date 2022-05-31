<script>
  export default {
    computed: {
      themeMode: {
        get() {
          return (localStorage.theme_mode === 'dark' || (!('theme_mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? 'dark' : 'light';
        },
        set(value) {
          if(value !== '') {
            localStorage.theme_mode = value;
          } else {
            localStorage.removeItem('theme_mode');
          }
          window.updateThemeMode();
        }
      }
    },
  }
</script>

<template>
  <select
    v-model="themeMode"
    v-bind="$attrs"
  >
    <option value="">Par défaut</option>
    <option value="dark">Sombre</option>
    <option value="light">Clair</option>
  </select>
</template>

<style scoped>
  select {
    border: 1px solid var(--neutral-300); /* Dark: 900 */
    background-color: var(--neutral-50); /* Dark: 900 */
    color: var(--neutral-900); /* Dark: 50 */
  }
</style>
