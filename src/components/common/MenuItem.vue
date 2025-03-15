<!--
 * @Author: morijiu
 * @Date: 2024-07-14 16:55:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-24 14:31:05
 * @Description:
 * @FilePath: \Nexior-main\src\components\common\MenuItem.vue
-->
<template>
  <el-popover
    placement="right"
    :width="200"
    trigger="hover"
    :popper-style="{
      padding: '10px'
    }"
  >
    <template #reference>
      <slot name="main" />
    </template>
    <el-menu v-if="menuList.length > 0" :collapse="false" class="menu">
      <el-menu-item
        v-for="(menuItem, menuIndex) in menuList"
        :key="menuIndex"
        :index="menuItem.route.name"
        :title="menuItem.description"
        @click="toPage(menuItem)"
      >
        <font-awesome-icon :icon="menuItem.icon" class="mr-2" />
        <template #title>{{ menuItem.displayName }}</template>
      </el-menu-item>
    </el-menu>
    <div v-else class="tip-text">敬请期待</div>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElPopover, ElMenu, ElMenuItem, ElImage } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ROUTE_DISTRIBUTION_INDEX } from '@/router';

export default defineComponent({
  name: 'MenuItem',
  components: {
    ElPopover,
    ElMenu,
    ElMenuItem,
    FontAwesomeIcon
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    site() {
      return this.$store.state.site;
    }
  },
  methods: {
    toPage(menuItem: any) {
      this.$router.push(menuItem.route);
    }
  }
});
</script>

<style lang="scss" scoped>
.menu {
  border-right: none;
  .el-menu-item {
    height: 40px;
    &.is-active {
      color: inherit;
    }
  }
}
.tip-text {
  text-align: center;
}
</style>
