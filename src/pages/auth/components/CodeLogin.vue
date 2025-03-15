<template>
  <el-form ref="loginForm" :model="form" :rules="rules">
    <el-form-item>
      <div class="login-type-title">登录/LOGIN</div>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="请输入您的邮箱" :prefix-icon="icons.Message"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <div class="code-vertify">
        <el-input
          v-model="form.code"
          type="text"
          placeholder="请输入邮箱验证码"
          :prefix-icon="icons.ChatLineRound"
          maxlength="6"
        ></el-input>
        <el-button :disabled="sendCodeBtn.isDisabled" @click="sendCode">{{ sendCodeBtn.label }}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.inviter_id" placeholder="请输入邀请码" :prefix-icon="icons.Share"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-button" @click="submitForm('loginForm')">登录</el-button>
    </el-form-item>
    <el-form-item class="sep-form-item">
      <el-divider class="sep-line">or</el-divider>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" class="login-type-button" @click="toEmail">密码登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { login } from '@/utils';
import { defineComponent, mounted } from 'vue';
import { Message, Lock, DocumentChecked, ChatLineRound, Share } from '@element-plus/icons-vue';
import { ElMessage, ElForm, ElFormItem, ElInput, ElButton, ElDivider, ElNotification } from 'element-plus';
import { oauthOperator } from '@/operators/auth';

interface IData {
  form: {
    email: string;
    code: string;
    inviter_id: string;
  };
  rules: {
    email: { required: boolean; message: string; trigger: string }[];
    code: { required: boolean; message: string; trigger: string }[];
  };
  redirect: string | undefined;
  errorMessage: string | null;
  captchaInfo: {
    captchaId: string | null;
    captchaImage: string | null;
  };
  icons: any;
  isSendCode: boolean;
  sendCodeBtn: {
    label: string;
    isDisabled: boolean;
  };
}

export default defineComponent({
  name: 'CodeLogin',
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
        code: ''
      },
      rules: {
        email: [{ required: true, message: '请输入您的邮箱', trigger: 'blur' }],
        code: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }]
      },
      redirect: this.$route.query.redirect?.toString() || '/',
      errorMessage: null,
      captchaInfo: {
        captchaId: null,
        captchaImage: null
      },
      isSendCode: false,
      sendCodeBtn: {
        label: '发送验证码',
        isDisabled: false
      },
      icons: {
        Message,
        Lock,
        DocumentChecked,
        ChatLineRound,
        Share
      }
    };
  },
  mounted() {
    this.form.inviter_id = this.$route.query?.inviter_id || '';
  },
  methods: {
    toEmail() {
      this.$emit('change-type', 'password');
    },
    sendCode() {
      // 邮箱合法
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(this.form.email)) {
        ElMessage.warning('请输入有效的邮箱');
        return;
      }
      this.sendCodeBtn.isDisabled = true;
      this.sendCodeBtn.label = `正在发送...`;
      // 发送邮件验证码
      oauthOperator
        .sendCode({ email: this.form.email })
        .then((res) => {
          if (res.status === 200) {
            ElMessage.success('验证码发送成功');
            this.isSendCode = true;
            // 修改按钮状态
            let seconds = 60;
            const timer = setInterval(() => {
              this.sendCodeBtn.label = `${seconds}s后重新发送`;
              if (seconds === 0) {
                clearInterval(timer);
                this.sendCodeBtn.isDisabled = false;
                this.sendCodeBtn.label = `发送验证码`;
              }
              seconds--;
            }, 1000);
          } else {
            ElMessage.error('验证码发送失败');
            this.sendCodeBtn.isDisabled = false;
          }
        })
        .catch((err) => {
          ElMessage.error('验证码发送失败');
          this.sendCodeBtn.isDisabled = false;
        });
    },
    submitForm(formName: string) {
      if (!this.isSendCode) {
        ElMessage.warning('请先发送验证码');
        return;
      }
      (this.$refs[formName] as any).validate(async (valid: boolean) => {
        if (valid) {
          try {
            await oauthOperator
              .verifyCode(
                {
                  email: this.form.email,
                  code: this.form.code
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
              })
              .catch((err) => {
                ElMessage.error(err?.response?.data?.detail?.message || '登录失败');
              });
          } catch (error) {
            this.errorMessage = '登录失败，请检查您的邮箱和验证码';
          }
        } else {
          ElMessage.warning('请填写所有必填字段');
          return false;
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
      height: 30px;
      display: block;
      cursor: pointer;
    }
  }
}

.code-vertify {
  display: flex;
  width: 100%;
  .el-input {
    flex: 1;
  }
  .el-button {
    margin-left: 10px;
    border-radius: 10px;
    &:hover {
      background-color: #fff5eb;
      border-color: #ffe2c7;
      color: #ffa040;
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
