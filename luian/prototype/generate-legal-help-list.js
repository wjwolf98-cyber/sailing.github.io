const fs = require('fs');

const listHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>我的咨询 - 律联品牌保护系统</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mobile-frame.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --primary-color: #1890ff; --success-color: #52c41a; --warning-color: #faad14; --error-color: #ff4d4f; --text-color: rgba(0, 0, 0, 0.85); --text-secondary: rgba(0, 0, 0, 0.45); --background-color: #f5f5f5; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif; background: var(--background-color); color: var(--text-color); }
        .header { position: sticky; top: 0; height: 44px; background: white; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); z-index: 100; }
        .header-left { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
        .header-right { color: var(--primary-color); font-size: 14px; cursor: pointer; }
        .content { padding: 0 16px 80px; }
        .stats-card { background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .stat-item { text-align: center; }
        .stat-value { font-size: 20px; font-weight: 600; color: var(--primary-color); margin-bottom: 4px; }
        .stat-label { font-size: 12px; color: var(--text-secondary); }
        .help-card { background: white; border-radius: 12px; padding: 16px; margin-bottom: 12px; cursor: pointer; }
        .help-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .help-no { font-size: 14px; font-weight: 600; }
        .help-status { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
        .status-pending { background: #fff7e6; color: var(--warning-color); }
        .status-replied { background: #e6f7ff; color: var(--primary-color); }
        .status-completed { background: #f6ffed; color: var(--success-color); }
        .help-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; }
        .info-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; }
        .help-desc { font-size: 13px; line-height: 1.6; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .help-footer { display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid #f0f0f0; }
        .help-time { font-size: 12px; color: var(--text-secondary); }
        .fab { position: absolute; bottom: 80px; right: 20px; width: 56px; height: 56px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4); cursor: pointer; z-index: 99; }
        .phone-frame { display: flex; flex-direction: column; position: relative; }
        .app-content { flex: 1; overflow-y: auto; padding-bottom: 70px; }
    </style>
</head>
<body>
<a href="mobile-mall.html" class="back-button">← 返回商城</a>
<div class="phone-frame">
    <div class="app-content">
        <div class="header">
            <div class="header-left" onclick="window.location.href='mobile-mall.html'">
                <i class="fas fa-arrow-left"></i><span>我的咨询</span>
            </div>
            <div class="header-right" onclick="window.location.href='legal-help-form.html'">
                <i class="fas fa-plus"></i> 新建
            </div>
        </div>
        <div class="content">
            <div class="stats-card">
                <div class="stat-item"><div class="stat-value">8</div><div class="stat-label">全部</div></div>
                <div class="stat-item"><div class="stat-value" style="color: var(--warning-color);">2</div><div class="stat-label">待回复</div></div>
                <div class="stat-item"><div class="stat-value">3</div><div class="stat-label">已回复</div></div>
                <div class="stat-item"><div class="stat-value" style="color: var(--success-color);">3</div><div class="stat-label">已完成</div></div>
            </div>
            <div class="help-card" onclick="window.location.href='legal-help-detail.html'">
                <div class="help-header">
                    <div class="help-no">LH20240211000001</div>
                    <div class="help-status status-replied">已回复</div>
                </div>
                <div class="help-title">商标注册流程和费用咨询</div>
                <div class="info-row"><i class="fas fa-tag"></i><span>商标注册咨询</span></div>
                <div class="info-row"><i class="fas fa-user-tie"></i><span>张律师</span></div>
                <div class="info-row"><i class="fas fa-clock"></i><span>响应时间: 2小时</span></div>
                <div class="help-desc">我公司想注册一个商标，请问需要准备哪些材料？注册流程是怎样的？大概需要多长时间？费用是多少...</div>
                <div class="help-footer">
                    <div class="help-time"><i class="far fa-clock"></i> 2024-02-11 10:30</div>
                </div>
            </div>
            <div class="help-card" onclick="window.location.href='legal-help-detail.html'">
                <div class="help-header">
                    <div class="help-no">LH20240210000002</div>
                    <div class="help-status status-pending">待回复</div>
                </div>
                <div class="help-title">合同审查服务咨询</div>
                <div class="info-row"><i class="fas fa-tag"></i><span>合同审查</span></div>
                <div class="info-row"><i class="fas fa-user-tie"></i><span>系统分配中</span></div>
                <div class="info-row"><i class="fas fa-exclamation-circle"></i><span style="color: var(--warning-color);">紧急</span></div>
                <div class="help-desc">我司与供应商签订了一份采购合同，想请律师帮忙审查一下合同条款是否合理，有无法律风险...</div>
                <div class="help-footer">
                    <div class="help-time"><i class="far fa-clock"></i> 2024-02-10 15:20</div>
                </div>
            </div>
            <div class="help-card" onclick="window.location.href='legal-help-detail.html'">
                <div class="help-header">
                    <div class="help-no">LH20240209000003</div>
                    <div class="help-status status-replied">已回复</div>
                </div>
                <div class="help-title">专利申请流程咨询</div>
                <div class="info-row"><i class="fas fa-tag"></i><span>专利申请咨询</span></div>
                <div class="info-row"><i class="fas fa-user-tie"></i><span>王律师</span></div>
                <div class="info-row"><i class="fas fa-clock"></i><span>响应时间: 5小时</span></div>
                <div class="help-desc">我们研发了一项新技术，想申请发明专利，请问申请流程是怎样的？需要准备哪些材料...</div>
                <div class="help-footer">
                    <div class="help-time"><i class="far fa-clock"></i> 2024-02-09 09:15</div>
                </div>
            </div>
            <div class="help-card" onclick="window.location.href='legal-help-detail.html'">
                <div class="help-header">
                    <div class="help-no">LH20240208000004</div>
                    <div class="help-status status-completed">已完成</div>
                </div>
                <div class="help-title">著作权登记咨询</div>
                <div class="info-row"><i class="fas fa-tag"></i><span>著作权保护</span></div>
                <div class="info-row"><i class="fas fa-user-tie"></i><span>李律师</span></div>
                <div class="info-row"><i class="fas fa-check-circle"></i><span style="color: var(--success-color);">问题已解决</span></div>
                <div class="help-desc">我们开发了一款软件，想进行著作权登记，请问需要准备哪些材料？登记流程是怎样的...</div>
                <div class="help-footer">
                    <div class="help-time"><i class="far fa-clock"></i> 2024-02-08 14:30</div>
                </div>
            </div>
        </div>
    </div>
    <div class="fab" onclick="window.location.href='legal-help-form.html'">
        <i class="fas fa-plus"></i>
    </div>
</div>
</body>
</html>`;

fs.writeFileSync('legal-help-list.html', listHTML, 'utf8');
console.log('✅ legal-help-list.html 创建成功');
