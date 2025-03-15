const fs = require('fs');
const path = require('path');

// 获取命令行参数
const pageName = process.argv[2];

if (!pageName) {
  console.error('请提供页面名称！例如：yarn page custom，即可创建一个名为 custom 的页面（请不要和历史页面名称重复）。');
  process.exit(1);
}

// 定义文件夹和文件路径
const dirPath = path.join(__dirname, '../src/pages', pageName);
const filePath = path.join(dirPath, 'index.vue');
const templatePath = path.join(__dirname, './template/addCustomPage/index.vue');

// 检查文件夹是否已存在
if (fs.existsSync(dirPath)) {
  console.error(`错误: 文件夹 "${pageName}" 已存在！`);
  process.exit(1);
}

// 创建文件夹
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) {
    console.error('创建文件夹失败:', err);
    return;
  }

  // 读取模板文件内容
  fs.readFile(templatePath, 'utf-8', (err, templateContent) => {
    if (err) {
      console.error('读取模板文件失败:', err);
      return;
    }

    // 替换占位符
    const pageContent = templateContent.replace(/{{pageName}}/g, pageName);

    // 创建 index.vue 文件
    fs.writeFile(filePath, pageContent, (err) => {
      if (err) {
        console.error('创建 index.vue 失败:', err);
        return;
      }

      console.log(`页面 "${pageName}" 创建成功！`);
    });
  });
});
