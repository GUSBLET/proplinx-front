<script>


import NavBarComponent from "@/components/general/NavBarComponent.vue";

export default {
  name: "ProfileView",
  components: {NavBarComponent},
  computed: {},

}
</script>

<template>
  <nav-bar-component/>
  <router-view></router-view>
</template>

<style scoped>

</style>