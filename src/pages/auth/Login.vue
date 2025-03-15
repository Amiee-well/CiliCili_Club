<template>
  <div class="body-container">
    <div class="login-container">
      <div class="img-cover">
        <div class="img-cover-text">
          <img src="@/assets/images/talk.png" />
          <div class="title">刺梨 AI</div>
          <div class="info"></div>
        </div>
        <div class="beian">
          <a href="https://beian.miit.gov.cn/" target="_blank">辽ICP备2024037141号-1</a>
        </div>
      </div>
      <div class="login-wrap">
        <div class="top-wrap">
          <div class="logo-text">🚀刺梨AI</div>
          <div class="logo-text">CILICILI.CLUB</div>
        </div>
        <!-- 登录 -->
        <!-- <div style="display: flex; justify-content: center; align-items: center">
          <el-tabs v-model="activeName" class="tabs-style">
            <el-tab-pane label="密码登录" name="password"> </el-tab-pane>
            <el-tab-pane label="验证码登录" name="code"> </el-tab-pane>
          </el-tabs>
        </div> -->
        <div class="type">
          <div v-if="activeName === 'password'" class="login-form">
            <password-login @change-type="changeType" />
          </div>
          <div v-if="activeName === 'code'" class="login-form">
            <code-login @change-type="changeType" />
          </div>
        </div>
        <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon closable class="error-alert" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElAlert } from 'element-plus';
import PasswordLogin from './components/PasswordLogin.vue';
import CodeLogin from './components/CodeLogin.vue';

export default defineComponent({
  name: 'AuthLogin',
  components: {
    ElAlert,
    PasswordLogin,
    CodeLogin
  },
  data() {
    return {
      activeName: 'code',
      infoList: [
        '定义你的未来式，科技改变生活。',
        '在智能的浪潮中，发现未来的无限可能。',
        '科技与创新汇聚，点燃每一个梦想的火花。',
        '让智慧成为生活的指南，开启全新的未来之旅。',
        '在智能时代，创造属于你自己的精彩篇章。',
        '科技驱动，智慧引领，成就更美好的生活方式。',
        '每一次创新，都是对未来的深刻探索。',
        '让我们携手前行，智慧生活从此刻开始。',
        '用AI的力量，开启生活的无限可能和精彩。',
        '智领时代，探索未来，让梦想触手可及。',
        '在科技的助力下，生活变得更加丰富多彩。',
        '智慧与创新并行，追逐未来的每一个梦想。',
        '让智能科技为你开启生活的新篇章。',
        '在每一次探索中，发现更精彩的自我。',
        '未来已来，智慧开启美好新时光。',
        '让科技为你的生活注入新的活力。',
        '在智能的指引下，迈向更高的未来。',
        '智慧生活，从每一个细节开始。',
        '用创新的火花，照亮未来的旅程。',
        '科技赋能，让梦想在现实中绽放。',
        '与AI同行，开启智慧生活新体验。',
        '在智能的时代，创新无处不在。',
        '用智慧构建未来，让生活更加简约。',
        '每一个选择，都是对未来的重新定义。',
        '用科技的力量，创造更美好的明天。',
        '未来属于那些敢于追梦的人。',
        '让智能科技照亮你前行的道路。',
        '与未来相约，让奇迹发生。',
        '在创新的道路上，勇敢追逐梦想。',
        '科技改变一切，未来由你主宰。',
        '用智慧连接生活，让每一天更精彩。',
        '在智能的海洋中，探索未来的宝藏。',
        '让科技与生活融为一体，打造属于你的精彩。',
        '每一步创新，都是对未来的探索之旅。',
        '让我们一起迎接，科技带来的美好变化。',
        '智慧生活，从现在开始，未来触手可及。',
        '在科技的碰撞中，绽放出无限可能。',
        '用创新的力量，书写未来的传奇。',
        '与时俱进，智慧引领生活新风尚。',
        '在智能的陪伴下，生活变得更加多元。',
        '用科技架起梦想的桥梁，连接未来。',
        '让每一个选择，都充满智慧的光辉。',
        '在未来的舞台上，演绎属于你的精彩。',
        '用AI的智慧，赋予生活新的意义。',
        '让科技启迪灵感，激发无尽创意。',
        '在生活的每一个瞬间，感受智能的魅力。',
        '用智慧与热情，拥抱每一个未来的机会。',
        '在科技的海洋中，扬帆追逐梦想。',
        '每一次创新，都是对未来的承诺。',
        '让生活因智慧而变得更加丰富。',
        '在智能的指引下，迈向无限可能。',
        '用科技打开未来的大门，发现新的自我。',
        '让每一个想法，都在科技中生根发芽。',
        '与智能同行，开启全新的未来征程。',
        '用创新点燃梦想的火焰，照亮前行的路。',
        '在每一次突破中，感受未来的脉动。',
        '让智慧成为生活的主旋律，奏响未来的乐章。',
        '在科技的助力下，实现每一个梦想。',
        '用AI的力量，塑造生活的无限可能。',
        '让每一个瞬间，都充满智慧的光辉。',
        '在未来的路上，勇敢追逐梦想。',
        '每一次创新，都是对未来的挑战。',
        '用科技连接每一个梦想的瞬间。',
        '让智慧引领生活，创造更加美好的明天。',
        '在科技的助力下，开创全新的未来。',
        '每一步都充满智慧，让未来更精彩。',
        '用创新的力量，成就非凡的未来。',
        '在智能的时代，生活焕发新的活力。',
        '让科技带你探索未来的每一个可能。',
        '用智慧与热情，开启生活的新篇章。',
        '与未来相伴，跨越每一个挑战。',
        '在科技的浪潮中，找到属于你的方向。',
        '用创新驱动生活，成就无限可能。',
        '在每一次探索中，发现生活的多样性。',
        '用智能科技，打造美好的生活体验。',
        '让每一个梦想，都在科技中实现。',
        '在未来的舞台上，展现无限可能。',
        '用智慧的眼光，观察生活的每一角落。',
        '让生活因科技而变得更精彩。',
        '在智能的时代，创造属于你的未来。',
        '用创新的思维，打破生活的局限。',
        '在未来的旅程中，智慧是你最好的伙伴。',
        '让每一次选择，都是对未来的承诺。',
        '用科技的力量，赋予生活新的意义。',
        '让智慧的光芒，照亮每一个前行的瞬间。',
        '在未来的舞台上，与科技共舞。'
      ],
      infoIndex: 0,
      textElement: null as any
    };
  },
  mounted() {
    this.textElement = document.querySelector('.img-cover-text .info');
    this.infoIndex = Math.floor(Math.random() * this.infoList.length);
    this.typeText();
  },
  methods: {
    typeText() {
      setTimeout(() => {
        this.typeText();
      }, 6000);
      this.textElement.textContent = this.infoList[this.infoIndex];
      this.infoIndex = (this.infoIndex + 1) % this.infoList.length; // 循环播放
    },
    changeType(val) {
      console.log(val);
      this.activeName = val;
    }
  }
});
</script>

