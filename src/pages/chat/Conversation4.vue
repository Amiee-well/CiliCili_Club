<template>
  <layout>
    <template #chat>
      <application-status
        :initializing="initializing"
        :application="application"
        :need-apply="needApply"
        :service="service"
        @refresh="$store.dispatch('chat/getApplication')"
      />
      <div class="dialogue">
        <introduction v-if="messages.length === 0" @draft="onDraft" />
        <div v-else class="messages">
          <message
            v-for="(message, messageIndex) in messages"
            :key="messageIndex"
            :message="message"
            :application="application"
            class="message"
          />
        </div>
      </div>

      <div class="bottom">
        <input-box
          :disabled="answering"
          :question="question"
          :references="references"
          @update:question="question = $event"
          @update:references="references = $event"
          @submit="onSubmit"
        />
      </div>
    </template>
  </layout>
</template>

<script lang="ts">
import axios from 'axios';
import Message from '@/components/chat/Message.vue';
import { IChatModel, IChatMessageState, IChatConversationResponse, IChatConversation, IChatMessage } from '@/models';
import InputBox from '@/components/chat/InputBox.vue';
import { ERROR_CODE_CANCELED, ERROR_CODE_NOT_APPLIED, ERROR_CODE_UNKNOWN } from '@/constants/errorCode';
import { ROUTE_DeepSeek_CONVERSATION, ROUTE_DeepSeek_CONVERSATION_NEW } from '@/router';
import { isJSONString } from '@/utils/is';
import { ElMessage } from 'element-plus';
import { chatOperator } from '@/operators';
import { defineComponent } from 'vue';
import { Status } from '@/models';
import Introduction from '@/components/chat/Introduction.vue';
import Layout from '@/layouts/Chat/DeepSeek.vue';
import ApplicationStatus from '@/components/application/Status.vue';
import { DEEPSEEK_SERVICE_ID } from '@/constants';

export interface IData {
  question: string;
  references: string[];
  answering: boolean;
  messages: IChatMessage[];
}

export default defineComponent({
  name: 'ChatConversation4',
  components: {
    InputBox,
    Introduction,
    Message,
    ApplicationStatus,
    Layout
  },
  data(): IData {
    return {
      question: '',
      references: [],
      answering: false,
      messages:
        this.$store.state.chat.conversations?.find(
          (conversation: IChatConversation) => conversation.id === this.$route.params.id?.toString()
        )?.messages || []
    };
  },
  computed: {
    model() {
      return this.$store.state.chat.model;
    },
    conversationId(): string | undefined {
      return this.$route.params.id?.toString();
    },
    conversation() {
      return this.$store.state.chat.conversations?.find(
        (conversation: IChatConversation) => conversation.id === this.conversationId
      );
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
  watch: {
    model(val: IChatModel) {
      if (val) {
        this.onModelChanged();
      }
    },
    conversationId(val: string) {
      if (!val) {
        this.messages = [];
      } else {
        this.messages =
          this.conversations?.find((conversation: IChatConversation) => conversation.id === val)?.messages || [];
        this.onScrollDown();
      }
    }
  },
  async mounted() {
    await this.onGetService();
    await this.onGetApplication();
    await this.onGetConversations();
    await this.onScrollDown();
  },
  methods: {
    async onGetService() {
      await this.$store.dispatch('chat/getService', DEEPSEEK_SERVICE_ID);
    },
    async onGetApplication() {
      await this.$store.dispatch('chat/getApplication', DEEPSEEK_SERVICE_ID);
    },
    async onGetConversations() {
      await this.$store.dispatch('chat/getConversations', DEEPSEEK_SERVICE_ID);
    },
    async onDraft(question: string) {
      this.question = question;
      this.onSubmit();
    },
    async onCreateNewConversation() {
      await this.$router.push({
        name: ROUTE_DeepSeek_CONVERSATION_NEW
      });
    },
    async onModelChanged() {
      await this.onCreateNewConversation();
      await this.$store.dispatch('chat/getApplication', DEEPSEEK_SERVICE_ID);
    },
    async onSubmit() {
      if (this.references.length > 0) {
        let content = [];
        content.push({
          type: 'text',
          text: this.question
        });
        for (let i = 0; i < this.references.length; i++) {
          content.push({
            type: 'image_url',
            image_url: this.references[i]
          });
        }
        this.messages.push({
          content: content,
          role: 'user'
        });
      } else {
        this.messages.push({
          content: this.question,
          role: 'user'
        });
      }
      console.debug('onSubmit', this.question, this.references);
      await this.onFetchAnswer();
    },
    async onScrollDown() {
      const container = document.querySelector('.dialogue') as HTMLDivElement;
      if (!container || !this.messages || this.messages.length === 0) {
        return;
      }
      container.scrollTop = container.scrollHeight;
    },
    async onFetchAnswer() {
      const token = this.credential?.token;
      const question = this.question;
      const references = this.references;
      const applications_text = 'DeepSeek';
      console.debug('validated', question, references);
      // reset question and references
      this.question = '';
      this.references = [];
      if (!token || !question) {
        console.error('no token or endpoint or question');
        this.messages.push({
          error: {
            code: ERROR_CODE_NOT_APPLIED
          },
          role: 'assistant',
          state: IChatMessageState.FAILED
        });
        return;
      }
      let conversationId = this.conversationId;
      this.messages.push({
        content: '',
        role: 'assistant',
        state: IChatMessageState.PENDING
      });
      console.debug('start to get answer', this.messages);
      this.onScrollDown();
      this.answering = true;
      chatOperator
        .chatConversation(
          {
            question,
            applications_text: applications_text,
            model: 'AI',
            references,
            id: this.conversationId,
            stateful: true
          },
          {
            token,
            stream: (response: IChatConversationResponse) => {
              console.debug('stream response', response);
              this.messages[this.messages.length - 1] = {
                role: 'assistant',
                content: response.answer,
                state: IChatMessageState.ANSWERING
              };
              conversationId = response?.id;
              this.onScrollDown();
            }
          }
        )
        .then(async () => {
          console.debug('finished fetch answer', this.messages);
          this.messages[this.messages.length - 1].state = IChatMessageState.FINISHED;
          await this.$store.dispatch('chat/setConversation', {
            id: conversationId,
            messages: this.messages
          });
          this.answering = false;
          if (!this.conversationId) {
            await this.$router.push({
              name: ROUTE_DeepSeek_CONVERSATION,
              params: {
                id: conversationId
              }
            });
          }
          this.onScrollDown();
          await this.$store.dispatch('chat/getConversations', DEEPSEEK_SERVICE_ID);
          await this.$store.dispatch('chat/getApplication', DEEPSEEK_SERVICE_ID);
        })
        .catch((error) => {
          if (this.messages && this.messages.length > 0) {
            this.messages[this.messages.length - 1].state = IChatMessageState.FAILED;
          }
          console.debug('error', error);
          if (axios.isCancel(error)) {
            this.messages[this.messages.length - 1].error = {
              code: ERROR_CODE_CANCELED
            };
          } else if (error?.response?.data) {
            let data = error?.response?.data;
            if (isJSONString(data)) {
              data = JSON.parse(data);
              ElMessage.error(data.detail.message);
            }
            if (this.messages && this.messages.length > 0) {
              this.messages[this.messages.length - 1].error = data.error;
            }
          } else {
            if (this.messages && this.messages.length > 0) {
              this.messages[this.messages.length - 1].error = {
                code: ERROR_CODE_UNKNOWN
              };
            }
          }
          this.answering = false;
        });
    }
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
</style>
