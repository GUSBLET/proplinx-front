<script>
import AccountSettingsComponent from "@/components/user/settings/AccountSettingsComponent.vue";
import SocialAccountsComponent from "@/components/user/settings/SocialAccountsComponent.vue";
import ModalWindow from "@/components/general/ModalWindow.vue";
import UpdatingMediaLinkComponent from "@/components/user/settings/UpdatingMediaLinkComponent.vue";
import ChangeEmailModalComponent from "@/components/user/settings/ChangeEmailModalComponent.vue";
import ChangePhoneModalComponent from "@/components/user/settings/ChangePhoneModalComponent.vue";

export default {
  name: "SettingsView",
  components: {
    ChangePhoneModalComponent,
    ChangeEmailModalComponent,
    UpdatingMediaLinkComponent,
    ModalWindow, SocialAccountsComponent, AccountSettingsComponent
  },
  data() {
    return {
      section: '',
      isModalOpen: false
    }
  },
  props: {},
  methods: {
    openCloseModal(sectionCode) {
      this.section = sectionCode;
      this.isModalOpen = !this.isModalOpen;
    },
    defineModalTitle() {
      switch (this.section) {
        case 'social-accounts':
          return 'Update Social Accounts';
        case 'change-email':
          return 'Change Email';
      }
    }
  },
  computed: {
    modalTitle() {
      return this.defineModalTitle();
    }
  }
}
</script>

<template>
  <div class="flex flex-col py-6 justify-center items-center  w-full">
    <p class="laptop:pb-4 font-bold sm:text-xl laptop:text-3xl">Settings</p>

    <div class="laptop:grid laptop:grid-cols-3 gap-4 w-full max-w-6xl">
      <account-settings-component @request-change-modal-section="openCloseModal"/>
      <social-accounts-component @open-modal="openCloseModal"/>
    </div>
  </div>
  <modal-window v-model:is-open="isModalOpen" :title="modalTitle" wrapperClass="z-[10000]">
    <updating-media-link-component v-if="section === 'social-accounts'"/>
    <change-email-modal-component v-else-if="section === 'change-email'"/>
    <change-phone-modal-component v-else-if="section === 'change-phone'"/>
  </modal-window>
</template>

<style scoped>

</style>