// 生成更加丰富的后台管理系统页面
const fs = require('fs');

// 生成增强的列表页面模板
function generateEnhancedListPage(role, menu, roleData) {
  const columns = menu.columns || ['编号', '名称', '状态', '创建时间'];
  const sampleData = menu.sampleData || [];
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${menu.name} - ${roleData.name}后台</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #1890ff;
            --success-color: #52c41a;
            --warning-color: #faad14;
            --error-color: #f5222d;
            --text-color: #262626;
            --text-secondary: #8c8c8c;
            --border-color: #d9d9d9;
            --bg-color: #f0f2f5;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            background: var(--bg-color);
            color: var(--text-color);
        }
