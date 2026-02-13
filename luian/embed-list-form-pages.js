const fs = require('fs');
const path = require('path');

// 提取HTML页面的主要内容（去掉header和返回按钮）
function extractMainContent(htmlContent) {
    // 移除返回按钮
    htmlContent = htmlContent.replace(/<div class="back-button-container"[\s\S]*?<\/div>\s*<style>[\s\S]*?<\/style>/g, '');
    
    // 提取body内容
    const bodyMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/);
    if (!bodyMatch) return '';
    
    let content = bodyMatch[1];
    
    // 移除header
    content = content.replace(/<div class="header">[\s\S]*?<\/div>/, '');
    content = content.replace(/<header>[\s\S]*?<\/header>/, '');
    
    // 移除script标签
    content = content.replace(/<script[\s\S]*?<\/script>/g, '');
    
    return content.trim();
}

// 页面映射配置
const pageMapping = {
    'pc-system.html': {
        pages: [
            { id: 'user-list', file: 'admin-system-user-list.html', title: '用户列表' },
            { id: 'exam-list', file: 'admin-system-exam-list.html', title: '考试列表' },
            { id: 'training-list', file: 'admin-system-training-list.html', title: '培训列表' }
        ]
    },
    'admin-producer-v3.html': {
        pages: [
            { id: 'channel-list', file: 'admin-producer-channel-list.html', title: '渠道列表' },
            { id: 'product-list', file: 'admin-producer-product-list.html', title: '产品列表' },
            { id: 'authorization-list', file: 'admin-producer-authorization-list.html', title: '授权列表' }
        ]
    },
    'admin-lawyer-v3.html': {
        pages: [
            { id: 'case-list', file: 'admin-lawyer-case-list.html', title: '案件列表' },
            { id: 'lawyer-list', file: 'admin-lawyer-lawyer-manage-list.html', title: '律师列表' },
            { id: 'task-list', file: 'admin-lawyer-task-list.html', title: '任务列表' }
        ]
    },
    'admin-expert-v3.html': {
        pages: [
            { id: 'appraisal-list', file: 'admin-expert-appraisal-list.html', title: '鉴定列表' },
            { id: 'expert-list', file: 'admin-expert-expert-manage-list.html', title: '专家列表' },
            { id: 'knowledge-list', file: 'admin-expert-knowledge-list.html', title: '知识库列表' }
        ]
    },
    'admin-inspector-v3.html': {
        pages: [
            { id: 'task-list', file: 'admin-inspector-task-list.html', title: '任务列表' },
            { id: 'evidence-list', file: 'admin-inspector-evidence-list.html', title: '证据列表' },
            { id: 'report-list', file: 'admin-inspector-report-list.html', title: '报告列表' },
            { id: 'inspector-list', file: 'admin-inspector-inspector-manage-list.html', title: '巡查员列表' }
        ]
    }
};

console.log('开始嵌入列表和表单页面内容...\n');

let successCount = 0;
let errorCount = 0;

Object.keys(pageMapping).forEach(mainFile => {
    try {
        const mainFilePath = path.join('prototype', mainFile);
        
        if (!fs.existsSync(mainFilePath)) {
            console.log(`⚠️  跳过: ${mainFile} (主文件不存在)`);
            return;
        }
        
        let mainContent = fs.readFileSync(mainFilePath, 'utf-8');
        const config = pageMapping[mainFile];
        
        config.pages.forEach(page => {
            const pageFilePath = page.file;
            
            if (!fs.existsSync(pageFilePath)) {
                console.log(`  ⚠️  ${page.file} 不存在，跳过`);
                return;
            }
            
            try {
                const pageContent = fs.readFileSync(pageFilePath, 'utf-8');
                const extractedContent = extractMainContent(pageContent);
                
                if (!extractedContent) {
                    console.log(`  ⚠️  ${page.file} 内容提取失败`);
                    return;
                }
                
                // 查找并替换占位页面
                const pageIdPattern = new RegExp(
                    `<div id="page-${page.id}" class="page">\\s*<div class="page-header">\\s*<h1>[^<]*</h1>\\s*</div>\\s*<div class="card">\\s*<p>[^<]*</p>\\s*</div>\\s*</div>`,
                    'g'
                );
                
                const newPageContent = `<div id="page-${page.id}" class="page">
                ${extractedContent}
            </div>`;
                
                if (mainContent.match(pageIdPattern)) {
                    mainContent = mainContent.replace(pageIdPattern, newPageContent);
                    console.log(`  ✅ 嵌入: ${page.title} (${page.file})`);
                } else {
                    console.log(`  ⚠️  未找到占位符: page-${page.id}`);
                }
            } catch (err) {
                console.log(`  ❌ 错误: ${page.file} - ${err.message}`);
                errorCount++;
            }
        });
        
        // 写回主文件
        fs.writeFileSync(mainFilePath, mainContent, 'utf-8');
        console.log(`✅ 完成: ${mainFile}\n`);
        successCount++;
        
    } catch (err) {
        console.log(`❌ 错误: ${mainFile} - ${err.message}\n`);
        errorCount++;
    }
});

console.log(`\n处理完成！`);
console.log(`成功: ${successCount} 个主文件`);
console.log(`错误: ${errorCount} 个`);
