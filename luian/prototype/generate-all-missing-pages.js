// 生成所有缺失的后台管理页面
const fs = require('fs');

// 定义所有后台角色的完整菜单结构
const allMenus = {
  'producer': [
    // 品牌管理
    { id: 'brand-list', name: '品牌列表', category: '品牌管理' },
    { id: 'brand-rights', name: '权属管理', category: '品牌管理' },
    { id: 'brand-auth', name: '授权管理', category: '品牌管理' },
    { id: 'brand-warning', name: '到期预警', category: '品牌管理' },
    // 渠道管理
    { id: 'channel-list', name: '渠道商列表', category: '渠道管理' },
    { id: 'channel-auth', name: '授权监控', category: '渠道管理' },
    { id: 'channel-performance', name: '绩效评估', category: '渠道管理' },
    // 巡查监督
    { id: 'inspection-tasks', name: '巡查任务', category: '巡查监督' },
    { id: 'inspection-reports', name: '巡查报告', category: '巡查监督' },
    { id: 'inspection-evidence', name: '证据管理', category: '巡查监督' },
    // 法律服务
    { id: 'legal-cases', name: '案件管理', category: '法律服务' },
    { id: 'legal-documents', name: '文书管理', category: '法律服务' },
    { id: 'legal-archive', name: '档案管理', category: '法律服务' },
    // 纠纷处理
    { id: 'dispute-mediation', name: '调解管理', category: '纠纷处理' },
    { id: 'dispute-arbitration', name: '仲裁管理', category: '纠纷处理' }
  ],
  'lawyer': [
    { id: 'case-list', name: '案件列表', category: '案件管理' },
    { id: 'case-ip', name: '知识产权案件', category: '案件管理' },
    { id: 'case-consumer', name: '消费者案件', category: '案件管理' },
    { id: 'document-list', name: '文书列表', category: 'AI文书生成' },
    { id: 'document-template', name: '文书模板', category: 'AI文书生成' },
    { id: 'review-list', name: '评审列表', category: '三级评审' },
    { id: 'signature-list', name: '签名列表', category: 'CFCA电子签名' }
  ],
  'expert': [
    { id: 'appraisal-list', name: '鉴定列表', category: '商品鉴定' },
    { id: 'appraisal-report', name: '鉴定报告', category: '商品鉴定' },
    { id: 'course-list', name: '课程列表', category: '品牌学院' },
    { id: 'course-manage', name: '课程管理', category: '品牌学院' },
    { id: 'standard-list', name: '标准列表', category: '标准制定' },
    { id: 'standard-draft', name: '标准起草', category: '标准制定' }
  ]
};

const roleName = {
  'producer': '生产商/代理商',
  'lawyer': '律师',
  'expert': '专家'
};

