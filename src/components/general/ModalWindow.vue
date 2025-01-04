<template>
  <Teleport to="body">

    <!-- Modal wrapper -->
    <Transition name="modal-wrapper">
      <div v-if="wrapperOpen" ref="wrapper" @click="onWrapperClicked" :class="computedWrapperClass">

        <!-- Modal container -->
        <Transition name="modal">
          <div v-if="isOpen" :class="computedContainerClass">

            <!-- Header -->
            <div :class="computedHeaderContainerClass">

              <p>{{ title }}</p>

              <button v-if="!disableClose" @click="onCloseButtonClicked" class="group transition rounded-md hover:bg-custom-gray/10 p-1">
                <Icon icon="mdi:close" class="h-7 w-7 text-custom-gray/75 group-hover:text-custom-black"/>
              </button>

            </div>

            <!-- Content -->
            <div :class="computedContentContainerClass">
              <slot></slot>
            </div>

          </div>
        </Transition>

      </div>
    </Transition>

  </Teleport>
</template>

<script>
import {twMerge} from 'tailwind-merge';

import {Icon} from '@iconify/vue';

export default {
  name: 'ModalWindow',

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: 'Modal'
    },

    disableClose: {
      type: Boolean,
      default: false
    },

    wrapperClass: {
      type: String,
      default: null
    },
    containerClass: {
      type: String,
      default: null
    },
    headerContainerClass: {
      type: String,
      default: null
    },
    contentContainerClass: {
      type: String,
      default: null
    }
  },

  emits: ['update:isOpen'],

  data() {
    return {
      wrapperOpen: this.isOpen,
      lastMouseDownTarget: null
    }
  },

  updated() {
    this.wrapperOpen = this.isOpen;
  },

  mounted() {
    window.addEventListener('mousedown', this.onWindowMouseDown);
  },

  unmounted() {
    window.removeEventListener('mousedown', this.onWindowMouseDown);
  },

  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },

    onWrapperClicked(event) {
      if (this.disableClose) {
        return;
      }

      const modal = this.$refs.wrapper;

      if (modal === this.lastMouseDownTarget && modal === event.target) {
        this.close();
      }
    },

    onCloseButtonClicked() {
      if (this.disableClose) {
        return;
      }

      this.close();
    },

    onWindowMouseDown(event) {
      this.lastMouseDownTarget = event.target;
    }
  },

  computed: {
    computedWrapperClass() {
      return twMerge('w-full h-full fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black/25 z-[1000] modal-wrapper', this.wrapperClass);
    },
    computedContainerClass() {
      return twMerge('w-full max-w-[700px] bg-white rounded-lg shadow-lg m-6 flex flex-col max-h-[90%]', this.containerClass);
    },
    computedHeaderContainerClass() {
      return twMerge('flex items-center justify-between px-6 py-3 rounded-t-lg bg-[#f0f1f3] border-b border-b-custom-gray/25 text-[18px] font-medium', this.headerContainerClass);
    },
    computedContentContainerClass() {
      return twMerge('px-6 py-4 rounded-b-lg overflow-y-auto', this.contentContainerClass);
    }
  },

  watch: {
    isOpen(isOpen) {
      // Disable page scroll and prevent the page from jumping around.

      const body = document.querySelector('body');

      if (isOpen) {

        const scrollBarWidth = window.innerWidth - body.clientWidth;

        body.style.overflow = 'hidden';
        body.style.marginRight = `${scrollBarWidth}px`;

      } else {
        // Allow some time for the modal to completely disappear after the animation.
        setTimeout(() => {

          // Re-enable scroll when all modals are dismissed.
          const modals = document.getElementsByClassName('modal-wrapper');

          if (modals.length === 0) {
            body.style.overflow = '';
            body.style.marginRight = '';
          }

        }, 300);
      }
    }
  },

  components: {
    Icon
  }
}
</script>

<style scoped>
.modal-wrapper-enter-active,
.modal-wrapper-leave-active {
  transition: opacity 0.25s ease;
}

.modal-wrapper-enter-from,
.modal-wrapper-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>