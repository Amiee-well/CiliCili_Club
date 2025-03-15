<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { setI18nLanguage } from './i18n/index';

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  data() {
    return {
      locale: zhCn
    };
  },
  async beforeCreate() {
    // 在组件创建之前确保语言包已加载
    await setI18nLanguage('zh-CN');
  }
});
</script>
