const fs = require('fs');
const path = require('path');

// 简化的列表页面模板
const templates = {
    'user-list': `
                <div class="page-header">
                    <h1>用户列表</h1>
                    <div style="display: flex; gap: 12px;">
                        <a href="../admin-system-user-list.html" target="_blank" class="btn-primary" style="text-decoration: none; padding: 8px 16px; border-radius: 4px;">
                            <i class="fas fa-external-link-alt"></i> 查看完整列表
                        </a>
                        <a href="../admin-system-user-form.html" target="_blank" class="btn-success" style="text-decoration: none; padding: 8px 16px; border-radius: 4px;">
                            <i class="fas fa-plus"></i> 新建用户
                        </a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>最近用户</h3>
                    </div>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>用户名</th>
                                    <th>姓名</th>
                                    <th>角色</th>
                                    <th>部门</th>
                                    <th>状态</th>
                                    <th>最后登录</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>admin001</td>
                                    <td>张三</td>
                                    <td><span class="badge-primary">超级管理员</span></td>
                                    <td>系统管理部</td>
                                    <td><span class="badge-success">正常</span></td>
                                    <td>2024-02-11 10:30</td>
                                    <td>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" title="删除"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>user002</td>
                                    <td>李四</td>
                                    <td><span class="badge-info">普通用户</span></td>
                                    <td>生产商部</td>
                                    <td><span class="badge-success">正常</span></td>
                                    <td>2024-02-11 09:15</td>
                                    <td>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" title="删除"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>expert003</td>
                                    <td>王五</td>
                                    <td><span class="badge-warning">专家</span></td>
                                    <td>专家部</td>
                                    <td><span class="badge-success">正常</span></td>
                                    <td>2024-02-10 16:45</td>
                                    <td>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" title="删除"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>lawyer004</td>
                                    <td>赵六</td>
                                    <td><span class="badge-danger">律师</span></td>
                                    <td>督导部</td>
                                    <td><span class="badge-warning">待审核</span></td>
                                    <td>2024-02-10 14:20</td>
                                    <td>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" title="删除"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>inspector005</td>
                                    <td>孙七</td>
                                    <td><span class="badge-info">巡查员</span></td>
                                    <td>巡查部</td>
                                    <td><span class="badge-success">正常</span></td>
                                    <td>2024-02-09 11:30</td>
                                    <td>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                        <button class="btn-icon" title="删除"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`,
    
    'exam-list': `
                <div class="page-header">
                    <h1>考试列表</h1>
                    <div style="display: flex; gap: 12px;">
                        <a href="../admin-system-exam-list.html" target="_blank" class="btn-primary" style="text-decoration: none; padding: 8px 16px; border-radius: 4px;">
                            <i class="fas fa-external-link-alt"></i> 查看完整列表
                        </a>
                        <a href="../admin-system-exam-form.html" target="_blank" class="btn-success" style="text-decoration: none; padding: 8px 16px; border-radius: 4px;">
                            <i class="fas fa-plus"></i> 新建考试
                        </a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>最近考试</h3>
                    </div>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>考试名称</th>
                                    <th>考试类型</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>参考人数</th>
                                    <th>及格率</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024年第一季度巡查员资格考试</td>
                                    <td><span class="badge-primary">资格考试</span></td>
                                    <td>2024-03-01 09:00</td>
                                    <td>2024-03-01 11:00</td>
                                    <td>156人</td>
                                    <td>85%</td>
                                    <td><span class="badge-warning">进行中</span></td>
                                    <td>
                                        <button class="btn-icon" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>专家鉴定能力测试</td>
                                    <td><span class="badge-info">能力测试</span></td>
                                    <td>2024-02-15 14:00</td>
                                    <td>2024-02-15 16:00</td>
                                    <td>45人</td>
                                    <td>92%</td>
                                    <td><span class="badge-success">已完成</span></td>
                                    <td>
                                        <button class="btn-icon" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>律师业务知识考核</td>
                                    <td><span class="badge-danger">业务考核</span></td>
                                    <td>2024-02-10 10:00</td>
                                    <td>2024-02-10 12:00</td>
                                    <td>78人</td>
                                    <td>88%</td>
                                    <td><span class="badge-success">已完成</span></td>
                                    <td>
                                        <button class="btn-icon" title="查看"><i class="fas fa-eye"></i></button>
                                        <button class="btn-icon" title="编辑"><i class="fas fa-edit"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
};

// 替换占位页面
function replacePlaceholder(content, pageId, template) {
    const pattern = new RegExp(
        `<div id="page-${pageId}" class="page">\\s*<div class="page-header">\\s*<h1>[^<]*</h1>\\s*</div>\\s*<div class="card">\\s*<p>[^<]*</p>\\s*</div>\\s*</div>`,
        'g'
    );
    
    const replacement = `<div id="page-${pageId}" class="page">${template}
            </div>`;
    
    return content.replace(pattern, replacement);
}

console.log('开始添加简化列表视图...\n');

// 处理 pc-system.html
try {
    const filePath = path.join('prototype', 'pc-system.html');
    let content = fs.readFileSync(filePath, 'utf-8');
    
    content = replacePlaceholder(content, 'user-list', templates['user-list']);
    content = replacePlaceholder(content, 'exam-list', templates['exam-list']);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('✅ pc-system.html - 已添加用户列表和考试列表');
} catch (err) {
    console.log('❌ pc-system.html - 错误:', err.message);
}

console.log('\n完成！');
