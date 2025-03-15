<template>
  <div class="wrapper">
    <div class="main">
      <div class="title-wrapper">
        <div v-if="baseInfo && baseInfo.logo" class="img">
          <img :src="baseInfo.logo || '/default-logo.png'" :alt="baseInfo.name || '默认名称'" />
        </div>
        <div class="text">
          <div class="title">{{ baseInfo.name || '' }}</div>
          <div class="desc">{{ baseInfo.description || '' }}</div>
        </div>
      </div>
      <router-view v-if="baseInfo.enabled" :base-info="baseInfo" class="main" />
    </div>
    <navigator class="navigator" :direction="mobile ? 'row' : 'column'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigator from '@/components/common/Navigator.vue';
import { getMenuInfo } from '@/utils'; // 确保此方法正确实现并返回正确的数据结构

export default defineComponent({
  name: 'LayoutService',
  components: {
    Navigator
  },
  data() {
    return {
      mobile: window.innerWidth < 768, // 修复逻辑错误
      baseInfo: {
        logo: '', // 默认值，防止页面渲染时报错
        name: '',
        description: '',
        enabled: false,
        server_url: '',
        server_id: '',
        redirect: ''
      }
    };
  },
  watch: {
    $route(to, from) {
      this.updateBaseInfo(to);
    }
  },
  mounted() {
    // 动态监听窗口宽度
    window.addEventListener('resize', () => {
      this.mobile = window.innerWidth < 768;
    });

    const historyStr = '-history';
    let componentName = this.$route.name || '';
    if (componentName.indexOf(historyStr) > -1) {
      componentName = componentName.split(historyStr)[0];
    }

    const menuInfo = getMenuInfo(componentName, this.$store?.state?.site?.features);
    console.log('getMenuInfo result:', menuInfo);

    // 防御性赋值，确保 baseInfo 始终有完整数据结构
    this.baseInfo = {
      ...this.baseInfo, // 保留已有默认值
      ...menuInfo // 覆盖返回的值
    };
  },
  beforeUnmount() {
    // 移除事件监听器
    window.removeEventListener('resize', this.updateMobileStatus);
  },
  methods: {
    updateBaseInfo(to: any) {
      let componentName = to.name;
      const historyStr = '-history';
      if (componentName.indexOf(historyStr) > -1) {
        componentName = componentName.split(historyStr)[0];
      }

      const menuInfo = getMenuInfo(componentName, this.$store?.state?.site?.features);
      console.log('Updated menuInfo:', menuInfo);

      // 防御性赋值，确保 baseInfo 始终有完整数据结构
      this.baseInfo = {
        ...this.baseInfo, // 保留已有默认值
        ...menuInfo // 覆盖返回的值
      };
    },
    updateMobileStatus() {
      this.mobile = window.innerWidth < 768;
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  .navigator {
    height: 100%;
    border-right: 1px solid var(--el-border-color);
  }
  .main {
    height: calc(100% - 30px);
    width: 100%;
    flex: 1;
  }
  .title-wrapper {
    height: 60px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    flex-direction: row;
    align-items: center;
    .img {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      border: 1px solid #e8e8e8;
      margin: 0 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .text {
      .title {
        font-size: 22px;
        font-weight: 700;
      }
      .desc {
        font-size: 12px;
        font-weight: 100;
        color: #9c9c9c;
      }
    }
  }
}
</style>
