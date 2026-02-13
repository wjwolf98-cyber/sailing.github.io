const fs = require('fs');
const path = require('path');

// 需要处理的文件列表
const files = [
    'mobile-mall.html',
    'mobile-inspector-v3.html',
    'mobile-regulator.html'
];

files.forEach(filename => {
    const filepath = path.join(__dirname, filename);
    let content = fs.readFileSync(filepath, 'utf8');
    
    console.log(`处理 ${filename}...`);
    
    // 1. 移除已有的 phone-frame 和 app-content 标签
    content = content.replace(/<div class="phone-frame">\s*/g, '');
    content = content.replace(/<div class="app-content">\s*/g, '');
    
    // 2. 找到返回按钮后的位置，插入 phone-frame 开始标签
    content = content.replace(
        /(<a[^>]*class="back-button"[^>]*>.*?<\/a>)\s*/s,
        '$1\n<div class="phone-frame">\n'
    );
    
    // 3. 在状态栏之后、第一个页面div之前插入 app-content 开始标签
    content = content.replace(
        /(<div class="status-bar">[\s\S]*?<\/div>)\s*(<div id="page-)/,
        '$1\n\n<div class="app-content">\n$2'
    );
    
    // 4. 在底部导航之前插入 app-content 结束标签
    content = content.replace(
        /(<\/div>\s*)?(<div class="bottom-nav">)/,
        '</div>\n\n$2'
    );
    
    // 5. 在 </body> 之前插入 phone-frame 结束标签
    content = content.replace(
        /(<\/div>\s*<\/div>\s*)?(<script>[\s\S]*?<\/script>\s*<\/body>)/,
        '</div>\n</div>\n\n$2'
    );
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ ${filename} 修复完成`);
});

console.log('\n所有文件修复完成！');
