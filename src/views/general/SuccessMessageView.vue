<script>
import LogoComponent from "@/components/form/LogoComponent.vue";

export default {
  name: "SuccessMessageView",
  components: {LogoComponent}
}
</script>

<template>
  <div class="flex flex-col pt-20 justify-center items-center w-full">
    <logo-component/>
    <p>Your request </p>
  </div>
</template>

<style scoped>

</style>