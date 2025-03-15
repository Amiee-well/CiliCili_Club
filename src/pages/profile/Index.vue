<template>
  <div class="profile">
    <div class="info">
      <el-image :src="user.avatar" fit="cover" class="avatar" />
      <h2>
        {{ user.username }}
      </h2>
      <div :style="{ backgroundImage: 'url(' + user.avatar + ')' }" class="background" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElImage } from 'element-plus';
export default defineComponent({
  name: 'ProfileIndex',
  components: {
    ElImage
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
}
.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 20px 0;
  height: 200px !important;
  overflow: hidden;
  position: relative;
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(15px) brightness(0.7);
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  h2 {
    font-size: 18px;
  }
}
</style>

<style lang="scss" scoped>
$width: 100%;
$padding-left: 10px;
</style>
