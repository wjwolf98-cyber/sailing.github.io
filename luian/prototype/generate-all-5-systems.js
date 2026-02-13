// 生成5个后台管理系统的所有列表和表单页面
const fs = require('fs');
const path = require('path');

// 阿里巴巴标准样式
const getStyles = () => `
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
    line-height: 1.5715;
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
    color: var(--text-secondary);
    margin-top: 4px;
}
.breadcrumb a { color: var(--primary-color); text-decoration: none; }
.content { padding: 24px; max-width: 1600px; margin: 0 auto; }
.stats-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}
.stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.stat-value { font-size: 28px; font-weight: 600; color: var(--primary-color); }
.stat-label { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }
.toolbar {
    background: white;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-box { display: flex; gap: 12px; flex-wrap: wrap; }
.search-input, .search-select {
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
}
.search-input { width: 240px; }
.search-select { width: 160px; }
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s;
}
.btn:hover { opacity: 0.8; }
.btn-primary { background: var(--primary-color); color: white; }
.btn-success { background: var(--success-color); color: white; }
.btn-default { background: white; color: var(--text-color); border: 1px solid var(--border-color); }
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
    font-size: 14px;
}
td {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
}
tr:hover { background: #fafafa; }
.status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}
.status-success { background: #f6ffed; color: var(--success-color); }
.status-warning { background: #fff7e6; color: var(--warning-color); }
.status-error { background: #fff1f0; color: var(--error-color); }
.status-default { background: #fafafa; color: var(--text-secondary); }
.action-btns { display: flex; gap: 12px; }
.btn-link {
    color: var(--primary-color);
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
}
.btn-link:hover { text-decoration: underline; }
.btn-link.danger { color: var(--error-color); }
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
}
.page-btn {
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    background: white;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}
.page-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}
.page-btn:hover:not(.active) { border-color: var(--primary-color); color: var(--primary-color); }
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
    color: var(--text-color);
}
.form-label.required::before {
    content: '*';
    color: var(--error-color);
    margin-right: 4px;
}
.form-input, .form-select, .form-textarea {
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s;
}
.form-textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.form-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
}
.upload-area {
    border: 1px dashed var(--border-color);
    border-radius: 4px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
}
.upload-area:hover { border-color: var(--primary-color); background: #fafafa; }
.upload-icon {
    font-size: 48px;
    color: var(--text-secondary);
    margin-bottom: 12px;
}
.upload-text { font-size: 14px; color: var(--text-color); }
.upload-hint { font-size: 12px; color: var(--text-secondary); margin-top: 8px; }
`;

// 生成列表页
function generateListPage(config) {
    const { title, homeUrl, homeName, category, columns, hasStats = true } = config;
    
    const statsHtml = hasStats ? `
        <div class="stats-cards">
            <div class="stat-card">
                <div class="stat-value">1,234</div>
                <div class="stat-label">总数</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">+56</div>
                <div class="stat-label">今日新增</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">890</div>
                <div class="stat-label">本月统计</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">78%</div>
                <div class="stat-label">完成率</div>
            </div>
        </div>
    ` : '';
    
    const tableHeaders = columns.map(col => `<th>${col}</th>`).join('\n                        ');
    
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>${getStyles()}</style>
</head>
<body>
    <div class="header">
        <div>
            <div class="header-title">${title}</div>
            <div class="breadcrumb">
                <a href="${homeUrl}">${homeName}</a>
                <span>/</span>
                <span>${category}</span>
                <span>/</span>
                <span>${title}</span>
            </div>
        </div>
        <button class="btn btn-primary" onclick="location.href='${config.formUrl}'">
            <i class="fas fa-plus"></i>
            新建
        </button>
    </div>
    <div class="content">
        ${statsHtml}
        <div class="toolbar">
            <div class="search-box">
                <input type="text" class="search-input" placeholder="搜索关键词...">
                <select class="search-select">
                    <option>全部状态</option>
                    <option>正常</option>
                    <option>待审核</option>
                    <option>已禁用</option>
                </select>
                <input type="date" class="search-input" style="width: 160px;">
                <button class="btn btn-primary">
                    <i class="fas fa-search"></i>
                    搜索
                </button>
                <button class="btn btn-default">
                    <i class="fas fa-redo"></i>
                    重置
                </button>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-default">
                    <i class="fas fa-filter"></i>
                    高级筛选
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
                        ${tableHeaders}
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateTableRows(10, config.formUrl)}
                </tbody>
            </table>
            <div class="pagination">
                <button class="page-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">4</button>
                <button class="page-btn">5</button>
                <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
                <span style="margin-left: 16px; color: var(--text-secondary);">共 50 条</span>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// 生成表格行
