<template>
  <div class="wrapper">
    <router-view class="main" />
    <navigator class="navigator" :direction="mobile ? 'row' : 'column'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigator from '@/components/common/Navigator.vue';

export default defineComponent({
  name: 'LayoutMain',
  components: {
    Navigator
  },
  data() {
    return {
      mobile: window.innerWidth < 768 && false
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.mobile = window.innerWidth < 768 && false;
    });
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
    height: 100%;
    width: calc(100% - 60px);
    flex: 1;
  }
}
</style>
