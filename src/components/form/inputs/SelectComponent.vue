<script>
export default {
  name: "SelectComponent",
  props: {
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Choose something..."
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, String],
      default: ""
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-between w-full pb-2">
    <label>{{ label }}</label>
    <select class="border-black border-2 w-full h-12 rounded-xl placeholder-gray-500 pl-8">
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-left: 2rem;
}
</style>