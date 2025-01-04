<script>
import FormMessage from "@/components/form/FormMessage.vue";

export default {
  name: "TextInputComponent",
  components: {FormMessage},
  props: {
    label: {
      type: String
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: ""
    },
    errorMessages: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      }
    },
    hasError() {
      return this.errorMessages.length > 0;
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-between w-full pb-2">
    <label class="">{{ label }}</label>
    <input class="border-black border-2 w-full h-12 rounded-xl placeholder-gray-500 pl-8" type="text" :placeholder="placeholder" v-model="value"/>
    <form-message :color="'text-red-500'" :message="errorMessages[0]"/>
  </div>
</template>

<style scoped>

</style>