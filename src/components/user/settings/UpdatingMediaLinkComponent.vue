<script>
import TextInputComponent from "@/components/form/inputs/TextInputComponent.vue";
import SelectComponent from "@/components/form/inputs/SelectComponent.vue";
import ButtonComponent from "@/components/form/ButtonComponent.vue";

export default {
  name: "UpdatingMediaLinkComponent",
  components: {ButtonComponent, SelectComponent, TextInputComponent},
  data() {
    return {
      ref: "",
      media: "",
      options: [
        {
          "name": "Linkedin",
          "value": "linkedin"
        },
        {
          "name": "Instagram",
          "value": "instagram"
        },
        {
          "name": "Facebook",
          "value": "facebook"
        },
        {
          "name": "Twitter/X",
          "value": "twitter_x"
        },
      ]
    }
  }
}
</script>

<template>
  <div>
    <select-component :options="options"/>
    <text-input-component placeholder="Enter reference" v-model="ref"/>
    <button-component text="Submit"></button-component>
  </div>
</template>

<style scoped>

</style>