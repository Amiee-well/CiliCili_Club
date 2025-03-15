<template>
  <el-popover
    placement="bottom"
    :width="200"
    trigger="hover"
    :popper-style="{
      padding: '10px'
    }"
  >
    <template #reference>
      <slot name="main" />
    </template>
    <el-menu :collapse="false" class="menu">
      <div index="1" class="qr-img">
        <el-image :src="qrImg" />
        <br />
        首次关注公众号
        <br />
        绑定可获得积分
      </div>
    </el-menu>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElPopover, ElMenu, ElImage } from 'element-plus';
import qrImg from '../../assets/images/qr-contant.jpg';

export default defineComponent({
  name: 'HelpEntry',
  components: {
    ElImage,
    ElPopover,
    ElMenu
  },
  data() {
    return {
      qrImg: qrImg
    };
  },
  computed: {
    site() {
      return this.$store.state.site;
    }
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.menu {
  border-right: none;
  .el-menu-item {
    height: 40px;
  }
  .qr-img {
    text-align: center;
  }
}
</style>
