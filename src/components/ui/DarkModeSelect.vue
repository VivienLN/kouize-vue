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
    class="w-full rounded border border-gray-300 dark:border-gray-900 px-2 py-1 outline-primary-500 dark:bg-gray-700"
    v-model="themeMode"
    v-bind="$attrs"
  >
    <option value="">Par défaut</option>
    <option value="dark">Sombre</option>
    <option value="light">Clair</option>
  </select>
</template>

<style scoped>

</style>
