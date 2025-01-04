<script>
export default {
  name: "FormMessage",
  props: {
    message: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "text-black"
    },
    text_size: {
      type: String,
      default: "text-base"
    },
  },
  computed: {
    hasError() {
      return this.errorMessages !== null;
    }
  }
}
</script>

<template>
  <span v-if="hasError" :class="[color, text_size, 'px-2']">{{ message }}</span>
</template>

<style scoped>

</style>