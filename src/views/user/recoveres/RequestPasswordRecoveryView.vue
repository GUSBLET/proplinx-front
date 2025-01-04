<script>
import LogoComponent from "@/components/form/LogoComponent.vue";
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import NavBarComponent from "@/components/general/NavBarComponent.vue";
import EmailInputComponent from "@/components/form/inputs/EmailInputComponent.vue";
import {Field, Form} from "vee-validate";
import axios from "axios";
import * as yup from "yup";
import FormMessage from "@/components/form/FormMessage.vue";

export default {
  name: "RequestPasswordRecoverView",
  data() {
    return {
      username: null,
      message: "",
      isError: false,
    };
  },
  methods: {
    sendRequest() {
      this.isError = false;
      axios.get(`${process.env.VUE_APP_API_URL}/user/request/recover-password?username=${this.username}`)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({name: 'SuccessCheckEmail'});
            }
          })
          .catch((error) => {
            if (error.status === 404) {
              this.isError = true;
              this.message = error.response.data;
            }
          });
    },
    goBack() {
      this.$router.back();
    },
  },
  computed: {
    schema() {
      return yup.object().shape({
        username: yup.string().required("Email is required").email("Must be a valid email"),
      });
    },
  },
  components: {FormMessage, Form, Field, EmailInputComponent, NavBarComponent, ButtonComponent, LogoComponent},
};
</script>

<template>
  <nav-bar-component></nav-bar-component>
  <div class="flex flex-col items-center justify-center">
    <logo-component class="w-44 pb-10 h-auto pt-20"/>
    <div class="flex flex-col items-center w-[430px] md:w-[380px] justify-center text-center">
      <p class="text-4xl font-bold md:text-2xl">Recover password</p>
      <p class="text-lg text-gray-500 md:text-sm">Enter your email and tap on button to send recovery token.</p>
    </div>
    <div class="md pt-6 md:w-[370px] laptop:w-[430px]">
      <Form @submit="sendRequest" :validation-schema="schema">
        <form-message v-if="isError" :color="'text-red-500'" :message="message"/>
        <Field name="username" v-slot="{ field, errors }">
          <email-input-component :error-messages="errors" placeholder="Enter your email" v-bind="field" v-model="username"/>
        </Field>
        <button-component text="Send code"/>
      </Form>
    </div>
    <p @click="goBack" class="pt-4 cursor-pointer underline text-lg">Go back</p>
  </div>
</template>

<style scoped>
</style>
