<template>
  <el-form ref="loginForm" :model="form" :rules="rules">
    <el-form-item>
      <div class="login-type-title">登录/LOGIN</div>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="请输入您的邮箱" :prefix-icon="icons.Message"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="请输入您的密码"
        :prefix-icon="icons.Lock"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="" prop="captcha">
      <div class="photo-vertify">
        <el-input
          v-model="form.captcha"
          type="text"
          placeholder="请输入图形验证码"
          :prefix-icon="icons.DocumentChecked"
          maxlength="6"
        ></el-input>
        <div class="photo-img">
          <img
            v-if="captchaInfo.captchaImage"
            :src="captchaInfo.captchaImage"
            alt="验证码加载失败"
            title="看不清，换一张"
            @click="getCaptcha"
          />
          <span v-else @click="getCaptcha">正在加载...</span>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.inviter_id" placeholder="请输入邀请码" :prefix-icon="icons.Share"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" class="login-button" @click="submitForm('loginForm')">登录</el-button>
    </el-form-item>
    <el-form-item class="sep-form-item">
      <el-divider class="sep-line">or</el-divider>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" class="login-type-button" @click="toEmail">验证码登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { login } from '@/utils';
import { defineComponent, mounted } from 'vue';
import { Message, Lock, DocumentChecked, Share } from '@element-plus/icons-vue';
import { ElMessage, ElForm, ElFormItem, ElInput, ElButton, ElDivider } from 'element-plus';
import { oauthOperator } from '@/operators/auth';

interface IData {
  form: {
    email: string;
    password: string;
    captcha: string;
    inviter_id: string;
  };
  rules: {
    email: { required: boolean; message: string; trigger: string }[];
    password: { required: boolean; message: string; trigger: string }[];
    captcha: { required: boolean; message: string; trigger: string }[];
  };
  redirect: string | undefined;
  errorMessage: string | null;
  captchaInfo: {
    captchaId: string | null;
    captchaImage: string | null;
  };
  activeName: string;
  icons: any;
}

export default defineComponent({
  name: 'PasswordLogin',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider
  },
  emits: ['change-type'],
  data(): IData {
    return {
      form: {
        email: '',
        password: '',
        captcha: '',
        inviter_id: ''
      },
      rules: {
        email: [{ required: true, message: '请输入您的邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入您的密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
      },
      redirect: this.$route.query.redirect?.toString() || '/',
      errorMessage: null,
      captchaInfo: {
        captchaId: null,
        captchaImage: null
      },
      activeName: 'password',
      icons: {
        Message,
        Lock,
        DocumentChecked,
        Share
      }
    };
  },
  mounted() {
    this.getCaptcha();
    this.form.inviter_id = this.$route.query?.inviter_id || '';
  },
  methods: {
    toEmail() {
      this.$emit('change-type', 'code');
    },
    submitForm(formName: string) {
      (this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          try {
            await oauthOperator
              .verifyPassword(
                {
                  email: this.form.email,
                  password: this.form.password,
                  captcha: {
                    captcha_id: this.captchaInfo.captchaId,
                    code: this.form.captcha
                  }
                },
                this.form.inviter_id
              )
              .then((res) => {
                if (res.status === 200) {
                  console.log(res);
                  // 登录成功
                  ElMessage.success('登录成功');
                  const token = {
                    access: res.data.token,
                    refresh: res.data.refresh_token,
                    expiration: res.data.expires_in
                  };
                  this.$store.commit('setToken', token);
                  this.loginSuccess();
                  if (res.data.first_login) {
                    ElNotification.info({
                      title: '通知',
                      message: '每日登录积分 +' + res.data.daily_score
                    });
                  }
                }
              });
          } catch (error) {
            if (error.response && (error.response.status === 418 || error.response.status === 401)) {
              ElMessage.error(error.response.data.detail.message);
            } else {
              this.errorMessage = '登录失败，请检查您的邮箱和密码';
            }
          }
        } else {
          ElMessage.warning('请填写所有必填字段');
          return false;
        }
      });
    },
    toLogin() {
      let redirectValue: string = '/';
      if (this.redirect && this.redirect !== '/') {
        // 创建URL对象
        var urlObj = new URL(this.redirect);
        // 使用URLSearchParams API获取参数
        redirectValue = urlObj.searchParams.get('redirect') || '/';
      }
      console.log(redirectValue); // 输出redirect的值，应该是 "/"
      redirectValue = redirectValue === '/auth/login' ? '/' : redirectValue;
      const path = `${window.location.origin}/auth/callback?code=710a929f-0d9a-4ec5-861a-0967ab99806b&redirect=${redirectValue}`;
      console.log(path);
      window.location.href = path;
    },
    register() {
      this.$router.push('/register');
    },
    getCaptcha() {
      oauthOperator.captcha().then((res) => {
        if (res.status === 200) {
          this.captchaInfo.captchaId = res.data.captcha_id;
          this.captchaInfo.captchaImage = res.data.captcha_image;
        }
      });
    },
    loginSuccess() {
      let redirectValue: string = '/';
      if (this.redirect && this.redirect !== '/') {
        // 创建URL对象
        var urlObj = new URL(this.redirect);
        // 使用URLSearchParams API获取参数
        redirectValue = urlObj.searchParams.get('redirect') || '/';
      }
      console.log(redirectValue); // 输出redirect的值，应该是 "/"
      redirectValue = redirectValue === '/auth/login' ? '/' : redirectValue;
      // const path = `${window.location.origin}/auth/callback?code=710a929f-0d9a-4ec5-861a-0967ab99806b&redirect=${redirectValue}`;
      // console.log(path);
      // window.location.href = path;
      try {
        this.$router.push(redirectValue);
      } catch (error) {
        this.$router.push('/');
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.login-type-title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 30px;
}
.el-form-item {
  margin-bottom: 30px;
  .el-input,
  .el-button {
    height: 40px;
  }
}
.sep-form-item {
  margin-bottom: 15px;
  margin-top: -10px;
}
.sep-line {
  opacity: 0.4;
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
  margin-top: 20px;
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
      height: 40px;
      display: block;
      cursor: pointer;
    }
  }
}

.login-button {
  width: 100%;
  background-color: #ffa040;
  border-color: #ffa040;
  border-radius: 10px;
}

.login-button:hover {
  background-color: #ffc78f;
  border-color: #ffc78f;
}

.login-type-button {
  color: #ffa040;
  width: 100%;
  background-color: #ffeddb;
  border-color: #ffeddb;
  border-radius: 10px;
}

.login-type-button:hover {
  background-color: #ffe2c7;
  border-color: #ffe2c7;
}

.error-alert {
  margin-top: 20px;
}

.additional-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
