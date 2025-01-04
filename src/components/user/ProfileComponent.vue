<script>
import axios from "axios";
import {useRoute} from "vue-router";

export default {
  name: "ProfileComponent",
  data() {
    return {
      id: null,
      isCollageSection: false,
      userData: {
        public_data: {
          first_name: null,
          middle_name: null,
          last_name: null,
          title: null,
        },
        private_data: null,
      }
    }
  },
  props: {},
  methods: {
    chooseCollageSection() {
      this.isCollageSection = true;
    },
    chooseListingSection() {
      this.isCollageSection = false;
    },
    getUser() {
      axios.get(process.env.VUE_APP_API_URL + "/user/get?id=" + this.id)
          .then((response) => {
            this.userData = response.data;
          })
          .catch(() => {
            this.$router.push('/');
          })
    }
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.getUser();
  },
}
</script>

<template>
  <div class="flex flex-col py-6 justify-center items-center  w-full">
    <p class="font-bold text-xl">Appearance</p>
    <div class="laptop:grid laptop:grid-cols-3 gap-4 w-full max-w-6xl">
      <div class="laptop:col-span-1 flex flex-col pb-4 mx-4">
        <p class="laptop:text-2xl md:text-sm font-bold  pb-4">Profile Card</p>
        <div class="bg-[#f3f2fa] w-full rounded-2xl p-2 ">
          <div class="flex flex-row justify-center items-center">
            <img class="laptop:w-40 md:w-36 px-2 h-full" src="./../../assets/avatar.svg" alt="Profile"/>
            <div>
              <p class="text-black md:text-lg laptop: text-3xl font-bold">{{
                  userData.public_data.first_name ?? 'User'
                }}
                {{ userData.public_data.middle_name ?? '' }} {{ userData.public_data.last_name ?? '01' }}</p>
              <p class="text-gray-400 md:text-xs pb-2 ">{{ userData.public_data.title ?? 'Real Estate Agent' }} </p>
              <div class="bg-white rounded-lg grid grid-cols-3 gap-2 p-2">
                <div>
                  <p class="text-gray-400 md:text-xs text-md">Listing</p>
                  <p class="font-bold md:text-xs text-lg">24</p>
                </div>
                <div>
                  <p class="text-gray-400 md:text-xs text-md">Followers</p>
                  <p class="font-bold md:text-xs text-lg">245</p>
                </div>
                <div>
                  <p class="text-gray-400 md:text-xs text-md"> Popularity</p>
                  <p class="font-bold md:text-xs text-lg">5.6</p>
                </div>
              </div>
              <div class="flex flex-row items-center gap-2 p-2">
                <router-link to="">
                  <img class="w-4 h-full" src="./../../assets/comp/317750_linkedin_icon.png" alt="LinkedIn"/>
                </router-link>
                <router-link to="">
                  <img class="w-4 h-full" src="./../../assets/comp/zillow-seeklogo.svg" alt="LinkedIn"/>
                </router-link>

                <!--                &lt;!&ndash;                TODO change&ndash;&gt;-->
                <!--                <router-link to="">-->
                <!--                  <img class="w-4 h-full" src="./../../assets/comp/317750_linkedin_icon.png" alt="LinkedIn"/>-->
                <!--                </router-link>-->
                <!--                <router-link to="">-->
                <!--                  <img class="w-4 h-full" src="./../../assets/comp/zillow-seeklogo.svg" alt="LinkedIn"/>-->
                <!--                </router-link>-->
              </div>
              <div class="flex flex-row gap-2 mt-1">

                <!--                <button class="bg-black text-white laptop:w-20 md:w-16 md:text-sm rounded-lg">Connect</button>-->
                <!--                <button class="border-black border-2 w-20 md:w-16 md:text-sm rounded-lg">Follow</button>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col col-span-2 mx-4">
        <p class="text-2xl md:text-sm font-bold pb-4">Manage Listing View</p>
        <div class="flex flex-col items-start justify-start px-4 rounded-3xl py-4 gap-4 bg-[#f3f2fa] ">
          <div class="flex-row flex items-start justify-start gap-4">
            <div @click="chooseCollageSection"
                 class="bg-white px-4 py-1 flex flex-col items-center cursor-pointer rounded-3xl justify-center">
              <p class="text-xl md:text-sm">Listing Showcase</p>
            </div>
            <div @click="chooseListingSection"
                 class="bg-white px-4 py-1 flex flex-col items-center cursor-pointer rounded-3xl justify-center">
              <p class="text-xl md:text-sm">Available Listings</p>
            </div>
          </div>
          <div v-if="isCollageSection">
            <div v-for="q in 2" :key="q" class="grid grid-cols-3 gap-4">
              <div class="col-span-2 w-full">
                <img
                    src="./../../assets/profile/img.png"
                    alt="Profile"
                    class="w-full h-full object-cover rounded"
                />
              </div>
              <div class="grid grid-rows-2 gap-4">
                <div class=" w-full">
                  <img
                      src="./../../assets/profile/img_1.png"
                      alt="Profile"
                      class="w-full h-full object-cover rounded"
                  />
                </div>
                <div class="w-full">
                  <img
                      src="./../../assets/profile/img_2.png"
                      alt="Profile"
                      class="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else v-for="n in 3" :key="n" class="flex mx-1 flex-col items-center justify-center  ">
            <div class="bg-white flex flex-row items-center justify-center rounded-2xl">
              <div class="overflow-hidden w-2/5 h-full flex m-2 items-center justify-center">
                <img class="object-cover rounded-xl" src="./../../assets/profile/img_3.png" alt="Profile"/>
              </div>
              <div class="w-3/5 mb-auto flex flex-col">
                <div class="flex items-center gap-2">
                  <p class="font-bold md:text-[10px] text-2xl">Heights Residence</p>
                  <p class="text-xl md:text-[10px] text-green-800 font-bold">$900,000</p>
                  <!--                  <div class="ml-auto mr-4">-->
                  <!--                    <img class="w-full laptop:h-6 md:h-3" src="./../../../public/trash.png" alt="Trash Residence"/>-->
                  <!--                  </div>-->
                </div>
                <p class="laptop:text-xl md:text-[10px] text-gray-400">1234 Maple Avenue, Springfield, IL 62704, USA</p>
                <div class="flex-row flex items-center gap-2">
                  <div class="flex flex-row gap-1">
                    <img class="w-[20px] md:w-[14px] h-full" src="./../../../public/bad_rooms.svg" alt="bad rooms"/>
                    <p class="laptop:text-md md:text-[6px]">6 Bedrooms</p>
                  </div>
                  <div class="flex flex-row gap-1">
                    <img class="w-[20px] md:w-[14px] h-full" src="./../../../public/bath_rooms.svg" alt="bad rooms"/>
                    <p class="laptop:text-md md:text-[6px]">9 Bathrooms</p>
                  </div>
                  <div class="flex flex-row gap-1">
                    <img class="w-[20px] md:w-[14px] h-full" src="./../../../public/building_area.svg" alt="bad rooms"/>
                    <p class="laptop:text-md md:text-[6px]">3000 Square feet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>