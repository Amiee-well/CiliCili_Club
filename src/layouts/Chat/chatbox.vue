<template>
  <div class="main">
    <div v-if="isExpend" class="side">
      <slot name="side">
        <side-panel @isExpend="onExpendChange" />
      </slot>
    </div>
    <div class="chat">
      <slot name="chat" />
    </div>
    <el-button round class="menu" @click="drawer = true">
      <font-awesome-icon icon="fa-solid fa-bars" class="icon-menu" />
    </el-button>
    <el-drawer v-model="drawer" :with-header="false" size="290px" class="drawer">
      <side-panel />
    </el-drawer>
    <div v-if="!isExpend" class="icon" @click="onExpendChange(true)">
      <font-awesome-icon icon="fa-solid fa-toggle-off" class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidePanel from '@/components/chat/SidePanel/SidePanel_chatbox.vue';
import { ElDrawer, ElButton } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'LayoutChat',
  components: {
    SidePanel,
    ElDrawer,
    ElButton,
    FontAwesomeIcon
  },
  data() {
    return {
      drawer: false,
      isExpend: true
    };
  },
  mounted() {
    this.isExpend = localStorage.getItem('chatIsExpend') !== 'false';
  },
  methods: {
    onExpendChange(flag) {
      this.isExpend = flag;
      localStorage.setItem('chatIsExpend', flag);
    }
  }
});
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: row;
  position: relative;
  .side {
    width: 250px;
    height: 100%;
    overflow-y: scroll;
    border-right: 1px solid var(--el-border-color);
  }

  .chat {
    height: 100%;
    padding: 15px;
    flex: 1;
    width: calc(100% - 250px);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0;
    padding: 0;
    cursor: pointer;
    svg {
      margin: 0;
      padding: 0;
      width: 30px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}

.menu {
  display: none;
}
</style>