function generateTableRows(count, formUrl) {
    let rows = '';
    const statuses = [
        { text: '正常', class: 'success' },
        { text: '待审核', class: 'warning' },
        { text: '已禁用', class: 'default' }
    ];
    
    for (let i = 1; i <= count; i++) {
        const status = statuses[i % 3];
        rows += `
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>#${String(i).padStart(4, '0')}</td>
                        <td>示例数据 ${i}</td>
                        <td><span class="status-badge status-${status.class}">${status.text}</span></td>
                        <td>2026-02-${String(10 + i).padStart(2, '0')} ${String(8 + i).padStart(2, '0')}:30</td>
                        <td class="action-btns">
                            <a href="${formUrl}?id=${i}" class="btn-link">编辑</a>
                            <a href="#" class="btn-link">查看</a>
                            <a href="#" class="btn-link danger">删除</a>
                        </td>
                    </tr>`;
    }
    return rows;
}

// 生成表单页
function generateFormPage(config) {
    const { title, homeUrl, homeName, category, listUrl, fields } = config;
    
    const formSections = generateFormSections(fields);
    
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>${getStyles()}</style>
</head>
<body>
    <div class="header">
        <div>
            <div class="header-title">${title}</div>
            <div class="breadcrumb">
                <a href="${homeUrl}">${homeName}</a>
                <span>/</span>
                <span>${category}</span>
                <span>/</span>
                <a href="${listUrl}">列表</a>
                <span>/</span>
                <span>新建/编辑</span>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="form-container">
            <form onsubmit="handleSubmit(event)">
                ${formSections}
                <div class="form-actions">
                    <button type="button" class="btn btn-default" onclick="history.back()">
                        <i class="fas fa-times"></i>
                        取消
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-check"></i>
                        保存
                    </button>
                </div>
            </form>
        </div>
    </div>
    <script>
        function handleSubmit(e) {
            e.preventDefault();
            alert('表单提交成功！\\n\\n实际应用中会保存数据并返回列表页面。');
            // window.location.href = '${listUrl}';
        }
    </script>
</body>
</html>`;
}

// 生成表单区块
function generateFormSections(fields) {
    let html = '';
    
    // 基本信息
    html += `
                <div class="form-section">
                    <div class="section-title">基本信息</div>
                    ${generateFormFields(fields.basic)}
                </div>`;
    
    // 详细信息
    if (fields.detail) {
        html += `
                <div class="form-section">
                    <div class="section-title">详细信息</div>
                    ${generateFormFields(fields.detail)}
                </div>`;
    }
    
    // 附件上传
    if (fields.upload) {
        html += `
                <div class="form-section">
                    <div class="section-title">附件上传</div>
                    <div class="form-row full">
                        <div class="form-item">
                            <label class="form-label">相关文件</label>
                            <div class="upload-area">
                                <div class="upload-icon">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div class="upload-text">点击或拖拽文件到此处上传</div>
                                <div class="upload-hint">支持 PDF、Word、Excel、图片等格式，单个文件不超过10MB</div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    
    return html;
}

// 生成表单字段
function generateFormFields(fields) {
    let html = '';
    let currentRow = [];
    
    fields.forEach((field, index) => {
        const fieldHtml = generateField(field);
        
        if (field.fullWidth) {
            if (currentRow.length > 0) {
                html += `<div class="form-row">${currentRow.join('')}</div>`;
                currentRow = [];
            }
            html += `<div class="form-row full">${fieldHtml}</div>`;
        } else {
            currentRow.push(fieldHtml);
            if (currentRow.length === 2 || index === fields.length - 1) {
                html += `<div class="form-row">${currentRow.join('')}</div>`;
                currentRow = [];
            }
        }
    });
    
    return html;
}

