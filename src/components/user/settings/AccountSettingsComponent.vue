<script>
import emailIcon from "../../../assets/settings/account/email.svg";
import passwordIcon from "../../../assets/settings/account/password.svg";
import avatarIcon from "../../../assets/settings/account/avatar.svg";
import phoneIcon from "../../../assets/settings/account/phone.svg";


export default {
  name: "AccountSettingsComponent",
  data() {
    return {
      settings: [
        {
          name: "Email",
          icon: emailIcon,
          action: () => {
            this.$emit('requestChangeModalSection', 'change-email');
          }
        },
        {
          name: "Phone number",
          icon: phoneIcon,
          action: () => {
            this.$emit('requestChangeModalSection', 'change-phone');
          }
        },
        {
          name: "Password",
          icon: passwordIcon,
          action: () => {
            this.$router.push("/user/request/recover-password");
          }
        },
        {
          name: "Profile Picture",
          icon: avatarIcon
        },
      ],
    }
  },
  methods: {
    doAction() {

    }
  }
}
</script>

<template>
  <div class="laptop:col-span-1 flex flex-col pb-4 mx-4">
    <p class="laptop:text-xl md:text-sm font-bold  pb-4">Account Settings</p>

    <div class="bg-[#f3f2fa] rounded-2xl text-[#8c8c8c] px-2 flex flex-col justify-center">
      <div v-for="(setting, index) in settings" :key="index" @click="setting.action" :class="[index !== settings.length-1 ? 'border-b-2' : '',' flex-row hover:font-bold cursor-pointer transition-all duration-100 flex items-center w-full p-2']">
        <img :src="setting.icon" :alt="setting.name" class="mr-2"/>
        <p>{{ setting.name }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>