<style lang="scss" scoped>
.body-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: all 2s;
  background-color: #f8f8f8;
}
.login-container {
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  background-color: #fff;
  box-shadow: 0 0 10px rgb(236, 236, 236);
  border-radius: 10px;
  padding: 18px;
  display: flex;
}
.login-wrap {
  width: 40%;
  position: relative;
  display: flex;
  flex-direction: column;
  .top-wrap {
    display: flex;
    align-items: center;
    line-height: 20px;
    justify-content: space-between;
    .logo-text {
      font-size: 20px;
      font-weight: 700;
    }
    .logo-text:last-child {
      font-size: 14px;
      font-weight: 100;
      color: #696969;
    }
  }
  .type {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15%;
  }
}
.img-cover {
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 20px;
  position: relative;
  & > img {
    object-fit: cover;
  }
  .img-cover-text {
    position: absolute;
    top: 50%;
    left: 80px;
    height: 300px;
    margin-top: -200px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    img {
      width: 140px;
      height: 140px;
      margin-bottom: 40px;
    }
    .title {
      font-size: 46px;
      background-color: #000; /* 背景颜色设置为黑色 */
      color: white; /* 文字颜色设置为白色 */
      mix-blend-mode: difference;
      text-shadow: 0 0 10px rgb(88, 88, 88);
      margin-bottom: 10px;
    }
    .info {
      font-size: 24px;
      background-color: #000; /* 背景颜色设置为黑色 */
      color: white; /* 文字颜色设置为白色 */
      mix-blend-mode: difference;
    }
  }
  .beian {
    position: absolute;
    bottom: 10px;
    a {
      color: #808080;
      text-decoration: none;
      font-size: 14px;
    }
  }
}

.info {
  font-size: 2em;
  white-space: nowrap;
  overflow: hidden; /* Ensures the text is hidden until typed */
  border-right: 0.15em solid orange; /* Typing cursor */
  width: 0; /* Start with no width */
  animation: typing 6s steps(30, end) infinite; /* Typing effect */
}

@keyframes typing {
  0%,
  20% {
    width: 0; /* Start with nothing */
  }
  20%,
  80% {
    width: 100%; /* Full text */
  }
  85%,
  100% {
    width: 0; /* Hide text again */
  }
}

// .box-card {
//   width: 500px;
//   border-radius: 10px;
//   box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
//   padding: 20px;
// }

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.sub-title {
  font-size: 14px;
  color: #808080;
}

.tabs-style {
  .el-tabs__content {
    display: none;
  }
  :deep(.el-tabs__item) {
    margin: 0 60px;
  }
}

.login-form {
  width: 100%;
}

.photo-vertify {
  display: flex;
  width: 100%;
  .el-input {
    flex: 1;
  }
  .photo-img {
    margin-left: 10px;
    img {
      height: 30px;
      display: block;
      cursor: pointer;
    }
  }
}

.login-button {
  width: 100%;
  background-color: #409eff;
  border-color: #409eff;
}

.login-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.error-alert {
  margin-top: 20px;
}

.additional-links {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  .register-btn {
    font-size: 14px;
    color: #ffa040;
    text-decoration: underline;
  }
}
</style>
