const fs = require('fs');

// 法律求助表单页面
const formHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>法律求助 - 律联品牌保护系统</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mobile-frame.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        :root {
            --primary-color: #1890ff; --success-color: #52c41a; --warning-color: #faad14;
            --error-color: #ff4d4f; --text-color: rgba(0, 0, 0, 0.85);
            --text-secondary: rgba(0, 0, 0, 0.45); --border-color: #d9d9d9;
            --background-color: #f5f5f5;
        }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif; background: var(--background-color); color: var(--text-color); line-height: 1.5715; }
        .header { position: sticky; top: 0; height: 44px; background: white; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); z-index: 100; }
        .header-left { display: flex; align-items: center; gap: 8px; color: var(--text-color); font-size: 16px; font-weight: 600; cursor: pointer; }
        .header-right { color: var(--primary-color); font-size: 14px; cursor: pointer; }
        .content { padding: 0 16px 80px; }
        .info-card { background: #e6f7ff; border-left: 4px solid var(--primary-color); padding: 16px; border-radius: 8px; margin-bottom: 16px; }
        .info-card h4 { margin-bottom: 8px; }
        .info-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
        .form-section { background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
        .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-label { display: flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
        .required { color: var(--error-color); }
        .form-input, .form-textarea, .form-select { width: 100%; padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 14px; }
        .form-textarea { min-height: 120px; resize: vertical; }
        .form-help { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }
        .submit-section { position: absolute; bottom: 0; left: 0; right: 0; background: white; padding: 12px 16px; box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08); z-index: 100; display: flex; gap: 12px; }
        .btn-submit { flex: 1; padding: 12px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
        .btn-default { background: #f5f5f5; color: var(--text-color); }
        .btn-primary { background: var(--primary-color); color: white; }
        .phone-frame { display: flex; flex-direction: column; position: relative; }
        .app-content { flex: 1; overflow-y: auto; overflow-x: hidden; padding-bottom: 70px; }
    </style>
</head>
<body>
<a href="mobile-mall.html" class="back-button">← 返回商城</a>
<div class="phone-frame">
    <div class="app-content">
        <div class="header">
            <div class="header-left" onclick="window.location.href='mobile-mall.html'">
                <i class="fas fa-arrow-left"></i>
                <span>法律求助</span>
            </div>
            <div class="header-right" onclick="window.location.href='legal-help-list.html'">
                <i class="fas fa-list"></i> 我的咨询
            </div>
        </div>
        <div class="content">
            <div class="info-card">
                <h4><i class="fas fa-shield-check"></i> 专业法律服务</h4>
                <p>• 知识产权专业律师团队<br>• 平均执业经验5年以上<br>• 响应时间≤24小时<br>• 免费咨询，按需收费</p>
            </div>
            <div class="form-section">
                <div class="section-title">📋 基础信息</div>
                <div class="form-group">
                    <label class="form-label"><span>您的姓名</span><span class="required">*</span></label>
                    <input type="text" class="form-input" placeholder="请输入您的真实姓名">
                </div>
                <div class="form-group">
                    <label class="form-label"><span>联系电话</span><span class="required">*</span></label>
                    <input type="tel" class="form-input" placeholder="138****5678">
                </div>
                <div class="form-group">
                    <label class="form-label"><span>电子邮箱</span></label>
                    <input type="email" class="form-input" placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label"><span>公司名称</span></label>
                    <input type="text" class="form-input" placeholder="XX科技有限公司">
                </div>
            </div>
            <div class="form-section">
                <div class="section-title">⚖️ 法律问题</div>
                <div class="form-group">
                    <label class="form-label"><span>问题类型</span><span class="required">*</span></label>
                    <select class="form-select">
                        <option value="">请选择问题类型</option>
                        <option value="trademark_consult">商标注册咨询</option>
                        <option value="trademark_infringement">商标侵权咨询</option>
                        <option value="patent_apply">专利申请咨询</option>
                        <option value="patent_dispute">专利纠纷咨询</option>
                        <option value="copyright">著作权保护</option>
                        <option value="unfair">不正当竞争</option>
                        <option value="contract_review">合同审查</option>
                        <option value="contract_dispute">合同纠纷</option>
                        <option value="legal_advisor">法律顾问服务</option>
                        <option value="other">其他法律问题</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label"><span>问题标题</span><span class="required">*</span></label>
                    <input type="text" class="form-input" placeholder="简要描述您的法律问题" maxlength="100">
                    <div class="form-help">💡 例如：商标注册流程和费用咨询</div>
                </div>
                <div class="form-group">
                    <label class="form-label"><span>详细描述</span><span class="required">*</span></label>
                    <textarea class="form-textarea" placeholder="请详细描述您遇到的法律问题，包括背景、现状、疑问等，至少50字..." minlength="50"></textarea>
                    <div class="form-help">💡 描述越详细，律师越能准确判断和提供建议</div>
                </div>
                <div class="form-group">
                    <label class="form-label"><span>涉及金额</span></label>
                    <input type="number" class="form-input" placeholder="0.00" step="0.01">
                    <div class="form-help">💡 如涉及经济纠纷，请填写大致金额</div>
                </div>
                <div class="form-group">
                    <label class="form-label"><span>紧急程度</span><span class="required">*</span></label>
                    <div style="display: flex; gap: 16px;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="radio" name="urgent" value="yes">
                            <span>紧急（24小时内需要回复）</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="radio" name="urgent" value="no" checked>
                            <span>不紧急</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <div class="section-title">📎 相关材料（可选）</div>
                <div class="form-group">
                    <label class="form-label"><span>上传附件</span></label>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <div style="width: 80px; height: 80px; border: 2px dashed var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <i class="fas fa-plus" style="font-size: 24px; color: var(--text-secondary);"></i>
                        </div>
                    </div>
                    <div class="form-help">💡 可上传合同、证据照片等，最多9张，每张≤5MB</div>
                </div>
            </div>
            <div class="form-section">
                <div class="section-title">👨‍⚖️ 指定律师（可选）</div>
                <div class="form-group">
                    <label class="form-label"><span>选择律师</span></label>
                    <select class="form-select">
                        <option value="">系统自动分配</option>
                        <option value="lawyer1">张律师 - 商标侵权专家</option>
                        <option value="lawyer2">李律师 - 著作权保护专家</option>
                        <option value="lawyer3">王律师 - 专利纠纷专家</option>
                    </select>
                    <div class="form-help">💡 不选择则由系统根据问题类型自动分配</div>
                </div>
            </div>
        </div>
    </div>
    <div class="submit-section">
        <button class="btn-submit btn-default" onclick="alert('草稿已保存')"><i class="fas fa-save"></i> 保存草稿</button>
        <button class="btn-submit btn-primary" onclick="alert('提交成功！咨询编号: LH20240211000001'); window.location.href='legal-help-list.html'"><i class="fas fa-paper-plane"></i> 提交咨询</button>
    </div>
</div>
</body>
</html>`;

// 保存文件
fs.writeFileSync('legal-help-form.html', formHTML, 'utf8');
console.log('✅ legal-help-form.html 创建成功');
