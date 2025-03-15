<template>
  <div>
    <application-status
      :initializing="initializing"
      :application="application"
      :need-apply="needApply"
      :service="service"
      @refresh="$store.dispatch('chat/getApplication')"
    />
    <DocmeeUI />
  </div>
</template>

<script>
import DocmeeUI from '@/components/common/DocmeeUI.vue';
import { Status } from '@/models';
import ApplicationStatus from '@/components/application/Status.vue';
import { AIPPT_GENERATION_SERVICE_ID } from '@/constants';
export default {
  components: {
    DocmeeUI,
    ApplicationStatus
  },
  computed: {
    service() {
      return this.$store.state.chat.service;
    },
    application() {
      return this.$store.state.chat.application;
    },
    credential() {
      return this.$store.state.chat?.credential;
    },
    needApply() {
      return this.$store.state.chat.status.getApplication === Status.Success && !this.application;
    },
    conversations() {
      return this.$store.state.chat.conversations;
    },
    initializing() {
      return this.$store.state.chat.status.getApplication === Status.Request;
    }
  },
  async mounted() {
    await this.onGetApplication();
  },
  methods: {
    async onGetApplication() {
      await this.$store.dispatch('chat/getApplication', AIPPT_GENERATION_SERVICE_ID);
    },
  }
};
</script>
