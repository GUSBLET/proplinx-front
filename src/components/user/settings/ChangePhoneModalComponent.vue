<script>
import ButtonComponent from "@/components/form/ButtonComponent.vue";
import {Field, Form} from "vee-validate";
import * as yup from "yup";
import PhoneInputComponent from "@/components/form/inputs/PhoneInputComponent.vue";

export default {
  name: "ChangePhoneModalComponent",
  components: {PhoneInputComponent, Field, Form, ButtonComponent},
  data() {
    return {
      currentPhone: '',
      form: {
        currentPhone: '',
        newPhone: '',
      }
    }
  },
  methods: {
    sendRequest() {

    },
    getCurrentPhone() {
    }
  },
  mounted() {
    this.getCurrentPhone();
  },
  computed: {
    schema() {
      return yup.object().shape({
        currentPhone: yup
            .string()
            .required("Current phone number is required")
            .matches(
                /^[0-9]{10}$/,
                "Must be a valid phone number (10 digits only)"
            ),
        newPhone: yup.string()
            .required("Current phone number is required")
            .matches(
                /^[0-9]{10}$/,
                "Must be a valid phone number (10 digits only)"
            ),
      });
    },
  }
}
</script>

<template>
  <div class="flex flex-col">
    <p class="pb-2 pl-1 laptop:text-lg sm:text-lg">Current phone: </p>
    <div class="bg-gray-100 rounded-2xl p-4 flex flex-col justify-center">
      <p class="laptop:text-lg sm:text-[14px]">{{ currentPhone }}</p>
    </div>
    <div class="border-b-[1px] border-black my-4"></div>
    <Form @submit="sendRequest" :validation-schema="schema">
      <Field name="currentEmail" v-slot="{ field, errors }">
        <phone-input-component v-model="form.currentPhone" :error-messages="errors" v-bind="field" label="Enter current phone to confirm this action:" placeholder="Enter current phone"/>
      </Field>
      <Field name="newEmail" v-slot="{ field, errors }">
        <phone-input-component v-model="form.newPhone" :error-messages="errors" v-bind="field" label="Enter new phone:" placeholder="Enter new phone"/>
      </Field>
      <button-component text="Submit" type="submit"/>
    </Form>
  </div>
</template>

<style scoped>

</style>