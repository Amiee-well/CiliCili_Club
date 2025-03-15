<template>
  <div id="docmee-container"></div>
</template>

<script>
import axios from 'axios';
import { oauthOperator } from '@/operators/auth';

export default {
  name: 'DocmeeUIComponent',
  data() {
    return {
      docmeeUI: null // 存储 DocmeeUI 实例
    };
  },

  async mounted() {
    try {
      await this.loadScript('/src/assets/docmee-ui-sdk-iframe.min.js');
      await this.initializeDocmeeUI();
    } catch (error) {
      console.error('Failed to load DocmeeUI SDK or initialize:', error);
    }
  },

  beforeUnmount() {
    this.destroyDocmeeUI();
  },
  methods: {
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    // 导航到指定页面
    toPage(page) {
      if (window.docmeeUI) {
        window.docmeeUI.navigate({ page });
        this.pageChange(page);
      }
    },

    // 切换选择类型
    changeSelectType() {
      const selectTypes = ['subject', 'text', 'file', 'dataUrl', 'outline'];
      const selectType = document.getElementById('selectType').value;
      selectTypes.forEach((type) => {
        const element = document.getElementById(`input_${type}`);
        if (element) {
          element.style.display = selectType === type ? 'inline-block' : 'none';
        }
      });
    },

    // 解析文件数据
    async parseFileData(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('https://docmee.cn/api/ppt/parseFileData', formData, {
          headers: {
            token: await this.getToken()
          }
        });
        if (response.data.code !== 0) {
          alert('解析文件异常：' + response.data.message);
          return null;
        }
        return response.data.data.dataUrl;
      } catch (error) {
        alert('解析文件网络异常: ' + error.message);
        return null;
      }
    },

    // 提取文件大纲
    async extractFileOutline(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('https://docmee.cn/api/ppt/extractFileOutline?format=text', formData, {
          headers: {
            token: await this.getToken()
          }
        });
        if (response.data.code !== 0) {
          alert('提取文件大纲异常：' + response.data.message);
          return null;
        }
        const { dataUrl, outlineText } = response.data.data;
        return { dataUrl, outlineText };
      } catch (error) {
        alert('提取文件大纲网络异常: ' + error.message);
        return null;
      }
    },

    // 生成 PPT
    async generate() {
      const selectType = document.getElementById('selectType').value;
      let input = null;
      if (selectType === 'file' || selectType === 'outline') {
        const fileElement = document.getElementById(`input_${selectType}`);
        input = fileElement?.files?.[0];
      } else {
        input = document.getElementById(`input_${selectType}`)?.value;
      }
      if (!input) {
        alert('输入不能为空');
        return;
      }
      if (selectType === 'dataUrl' && !input.startsWith('http')) {
        alert('文件链接格式错误');
        return;
      }
      if (!window.docmeeUI) {
        alert('DocmeeUI 未初始化');
        return;
      }
      window.docmeeUI.navigate({ page: 'creator' });
      switch (selectType) {
        case 'subject':
          window.docmeeUI.changeCreatorData({ subject: input }, true);
          break;
        case 'text':
          window.docmeeUI.changeCreatorData({ text: input }, true);
          break;
        case 'file': {
          const dataUrl = await this.parseFileData(input);
          if (dataUrl) {
            window.docmeeUI.changeCreatorData({ dataUrl }, true);
          }
          break;
        }
        case 'dataUrl':
          window.docmeeUI.changeCreatorData({ dataUrl: input }, true);
          break;
        case 'outline': {
          const data = await this.extractFileOutline(input);
          if (data) {
            window.docmeeUI.changeCreatorData(
              {
                outlineMarkdown: data.outlineText,
                dataUrl: data.dataUrl
              },
              true
            );
          }
          break;
        }
        default:
          alert('未知类型：' + selectType);
          return;
      }

      const container = document.querySelector('#container');
      if (container) {
        container.style.display = 'block';
      }
    },

    // 处理页面变化，更新选中状态
    pageChange(page) {
      const element = document.getElementById('page_' + page);
      if (element) {
        // 移除所有同级元素的 selected 类
        element.parentNode.childNodes.forEach((node) => {
          if (node.classList) {
            node.classList.remove('selected');
          }
        });
        // 为当前元素添加 selected 类
        element.classList.add('selected');
      }
    },

    // 后端获取 token 的方法
    async getToken() {
      try {
        const response = await oauthOperator.getToken();
        return response.data.token;
      } catch (error) {
        console.error('Failed to fetch token:', error);
        return null;
      }
    },

    // 后端获取 token 是否可用
    async verifyToken(token) {
      try {
        const response = await oauthOperator.verify_token(token);
        return response.data.verify_bool;
      } catch (error) {
        console.error('Failed to fetch verify:', error);
        return null;
      }
    },

    async initializeDocmeeUI() {
      const token = await this.getToken();
      if (!token) {
        alert('Failed to initialize DocmeeUI due to token error.');
        return;
      }

      // 实例化 DocmeeUI
      window.docmeeUI = new DocmeeUI({
        pptId: null,
        token: token, // token
        container: document.getElementById('docmee-container'), // 挂载 iframe 的容器
        page: 'creator', // 'dashboard' ppt列表; 'creator' 创建页面; 'customTemplate' 自定义模版
        lang: 'zh', // 国际化
        mode: 'light', // light 亮色模式, dark 暗色模式
        isMobile: false, // 移动端模式
        background: 'linear-gradient(-157deg,#f57bb0, #867dea)', // 自定义背景
        padding: '40px 20px 0px', // iframe 内边距
        onMessage: (message) => {
          console.log(message);
          if (message.type === 'invalid-token') {
            // 在token失效时触发
            console.log('token 认证错误');
          } else if (message.type === 'beforeGenerate') {
            const { subtype, fields } = message.data;
            if (subtype === 'outline') {
              // 生成大纲前触发
              console.log('即将生成ppt大纲', fields);
              return true;
            } else if (subtype === 'ppt') {
              // 生成PPT前触发
              window.docmeeUI.sendMessage({
                type: 'success',
                content: '继续生成PPT'
              });
              return true;
            }
          } else if (message.type === 'beforeCreateCustomTemplate') {
            const { file, totalPptCount } = message.data;
            // 是否允许用户继续制作PPT
            console.log('用户自定义完整模版，PPT文件：', file.name);
            if (totalPptCount < 2) {
              console.log('用户积分不足，不允许制作自定义完整模版');
              return false;
            }
            return true;
          } else if (message.type == 'pageChange') {
            pageChange(message.data.page);
          } else if (message.type === 'beforeDownload') {
            // 自定义下载PPT的文件名称
            return `PPT_${new Date().getTime()}.pptx`;
          } else if (message.type == 'error') {
            if (message.data.code == 88) {
              // 创建token传了limit参数可以限制使用次数
              alert('发生错误,请联系公众号.');
            } else {
              alert('发生错误：' + message.data.message);
            }
          }
        }
      });
    },

    // 销毁 DocmeeUI
    destroyDocmeeUI() {
      if (this.docmeeUI) {
        this.docmeeUI.destroy();
        this.docmeeUI = null;
      }
    }
  }
};
</script>

<style scoped>
#docmee-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(120, 120, 120, 0.3);
  overflow: hidden;
  background: linear-gradient(-157deg, #f57bb0, #867dea);
}
</style>
