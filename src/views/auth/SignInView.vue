<script>
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import LogoComponent from "@/components/form/LogoComponent.vue";
import * as yup from "yup";
import PasswordInputComponent from "@/components/form/inputs/PasswordInputComponent.vue";
import axios from "axios";
import CookieService from "@/services/CookieService";
import {Field, Form} from "vee-validate";
import FormMessage from "@/components/form/FormMessage.vue";
import NavBarComponent from "@/components/general/NavBarComponent.vue";
import {AuthenticateService} from "@/services/AuthenticateService";
import TextInputComponent from "@/components/form/inputs/TextInputComponent.vue";

export default {
  name: "SignInView",
  components: {
    TextInputComponent,
    NavBarComponent,
    FormMessage, Field, Form, PasswordInputComponent, LogoComponent, ButtonComponent
  },
  methods: {
    preAuthenticate() {
      this.errorMessage = '';
      axios.get(process.env.VUE_APP_API_URL + "/auth/pre-authenticate?username=" + this.username)
          .then((response) => {
            if (response.status === 200) {
              this.usernameIsValid = true;
              this.errorMessage = '';
            }
          })
          .catch((reason) => {
            if (reason.status === 404) {
              this.errorMessage = reason.response.data;
            }
          });
    },
    authenticate() {
      axios.post(process.env.VUE_APP_API_URL + "/auth/authenticate", {
        username: this.username,
        password: this.password,
      }).then((response) => {
        if (response.status === 200) {
          CookieService.setCookieWithExpiration('auth_token', response.data.access_token, 900)
          CookieService.setCookieWithExpiration('refresh_token', response.data.refresh_token, 2592000)
          this.$router.push(`/user/${AuthenticateService.extractId()}/profile`);
        }
      }).catch(() => {
        this.errorMessage = "Password is incorrect";
        this.passwordIsIncorrect = true;
      })
    }
  },
  data() {
    return {
      usernameIsValid: false,
      passwordIsIncorrect: false,
      username: "",
      password: "",
      errorMessage: "",
    }
  },
  computed: {
    schemaPreAuthenticate() {
      return yup.object().shape({
        username: yup.string().required("Email is required"),
      });
    },
    schemaAuthenticate() {
      return yup.object().shape({
        password: yup.string().required("Password is required"),
      });
    },
  }
}
</script>

<template>
  <nav-bar-component>
  </nav-bar-component>
  <div class='flex flex-col items-center justify-center'>
    <logo-component class="w-44 pb-10 h-auto pt-20 "/>
    <div class='flex flex-col items-center w-[430px] md:w-[380px] justify-center text-center'>
      <p class="text-4xl font-bold md:text-2xl">Login to Your Account</p>
      <p class="text-lg text-gray-500 md:text-sm">Sign in to showcase properties, manage listings, and connect with
        clients.</p>
    </div>
    <div
        class="hover:bg-gray-100 mt-6 rounded-xl laptop:w-[430px] md:w-[370px] border-2 border-black h-12 flex flex-row items-center justify-center hover:cursor-pointer">
      <div class="w-5 h-5 mr-6">
        <img src="../../assets/icons8-google-50.png" alt="">
      </div>
      <p class="font-medium text-black">Sign in with Google</p>
    </div>
    <div class="flex flex-row items-center justify-center p-4 laptop:w-[450px] md:w-[370px]">
      <hr class="border-t-2 border-black w-1/2 mr-2"/>
      <p class="text-lg">Or</p>
      <hr class="border-t-2 border-black w-1/2 ml-2"/>
    </div>

    <!--    Authenticate form-->
    <div v-if="!usernameIsValid" class="md md:w-[370px] laptop:w-[430px]">
      <Form @submit="preAuthenticate" :validation-schema="schemaPreAuthenticate">
        <form-message :color="'text-red-500'" :message="errorMessage"/>
        <Field name="username" v-slot="{ field, errors }">
          <text-input-component :error-messages="errors" placeholder="Enter your login" v-bind="field"
                                v-model="username"/>
        </Field>
        <button-component type="submit" text="Sign in"/>
      </Form>
    </div>

    <div v-else class="md md:w-[370px] laptop:w-[430px]">
      <Form @submit="authenticate" :validation-schema="schemaAuthenticate">
        <form-message :color="'text-red-500'" :message="errorMessage"/>
        <Field name="password" v-slot="{ field, errors }">
          <password-input-component :error-messages="errors" v-bind="field" v-model="password"
                                    placeholder="Enter your password"/>
        </Field>
        <button-component text="Authenticate"/>
      </Form>
    </div>

    <router-link v-if="passwordIsIncorrect" to="/user/request/recover-password" class="flex flex-row items-center justify-center pt-2">
      <p class="text-lg underline">Forget the password?</p>
    </router-link>
    <router-link to="/user/sign-up" class="flex flex-row items-center justify-center pt-2">
      <p class="text-xs text-gray-500 pr-1">Don’t have an account? </p>
      <p class="text-xs">Sign Up</p>
    </router-link>
  </div>
</template>

<style scoped>

</style>