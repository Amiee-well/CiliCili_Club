<template>
  <div
    :class="{
      message: true,
      [message.role as string]: true,
      hidden: errorText && message.role === 'assistant'
    }"
    :role="message.role"
  >
    <div class="author">
      <el-image
        v-if="message.role === 'assistant'"
        src="http://cdn.cilicili.club/index/Chat.png"
        fit="cover"
        class="avatar"
      />
    </div>
    <div class="main">
      <div class="content">
        <markdown-renderer v-if="!Array.isArray(message.content)" :content="message?.content" />
        <div v-else>
          <div v-for="(item, index) in message.content" :key="index">
            <img v-if="item.type === 'image_url'" :src="item.image_url?.url" fit="cover" class="image" />
            <markdown-renderer v-if="item.type === 'text'" :key="index" :content="item.text" />
          </div>
        </div>
        <answering-mark v-if="message.state === messageState.PENDING" />
      </div>
      <div class="operations">
        <copy-to-clipboard v-if="!Array.isArray(message.content)" :content="message.content!" class="btn-copy" />
      </div>
    </div>
    <el-alert v-if="errorText" class="error" :title="errorText" type="error" :closable="false" />
    <el-button v-if="showBuyMore" round type="primary" class="btn btn-buy" size="small" @click="onBuyMore">
      {{ $t('common.button.buyMore') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AnsweringMark from './AnsweringMark.vue';
import copy from 'copy-to-clipboard';
import { ElAlert, ElButton, ElImage } from 'element-plus';
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue';
import { IApplication, IChatMessage, IChatMessageState } from '@/models';
import CopyToClipboard from '../common/CopyToClipboard.vue';
import {
  ERROR_CODE_API_ERROR,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_CONTENT_TOO_LARGE,
  ERROR_CODE_NOT_APPLIED,
  ERROR_CODE_TIMEOUT,
  ERROR_CODE_TOO_MANY_REQUESTS,
  ERROR_CODE_UNKNOWN,
  ERROR_CODE_USED_UP
} from '@/constants';
import { ROUTE_CONSOLE_APPLICATION_BUY } from '@/router';

interface IData {
  copied: boolean;
  messageState: typeof IChatMessageState;
}

export default defineComponent({
  name: 'Message',
  components: {
    CopyToClipboard,
    AnsweringMark,
    MarkdownRenderer,
    ElAlert,
    ElButton,
    ElImage
  },
  props: {
    message: {
      type: Object as () => IChatMessage,
      required: true
    },
    application: {
      type: Object as () => IApplication | undefined,
      required: true
    }
  },
  emits: ['stop'],
  data(): IData {
    return {
      copied: false,
      messageState: IChatMessageState
    };
  },
  computed: {
    errorText() {
      if (!this.message.error || !this.message.error?.code) {
        return undefined;
      }
      switch (this.message.error?.code) {
        case ERROR_CODE_USED_UP:
          return this.$t('chat.message.errorUsedUp');
        case ERROR_CODE_API_ERROR:
          return this.$t('chat.message.errorApiError');
        case ERROR_CODE_BAD_REQUEST:
          return this.$t('chat.message.errorBadRequest');
        case ERROR_CODE_TIMEOUT:
          return this.$t('chat.message.errorTimeout');
        case ERROR_CODE_TOO_MANY_REQUESTS:
          return this.$t('chat.message.errorTooManyRequests');
        case ERROR_CODE_CONTENT_TOO_LARGE:
          return this.$t('chat.message.errorContentTooLarge');
        case ERROR_CODE_NOT_APPLIED:
          return this.$t('chat.message.errorNotApplied');
        case ERROR_CODE_UNKNOWN:
        default:
          return this.$t('chat.message.errorUnknown');
      }
    },
    showBuyMore() {
      return this.message.error?.code === ERROR_CODE_USED_UP;
    }
  },
  methods: {
    onCopy() {
      copy(this.message.content!.toString(), {
        debug: true
      });
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    },
    onBuyMore() {
      this.$router.push({
        name: ROUTE_CONSOLE_APPLICATION_BUY,
        params: {
          id: this.application?.id
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.error {
  width: fit-content;
  padding: 10px 5px 8px 5px;
  height: 45px;
  border-radius: 10px;
  border-bottom-left-radius: 0;
}

.btn-buy {
  margin: 10px auto;
  border-radius: 20px;
}
.message {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  &[role='system'] {
    display: none;
  }

  &.hidden {
    display: none;
  }

  .author {
    width: 50px;
    padding: 10px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid var(--el-border-color);
    }
  }

  .main {
    flex: 1;
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
  }

  &.assistant {
    align-items: start;
    .content {
      color: var(--el-text-color-primary);
    }
  }
  &.user {
    .main {
      align-items: end;
    }
    .content {
      background-color: var(--el-bg-color-page);
      color: var(--el-text-color-primary);
      width: fit-content;
      text-align: left;
      max-width: 100%;
      padding: 8px 15px;
    }
  }
  .content {
    border-radius: 20px;
    padding: 8px;
    width: 100%;
    max-width: 800px;
    .image {
      max-width: 100%;
      max-height: 300px;
      margin: 5px 0;
      border-radius: 10px;
    }
  }

  .operations {
    display: block;
    .btn-copy {
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
  }
}
</style>
