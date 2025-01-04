<script>
import LogoComponent from "@/components/form/LogoComponent.vue";
import NavBarComponent from "@/components/general/NavBarComponent.vue";

export default {
  name: "SuccessMessageCheckEmailView",
  components: {NavBarComponent, LogoComponent}
}
</script>

<template>
  <nav-bar-component/>
  <div class="flex flex-col laptop:pt-[35vh] gap-4 sm:pt-[20vh] justify-center items-center w-full">
    <logo-component/>
    <p class="laptop:text-3xl sm:px-6 sm:text-lg text-center">Your action is successful check your email to
      continue.</p>
  </div>
</template>

<style scoped>

</style>