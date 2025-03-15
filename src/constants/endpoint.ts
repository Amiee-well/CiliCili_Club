// 定义环境
enum Environment {
  ORIGINAL, // 原始服务
  JD_CLOUD, // 京东云服务
  ALI_CLOUD_IP, // 阿里云服务（IP）
  ALI_CLOUD_DOMAIN, // 阿里云服务（域名）
  ALI_CLOUD_DOMAIN_PROXY, // 阿里云服务（域名） - nginx 代理转发
  SERVER_8_130_102_178
}

// 根据环境选择 base URL
const BASE_URLS = {
  [Environment.ORIGINAL]: {
    BASE_URL_PLATFORM: 'https://platform.acedata.cloud', // 原始服务平台地址
    BASE_URL_HUB: 'https://hub.acedata.cloud', // 原始服务Hub地址
    BASE_URL_AUTH: 'https://auth.acedata.cloud', // 原始服务认证地址
    BASE_URL_API: 'https://api.acedata.cloud', // 原始服务API地址
    BASE_URL_API2: 'https://api2.acedata.cloud' // 原始服务API2地址
  },
  [Environment.JD_CLOUD]: {
    BASE_URL_PLATFORM: 'http://117.72.76.201:12358', // 京东云服务平台地址
    BASE_URL_HUB: 'http://117.72.76.201:12358', // 京东云服务Hub地址
    BASE_URL_AUTH: 'http://117.72.76.201:12358', // 京东云服务认证地址
    BASE_URL_API: 'http://117.72.76.201:12358', // 京东云服务API地址
    BASE_URL_API2: 'http://117.72.76.201:12358' // 京东云服务API2地址
  },
  [Environment.ALI_CLOUD_IP]: {
    BASE_URL_PLATFORM: 'http://139.196.103.78:12358', // 阿里云服务（IP）平台地址
    BASE_URL_HUB: 'http://139.196.103.78:12358', // 阿里云服务（IP）Hub地址
    BASE_URL_AUTH: 'http://139.196.103.78:12358', // 阿里云服务（IP）认证地址
    BASE_URL_API: 'http://139.196.103.78:12358', // 阿里云服务（IP）API地址
    BASE_URL_API2: 'http://139.196.103.78:12358' // 阿里云服务（IP）API2地址
  },
  [Environment.ALI_CLOUD_DOMAIN]: {
    BASE_URL_PLATFORM: 'https://api.cilicili.club', // 阿里云服务（域名）平台地址
    BASE_URL_HUB: 'https://api.cilicili.club', // 阿里云服务（域名）Hub地址
    BASE_URL_AUTH: 'https://api.cilicili.club', // 阿里云服务（域名）认证地址
    BASE_URL_API: 'https://api.cilicili.club', // 阿里云服务（域名）API地址
    BASE_URL_API2: 'https://api.cilicili.club' // 阿里云服务（域名）API2地址
  },
  [Environment.ALI_CLOUD_DOMAIN_PROXY]: {
    BASE_URL_PLATFORM: 'https://cilicili.club/cili-service', // 阿里云服务（域名） - nginx 代理转发平台地址
    BASE_URL_HUB: 'https://cilicili.club/cili-service', // 阿里云服务（域名） - nginx 代理转发Hub地址
    BASE_URL_AUTH: 'https://cilicili.club/cili-service', // 阿里云服务（域名） - nginx 代理转发认证地址
    BASE_URL_API: 'https://cilicili.club/cili-service', // 阿里云服务（域名） - nginx 代理转发API地址
    BASE_URL_API2: 'https://cilicili.club/cili-service' // 阿里云服务（域名） - nginx 代理转发API2地址
  },
  [Environment.SERVER_8_130_102_178]: {
    BASE_URL_PLATFORM: 'http://8.130.102.178:12358',
    BASE_URL_HUB: 'http://8.130.102.178:12358',
    BASE_URL_AUTH: 'http://8.130.102.178:12358',
    BASE_URL_API: 'http://8.130.102.178:12358',
    BASE_URL_API2: 'http://8.130.102.178:12358'
  }
};

// 选择当前环境
const CURRENT_ENVIRONMENT = Environment.ALI_CLOUD_DOMAIN; // 修改这个值来切换环境

// 导出对应的 base URL
export const { BASE_URL_PLATFORM, BASE_URL_HUB, BASE_URL_AUTH, BASE_URL_API, BASE_URL_API2 } =
  BASE_URLS[CURRENT_ENVIRONMENT];
