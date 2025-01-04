<script>
import FormMessage from "@/components/form/FormMessage.vue";

export default {
  name: "PhoneInputComponent",
  components: {FormMessage},
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
    hasError() {
      return this.errorMessages.length > 0;
    },
    maskedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("update:modelValue", this.applyMaskToValue(newValue));
      },
    },
  },
  methods: {
    applyMask(event) {
      let rawValue = event.target.value.replace(/\D/g, "");

      if (rawValue.length <= 3) {
        rawValue = rawValue.replace(/(\d{1,3})/, "$1");
      } else if (rawValue.length <= 6) {
        rawValue = rawValue.replace(/(\d{3})(\d{1,3})/, "$1-$2");
      } else {
        rawValue = rawValue.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
      }

      this.value = rawValue.substring(0, 12);
    },
    applyMaskToValue(value) {
      let rawValue = value.replace(/\D/g, "");

      if (rawValue.length <= 3) {
        rawValue = rawValue.replace(/(\d{1,3})/, "$1");
      } else if (rawValue.length <= 6) {
        rawValue = rawValue.replace(/(\d{3})(\d{1,3})/, "$1-$2");
      } else {
        rawValue = rawValue.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
      }

      return rawValue.substring(0, 12);
    },
  },
};
</script>

<template>
  <div class="flex flex-col justify-between pb-2">
    <label class="pl-1 pb-2 laptop:text-lg sm:text-[14px]">{{ label }}</label>
    <div :class="['flex items-center text-gray-500 border-2 w-full pl-4 h-10 rounded-xl gap-2',  hasError ? 'border-red-500' : 'border-black']">
      <p>+1</p>
      <input
          class="placeholder-gray-500 focus:outline-none"
          type="text"
          :placeholder="placeholder"
          v-model="maskedValue"
          @input="applyMask"
      />
    </div>
    <form-message :color="'text-red-500'" :message="errorMessages[0]"/>
  </div>
</template>

<style scoped>

</style>