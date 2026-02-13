const fs = require('fs');
const path = require('path');

// 需要添加返回按钮的页面及其对应的主页
const pages = [
    // 系统管理员
    { file: 'admin-system-user-list.html', backTo: 'prototype/pc-system.html', backText: '返回系统管理员后台' },
    { file: 'admin-system-user-form.html', backTo: 'prototype/pc-system.html', backText: '返回系统管理员后台' },
    { file: 'admin-system-exam-list.html', backTo: 'prototype/pc-system.html', backText: '返回系统管理员后台' },
    { file: 'admin-system-exam-form.html', backTo: 'prototype/pc-system.html', backText: '返回系统管理员后台' },
    { file: 'admin-system-training-list.html', backTo: 'prototype/pc-system.html', backText: '返回系统管理员后台' },
    { file: 'admin-system-training-form.html', backTo: 'prototype/pc-system.html', backText: '返回系统管理员后台' },
    
    // 生产商/代理商
    { file: 'admin-producer-channel-list.html', backTo: 'prototype/admin-producer-v3.html', backText: '返回生产商后台' },
    { file: 'admin-producer-channel-form.html', backTo: 'prototype/admin-producer-v3.html', backText: '返回生产商后台' },
    { file: 'admin-producer-product-list.html', backTo: 'prototype/admin-producer-v3.html', backText: '返回生产商后台' },
    { file: 'admin-producer-product-form.html', backTo: 'prototype/admin-producer-v3.html', backText: '返回生产商后台' },
    { file: 'admin-producer-authorization-list.html', backTo: 'prototype/admin-producer-v3.html', backText: '返回生产商后台' },
    { file: 'admin-producer-authorization-form.html', backTo: 'prototype/admin-producer-v3.html', backText: '返回生产商后台' },
    
    // 督导部/律师
    { file: 'admin-lawyer-case-list.html', backTo: 'prototype/admin-lawyer-v3.html', backText: '返回督导部后台' },
    { file: 'admin-lawyer-case-form.html', backTo: 'prototype/admin-lawyer-v3.html', backText: '返回督导部后台' },
    { file: 'admin-lawyer-lawyer-manage-list.html', backTo: 'prototype/admin-lawyer-v3.html', backText: '返回督导部后台' },
    { file: 'admin-lawyer-lawyer-manage-form.html', backTo: 'prototype/admin-lawyer-v3.html', backText: '返回督导部后台' },
    { file: 'admin-lawyer-task-list.html', backTo: 'prototype/admin-lawyer-v3.html', backText: '返回督导部后台' },
    { file: 'admin-lawyer-task-form.html', backTo: 'prototype/admin-lawyer-v3.html', backText: '返回督导部后台' },
    
    // 专家部/专家
    { file: 'admin-expert-appraisal-list.html', backTo: 'prototype/admin-expert-v3.html', backText: '返回专家部后台' },
    { file: 'admin-expert-appraisal-form.html', backTo: 'prototype/admin-expert-v3.html', backText: '返回专家部后台' },
    { file: 'admin-expert-expert-manage-list.html', backTo: 'prototype/admin-expert-v3.html', backText: '返回专家部后台' },
    { file: 'admin-expert-expert-manage-form.html', backTo: 'prototype/admin-expert-v3.html', backText: '返回专家部后台' },
    { file: 'admin-expert-knowledge-list.html', backTo: 'prototype/admin-expert-v3.html', backText: '返回专家部后台' },
    { file: 'admin-expert-knowledge-form.html', backTo: 'prototype/admin-expert-v3.html', backText: '返回专家部后台' },
    
    // 巡查部/巡查员
    { file: 'admin-inspector-task-list.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-task-form.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-evidence-list.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-evidence-form.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-report-list.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-report-form.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-inspector-manage-list.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' },
    { file: 'admin-inspector-inspector-manage-form.html', backTo: 'prototype/admin-inspector-v3.html', backText: '返回巡查部后台' }
];

const backButtonHTML = (backTo, backText) => `
    <div class="back-button-container" style="position: fixed; top: 20px; left: 20px; z-index: 1000;">
        <a href="${backTo}" class="back-button" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #1890ff; color: white; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 8px rgba(24,144,255,0.3); transition: all 0.3s; font-size: 14px; font-weight: 500;">
            <i class="fas fa-arrow-left"></i>
            <span>${backText}</span>
        </a>
    </div>
    <style>
        .back-button:hover {
            background: #40a9ff !important;
            transform: translateX(-4px);
            box-shadow: 0 4px 12px rgba(24,144,255,0.4) !important;
        }
    </style>
`;

console.log('开始为后台管理页面添加返回按钮...\n');

let successCount = 0;
let skipCount = 0;

pages.forEach(page => {
    try {
        if (!fs.existsSync(page.file)) {
            console.log(`⚠️  跳过: ${page.file} (文件不存在)`);
            skipCount++;
            return;
        }
        
        let content = fs.readFileSync(page.file, 'utf-8');
        
        // 检查是否已经有返回按钮
        if (content.includes('back-button-container')) {
            console.log(`⏭️  跳过: ${page.file} (已有返回按钮)`);
            skipCount++;
            return;
        }
        
        // 在<body>标签后添加返回按钮
        content = content.replace(/<body>/, `<body>\n${backButtonHTML(page.backTo, page.backText)}`);
        
        fs.writeFileSync(page.file, content, 'utf-8');
        
        console.log(`✅ 添加: ${page.file}`);
        successCount++;
    } catch (error) {
        console.log(`❌ 错误: ${page.file} - ${error.message}`);
    }
});

console.log(`\n添加完成！`);
console.log(`成功: ${successCount} 个`);
console.log(`跳过: ${skipCount} 个`);
