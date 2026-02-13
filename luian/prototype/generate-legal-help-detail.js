const fs = require('fs');

const detailHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>咨询详情 - 律联品牌保护系统</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mobile-frame.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --primary-color: #1890ff; --success-color: #52c41a; --text-color: rgba(0, 0, 0, 0.85); --text-secondary: rgba(0, 0, 0, 0.45); --background-color: #f5f5f5; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif; background: var(--background-color); color: var(--text-color); }
        .header { position: sticky; top: 0; height: 44px; background: white; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); z-index: 100; }
        .header-left { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
        .content { padding: 0 16px 80px; }
        .status-banner { background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%); border-radius: 12px; padding: 20px; color: white; margin-bottom: 16px; }
        .banner-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .banner-no { font-size: 18px; font-weight: 600; }
        .banner-status { padding: 4px 12px; background: rgba(255, 255, 255, 0.3); border-radius: 16px; font-size: 12px; }
        .banner-info { font-size: 13px; opacity: 0.9; line-height: 1.8; }
        .section { background: white; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
        .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .info-item { display: flex; gap: 12px; margin-bottom: 12px; }
        .info-label { min-width: 80px; color: var(--text-secondary); font-size: 13px; }
        .info-value { flex: 1; font-size: 13px; }
        .lawyer-card { background: #f0f5ff; border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; }
        .lawyer-avatar { width: 50px; height: 50px; border-radius: 50%; }
        .lawyer-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
        .lawyer-title { font-size: 12px; color: var(--text-secondary); }
        .reply-section { background: #e6f7ff; border-left: 4px solid var(--primary-color); padding: 16px; border-radius: 8px; margin-top: 16px; }
        .reply-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .reply-title { font-size: 14px; font-weight: 600; color: var(--primary-color); }
        .reply-content { font-size: 14px; line-height: 1.8; }
        .action-buttons { position: absolute; bottom: 0; left: 0; right: 0; background: white; padding: 12px 16px; box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08); display: flex; gap: 12px; z-index: 100; }
        .btn { flex: 1; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; border: none; cursor: pointer; }
        .btn-default { background: #f5f5f5; color: var(--text-color); }
        .btn-primary { background: var(--primary-color); color: white; }
        .phone-frame { display: flex; flex-direction: column; position: relative; }
        .app-content { flex: 1; overflow-y: auto; padding-bottom: 70px; }
    </style>
</head>
<body>
<a href="legal-help-list.html" class="back-button">← 返回列表</a>
<div class="phone-frame">
    <div class="app-content">
        <div class="header">
            <div class="header-left" onclick="window.location.href='legal-help-list.html'">
                <i class="fas fa-arrow-left"></i><span>咨询详情</span>
            </div>
        </div>
        <div class="content">
            <div class="status-banner">
                <div class="banner-header">
                    <div class="banner-no">LH20240211000001</div>
                    <div class="banner-status">已回复</div>
                </div>
                <div class="banner-info">
                    <div>📅 提交时间: 2024-02-11 10:30</div>
                    <div>⏱️ 响应时间: 2小时</div>
                    <div>👨‍⚖️ 负责律师: 张律师</div>
                </div>
            </div>
            <div class="section">
                <div class="section-title"><i class="fas fa-user"></i> 基础信息</div>
                <div class="info-item"><div class="info-label">咨询人</div><div class="info-value">张三</div></div>
                <div class="info-item"><div class="info-label">联系电话</div><div class="info-value">138****5678</div></div>
                <div class="info-item"><div class="info-label">公司名称</div><div class="info-value">XX科技有限公司</div></div>
            </div>
            <div class="section">
                <div class="section-title"><i class="fas fa-question-circle"></i> 问题信息</div>
                <div class="info-item"><div class="info-label">问题类型</div><div class="info-value">商标注册咨询</div></div>
                <div class="info-item"><div class="info-label">问题标题</div><div class="info-value" style="font-weight: 600;">商标注册流程和费用咨询</div></div>
                <div class="info-item">
                    <div class="info-label">详细描述</div>
                    <div class="info-value">我公司想注册一个商标，请问需要准备哪些材料？注册流程是怎样的？大概需要多长时间？费用是多少？另外，如果商标被驳回，应该如何处理？</div>
                </div>
                <div class="info-item"><div class="info-label">紧急程度</div><div class="info-value">不紧急</div></div>
            </div>
            <div class="section">
                <div class="section-title"><i class="fas fa-user-tie"></i> 负责律师</div>
                <div class="lawyer-card">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=lawyer1" class="lawyer-avatar">
                    <div style="flex: 1;">
                        <div class="lawyer-name">张律师</div>
                        <div class="lawyer-title">执业5年 | 商标注册专家 | 胜诉率95%</div>
                    </div>
                </div>
                <div class="reply-section">
                    <div class="reply-header">
                        <div class="reply-title"><i class="fas fa-comment-dots"></i> 律师回复</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">2024-02-11 12:30</div>
                    </div>
                    <div class="reply-content">
                        您好，关于商标注册的问题，我给出以下专业建议：<br><br>
                        <strong>一、需要准备的材料</strong><br>
                        1. 商标图样（JPG格式，不小于5cm×5cm，不大于10cm×10cm）<br>
                        2. 申请人身份证明文件（个人：身份证；企业：营业执照）<br>
                        3. 商标注册申请书<br>
                        4. 商标代理委托书（如委托代理机构）<br><br>
                        <strong>二、注册流程</strong><br>
                        1. 商标查询（1-2天）<br>
                        2. 提交申请（1天）<br>
                        3. 形式审查（1-2个月）<br>
                        4. 实质审查（6-8个月）<br>
                        5. 初审公告（3个月）<br>
                        6. 注册公告（1个月）<br>
                        7. 颁发证书<br><br>
                        总时间：约12-14个月<br><br>
                        <strong>三、费用说明</strong><br>
                        • 官费：300元/类（10个商品/服务项目）<br>
                        • 代理费：800-2000元/类（根据代理机构不同）<br>
                        • 总计：约1100-2300元/类<br><br>
                        <strong>四、驳回处理</strong><br>
                        如果商标被驳回，可以：<br>
                        1. 驳回复审（收到驳回通知15天内提出）<br>
                        2. 修改商标后重新申请<br>
                        3. 放弃该商标，选择其他商标<br><br>
                        建议在申请前做好商标查询，降低驳回风险。如需进一步咨询，请随时联系我。
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="action-buttons">
        <button class="btn btn-default" onclick="alert('联系律师: 张律师\\n电话: 138****1234')"><i class="fas fa-phone"></i> 联系律师</button>
        <button class="btn btn-primary" onclick="alert('评价服务')"><i class="fas fa-star"></i> 评价服务</button>
    </div>
</div>
</body>
</html>`;

fs.writeFileSync('legal-help-detail.html', detailHTML, 'utf8');
console.log('✅ legal-help-detail.html 创建成功');
