<script>
import LogoComponent from "@/components/form/LogoComponent.vue";
import {AuthenticateService} from "@/services/AuthenticateService";
import zillowIcon from "@/assets/settings/providers/zillow.svg";
import realtorIcon from "@/assets/settings/providers/realtor_dot_com.svg";

export default {
  name: "NavBarComponent",
  components: {LogoComponent},
  methods: {
    openCloseNavBar() {
      this.isOpened = !this.isOpened;
    },
    checkAuthStatus() {
      this.isUnauthenticated = AuthenticateService.getAuthToken() == null;
    },
    logout() {
      AuthenticateService.logout();
      this.openCloseNavBar();
      this.$router.push("/user/sign-in");
    }
  },
  data() {
    return {
      id: null,
      isOpened: false,
      isUnauthenticated: true,
      common_links: [
        {
          icon: zillowIcon,
          name: "Connect",
          ref: null
        },
        {
          name: "Customization",
          icon: realtorIcon,
          ref: null
        },
        {
          name: "Settings",
          icon: realtorIcon,
          ref: null
        }
      ],
    }
  },
  beforeMount() {
    this.id = AuthenticateService.extractId() ?? ''
    this.checkAuthStatus();
    if (this.id != null) {
      this.common_links.forEach((link) => {
        link.ref = `/user/${this.id}/${link.name.toLowerCase()}`
      })
    }
  }
}
</script>

<template>
  <header class="grid grid-cols-3 gap-2 pt-4 border-b-2">

    <!--    Logo-->
    <div class="md:p-2 flex-row flex items-center justify-center">
      <logo-component class="w-32 h-auto"/>
    </div>

    <div>
      <div v-if="isUnauthenticated">

      </div>
      <div v-else class="md:hidden my-4 md:justify-end md:items-end flex-row laptop:flex items-center justify-center pt-1">
        <router-link v-for="(link, index) in common_links" :key="index" :to="link.ref" class="px-4">
          <p class="text-base">{{ link.name }}</p>
        </router-link>
      </div>
    </div>

    <div v-if="isUnauthenticated" class="md:hidden  laptop:flex flex-row items-center justify-center col-start-3">
      <router-link to="/user/sign-in">
        <div class="bg-white pr-6 ">
          <p class="text-base">Login</p>
        </div>
      </router-link>
      <router-link to="/user/sign-up">
        <div class="flex items-center justify-center bg-white rounded-2xl h-10 w-36 border-black border-2">
          <p class="font-bold text-base">Sign Up</p>
        </div>
      </router-link>
    </div>
    <div v-else class="md:hidden  laptop:flex flex-row items-center justify-center col-start-3">
      <router-link :to="`/user/${this.id}/profile`">
        <div class="flex items-center justify-center bg-white rounded-2xl h-10 w-36 border-black border-2">
          <p class="font-bold text-base">Profile</p>
        </div>
      </router-link>
    </div>
    <div @click="openCloseNavBar" class="md:flex flex-row items-center justify-end col-start-3 pr-6 laptop:hidden">
      <img src="./../../../public/burger_menu.svg" alt=""/>
    </div>
  </header>
  <Teleport to="body">
    <div v-if="isOpened" class="absolute top-16 right-0 h-screen w-screen z-50 transition-all duration-300">
      <div class="flex h-full ">
        <div @click="openCloseNavBar" class="bg-gray-800 w-1/3 h-full p-4 opacity-50">
        </div>
        <div class="bg-white w-2/3 h-full py-6 px-4 rounded-md flex flex-col items-center relative">
          <div v-if="isUnauthenticated" class="flex flex-row gap-2">
            <router-link to="/user/sign-in" @click="openCloseNavBar">
              <div
                  class="w-[100px] rounded-lg pt-2 pb-2 border-black border-2 flex items-center justify-center text-base">
                <p class="text-xl font-bold">Sign In</p>
              </div>
            </router-link>
            <p class="text-3xl">/</p>
            <router-link to="/user/sign-up" @click="openCloseNavBar">
              <div
                  class="w-[100px] rounded-lg pt-2 pb-2 border-black border-2 flex items-center justify-center text-base">
                <p class="text-xl font-bold">Sign Up</p>
              </div>
            </router-link>
          </div>
          <div v-else class="flex flex-row gap-2">
            <div @click="logout"
                 class="w-[100px] rounded-lg pt-2 pb-2 border-black border-2 bg-black text-white flex items-center justify-center text-base">
              <p class="text-xl font-bold">Log out</p>
            </div>
            <p class="text-3xl">/</p>
            <router-link :to="`/user/${this.id}/profile`" @click="openCloseNavBar">
              <div
                  class="w-[100px] rounded-lg pt-2 pb-2 border-black border-2 flex items-center justify-center text-base">
                <p class="text-xl font-bold">Profile</p>
              </div>
            </router-link>
          </div>
          <div v-if="isUnauthenticated">

          </div>
          <div v-else class="gap-2 justify-start flex flex-col items-start py-4 px-8 w-full">
            <router-link @click="openCloseNavBar" v-for="(link, index) in common_links" :key="index" :to="link.ref" class="block">
              <p class="font-bold">{{ link.name }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Teleport>


</template>


<style scoped>
.fixed {
  transition: opacity 0.3s ease;
}

.bg-opacity-50 {
  opacity: 0;
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter, .v-leave-to {
  opacity: 0;
}
</style>