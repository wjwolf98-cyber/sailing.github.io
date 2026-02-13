/**
 * PC端后台页面批量生成脚本
 * 基于pc-producer.html模板，生成剩余6个PC端页面
 * 
 * 使用方法：
 * node generate-pc-pages-complete.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始生成PC端后台页面...\n');

// 读取模板
const templatePath = path.join(__dirname, 'pc-producer.html');
if (!fs.existsSync(templatePath)) {
    console.error('❌ 错误：找不到模板文件 pc-producer.html');
    process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
console.log('✅ 模板文件读取成功\n');

// 替换配置（完整版）
const pages = {
    'pc-lawyer.html': {
        title: '律师后台',
        replacements: {
            '生产商/代理商后台': '律师后台',
            '张总（生产商）': '王律师（执业5年+）',
            'seed=producer': 'seed=lawyer',
            '国密SM2加密': 'CFCA数字证书',
            '搜索品牌、渠道、案件...': '搜索案件、文书...',
            '品牌数量': '进行中案件',
            '<div class="stat-value">28</div>': '<div class="stat-value">45</div>',
            '授权渠道商': 'AI生成文书',
            '<div class="stat-value">1,245</div>': '<div class="stat-value">128</div>',
            '本月巡查次数': '证据链完整性',
            '<div class="stat-value">3,892</div>': '<div class="stat-value">98.2%</div>',
            '待处理问题': '待审核文书',
            '<div class="stat-value">127</div>': '<div class="stat-value">12</div>',
            'GB/HNL 001-2026': '执业满5年',
            'ISO/IEC 27037': '胜诉率≥90%',
            '区块链存证≥99.99%': 'CFCA数字证书',
            '国密SM2加密': 'Ukey双因子认证',
            '<span>品牌管理</span>': '<span>案件管理</span>',
            '<span>渠道管理</span>': '<span>AI文书生成</span>',
            '<span>巡查监督</span>': '<span>三级评审</span>',
            '<span>法律服务</span>': '<span>律师管理</span>',
            '<span>纠纷处理</span>': '<span>督导检查</span>'
        }
    },
    
    'pc-expert.html': {
        title: '专家后台',
        replacements: {
            '生产商/代理商后台': '专家后台',
            '张总（生产商）': '张专家（高级鉴定师）',
            'seed=producer': 'seed=expert',
            '国密SM2加密': 'AI辅助鉴定≥95%',
            '搜索品牌、渠道、案件...': '搜索鉴定任务...',
            '品牌数量': '待鉴定任务',
            '<div class="stat-value">28</div>': '<div class="stat-value">89</div>',
            '授权渠道商': 'AI鉴定准确率',
            '<div class="stat-value">1,245</div>': '<div class="stat-value">95.8%</div>',
            '本月巡查次数': '本月培训人次',
            '<div class="stat-value">3,892</div>': '<div class="stat-value">156</div>',
            '待处理问题': '质量合格率',
            '<div class="stat-value">127</div>': '<div class="stat-value">98.5%</div>',
            'GB/HNL 001-2026': 'AI辅助鉴定≥95%',
            'ISO/IEC 27037': 'SIFT特征点≥1000',
            '区块链存证≥99.99%': '图像相似度≥85%',
            '<span>品牌管理</span>': '<span>商品鉴定</span>',
            '<span>渠道管理</span>': '<span>AI辅助鉴定</span>',
            '<span>巡查监督</span>': '<span>品牌学院</span>',
            '<span>法律服务</span>': '<span>质量监督</span>',
            '<span>纠纷处理</span>': '<span>标准制定</span>'
        }
    },
    
    'pc-channel.html': {
        title: '渠道商后台',
        replacements: {
            '生产商/代理商后台': '渠道商后台',
            '张总（生产商）': '李经理（渠道商）',
            'seed=producer': 'seed=channel',
            '国密SM2加密': '托管协议已签署',
            '搜索品牌、渠道、案件...': '搜索商品、订单...',
            '品牌数量': '本月销售额',
            '<div class="stat-value">28</div>': '<div class="stat-value">¥1,234,567</div>',
            '授权渠道商': '授权品牌数',
            '<div class="stat-value">1,245</div>': '<div class="stat-value">28</div>',
            '本月巡查次数': '培训完成度',
            '<div class="stat-value">3,892</div>': '<div class="stat-value">85%</div>',
            '待处理问题': '合规评分',
            '<div class="stat-value">127</div>': '<div class="stat-value">92分</div>',
            'GB/HNL 001-2026': '托管协议已签署',
            'ISO/IEC 27037': '品牌授权有效',
            '区块链存证≥99.99%': '培训完成度85%',
            '<span>品牌管理</span>': '<span>档案管理</span>',
            '<span>渠道管理</span>': '<span>培训学习</span>',
            '<span>巡查监督</span>': '<span>数据上报</span>',
            '<span>法律服务</span>': '<span>品牌学院</span>',
            '<span>纠纷处理</span>': '<span>合规管理</span>'
        }
    },
    
    'pc-inspector.html': {
        title: '巡查员后台',
        replacements: {
            '生产商/代理商后台': '巡查员后台',
            '张总（生产商）': '赵巡查员',
            'seed=producer': 'seed=inspector',
            '国密SM2加密': 'ISO/IEC 27037认证',
            '搜索品牌、渠道、案件...': '搜索任务、报告...',
            '品牌数量': '本月任务数',
            '<div class="stat-value">28</div>': '<div class="stat-value">156</div>',
            '授权渠道商': '证据采集数',
            '<div class="stat-value">1,245</div>': '<div class="stat-value">3,892</div>',
            '本月巡查次数': '报告提交数',
            '<div class="stat-value">3,892</div>': '<div class="stat-value">145</div>',
            '待处理问题': '绩效评分',
            '<div class="stat-value">127</div>': '<div class="stat-value">95分</div>',
            'GB/HNL 001-2026': 'ISO/IEC 27037认证',
            'ISO/IEC 27037': '证据≥1080P分辨率',
            '区块链存证≥99.99%': '国密SM2加密',
            '<span>品牌管理</span>': '<span>任务管理</span>',
            '<span>渠道管理</span>': '<span>报告管理</span>',
            '<span>巡查监督</span>': '<span>证据管理</span>',
            '<span>法律服务</span>': '<span>数据分析</span>',
            '<span>纠纷处理</span>': '<span>培训考核</span>'
        }
    },
    
    'pc-mediator.html': {
        title: '调解员/仲裁员后台',
        replacements: {
            '生产商/代理商后台': '调解员/仲裁员后台',
            '张总（生产商）': '孙调解员',
            'seed=producer': 'seed=mediator',
            '国密SM2加密': 'WebRTC视频≤200ms',
            '搜索品牌、渠道、案件...': '搜索案件、调解...',
            '品牌数量': '本月调解案件',
            '<div class="stat-value">28</div>': '<div class="stat-value">78</div>',
            '授权渠道商': '仲裁案件',
            '<div class="stat-value">1,245</div>': '<div class="stat-value">23</div>',
            '本月巡查次数': '视频庭审次数',
            '<div class="stat-value">3,892</div>': '<div class="stat-value">45</div>',
            '待处理问题': '平均处理时长',
            '<div class="stat-value">127</div>': '<div class="stat-value">4.5天</div>',
            'GB/HNL 001-2026': 'WebRTC视频庭审≤200ms',
            'ISO/IEC 27037': 'AI智能方案推荐',
            '区块链存证≥99.99%': '电子签名协议',
            '<span>品牌管理</span>': '<span>案件管理</span>',
            '<span>渠道管理</span>': '<span>在线调解</span>',
            '<span>巡查监督</span>': '<span>仲裁裁决</span>',
            '<span>法律服务</span>': '<span>视频庭审</span>',
            '<span>纠纷处理</span>': '<span>数据统计</span>'
        }
    },
    
    'pc-system.html': {
        title: '系统管理后台',
        replacements: {
            '生产商/代理商后台': '系统管理后台',
            '张总（生产商）': '管理员',
            'seed=producer': 'seed=admin',
            '国密SM2加密': 'RBAC权限模型',
            '搜索品牌、渠道、案件...': '搜索用户、角色...',
            '品牌数量': '系统用户数',
            '<div class="stat-value">28</div>': '<div class="stat-value">1,245</div>',
            '授权渠道商': '今日活跃用户',
            '<div class="stat-value">1,245</div>': '<div class="stat-value">856</div>',
            '本月巡查次数': '系统可用性',
            '<div class="stat-value">3,892</div>': '<div class="stat-value">99.9%</div>',
            '待处理问题': '审计日志数',
            '<div class="stat-value">127</div>': '<div class="stat-value">15,234</div>',
            'GB/HNL 001-2026': 'RBAC权限模型',
            'ISO/IEC 27037': '180天审计日志',
            '区块链存证≥99.99%': '系统可用性≥99.9%',
            '<span>品牌管理</span>': '<span>用户管理</span>',
            '<span>渠道管理</span>': '<span>角色管理</span>',
            '<span>巡查监督</span>': '<span>权限管理</span>',
            '<span>法律服务</span>': '<span>部门管理</span>',
            '<span>纠纷处理</span>': '<span>审计日志</span>'
        }
    }
};

// 生成页面
let successCount = 0;
let failCount = 0;

Object.keys(pages).forEach(filename => {
    try {
        let content = template;
        const config = pages[filename];
        
        console.log(`📝 正在生成: ${filename} (${config.title})`);
        
        // 执行所有替换
        Object.keys(config.replacements).forEach(oldStr => {
            const newStr = config.replacements[oldStr];
            content = content.split(oldStr).join(newStr);
        });
        
        // 写入文件
        const outputPath = path.join(__dirname, filename);
        fs.writeFileSync(outputPath, content, 'utf8');
        
        console.log(`✅ 生成成功: ${filename}\n`);
        successCount++;
        
    } catch (error) {
        console.error(`❌ 生成失败: ${filename}`);
        console.error(`   错误信息: ${error.message}\n`);
        failCount++;
    }
});

// 输出总结
console.log('='.repeat(50));
console.log('📊 生成总结');
console.log('='.repeat(50));
console.log(`✅ 成功: ${successCount} 个页面`);
console.log(`❌ 失败: ${failCount} 个页面`);
console.log(`📁 输出目录: ${__dirname}`);
console.log('='.repeat(50));

if (successCount === 6) {
    console.log('\n🎉 所有页面生成完成！');
    console.log('\n📋 生成的文件：');
    console.log('   1. pc-lawyer.html - 律师后台');
    console.log('   2. pc-expert.html - 专家后台');
    console.log('   3. pc-channel.html - 渠道商后台');
    console.log('   4. pc-inspector.html - 巡查员后台');
    console.log('   5. pc-mediator.html - 调解员/仲裁员后台');
    console.log('   6. pc-system.html - 系统管理后台');
    console.log('\n💡 提示：可以直接在浏览器中打开这些文件查看效果');
} else {
    console.log('\n⚠️  部分页面生成失败，请检查错误信息');
}
