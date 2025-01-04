<script>
import EmailInputComponent from "@/components/form/inputs/EmailInputComponent.vue";
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import {Field, Form} from "vee-validate";
import * as yup from "yup";
import {AuthenticateService} from "@/services/AuthenticateService";

export default {
  name: "ChangeEmailModalComponent",
  components: {Field, Form, ButtonComponent, EmailInputComponent},
  data() {
    return {
      currentEmail: '',
      form: {
        currentEmail: '',
        newEmail: '',
      }
    }
  },
  methods: {
    sendRequest() {

    },
    getCurrentEmailFromToken() {
      this.currentEmail = AuthenticateService.extractEmail();
    }
  },
  mounted() {
    this.getCurrentEmailFromToken();
  },
  computed: {
    schema() {
      return yup.object().shape({
        currentEmail: yup.string().required("Current email is required").email("Must be a valid email"),
        newEmail: yup.string().required("Enter new email is required").email("Must be a valid email"),
      });
    },
  }
}
</script>

<template>
  <div class="flex flex-col">
    <p class="pb-2 pl-1 laptop:text-lg sm:text-lg">Current email: </p>
    <div class="bg-gray-100 rounded-2xl p-4 flex flex-col justify-center">
      <p class="laptop:text-lg sm:text-[14px]">{{ currentEmail }}</p>
    </div>
    <div class="border-b-[1px] border-black my-4"></div>
    <Form @submit="sendRequest" :validation-schema="schema">
      <Field name="currentEmail" v-slot="{ field, errors }">
        <email-input-component v-model="form.currentEmail" :error-messages="errors" v-bind="field" label="Enter current email to confirm this action:" placeholder="Enter current email"/>
      </Field>
      <Field name="newEmail" v-slot="{ field, errors }">
        <email-input-component v-model="form.newEmail" :error-messages="errors" v-bind="field" label="Enter new email:" placeholder="Enter new email"/>
      </Field>
      <button-component text="Submit" type="submit"/>
    </Form>
  </div>
</template>

<style scoped>

</style>