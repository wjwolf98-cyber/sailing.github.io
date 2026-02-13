const fs = require('fs');

// 巡查任务列表页面
const taskListHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>巡查任务 - 巡查员APP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mobile-frame.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --primary-color: #1890ff; --success-color: #52c41a; --warning-color: #faad14; --error-color: #ff4d4f; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f5f5f5; }
        .header { position: sticky; top: 0; background: white; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 100; }
        .header-title { font-size: 18px; font-weight: 600; }
        .content { padding: 0 16px 80px; }
        .filter-tabs { background: white; padding: 12px; margin-bottom: 12px; display: flex; gap: 8px; overflow-x: auto; }
        .filter-tab { padding: 6px 16px; border-radius: 16px; background: #f5f5f5; font-size: 13px; white-space: nowrap; cursor: pointer; }
        .filter-tab.active { background: var(--primary-color); color: white; }
        .task-card { background: white; border-radius: 12px; padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--primary-color); }
        .task-card.urgent { border-left-color: var(--error-color); }
        .task-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .task-no { font-size: 14px; font-weight: 600; }
        .task-status { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
        .status-pending { background: #fff7e6; color: var(--warning-color); }
        .status-doing { background: #e6f7ff; color: var(--primary-color); }
        .task-info { font-size: 13px; line-height: 1.8; color: #666; }
        .task-footer { display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid #f0f0f0; margin-top: 12px; }
        .btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; border: none; cursor: pointer; }
        .btn-primary { background: var(--primary-color); color: white; }
        .phone-frame { display: flex; flex-direction: column; position: relative; }
        .app-content { flex: 1; overflow-y: auto; padding-bottom: 70px; }
    </style>
</head>
<body>
<a href="mobile-inspector-v3.html" class="back-button">← 返回首页</a>
<div class="phone-frame">
    <div class="app-content">
        <div class="header">
            <div class="header-title">巡查任务</div>
        </div>
        <div class="content">
            <div class="filter-tabs">
                <div class="filter-tab active">全部</div>
                <div class="filter-tab">待执行</div>
                <div class="filter-tab">进行中</div>
                <div class="filter-tab">已完成</div>
            </div>
            <div class="task-card urgent">
                <div class="task-header">
                    <div class="task-no">XC20240211001</div>
                    <div class="task-status status-pending">待执行</div>
                </div>
                <div class="task-info">
                    <div><i class="fas fa-map-marker-alt"></i> 朝阳区建国路88号SOHO现代城</div>
                    <div><i class="fas fa-store"></i> XX品牌专卖店</div>
                    <div><i class="fas fa-clock"></i> 2024-02-11 14:00 - 16:00</div>
                    <div><i class="fas fa-exclamation-circle"></i> 紧急任务</div>
                </div>
                <div class="task-footer">
                    <button class="btn btn-primary" onclick="window.location.href='inspector-evidence-form.html'">开始巡查</button>
                </div>
            </div>
            <div class="task-card">
                <div class="task-header">
                    <div class="task-no">XC20240210002</div>
                    <div class="task-status status-doing">进行中</div>
                </div>
                <div class="task-info">
                    <div><i class="fas fa-map-marker-alt"></i> 海淀区中关村大街1号</div>
                    <div><i class="fas fa-store"></i> YY电子商城</div>
                    <div><i class="fas fa-clock"></i> 2024-02-10 10:00 - 12:00</div>
                </div>
                <div class="task-footer">
                    <button class="btn btn-primary" onclick="window.location.href='inspector-evidence-form.html'">继续巡查</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>`;

// 证据采集表单
const evidenceFormHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>证据采集 - 巡查员APP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mobile-frame.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --primary-color: #1890ff; --success-color: #52c41a; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f5f5f5; }
        .header { position: sticky; top: 0; background: white; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 100; display: flex; justify-content: space-between; align-items: center; }
        .header-title { font-size: 18px; font-weight: 600; }
        .content { padding: 0 16px 80px; }
        .form-section { background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
        .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-label { font-size: 14px; font-weight: 600; margin-bottom: 8px; display: block; }
        .form-input, .form-textarea { width: 100%; padding: 10px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; }
        .form-textarea { min-height: 100px; }
        .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .photo-item { aspect-ratio: 1; border: 2px dashed #d9d9d9; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .submit-section { position: absolute; bottom: 0; left: 0; right: 0; background: white; padding: 12px 16px; box-shadow: 0 -2px 8px rgba(0,0,0,0.08); z-index: 100; }
        .btn-submit { width: 100%; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; }
        .phone-frame { display: flex; flex-direction: column; position: relative; }
        .app-content { flex: 1; overflow-y: auto; padding-bottom: 70px; }
    </style>
</head>
<body>
<a href="inspector-task-list.html" class="back-button">← 返回任务</a>
<div class="phone-frame">
    <div class="app-content">
        <div class="header">
            <div class="header-title">证据采集</div>
            <div style="color: var(--success-color);"><i class="fas fa-wifi"></i> 在线</div>
        </div>
        <div class="content">
            <div class="form-section">
                <div class="section-title">📍 巡查对象</div>
                <div class="form-group">
                    <label class="form-label">店铺名称</label>
                    <input type="text" class="form-input" value="XX品牌专卖店" readonly>
                </div>
                <div class="form-group">
                    <label class="form-label">店铺地址</label>
                    <input type="text" class="form-input" value="朝阳区建国路88号" readonly>
                </div>
            </div>
            <div class="form-section">
                <div class="section-title">📸 现场照片</div>
                <div class="photo-grid">
                    <div class="photo-item"><i class="fas fa-camera" style="font-size: 24px; color: #999;"></i></div>
                    <div class="photo-item"><i class="fas fa-plus" style="font-size: 24px; color: #999;"></i></div>
                    <div class="photo-item"><i class="fas fa-plus" style="font-size: 24px; color: #999;"></i></div>
                </div>
                <div style="font-size: 12px; color: #999; margin-top: 8px;">💡 已拍摄1张，最多9张，分辨率≥1080P</div>
            </div>
            <div class="form-section">
                <div class="section-title">📝 巡查记录</div>
                <div class="form-group">
                    <label class="form-label">发现问题</label>
                    <textarea class="form-textarea" placeholder="请详细描述发现的问题..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">商品信息</label>
                    <input type="text" class="form-input" placeholder="商品名称、品牌、型号等">
                </div>
            </div>
        </div>
    </div>
    <div class="submit-section">
        <button class="btn-submit" onclick="alert('证据已保存并上链存证'); window.location.href='inspector-report-form.html'">保存并继续</button>
    </div>
</div>
</body>
</html>`;

// 巡查报告表单
const reportFormHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>提交报告 - 巡查员APP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mobile-frame.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --primary-color: #1890ff; --success-color: #52c41a; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f5f5f5; }
        .header { position: sticky; top: 0; background: white; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 100; }
        .header-title { font-size: 18px; font-weight: 600; }
        .content { padding: 0 16px 80px; }
        .form-section { background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
        .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-label { font-size: 14px; font-weight: 600; margin-bottom: 8px; display: block; }
        .form-input, .form-textarea, .form-select { width: 100%; padding: 10px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: 14px; }
        .form-textarea { min-height: 120px; }
        .submit-section { position: absolute; bottom: 0; left: 0; right: 0; background: white; padding: 12px 16px; box-shadow: 0 -2px 8px rgba(0,0,0,0.08); z-index: 100; }
        .btn-submit { width: 100%; padding: 12px; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; }
        .phone-frame { display: flex; flex-direction: column; position: relative; }
        .app-content { flex: 1; overflow-y: auto; padding-bottom: 70px; }
    </style>
</head>
<body>
<a href="inspector-evidence-form.html" class="back-button">← 返回</a>
<div class="phone-frame">
    <div class="app-content">
        <div class="header">
            <div class="header-title">提交巡查报告</div>
        </div>
        <div class="content">
            <div class="form-section">
                <div class="section-title">📋 报告信息</div>
                <div class="form-group">
                    <label class="form-label">报告编号</label>
                    <input type="text" class="form-input" value="BG20240211001" readonly>
                </div>
                <div class="form-group">
                    <label class="form-label">巡查结果</label>
                    <select class="form-select">
                        <option>请选择</option>
                        <option>正常</option>
                        <option>发现问题</option>
                        <option>严重违规</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">问题描述</label>
                    <textarea class="form-textarea" placeholder="请详细描述发现的问题..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">处理建议</label>
                    <textarea class="form-textarea" placeholder="请提出处理建议..."></textarea>
                </div>
            </div>
            <div class="form-section">
                <div class="section-title">📊 统计信息</div>
                <div style="font-size: 13px; line-height: 2;">
                    <div>采集证据：3张照片</div>
                    <div>巡查时长：1小时30分钟</div>
                    <div>GPS轨迹：已记录</div>
                    <div>区块链存证：已完成</div>
                </div>
            </div>
        </div>
    </div>
    <div class="submit-section">
        <button class="btn-submit" onclick="alert('报告提交成功！'); window.location.href='mobile-inspector-v3.html'">提交报告</button>
    </div>
</div>
</body>
</html>`;

// 保存文件
fs.writeFileSync('inspector-task-list.html', taskListHTML, 'utf8');
fs.writeFileSync('inspector-evidence-form.html', evidenceFormHTML, 'utf8');
fs.writeFileSync('inspector-report-form.html', reportFormHTML, 'utf8');

console.log('✅ 巡查员APP页面创建成功：');
console.log('  - inspector-task-list.html (任务列表)');
console.log('  - inspector-evidence-form.html (证据采集)');
console.log('  - inspector-report-form.html (提交报告)');
