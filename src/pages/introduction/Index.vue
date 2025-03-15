<template>
  <div class="layout">
    <div v-for="item in list" :key="item.english" class="main-menu-item">
      <h2>{{ item.menuName }}</h2>
      <div class="services">
        <div v-for="(service, index) in item.children" :key="index" class="service-item" @click="toPage(service)">
          <img :src="getLogo(service)" alt="" />
          <div class="info">
            <div class="title">{{ service.displayName }}</div>
            <div class="description">{{ service.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="link">
      <a href="https://beian.miit.gov.cn/" target="_blank">辽ICP备2024037141号-1</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'ServiceIntroduction',
  components: {},
  data() {
    return {};
  },
  computed: {
    list() {
      const result = [
        {
          menuName: '文本类',
          english: 'text',
          enabled: true,
          icon: 'fa-regular fa-comments',
          children: []
        },
        {
          menuName: '学习类',
          english: 'study',
          enabled: true,
          icon: 'fa-solid fa-images',
          children: []
        },
        {
          menuName: '自媒体类',
          english: 'media',
          enabled: true,
          icon: 'fa-solid fa-podcast',
          children: []
        }
      ];
      // 路由动态赋值
      const configs = this.$store?.state?.site?.features;
      result.forEach((item) => {
        if (configs[item.english]) {
          item.enabled = true;
          // 遍历子菜单
          Object.keys(configs[item.english]).forEach((key) => {
            const child = configs[item.english][key];
            item.children.push({
              route: {
                name: child.name,
                redirect: child.redirect
              },
              displayName: child.name,
              routes: [key],
              description: child.description,
              logo: child.logo,
              enable: child.enabled
            });
          });
        }
      });
      return result;
    }
  },
  methods: {
    toPage(service: any) {
      try {
        if (!service.enable) {
          ElMessage.info('功能暂未开放，敬请期待！');
          return false;
        }
        this.$router.push({
          name: service.route.redirect
        });
      } catch (error) {
        console.log(error);
        ElMessage.info('该功能无界面');
      }
    },
    getLogo(service: any) {
      return service.logo ? service.logo : 'path/to/default/logo.png';
    }
  }
});
</script>

<style lang="scss" scoped>
.layout {
  padding: 50px 100px;
  height: 100%;
  overflow: auto;
}
.main-menu-item {
  margin-bottom: 80px;
}
.services {
  display: flex;
  flex-wrap: wrap;
  .service-item {
    width: 350px;
    height: 130px;
    background-color: #fff;
    margin: 20px 20px 0 0;
    border-radius: 6px;
    border: 1px solid #edeef6;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    img {
      width: 68px;
      height: 68px;
      border-radius: 28%;
      margin-left: 40px;
    }
    .info {
      flex: 1;
      padding: 0 15px;
      .title {
        font-size: 18px;
        color: rgb(51, 51, 51);
      }
      .description {
        margin-top: 10px;
        font-size: 15px;
        color: rgb(153, 153, 153);
      }
    }
    &::after {
      content: '进入官网';
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      border-bottom-left-radius: 10px;
      background: linear-gradient(90deg, rgb(42, 123, 252) 0%, rgb(81, 165, 254) 100%);
      opacity: 0;
    }
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      &::after {
        opacity: 1;
      }
    }
  }
}
.link {
  text-align: center;
  font-size: 14px;
  a {
    text-decoration: none;
    color: #808080;
  }
}
</style>
