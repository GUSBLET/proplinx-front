<script>
import linkedin from "../../../assets/settings/socials/linkedin.svg";
import facebook from "../../../assets/settings/socials/facebook.svg";
import twitter from "../../../assets/settings/socials/twitter.svg";
import instagram from "../../../assets/settings/socials/instagram.svg";


export default {
  name: "SocialAccountsComponent",
  data() {
    return {
      socials: [
        linkedin,
        facebook,
        twitter,
        instagram,
      ],
      isModalOpen: false
    }
  },
  methods: {
    openModal() {
      this.$emit('open-modal', 'social-accounts');
    }
  }
}
</script>

<template>
  <div class="laptop:col-span-1 flex flex-col pb-4 mx-4">
    <p class="laptop:text-xl md:text-sm font-bold  pb-4">Connect Your Social Accounts</p>
    <div class="bg-[#f3f2fa] rounded-2xl p-4 flex flex-col  justify-center">
      <p class="font-bold">Add socials</p>
      <div class="inline-table text-[10px] text-[#8c8c8c]">
        <p class="inline">
          This information will not be shared outside of PropLinx without your permission.
          It is used according to PropLinx's
        </p>
        <p class="inline text-black ml-1">Privacy Policy</p>
      </div>
      <div class="flex flex-row justify-center gap-2 items-center py-2 border-b-2">
        <img v-for="(social, index) in socials" :key="index" class="cursor-pointer" :src="social" alt="">
      </div>
      <p @click="openModal" class="text-center flex cursor-pointer justify-center items-center">Add more socials</p>
    </div>
  </div>


</template>

<style scoped>

</style>