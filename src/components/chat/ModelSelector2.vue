<template>
  <div class="selector"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IChatModel } from '@/models';
import {
  AI_GPT_3_5_TURBO_CA,
  AI_GPT_3_5_TURBO_0125,
  AI_GPT_3_5_TURBO_0613,
  AI_GPT_4_TURBO_PREVIEW,
  AI_GPT_4O
} from '@/constants';
import { chatOperator } from '@/operators';

export default defineComponent({
  name: 'ModelSelector',
  components: {},
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      options: [
        // {
        //   icon: 'fa-solid fa-bolt',
        //   color: '#ff9900',
        //   model: CHAT_MODEL_GPT_3_5
        // },
        // {
        //   icon: 'fa-solid fa-bolt',
        //   color: '#ff9900',
        //   model: CHAT_MODEL_GPT_3_5_BROWSING
        // },
        // {
        //   icon: 'fa-solid fa-wand-magic-sparkles',
        //   color: '#ce65e6',
        //   model: CHAT_MODEL_GPT_4
        // },
        // {
        //   icon: 'fa-solid fa-wand-magic-sparkles',
        //   color: '#ce65e6',
        //   model: CHAT_MODEL_GPT_4_BROWSING
        // },
        // {
        //   icon: 'fa-solid fa-wand-magic-sparkles',
        //   color: '#ce65e6',
        //   model: CHAT_MODEL_GPT_4_VISION
        // },
        // {
        //   icon: 'fa-solid fa-bolt',
        //   color: '#ff9900',
        //   model: AI_GPT_3_5_TURBO_CA
        // },
        // {
        //   icon: 'fa-solid fa-bolt',
        //   color: '#ff9900',
        //   model: AI_GPT_3_5_TURBO_0125
        // },
        // {
        //   icon: 'fa-solid fa-bolt',
        //   color: '#ff9900',
        //   model: AI_GPT_3_5_TURBO_0613
        // },
        // {
        //   icon: 'fa-solid fa-wand-magic-sparkles',
        //   color: '#ce65e6',
        //   model: AI_GPT_4_TURBO_PREVIEW
        // },
        // {
        //   icon: 'fa-solid fa-wand-magic-sparkles',
        //   color: '#ce65e6',
        //   model: AI_GPT_4O
        // }
      ]
    };
  },
  computed: {
    model() {
      const modelName = this.$store.state.chat.model.name;
      const model = [
        // CHAT_MODEL_GPT_3_5,
        // CHAT_MODEL_GPT_3_5_BROWSING,
        // CHAT_MODEL_GPT_4,
        // CHAT_MODEL_GPT_4_BROWSING,
        // CHAT_MODEL_GPT_4_VISION
        AI_GPT_3_5_TURBO_CA,
        AI_GPT_3_5_TURBO_0125,
        AI_GPT_3_5_TURBO_0613,
        AI_GPT_4_TURBO_PREVIEW,
        AI_GPT_4O
      ].find((model) => model.name === modelName);
      return model;
    }
  },
  mounted() {
    this.getModels();
  },
  methods: {
    onCommandChange(command: IChatModel) {
      this.$emit('select', command);
      this.$store.dispatch('chat/setModel', command);
    },
    async getModels() {
      await chatOperator.getModel().then((res) => {
        this.options = res.data?.item.map((item: any) => {
          let displayName: string = item.model.getDisplayName;
          let description: string = item.model.getDescription;
          item.model.getDisplayName = () => displayName;
          item.model.getDescription = () => description;
          return item;
        });
      });
    }
  }
});
</script>

<style lang="scss">
.popper {
  border-radius: 20px;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.selector {
  cursor: pointer;
  padding: 7px 6px;
  border-radius: 15px;
  margin-bottom: 10px;
  .name {
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    margin-right: 5px;
  }
  .angle {
    display: inline-block;
    max-width: 5px;
  }
}

.item {
  display: flex;
  flex-direction: row;

  .icon {
    width: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-right: 5px;
    margin-top: 3px;
    &.base {
      color: #ff9900;
    }
    &.plus {
      color: #ce65e6;
    }
  }
  .info {
    width: calc(100% - 15px);
    .name {
      font-size: 14px;
      font-weight: bold;
      color: var(--el-text-color-primary);
      margin: 0;
    }
    .description {
      font-size: 12px;
      color: var(--el-text-color-secondary);
      margin: 0;
    }
  }
}
</style>
