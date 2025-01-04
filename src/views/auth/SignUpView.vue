<script>
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import EmailInputComponent from "@/components/form/inputs/EmailInputComponent.vue";
import PasswordInputComponent from "@/components/form/inputs/PasswordInputComponent.vue";
import {Field, Form} from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import NavBarComponent from "@/components/general/NavBarComponent.vue";
import LogoComponent from "@/components/form/LogoComponent.vue";
import TextInputComponent from "@/components/form/inputs/TextInputComponent.vue";

export default {
  name: "SignUpView",
  components: {
    TextInputComponent,
    LogoComponent,
    NavBarComponent,
    Field,
    Form,
    PasswordInputComponent,
    EmailInputComponent,
    ButtonComponent
  },
  methods: {
    onSubmit() {
      axios.post(process.env.VUE_APP_API_URL + "/auth/sign-up", {
        email: this.email,
        login: this.login,
        password: this.password,
      }).then((response) => {
        if (response.status === 200) {
          this.$router.push('/user/sign-in');
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  data() {
    return {
      email: "",
      login: "",
      password: "",
      passwordConfirm: "",
    };
  },
  computed: {
    schema() {
      return yup.object().shape({
        email: yup.string().required("Email is required").email("Must be a valid email"),
        login: yup.string().required("Login is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Password confirmation is required"),
      });
    },
  },
}
</script>

<template>
  <nav-bar-component/>
  <div class="flex flex-col items-center justify-center">
    <logo-component class="w-44 h-auto py-10"/>
    <div class="flex flex-col items-center  w-[430px] justify-center text-center">
      <p class="text-4xl font-bold md:text-2xl">Create an account</p>
      <p class="text-lg text-gray-500 md:text-sm ">Sign up with your primary or work email to get started.</p>
    </div>
    <div class="md:w-[370px] laptop:w-[430px] pt-4">
      <Form @submit="onSubmit" :validation-schema="schema">
        <Field name="email" v-slot="{ field, errors }">
          <email-input-component :error-messages="errors" placeholder="Enter your email" v-bind="field"
                                 v-model="email"/>
        </Field>
        <Field name="login" v-slot="{ field, errors }">
          <text-input-component :error-messages="errors" placeholder="Enter your login" v-bind="field"
                                v-model="login"/>
        </Field>
        <Field name="password" v-slot="{ field, errors }">
          <password-input-component v-bind="field"
                                    :error-messages="errors"
                                    v-model="password"
                                    placeholder="Enter password"/>
        </Field>
        <Field name="passwordConfirm" v-slot="{ field, errors }">
          <password-input-component :error-messages="errors"
                                    v-bind="field"
                                    v-model="passwordConfirm"
                                    placeholder="Confirm password"/>
        </Field>
        <button-component type="submit" text="Submit"/>
      </Form>
    </div>
    <div class="flex flex-row items-center justify-center pt-2">
      <p class="text-xs text-gray-500 pr-1">Don’t have an account?</p>
      <router-link to="/user/sign-in" class="text-xs">Sign In</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>