// 列表页面模板
function generateListPage(role, menu) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${menu.name} - ${roleName[role]}后台</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            background: #f0f2f5;
        }
        .header {
            background: white;
            padding: 16px 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-title { font-size: 20px; font-weight: 600; }
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #8c8c8c;
            margin-top: 4px;
        }
        .content { padding: 24px; }
        .toolbar {
            background: white;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .search-box { display: flex; gap: 12px; }
        .search-input {
            padding: 8px 12px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            width: 300px;
        }
        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .btn-primary { background: #1890ff; color: white; }
        .btn-default {
            background: white;
            color: #262626;
            border: 1px solid #d9d9d9;
        }
        .table-container {
            background: white;
            border-radius: 8px;
            overflow: hidden;
        }
        table { width: 100%; border-collapse: collapse; }
        th {
            background: #fafafa;
            padding: 16px;
            text-align: left;
            font-weight: 600;
            border-bottom: 1px solid #f0f0f0;
        }
        td {
            padding: 16px;
            border-bottom: 1px solid #f0f0f0;
        }
        tr:hover { background: #fafafa; }
        .status-badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .status-success { background: #f6ffed; color: #52c41a; }
        .status-warning { background: #fff7e6; color: #faad14; }
        .status-error { background: #fff1f0; color: #f5222d; }
        .action-btns { display: flex; gap: 8px; }
        .btn-link {
            color: #1890ff;
            cursor: pointer;
            text-decoration: none;
        }
        .btn-link:hover { text-decoration: underline; }
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            padding: 16px;
        }
        .page-btn {
            padding: 6px 12px;
            border: 1px solid #d9d9d9;
            background: white;
            cursor: pointer;
            border-radius: 4px;
        }
        .page-btn.active {
            background: #1890ff;
            color: white;
            border-color: #1890ff;
        }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="header-title">${menu.name}</div>
            <div class="breadcrumb">
                <a href="admin-${role}-v3.html" style="color: #1890ff; text-decoration: none;">首页</a>
                <span>/</span>
                <span>${menu.category}</span>
                <span>/</span>
                <span>${menu.name}</span>
            </div>
        </div>
        <button class="btn btn-primary" onclick="location.href='admin-${role}-${menu.id}-form.html'">
            <i class="fas fa-plus"></i>
            新建
        </button>
    </div>
    <div class="content">
        <div class="toolbar">
            <div class="search-box">
                <input type="text" class="search-input" placeholder="搜索...">
                <button class="btn btn-default">
                    <i class="fas fa-search"></i>
                    搜索
                </button>
            </div>
            <div>
                <button class="btn btn-default">
                    <i class="fas fa-filter"></i>
                    筛选
                </button>
                <button class="btn btn-default">
                    <i class="fas fa-download"></i>
                    导出
                </button>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>编号</th>
                        <th>名称</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateTableRows(role, menu)}
                </tbody>
            </table>
            <div class="pagination">
                <button class="page-btn">上一页</button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">下一页</button>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// 生成表格行
function generateTableRows(role, menu) {
  const rows = [];
  for (let i = 1; i <= 10; i++) {
    const status = i % 3 === 0 ? 'warning' : 'success';
    const statusText = i % 3 === 0 ? '待审核' : '正常';
    rows.push(`
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>#${String(i).padStart(3, '0')}</td>
                        <td>示例数据${i}</td>
                        <td><span class="status-badge status-${status}">${statusText}</span></td>
                        <td>2024-02-${String(10 + i).padStart(2, '0')} ${String(9 + i).padStart(2, '0')}:30</td>
                        <td class="action-btns">
                            <a href="admin-${role}-${menu.id}-form.html?id=${i}" class="btn-link">编辑</a>
                            <a href="#" class="btn-link">查看</a>
                            <a href="#" class="btn-link" style="color: #f5222d;">删除</a>
                        </td>
                    </tr>`);
  }
  return rows.join('');
}

// 表单页面模板
function generateFormPage(role, menu) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${menu.name}表单 - ${roleName[role]}后台</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            background: #f0f2f5;
        }
        .header {
            background: white;
            padding: 16px 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .header-title { font-size: 20px; font-weight: 600; }
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #8c8c8c;
            margin-top: 4px;
        }
        .content {
            padding: 24px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .form-container {
            background: white;
            border-radius: 8px;
            padding: 24px;
        }
        .form-section { margin-bottom: 32px; }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f0f0f0;
        }
        .form-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 24px;
        }
        .form-row.full { grid-template-columns: 1fr; }
        .form-item {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .form-label {
            font-size: 14px;
            font-weight: 500;
        }
        .form-label.required::before {
            content: '*';
            color: #f5222d;
            margin-right: 4px;
        }
        .form-input,
        .form-select,
        .form-textarea {
            padding: 8px 12px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
        }
        .form-textarea {
            min-height: 100px;
            resize: vertical;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            outline: none;
            border-color: #1890ff;
        }
        .form-actions {
            display: flex;
            justify-content: center;
            gap: 16px;
            padding-top: 24px;
            border-top: 1px solid #f0f0f0;
        }
        .btn {
            padding: 10px 32px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        .btn-primary { background: #1890ff; color: white; }
        .btn-default {
            background: white;
            color: #262626;
            border: 1px solid #d9d9d9;
        }
        .btn:hover { opacity: 0.8; }
        .upload-area {
            border: 1px dashed #d9d9d9;
            border-radius: 4px;
            padding: 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        .upload-area:hover { border-color: #1890ff; }
        .upload-icon {
            font-size: 48px;
            color: #8c8c8c;
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-title">${menu.name}表单</div>
        <div class="breadcrumb">
            <a href="admin-${role}-v3.html" style="color: #1890ff; text-decoration: none;">首页</a>
            <span>/</span>
            <span>${menu.category}</span>
            <span>/</span>
            <a href="admin-${role}-${menu.id}-list.html" style="color: #1890ff; text-decoration: none;">${menu.name}</a>
            <span>/</span>
            <span>新建/编辑</span>
        </div>
    </div>
    <div class="content">
        <div class="form-container">
            <form>
                <div class="form-section">
                    <div class="section-title">基本信息</div>
                    <div class="form-row">
                        <div class="form-item">
                            <label class="form-label required">名称</label>
                            <input type="text" class="form-input" placeholder="请输入名称">
                        </div>
                        <div class="form-item">
                            <label class="form-label required">类型</label>
                            <select class="form-select">
                                <option>请选择类型</option>
                                <option>类型1</option>
                                <option>类型2</option>
                                <option>类型3</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                            <label class="form-label">联系人</label>
                            <input type="text" class="form-input" placeholder="请输入联系人">
                        </div>
                        <div class="form-item">
                            <label class="form-label">联系电话</label>
                            <input type="tel" class="form-input" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-row full">
                        <div class="form-item">
                            <label class="form-label">地址</label>
                            <input type="text" class="form-input" placeholder="请输入地址">
                        </div>
                    </div>
                    <div class="form-row full">
                        <div class="form-item">
                            <label class="form-label">描述</label>
                            <textarea class="form-textarea" placeholder="请输入描述"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-section">
                    <div class="section-title">附件上传</div>
                    <div class="form-row full">
                        <div class="form-item">
                            <label class="form-label">相关文件</label>
                            <div class="upload-area">
                                <div class="upload-icon">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div>点击或拖拽文件到此处上传</div>
                                <div style="font-size: 12px; color: #8c8c8c; margin-top: 8px;">
                                    支持 PDF、Word、Excel、图片等格式
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-default" onclick="history.back()">取消</button>
                    <button type="submit" class="btn btn-primary">保存</button>
                </div>
            </form>
        </div>
    </div>
    <script>
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('表单提交成功！\\n\\n实际应用中会保存数据并返回列表页面。');
        });
    </script>
</body>
</html>`;
}

// 生成所有页面
let totalGenerated = 0;
Object.keys(allMenus).forEach(role => {
  allMenus[role].forEach(menu => {
    const listFilename = `admin-${role}-${menu.id}-list.html`;
    const formFilename = `admin-${role}-${menu.id}-form.html`;
    
    // 生成列表页面
    const listContent = generateListPage(role, menu);
    fs.writeFileSync(listFilename, listContent);
    console.log(`✓ 生成列表页面: ${listFilename}`);
    
    // 生成表单页面
    const formContent = generateFormPage(role, menu);
    fs.writeFileSync(formFilename, formContent);
    console.log(`✓ 生成表单页面: ${formFilename}`);
    
    totalGenerated += 2;
  });
});

console.log(`\n✅ 所有页面生成完成！`);
console.log(`总计生成: ${totalGenerated} 个页面`);
console.log(`\n各角色页面数量:`);
Object.keys(allMenus).forEach(role => {
  console.log(`  ${roleName[role]}: ${allMenus[role].length * 2} 个页面 (${allMenus[role].length} 列表 + ${allMenus[role].length} 表单)`);
});
