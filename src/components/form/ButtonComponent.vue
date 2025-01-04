<script>
export default {
  name: "ButtonComponent",
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  methods: {
    handleClick() {
      this.$emit('button-clicked');
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-between  ">
    <button @click="handleClick"
            class="hover:bg-gray-800 border-black border-2 w-full h-12 bg-black rounded-xl text-gray-50"
            type="submit">{{ text }}
    </button>
  </div>
</template>

<style scoped>

</style>