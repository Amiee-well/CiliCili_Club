<!--
 * @Author: morijiu
 * @Date: 2024-07-08 11:29:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-07-14 13:42:13
 * @Description:
 * @FilePath: \Nexior-main\src\layouts\Console.vue
-->
<template>
  <div class="wrapper">
    <div class="main">
      <side-panel class="side" />
      <router-view class="panel" />
    </div>
    <navigator class="navigator" :direction="mobile ? 'row' : 'column'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigator from '@/components/common/Navigator.vue';
import SidePanel from '@/components/console/SidePanel.vue';

export default defineComponent({
  name: 'LayoutConsole',
  components: {
    SidePanel,
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

  .navigator {
    height: 100%;
    border-right: 1px solid var(--el-border-color);
  }

  .main {
    height: 100%;
    width: calc(100% - 60px);
    flex: 1;
    display: flex;
    flex-direction: row;
  }
}
</style>
