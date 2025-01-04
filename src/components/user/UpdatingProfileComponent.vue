<script>
import axios from "axios";
import {useRoute} from "vue-router";
import {AuthenticateService} from "@/services/AuthenticateService";

export default {
  name: "UpdatingProfileView",
  methods: {
    updateProfileData() {
      axios.post(process.env.VUE_APP_API_URL + "/auth/user/update", this.model)
          .then((response) => {
            console.log(response.data);
          })
    },
    getUser() {
      axios.get(process.env.VUE_APP_API_URL + "/user/get?id=" + AuthenticateService.extractId())
          .then((response) => {
            this.model = response.data.public_data;
          })
    }
  },
  data() {
    return {
      id: '',
      model: {
        first_name: "",
        last_name: "",
        middle_name: "",
        title: "",
        description: "",
      }
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
  <div class="flex flex-col py-6 justify-center items-center  w-full pb-8">
    <p class="font-bold text-xl">Customization</p>
    <div class=" w-full max-w-6xl pt-6">
      <div class="laptop:col-span-1 flex flex-col pb-4 mx-4">
        <p class="laptop:text-2xl md:text-sm font-bold p-4">Profile Card</p>
        <div class=" w-full grid grid-cols-3 rounded-2xl p-2 ">
          <div class="flex flex-row justify-center items-center">
            <img class="laptop:w-40 md:w-36 px-2 h-full" src="../../assets/avatar.svg" alt="Profile"/>
          </div>
          <div class="col-span-2 flex-col justify-center items-end flex gap-2">
            <button @click="updateProfileData"
                    class="bg-black h-8 text-white items-center justify-center flex w-40 md:text-sm rounded-2xl">
              Update
            </button>
            <router-link :to="'/user/' + id">

              <div class="border-black border-2 items-center justify-center flex w-40 md:text-sm rounded-2xl">
                <p class="text-lg">Cancel</p>
              </div>
            </router-link>

          </div>
          <div class="col-span-3 space-y-2 pt-6">
            <input v-model="model.first_name"
                   type="text"
                   placeholder="First Name"
                   class="w-full px-4 py-2 border bg-[#f7f7f7] rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input v-model="model.middle_name"
                   type="text"
                   placeholder="Middle Name"
                   class="w-full px-4 py-2 border bg-[#f7f7f7] rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            /><input v-model="model.last_name"
                     type="text"
                     placeholder="Last Name"
                     class="w-full px-4 py-2 border bg-[#f7f7f7] rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />

            <input v-model="model.title"
                   type="text"
                   placeholder="Profile Title"
                   class="w-full px-4 py-2 border bg-[#f7f7f7] rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />

            <textarea v-model="model.description"
                      placeholder="Bio"
                      class="w-full px-4 py-2 border bg-[#f7f7f7] rounded-md focus:outline-none focus:ring focus:ring-gray-300 resize-none h-32"
            ></textarea>
          </div>
          <!--          <div class="pt-4">-->
          <!--            <div class="flex gap-2 flex-row justify-center items-center">-->
          <!--              <img class="w-8 h-full " src="./../../assets/comp/317750_linkedin_icon.png" alt="LinkedIn"/>-->
          <!--              <input v-model="model.title"-->
          <!--                     type="text"-->
          <!--                     placeholder="LinkedIn"-->
          <!--                     class="w-full  px-4 py-2  "-->
          <!--              />-->
          <!--            </div>-->

          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>