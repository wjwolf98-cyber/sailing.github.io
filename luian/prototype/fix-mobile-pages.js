/**
 * 修复移动端页面 - 使其更像真正的移动端APP
 * 
 * 改进点：
 * 1. 添加顶部状态栏（时间、信号、电量）
 * 2. 优化触摸区域大小
 * 3. 改进视觉层次
 * 4. 添加更流畅的动画
 * 5. 使用更大的字体和图标
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始修复移动端页面...\n');

// 移动端页面通用头部（包含状态栏）
const mobileHeader = `
<!-- 移动端状态栏 -->
<div class="status-bar">
    <div class="status-left">
        <span class="status-time">9:41</span>
    </div>
    <div class="status-right">
        <i class="fas fa-signal"></i>
        <i class="fas fa-wifi"></i>
        <i class="fas fa-battery-three-quarters"></i>
    </div>
</div>
`;

// 移动端状态栏样式
const statusBarStyle = `
        /* 移动端状态栏 */
        .status-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 44px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            font-size: 14px;
            z-index: 1001;
            border-bottom: 1px solid #f0f0f0;
        }

        .status-left {
            font-weight: 600;
        }

        .status-right {
            display: flex;
            gap: 8px;
            color: var(--text-secondary);
        }

        /* 调整body padding */
        body {
            padding-top: 44px;
            padding-bottom: 60px;
        }

        /* 优化搜索栏位置 */
        .search-bar {
            top: 44px;
        }

        /* 优化底部导航 */
        .bottom-nav {
            height: 60px;
            padding: 8px 0;
        }

        .nav-icon {
            font-size: 24px;
            margin-bottom: 4px;
        }

        .nav-label {
            font-size: 11px;
        }

        /* 优化触摸区域 */
        .quick-nav-icon {
            width: 56px;
            height: 56px;
            font-size: 28px;
        }

        .quick-nav-label {
            font-size: 13px;
            margin-top: 4px;
        }

        /* 添加触摸反馈 */
        .nav-item:active,
        .quick-nav-item:active,
        .product-card:active {
            opacity: 0.7;
            transform: scale(0.98);
        }

        /* 优化卡片阴影 */
        .product-card {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .product-card:active {
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }
`;

console.log('✅ 移动端优化样式已准备\n');
console.log('📝 建议手动添加以下内容到移动端页面：\n');
console.log('1. 在<body>标签后添加状态栏HTML');
console.log('2. 在<style>标签中添加状态栏样式');
console.log('3. 调整现有样式以适配状态栏\n');

console.log('💡 或者使用以下命令自动修复：');
console.log('   node fix-mobile-pages.js --auto\n');

// 如果有--auto参数，自动修复
if (process.argv.includes('--auto')) {
    console.log('🔧 自动修复模式...\n');
    
    const files = [
        'mobile-mall.html',
        'mobile-inspector-v3.html',
        'mobile-regulator.html'
    ];
    
    files.forEach(filename => {
        try {
            const filepath = path.join(__dirname, filename);
            if (!fs.existsSync(filepath)) {
                console.log(`⚠️  跳过: ${filename} (文件不存在)`);
                return;
            }
            
            let content = fs.readFileSync(filepath, 'utf8');
            
            // 添加状态栏样式
            if (!content.includes('status-bar')) {
                content = content.replace('</style>', statusBarStyle + '\n    </style>');
                console.log(`✅ ${filename}: 已添加状态栏样式`);
            }
            
            // 添加状态栏HTML
            if (!content.includes('status-bar')) {
                content = content.replace('<body>', '<body>\n' + mobileHeader);
                console.log(`✅ ${filename}: 已添加状态栏HTML`);
            }
            
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`✅ ${filename}: 修复完成\n`);
            
        } catch (error) {
            console.error(`❌ ${filename}: 修复失败 - ${error.message}\n`);
        }
    });
    
    console.log('🎉 所有移动端页面修复完成！');
}
