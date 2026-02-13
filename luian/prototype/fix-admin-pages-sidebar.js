const fs = require('fs');
const path = require('path');

// 确保在prototype目录下运行
const baseDir = __dirname;

// 读取主页模板，提取侧边栏和头部结构
const templates = {
    system: fs.readFileSync(path.join(baseDir, 'pc-system.html'), 'utf-8'),
    producer: fs.readFileSync(path.join(baseDir, 'admin-producer-v3.html'), 'utf-8'),
    lawyer: fs.readFileSync(path.join(baseDir, 'admin-lawyer-v3.html'), 'utf-8'),
    expert: fs.readFileSync(path.join(baseDir, 'admin-expert-v3.html'), 'utf-8'),
    inspector: fs.readFileSync(path.join(baseDir, 'admin-inspector-v3.html'), 'utf-8')
};

// 提取通用的头部和侧边栏HTML
function extractHeaderAndSidebar(template) {
    const headerMatch = template.match(/<!-- 顶部导航栏 -->([\s\S]*?)<div class="container">/);
    const sidebarMatch = template.match(/<!-- 侧边栏 -->([\s\S]*?)<\/div>\s*<!-- 主内容区 -->/);
    
    return {
        header: headerMatch ? headerMatch[0].replace('<div class="container">', '') : '',
        sidebar: sidebarMatch ? sidebarMatch[0].replace('<!-- 主内容区 -->', '') : ''
    };
}

// 为每个系统生成包含侧边栏的页面包装器
function wrapPageWithSidebar(content, system, pageTitle) {
    const { header, sidebar } = extractHeaderAndSidebar(templates[system]);
    
    // 提取原页面的主要内容（去掉header）
    const contentMatch = content.match(/<body>([\s\S]*)<\/body>/);
    let mainContent = contentMatch ? contentMatch[1] : content;
    
    // 移除原有的header
    mainContent = mainContent.replace(/<div class="header">[\s\S]*?<\/div>/, '');
    mainContent = mainContent.replace(/<header>[\s\S]*?<\/header>/, '');
    
    // 提取styles
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    const styles = styleMatch ? styleMatch[1] : '';
    
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
${styles}
    </style>
</head>
<body>
    ${header}
    
    <div class="container">
        ${sidebar}
        
        <!-- 主内容区 -->
        <div class="main-content">
            ${mainContent}
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
}

// 需要修复的页面列表
const pagesToFix = [
    // 系统管理员
    { file: 'admin-system-user-list.html', system: 'system', title: '用户管理列表' },
    { file: 'admin-system-user-form.html', system: 'system', title: '用户管理表单' },
    { file: 'admin-system-exam-list.html', system: 'system', title: '考试管理列表' },
    { file: 'admin-system-exam-form.html', system: 'system', title: '考试管理表单' },
    { file: 'admin-system-training-list.html', system: 'system', title: '培训学习列表' },
    { file: 'admin-system-training-form.html', system: 'system', title: '培训学习表单' },
    
    // 生产商/代理商
    { file: 'admin-producer-channel-list.html', system: 'producer', title: '渠道管理列表' },
    { file: 'admin-producer-channel-form.html', system: 'producer', title: '渠道管理表单' },
    { file: 'admin-producer-product-list.html', system: 'producer', title: '产品管理列表' },
    { file: 'admin-producer-product-form.html', system: 'producer', title: '产品管理表单' },
    { file: 'admin-producer-authorization-list.html', system: 'producer', title: '授权管理列表' },
    { file: 'admin-producer-authorization-form.html', system: 'producer', title: '授权管理表单' },
    
    // 督导部/律师
    { file: 'admin-lawyer-case-list.html', system: 'lawyer', title: '案件管理列表' },
    { file: 'admin-lawyer-case-form.html', system: 'lawyer', title: '案件管理表单' },
    { file: 'admin-lawyer-lawyer-manage-list.html', system: 'lawyer', title: '律师管理列表' },
    { file: 'admin-lawyer-lawyer-manage-form.html', system: 'lawyer', title: '律师管理表单' },
    { file: 'admin-lawyer-task-list.html', system: 'lawyer', title: '巡查任务列表' },
    { file: 'admin-lawyer-task-form.html', system: 'lawyer', title: '巡查任务表单' },
    
    // 专家部/专家
    { file: 'admin-expert-appraisal-list.html', system: 'expert', title: '鉴定管理列表' },
    { file: 'admin-expert-appraisal-form.html', system: 'expert', title: '鉴定管理表单' },
    { file: 'admin-expert-expert-manage-list.html', system: 'expert', title: '专家管理列表' },
    { file: 'admin-expert-expert-manage-form.html', system: 'expert', title: '专家管理表单' },
    { file: 'admin-expert-knowledge-list.html', system: 'expert', title: '知识库管理列表' },
    { file: 'admin-expert-knowledge-form.html', system: 'expert', title: '知识库管理表单' },
    
    // 巡查部/巡查员
    { file: 'admin-inspector-task-list.html', system: 'inspector', title: '任务管理列表' },
    { file: 'admin-inspector-task-form.html', system: 'inspector', title: '任务管理表单' },
    { file: 'admin-inspector-evidence-list.html', system: 'inspector', title: '证据管理列表' },
    { file: 'admin-inspector-evidence-form.html', system: 'inspector', title: '证据管理表单' },
    { file: 'admin-inspector-report-list.html', system: 'inspector', title: '报告管理列表' },
    { file: 'admin-inspector-report-form.html', system: 'inspector', title: '报告管理表单' },
    { file: 'admin-inspector-inspector-manage-list.html', system: 'inspector', title: '巡查员管理列表' },
    { file: 'admin-inspector-inspector-manage-form.html', system: 'inspector', title: '巡查员管理表单' }
];

console.log('开始修复后台管理页面侧边栏...\n');

let successCount = 0;
let skipCount = 0;

pagesToFix.forEach(page => {
    try {
        const filePath = path.join(baseDir, page.file);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  跳过: ${page.file} (文件不存在)`);
            skipCount++;
            return;
        }
        
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 检查是否已经有侧边栏
        if (content.includes('<!-- 侧边栏 -->') || content.includes('class="sidebar"')) {
            console.log(`⏭️  跳过: ${page.file} (已有侧边栏)`);
            skipCount++;
            return;
        }
        
        const newContent = wrapPageWithSidebar(content, page.system, page.title);
        fs.writeFileSync(filePath, newContent, 'utf-8');
        
        console.log(`✅ 修复: ${page.file}`);
        successCount++;
    } catch (error) {
        console.log(`❌ 错误: ${page.file} - ${error.message}`);
    }
});

console.log(`\n修复完成！`);
console.log(`成功: ${successCount} 个`);
console.log(`跳过: ${skipCount} 个`);
