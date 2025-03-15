<template>
  <application-status
    :initializing="initializing"
    :application="application"
    :need-apply="needApply"
    :service="service"
    @refresh="$store.dispatch('study/getApplication')"
  />
  <div v-loading="loading" class="service-container">
    <iframe v-if="session_id" :src="iframeUrl" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { oauthOperator } from '@/operators/auth';
import { Status } from '@/models';
import ApplicationStatus from '@/components/application/Status.vue';
import { IMITATE_POPULAR_VIDEO_SERVICE_ID } from '@/constants';
export default defineComponent({
  components: {
    ApplicationStatus
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      session_id: ''
    };
  },
  computed: {
    iframeUrl() {
      return `${this.baseInfo?.server_url}?session_id=${this.session_id}`;
    },
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
    await this.init();
    await this.onGetApplication();
  },
  methods: {
    async init() {
      const params = {
        task_name: this.baseInfo?.redirect,
        task_id: this.baseInfo?.server_id
      };
      try {
        const res = await oauthOperator.generateSession(params);
        this.session_id = res.data?.session_id;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async onGetApplication() {
      await this.$store.dispatch('chat/getApplication', IMITATE_POPULAR_VIDEO_SERVICE_ID);
    },
  }
});
</script>

<style lang="scss" scoped>
.selector {
  width: max-content;
  margin-bottom: 10px;
  position: absolute;
  left: 10px;
  top: 10px;
}

.dialogue {
  flex: 1;
  width: 100%;
  scroll-behavior: smooth;
  overflow-y: auto;
  position: relative;
  padding: 0 calc(50% - 400px);
  .messages {
    padding-top: 10px;
    .message {
      margin-bottom: 15px;
    }
  }
}
.bottom {
  width: 100%;
}

.service-container {
  width: auto !important;
  height: 100%;
  display: flex;
  iframe {
    width: 100%;
  }
}
</style>