// 生成单个字段
function generateField(field) {
    const required = field.required ? 'required' : '';
    const labelClass = field.required ? 'form-label required' : 'form-label';
    
    let inputHtml = '';
    
    switch (field.type) {
        case 'select':
            inputHtml = `<select class="form-select" ${required}>
                            <option>请选择${field.label}</option>
                            ${field.options.map(opt => `<option>${opt}</option>`).join('')}
                        </select>`;
            break;
        case 'textarea':
            inputHtml = `<textarea class="form-textarea" placeholder="请输入${field.label}" ${required}></textarea>`;
            break;
        case 'date':
            inputHtml = `<input type="date" class="form-input" ${required}>`;
            break;
        case 'datetime':
            inputHtml = `<input type="datetime-local" class="form-input" ${required}>`;
            break;
        case 'number':
            inputHtml = `<input type="number" class="form-input" placeholder="请输入${field.label}" ${required}>`;
            break;
        case 'tel':
            inputHtml = `<input type="tel" class="form-input" placeholder="请输入${field.label}" ${required}>`;
            break;
        case 'email':
            inputHtml = `<input type="email" class="form-input" placeholder="请输入${field.label}" ${required}>`;
            break;
        default:
            inputHtml = `<input type="text" class="form-input" placeholder="请输入${field.label}" ${required}>`;
    }
    
    return `
                        <div class="form-item">
                            <label class="${labelClass}">${field.label}</label>
                            ${inputHtml}
                        </div>`;
}

