<script>
  export default {
    data() {
      return {
        fonts: FONT_FAMILIES
      };
    },
    computed: {
      font: {
        get() {
          return window.getFontFamily() ?? window.FONT_FAMILY_DEFAULT;
        },
        set(value) {
          if(value !== '') {
            localStorage.font_family = value;
          } else {
            localStorage.removeItem('font_family');
          }
          window.updateAppearance();
        }
      }
    },
  }
</script>

<template>
  <select
    v-model="font"
    v-bind="$attrs"
  >
    <template v-for="(fontName) in fonts">
      <option :value="fontName" :class="`font_family-${fontName}`">{{ fontName }}</option>
    </template>
  </select>
</template>
