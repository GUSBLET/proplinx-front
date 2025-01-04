<script>

import loopnetIcon from "@/assets/settings/providers/loopnet.svg";
import realtorIcon from "@/assets/settings/providers/realtor_dot_com.svg";
import zillowIcon from "@/assets/settings/providers/zillow.svg";

export default {
  name: "ConnectProvidersView",
  data() {
    return {
      providers: [
        {
          icon: zillowIcon,
          name: "Zillow"
        },
        {
          name: "Loopnet",
          icon: loopnetIcon
        },
        {
          name: "Realtor",
          icon: realtorIcon,
        },
      ],
    }
  }
}
</script>

<template>
  <div class="flex flex-col py-6 justify-center items-center  w-full">
    <p class="font-bold text-xl">Connect</p>
    <div class="flex laptop:flex-col gap-4 w-full max-w-6xl">
      <div class="laptop:col-span-1 flex flex-col pb-4 mx-4 py-6">
        <p class="laptop:text-2xl md:text-md font-bold  pb-4">Connect your accounts</p>
        <div class="bg-[#f3f2fa] font-light rounded-2xl p-4 flex flex-col justify-center">
          <p class="text-[14px]">Easily link your social media profiles and other professional accounts to manage all
            your interactions from
            one place.</p>
          <div class="grid grid-cols-3 gap-2 pt-2">
            <div v-for="(setting, index) in providers" :key="index"
                 class="bg-white rounded-xl p-2 flex-row flex justify-center items-center">
              <img :src="setting.icon" :alt="setting.name" class="mr-2"/>
              <p class="font-bold">{{ setting.name }}</p>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>