// 5个系统的配置
const systems = [
    // 1. 系统管理员后台
    {
        id: 'system',
        name: '系统管理员',
        homeUrl: 'pc-system.html',
        pages: [
            {
                id: 'user',
                title: '用户列表',
                category: '用户管理',
                columns: ['编号', '用户名', '姓名', '角色', '部门', '手机号', '状态', '创建时间'],
                fields: {
                    basic: [
                        { label: '用户名', type: 'text', required: true },
                        { label: '真实姓名', type: 'text', required: true },
                        { label: '角色', type: 'select', options: ['系统管理员', '生产商', '律师', '专家', '巡查员'], required: true },
                        { label: '部门', type: 'select', options: ['管理部', '法务部', '巡查部', '专家部'], required: true },
                        { label: '手机号', type: 'tel', required: true },
                        { label: '邮箱', type: 'email', required: false },
                        { label: '身份证号', type: 'text', required: false },
                        { label: '状态', type: 'select', options: ['启用', '禁用'], required: true }
                    ],
                    detail: [
                        { label: '联系地址', type: 'text', fullWidth: true },
                        { label: '备注', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'exam',
                title: '考试列表',
                category: '考试管理',
                columns: ['编号', '考试名称', '考试类型', '适用角色', '考试时长', '及格分数', '状态', '开始时间'],
                fields: {
                    basic: [
                        { label: '考试名称', type: 'text', required: true },
                        { label: '考试类型', type: 'select', options: ['入职考试', '年度考核', '专项培训', '资格认证'], required: true },
                        { label: '适用角色', type: 'select', options: ['巡查员', '律师', '专家', '全部'], required: true },
                        { label: '考试时长(分钟)', type: 'number', required: true },
                        { label: '及格分数', type: 'number', required: true },
                        { label: '总分', type: 'number', required: true },
                        { label: '题目数量', type: 'number', required: true },
                        { label: '状态', type: 'select', options: ['草稿', '已发布', '进行中', '已结束'], required: true }
                    ],
                    detail: [
                        { label: '开始时间', type: 'datetime', required: true },
                        { label: '结束时间', type: 'datetime', required: true },
                        { label: '考试说明', type: 'textarea', fullWidth: true }
                    ]
                }
            },
            {
                id: 'training',
                title: '培训课程列表',
                category: '培训学习',
                columns: ['编号', '课程名称', '讲师', '课程分类', '学时', '学习人数', '评分', '状态', '发布时间'],
                fields: {
                    basic: [
                        { label: '课程名称', type: 'text', required: true },
                        { label: '讲师', type: 'text', required: true },
                        { label: '课程分类', type: 'select', options: ['基础培训', '进阶培训', '专项培训', '认证课程'], required: true },
                        { label: '课程时长(分钟)', type: 'number', required: true },
                        { label: '学分', type: 'number', required: true },
                        { label: '适用角色', type: 'select', options: ['巡查员', '律师', '专家', '全部'], required: true }
                    ],
                    detail: [
                        { label: '课程简介', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            }
        ]
    },
    // 2. 生产商/代理商后台
    {
        id: 'producer',
        name: '生产商/代理商',
        homeUrl: 'admin-producer-v3.html',
        pages: [
            {
                id: 'channel',
                title: '渠道商列表',
                category: '渠道管理',
                columns: ['编号', '渠道商名称', '类型', '区域', '负责人', '联系电话', '状态', '入驻时间'],
                fields: {
                    basic: [
                        { label: '渠道商名称', type: 'text', required: true },
                        { label: '渠道类型', type: 'select', options: ['专卖店', '经销商', '零售终端', '批发商'], required: true },
                        { label: '统一社会信用代码', type: 'text', required: true },
                        { label: '法人代表', type: 'text', required: true },
                        { label: '负责人', type: 'text', required: true },
                        { label: '联系电话', type: 'tel', required: true },
                        { label: '电子邮箱', type: 'email', required: false },
                        { label: '状态', type: 'select', options: ['正常', '待审核', '已禁用'], required: true }
                    ],
                    detail: [
                        { label: '所在区域', type: 'text', required: true },
                        { label: '详细地址', type: 'text', fullWidth: true },
                        { label: '经营范围', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'product',
                title: '产品列表',
                category: '产品管理',
                columns: ['编号', '产品名称', '产品编码', '品牌', '分类', '价格', '库存', '状态', '创建时间'],
                fields: {
                    basic: [
                        { label: '产品名称', type: 'text', required: true },
                        { label: '产品编码', type: 'text', required: true },
                        { label: '所属品牌', type: 'select', options: ['品牌A', '品牌B', '品牌C'], required: true },
                        { label: '产品分类', type: 'select', options: ['服装鞋帽', '食品饮料', '电子产品', '日用百货'], required: true },
                        { label: '指导价(元)', type: 'number', required: true },
                        { label: '最低价(元)', type: 'number', required: true },
                        { label: '库存数量', type: 'number', required: true },
                        { label: '状态', type: 'select', options: ['在售', '下架', '缺货'], required: true }
                    ],
                    detail: [
                        { label: '产品规格', type: 'text', fullWidth: true },
                        { label: '产品描述', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'authorization',
                title: '授权管理列表',
                category: '渠道管理',
                columns: ['编号', '授权编号', '被授权方', '授权品牌', '授权区域', '授权期限', '状态', '创建时间'],
                fields: {
                    basic: [
                        { label: '授权编号', type: 'text', required: true },
                        { label: '被授权方', type: 'select', options: ['渠道商A', '渠道商B', '渠道商C'], required: true },
                        { label: '授权品牌', type: 'select', options: ['品牌A', '品牌B', '品牌C'], required: true },
                        { label: '授权类型', type: 'select', options: ['独家代理', '一般代理', '分销商'], required: true },
                        { label: '授权区域', type: 'text', required: true },
                        { label: '开始日期', type: 'date', required: true },
                        { label: '结束日期', type: 'date', required: true },
                        { label: '状态', type: 'select', options: ['正常', '即将到期', '已到期'], required: true }
                    ],
                    detail: [
                        { label: '授权说明', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            }
        ]
    },
    // 3. 督导部/律师后台
    {
        id: 'lawyer',
        name: '督导部/律师',
        homeUrl: 'admin-lawyer-v3.html',
        pages: [
            {
                id: 'case',
                title: '案件列表',
                category: '案件管理',
                columns: ['编号', '案件编号', '案件类型', '品牌', '被告', '律师', '状态', '立案时间'],
                fields: {
                    basic: [
                        { label: '案件编号', type: 'text', required: true },
                        { label: '案件名称', type: 'text', required: true },
                        { label: '案件类型', type: 'select', options: ['商标侵权', '专利侵权', '不正当竞争', '合同纠纷'], required: true },
                        { label: '所属品牌', type: 'select', options: ['品牌A', '品牌B', '品牌C'], required: true },
                        { label: '原告', type: 'text', required: true },
                        { label: '被告', type: 'text', required: true },
                        { label: '承办律师', type: 'select', options: ['律师A', '律师B', '律师C'], required: false },
                        { label: '状态', type: 'select', options: ['立案', '审理中', '已判决', '执行中', '已结案'], required: true }
                    ],
                    detail: [
                        { label: '立案时间', type: 'date', required: true },
                        { label: '案情描述', type: 'textarea', fullWidth: true },
                        { label: '诉讼请求', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'lawyer-manage',
                title: '律师列表',
                category: '律师管理',
                columns: ['编号', '律师姓名', '执业证号', '专长领域', '在办案件', '胜诉率', '状态', '入职时间'],
                fields: {
                    basic: [
                        { label: '律师姓名', type: 'text', required: true },
                        { label: '执业证号', type: 'text', required: true },
                        { label: '专长领域', type: 'select', options: ['知识产权', '商事诉讼', '刑事辩护', '综合'], required: true },
                        { label: '执业年限', type: 'number', required: true },
                        { label: '联系电话', type: 'tel', required: true },
                        { label: '电子邮箱', type: 'email', required: false },
                        { label: '状态', type: 'select', options: ['在职', '休假', '离职'], required: true }
                    ],
                    detail: [
                        { label: '工作单位', type: 'text', fullWidth: true },
                        { label: '个人简介', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'task',
                title: '巡查任务列表',
                category: '巡查管理',
                columns: ['编号', '任务编号', '任务类型', '品牌', '区域', '巡查员', '状态', '创建时间'],
                fields: {
                    basic: [
                        { label: '任务编号', type: 'text', required: true },
                        { label: '任务名称', type: 'text', required: true },
                        { label: '任务类型', type: 'select', options: ['常规巡查', '专项检查', '投诉核查', '突击检查'], required: true },
                        { label: '所属品牌', type: 'select', options: ['品牌A', '品牌B', '品牌C'], required: true },
                        { label: '巡查区域', type: 'text', required: true },
                        { label: '指派巡查员', type: 'select', options: ['巡查员A', '巡查员B', '巡查员C'], required: false },
                        { label: '优先级', type: 'select', options: ['紧急', '重要', '普通'], required: true },
                        { label: '状态', type: 'select', options: ['待执行', '执行中', '已完成', '已逾期'], required: true }
                    ],
                    detail: [
                        { label: '开始时间', type: 'datetime', required: true },
                        { label: '截止时间', type: 'datetime', required: true },
                        { label: '任务要求', type: 'textarea', fullWidth: true }
                    ]
                }
            }
        ]
    },
    // 4. 专家部/专家后台
    {
        id: 'expert',
        name: '专家部/专家',
        homeUrl: 'admin-expert-v3.html',
        pages: [
            {
                id: 'appraisal',
                title: '鉴定申请列表',
                category: '鉴定管理',
                columns: ['编号', '申请编号', '申请人', '品牌', '商品名称', '鉴定专家', '状态', '申请时间'],
                fields: {
                    basic: [
                        { label: '申请编号', type: 'text', required: true },
                        { label: '申请人', type: 'text', required: true },
                        { label: '联系电话', type: 'tel', required: true },
                        { label: '所属品牌', type: 'select', options: ['品牌A', '品牌B', '品牌C'], required: true },
                        { label: '商品名称', type: 'text', required: true },
                        { label: '购买渠道', type: 'text', required: true },
                        { label: '指派专家', type: 'select', options: ['专家A', '专家B', '专家C'], required: false },
                        { label: '状态', type: 'select', options: ['待分配', '鉴定中', '已完成'], required: true }
                    ],
                    detail: [
                        { label: '申请原因', type: 'textarea', fullWidth: true },
                        { label: '商品描述', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'expert-manage',
                title: '专家列表',
                category: '专家管理',
                columns: ['编号', '专家姓名', '专长领域', '职称', '鉴定数量', '准确率', '状态', '入职时间'],
                fields: {
                    basic: [
                        { label: '专家姓名', type: 'text', required: true },
                        { label: '专长领域', type: 'select', options: ['服装鞋帽', '食品饮料', '电子产品', '化妆品', '综合'], required: true },
                        { label: '职称', type: 'select', options: ['高级专家', '中级专家', '初级专家'], required: true },
                        { label: '从业年限', type: 'number', required: true },
                        { label: '联系电话', type: 'tel', required: true },
                        { label: '电子邮箱', type: 'email', required: false },
                        { label: '状态', type: 'select', options: ['在职', '休假', '离职'], required: true }
                    ],
                    detail: [
                        { label: '工作单位', type: 'text', fullWidth: true },
                        { label: '专家简介', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'knowledge',
                title: '知识库列表',
                category: '知识库管理',
                columns: ['编号', '文章标题', '分类', '作者', '浏览量', '点赞数', '状态', '发布时间'],
                fields: {
                    basic: [
                        { label: '文章标题', type: 'text', required: true },
                        { label: '文章分类', type: 'select', options: ['品牌知识', '产品知识', '鉴别知识', '法律知识'], required: true },
                        { label: '作者', type: 'text', required: true },
                        { label: '标签', type: 'text', required: false },
                        { label: '状态', type: 'select', options: ['草稿', '已发布', '已下架'], required: true }
                    ],
                    detail: [
                        { label: '文章摘要', type: 'textarea', fullWidth: true },
                        { label: '文章内容', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            }
        ]
    },
    // 5. 巡查部/巡查员后台
    {
        id: 'inspector',
        name: '巡查部/巡查员',
        homeUrl: 'admin-inspector.html',
        pages: [
            {
                id: 'task',
                title: '巡查任务列表',
                category: '任务管理',
                columns: ['编号', '任务编号', '任务类型', '品牌', '区域', '巡查员', '状态', '创建时间'],
                fields: {
                    basic: [
                        { label: '任务编号', type: 'text', required: true },
                        { label: '任务名称', type: 'text', required: true },
                        { label: '任务类型', type: 'select', options: ['常规巡查', '专项检查', '投诉核查', '突击检查'], required: true },
                        { label: '所属品牌', type: 'select', options: ['品牌A', '品牌B', '品牌C'], required: true },
                        { label: '巡查区域', type: 'text', required: true },
                        { label: '指派巡查员', type: 'select', options: ['巡查员A', '巡查员B', '巡查员C'], required: true },
                        { label: '优先级', type: 'select', options: ['紧急', '重要', '普通'], required: true },
                        { label: '状态', type: 'select', options: ['待执行', '执行中', '已完成'], required: true }
                    ],
                    detail: [
                        { label: '开始时间', type: 'datetime', required: true },
                        { label: '截止时间', type: 'datetime', required: true },
                        { label: '任务要求', type: 'textarea', fullWidth: true }
                    ]
                }
            },
            {
                id: 'evidence',
                title: '证据库列表',
                category: '证据管理',
                columns: ['编号', '证据编号', '证据类型', '任务', '巡查员', '采集时间', '存证状态', '审核状态'],
                fields: {
                    basic: [
                        { label: '证据编号', type: 'text', required: true },
                        { label: '证据类型', type: 'select', options: ['图片', '视频', '录音', '文档'], required: true },
                        { label: '关联任务', type: 'select', options: ['任务A', '任务B', '任务C'], required: true },
                        { label: '采集人', type: 'text', required: true },
                        { label: '采集地点', type: 'text', required: true },
                        { label: '存证状态', type: 'select', options: ['已存证', '存证中', '存证失败'], required: true },
                        { label: '审核状态', type: 'select', options: ['待审核', '已通过', '已驳回'], required: true }
                    ],
                    detail: [
                        { label: '证据描述', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            },
            {
                id: 'report',
                title: '巡查报告列表',
                category: '报告管理',
                columns: ['编号', '报告编号', '任务', '巡查员', '问题数量', '审核状态', '提交时间'],
                fields: {
                    basic: [
                        { label: '报告编号', type: 'text', required: true },
                        { label: '关联任务', type: 'select', options: ['任务A', '任务B', '任务C'], required: true },
                        { label: '巡查员', type: 'text', required: true },
                        { label: '巡查地点', type: 'text', required: true },
                        { label: '巡查时间', type: 'datetime', required: true },
                        { label: '问题等级', type: 'select', options: ['一般', '重要', '严重', '紧急'], required: true },
                        { label: '审核状态', type: 'select', options: ['待审核', '已通过', '已驳回', '需补充'], required: true }
                    ],
                    detail: [
                        { label: '巡查情况', type: 'textarea', fullWidth: true },
                        { label: '问题描述', type: 'textarea', fullWidth: true },
                        { label: '处理建议', type: 'textarea', fullWidth: true }
                    ]
                }
            },
            {
                id: 'inspector-manage',
                title: '巡查员列表',
                category: '巡查员管理',
                columns: ['编号', '巡查员姓名', '工号', '负责区域', '任务数', '完成率', '状态', '入职时间'],
                fields: {
                    basic: [
                        { label: '巡查员姓名', type: 'text', required: true },
                        { label: '工号', type: 'text', required: true },
                        { label: '负责区域', type: 'text', required: true },
                        { label: '联系电话', type: 'tel', required: true },
                        { label: '电子邮箱', type: 'email', required: false },
                        { label: '身份证号', type: 'text', required: true },
                        { label: '状态', type: 'select', options: ['在职', '休假', '离职'], required: true }
                    ],
                    detail: [
                        { label: '联系地址', type: 'text', fullWidth: true },
                        { label: '备注', type: 'textarea', fullWidth: true }
                    ],
                    upload: true
                }
            }
        ]
    }
];

// 生成所有页面
console.log('开始生成5个后台管理系统的HTML页面...\n');

let totalPages = 0;
systems.forEach(system => {
    console.log(`\n正在生成【${system.name}】后台页面...`);
    
    system.pages.forEach(page => {
        const listFilename = `admin-${system.id}-${page.id}-list.html`;
        const formFilename = `admin-${system.id}-${page.id}-form.html`;
        
        // 生成列表页
        const listConfig = {
            title: page.title,
            homeUrl: system.homeUrl,
            homeName: system.name,
            category: page.category,
            columns: page.columns,
            formUrl: formFilename
        };
        const listHtml = generateListPage(listConfig);
        fs.writeFileSync(listFilename, listHtml, 'utf8');
        console.log(`  ✓ ${listFilename}`);
        totalPages++;
        
        // 生成表单页
        const formConfig = {
            title: page.title.replace('列表', '表单'),
            homeUrl: system.homeUrl,
            homeName: system.name,
            category: page.category,
            listUrl: listFilename,
            fields: page.fields
        };
        const formHtml = generateFormPage(formConfig);
        fs.writeFileSync(formFilename, formHtml, 'utf8');
        console.log(`  ✓ ${formFilename}`);
        totalPages++;
    });
});

console.log(`\n✅ 生成完成！共生成 ${totalPages} 个页面`);
console.log('\n页面特性：');
console.log('  - 符合阿里巴巴前端开发规范');
console.log('  - 字段丰富（每个表单5-10个基本字段）');
console.log('  - 包含统计卡片、搜索筛选、数据表格');
console.log('  - 支持批量操作、分页功能');
console.log('  - 响应式设计，支持PC端');
console.log('\n请在浏览器中打开各系统主页查看：');
systems.forEach(system => {
    console.log(`  - ${system.name}：${system.homeUrl}`);
});
