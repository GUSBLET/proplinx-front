<script>
import LogoComponent from "@/components/form/LogoComponent.vue";
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import NavBarComponent from "@/components/general/NavBarComponent.vue";
import {Field, Form} from "vee-validate";
import axios from "axios";
import * as yup from "yup";
import PasswordInputComponent from "@/components/form/inputs/PasswordInputComponent.vue";
import FormMessage from "@/components/form/FormMessage.vue";

export default {
  name: "PasswordRecoveryView",
  data() {
    return {
      password: null,
      confirmPassword: null,
      message: "",
    }
  },
  methods: {
    sendRequest() {
      axios.post(`${process.env.VUE_APP_API_URL}/user/recover-password`, {
        password: this.password,
        token: this.token,
      })
          .then((response => {
            if (response.status === 200) {
              this.$router.push('/user/sign-in');
            }
          }))
          .catch((error) => {
            if (error.response.status === 404) {
              this.message = error.response.data.message;
            }
          })
    }
  },
  computed: {
    schema() {
      return yup.object().shape({
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Password confirmation is required"),
      });
    },
    token() {
      return this.$route.query.token;
    }
  },
  components: {FormMessage, Form, PasswordInputComponent, Field, NavBarComponent, ButtonComponent, LogoComponent}
}
</script>

<template>
  <nav-bar-component>
  </nav-bar-component>
  <div class='flex flex-col items-center justify-center'>
    <logo-component class="w-44 pb-10 h-auto pt-20 "/>
    <div class='flex flex-col items-center w-[430px] md:w-[380px] justify-center text-center'>
      <p class="text-4xl font-bold md:text-2xl">Recover password</p>
      <p class="text-lg text-gray-500 md:text-sm">Key in a new password to recover password.</p>
    </div>
    <div class="md pt-6 md:w-[370px] laptop:w-[430px]">
      <Form @submit="sendRequest" :validation-schema="schema">
        <form-message :color="'text-red-500'" :error-message="message"/>
        <Field name="password" v-slot="{ field, errors }">
          <password-input-component :error-messages="errors" placeholder="Enter your password" v-bind="field"
                                    v-model="password"/>
        </Field>
        <Field name="confirmPassword" v-slot="{ field, errors }">
          <password-input-component :error-messages="errors" placeholder="Confirm your password" v-bind="field"
                                    v-model="confirmPassword"/>
        </Field>
        <button-component type="submit" text="Recover password"/>
      </Form>
    </div>
  </div>
</template>

<style scoped>

</style>