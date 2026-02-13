/**
 * 商城维权管理系统 - 增强模态框和表单功能
 * 将此文件引入到 index.html 中：<script src="enhanced-modals.js"></script>
 */

// 显示维权详情
function showRightsDetail(rpNo) {
    // 创建详情模态框（如果不存在）
    if (!document.getElementById('rightsDetailModal')) {
        createRightsDetailModal();
    }
    
    // 显示模态框
    showModal('rightsDetailModal');
    
    // 加载详情数据（这里使用模拟数据）
    loadRightsDetail(rpNo);
}

// 创建维权详情模态框
function createRightsDetailModal() {
    const modalHTML = `
    <div class="modal" id="rightsDetailModal">
        <div class="modal-content" style="max-width: 1000px;">
            <div class="modal-header">
                <h3>维权详情 - <span id="detailRpNo">RP20240115000001</span></h3>
                <button class="btn-close" onclick="closeModal('rightsDetailModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 24px; max-height: 70vh; overflow-y: auto;">
                <!-- 基本信息 -->
                <div style="margin-bottom: 24px;">
                    <h4 style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--primary-color);">基本信息</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">维权编号</div>
                            <div style="font-weight: 600;" id="detailRpNo2">RP20240115000001</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">申请人</div>
                            <div style="font-weight: 600;" id="detailUser">张三 (138****8000)</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">提交时间</div>
                            <div style="font-weight: 600;" id="detailTime">2024-01-15 08:30</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">维权类型</div>
                            <div id="detailType"><span class="badge-danger">假冒伪劣</span></div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">当前状态</div>
                            <div id="detailStatus"><span class="badge-warning">调查中</span></div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">维权金额</div>
                            <div style="font-weight: 600; color: var(--danger-color);" id="detailAmount">¥799.00</div>
                        </div>
                    </div>
                </div>
                
                <!-- 订单信息 -->
                <div style="margin-bottom: 24px;">
                    <h4 style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--primary-color);">订单信息</h4>
                    <div style="display: flex; gap: 15px; padding: 15px; background: var(--bg-color); border-radius: 8px;">
                        <img src="https://via.placeholder.com/80" style="width: 80px; height: 80px; border-radius: 8px;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 5px;" id="detailProduct">某品牌运动鞋 男款 42码</div>
                            <div style="color: var(--danger-color); font-weight: 600; margin-bottom: 5px;" id="detailPrice">¥599.00 × 1</div>
                            <div style="font-size: 13px; color: var(--text-secondary);" id="detailOrderNo">订单号：OD20240110000001</div>
                            <div style="font-size: 13px; color: var(--text-secondary);" id="detailOrderTime">购买时间：2024-01-10 14:30</div>
                        </div>
                    </div>
                </div>
                
                <!-- 问题描述 -->
                <div style="margin-bottom: 24px;">
                    <h4 style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--primary-color);">问题描述</h4>
                    <div style="padding: 15px; background: var(--bg-color); border-radius: 8px;">
                        <div style="font-weight: 600; margin-bottom: 10px;" id="detailTitle">购买到假冒商品，要求退货退款</div>
                        <div style="line-height: 1.8; color: var(--text-secondary);" id="detailDesc">
                            我于2024年1月10日在商城购买了某品牌运动鞋，收到后发现商标模糊不清，材质与正品差异明显，鞋底做工粗糙，怀疑是假冒商品。
                        </div>
                    </div>
                </div>
                
                <!-- 证据材料 -->
                <div style="margin-bottom: 24px;">
                    <h4 style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--primary-color);">证据材料 (3)</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                        <div style="aspect-ratio: 1; border-radius: 8px; overflow: hidden; cursor: pointer;">
                            <img src="https://via.placeholder.com/150" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="aspect-ratio: 1; border-radius: 8px; overflow: hidden; cursor: pointer;">
                            <img src="https://via.placeholder.com/150" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="aspect-ratio: 1; border-radius: 8px; overflow: hidden; cursor: pointer;">
                            <img src="https://via.placeholder.com/150" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                </div>
                
                <!-- 处理流程 -->
                <div style="margin-bottom: 24px;">
                    <h4 style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--primary-color);">处理流程</h4>
                    <div id="processTimeline" style="position: relative; padding-left: 30px;">
                        <!-- 时间轴将通过JavaScript动态生成 -->
                    </div>
                </div>
                
                <!-- 操作按钮 -->
                <div style="display: flex; gap: 10px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <button class="btn-primary" onclick="openAcceptModal()">
                        <i class="fas fa-check"></i> 受理
                    </button>
                    <button class="btn-primary" onclick="openAssignModal()">
                        <i class="fas fa-user-plus"></i> 分派
                    </button>
                    <button class="btn-primary" onclick="openProcessModal()">
                        <i class="fas fa-edit"></i> 添加处理记录
                    </button>
                    <button class="btn-outline" onclick="markAsResolved()">
                        <i class="fas fa-check-circle"></i> 标记解决
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 加载维权详情数据
function loadRightsDetail(rpNo) {
    // 这里使用模拟数据，实际应该从后端API获取
    const mockData = {
        rpNo: rpNo,
        user: '张三 (138****8000)',
        submitTime: '2024-01-15 08:30',
        type: '假冒伪劣',
        status: '调查中',
        amount: '¥799.00',
        product: '某品牌运动鞋 男款 42码',
        price: '¥599.00 × 1',
        orderNo: 'OD20240110000001',
        orderTime: '2024-01-10 14:30',
        title: '购买到假冒商品，要求退货退款',
        description: '我于2024年1月10日在商城购买了某品牌运动鞋，收到后发现商标模糊不清，材质与正品差异明显，鞋底做工粗糙，怀疑是假冒商品。',
        process: [
            { type: 'submit', title: '提交申请', time: '2024-01-15 08:30', desc: '消费者张三提交维权申请', status: 'completed' },
            { type: 'accept', title: '客服受理', time: '2024-01-15 09:00', desc: '客服李四已受理，初步判断为假冒商品', handler: '客服李四', status: 'completed' },
            { type: 'investigate', title: '现场核查', time: '进行中...', desc: '已分派给巡查员王五进行现场核查', handler: '巡查员王五', status: 'current' }
        ]
    };
    
    // 更新详情数据
    document.getElementById('detailRpNo').textContent = mockData.rpNo;
    document.getElementById('detailRpNo2').textContent = mockData.rpNo;
    document.getElementById('detailUser').textContent = mockData.user;
    document.getElementById('detailTime').textContent = mockData.submitTime;
    document.getElementById('detailAmount').textContent = mockData.amount;
    document.getElementById('detailProduct').textContent = mockData.product;
    document.getElementById('detailPrice').textContent = mockData.price;
    document.getElementById('detailOrderNo').textContent = '订单号：' + mockData.orderNo;
    document.getElementById('detailOrderTime').textContent = '购买时间：' + mockData.orderTime;
    document.getElementById('detailTitle').textContent = mockData.title;
    document.getElementById('detailDesc').textContent = mockData.description;
    
    // 生成处理流程时间轴
    generateProcessTimeline(mockData.process);
}

// 生成处理流程时间轴
function generateProcessTimeline(processData) {
    const timeline = document.getElementById('processTimeline');
    if (!timeline) return;
    
    // 添加时间轴线
    timeline.innerHTML = '<div style="position: absolute; left: 9px; top: 0; bottom: 0; width: 2px; background: var(--border-color);"></div>';
    
    processData.forEach((item, index) => {
        const nodeColor = item.status === 'completed' ? 'var(--success-color)' : 'var(--primary-color)';
        const bgColor = item.status === 'current' ? '#e6f7ff' : 'var(--bg-color)';
        
        const nodeHTML = `
            <div style="position: relative; margin-bottom: 20px;">
                <div style="position: absolute; left: -30px; width: 20px; height: 20px; border-radius: 50%; background: ${nodeColor}; border: 3px solid white; box-shadow: 0 0 0 2px ${nodeColor};"></div>
                <div style="padding: 15px; background: ${bgColor}; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 600;">${item.title}</span>
                        <span style="font-size: 13px; color: var(--text-secondary);">${item.time}</span>
                    </div>
                    <div style="font-size: 14px; color: var(--text-secondary);">${item.desc}</div>
                    ${item.handler ? `<div style="font-size: 13px; color: var(--text-secondary); margin-top: 5px;">处理人：${item.handler}</div>` : ''}
                </div>
            </div>
        `;
        
        timeline.insertAdjacentHTML('beforeend', nodeHTML);
    });
}

// 打开受理模态框
function openAcceptModal() {
    if (!document.getElementById('acceptModal')) {
        createAcceptModal();
    }
    showModal('acceptModal');
}

// 创建受理模态框
function createAcceptModal() {
    const modalHTML = `
    <div class="modal" id="acceptModal">
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>受理维权申请</h3>
                <button class="btn-close" onclick="closeModal('acceptModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 24px;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;">维权编号</label>
                    <input type="text" value="RP20240115000001" disabled style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-color);">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 初步判断</label>
                    <select id="acceptJudgment" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
                        <option>请选择</option>
                        <option selected>确认为假冒商品</option>
                        <option>确认为质量问题</option>
                        <option>确认为虚假宣传</option>
                        <option>确认为服务纠纷</option>
                        <option>需进一步核查</option>
                        <option>不予受理</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 受理意见</label>
                    <textarea id="acceptOpinion" placeholder="请输入受理意见..." style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; min-height: 100px; resize: vertical;">经初步审核，该维权申请材料齐全，问题描述清晰，证据充分。初步判断为假冒商品，建议分派给巡查员进行现场核查。</textarea>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;">分派给</label>
                    <select id="acceptAssignTo" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
                        <option>请选择处理人</option>
                        <option selected>巡查员王五</option>
                        <option>巡查员赵六</option>
                        <option>专家李专家</option>
                        <option>律师张律师</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 24px;">
                    <button class="btn-outline" style="flex: 1;" onclick="closeModal('acceptModal')">取消</button>
                    <button class="btn-primary" style="flex: 1;" onclick="submitAccept()">确认受理</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 提交受理
function submitAccept() {
    const judgment = document.getElementById('acceptJudgment').value;
    const opinion = document.getElementById('acceptOpinion').value;
    const assignTo = document.getElementById('acceptAssignTo').value;
    
    if (!judgment || judgment === '请选择') {
        alert('请选择初步判断');
        return;
    }
    
    if (!opinion.trim()) {
        alert('请输入受理意见');
        return;
    }
    
    alert('✅ 受理成功！\n\n维权申请已受理' + (assignTo && assignTo !== '请选择处理人' ? '，已分派给' + assignTo : ''));
    closeModal('acceptModal');
    closeModal('rightsDetailModal');
}

// 打开分派模态框
function openAssignModal() {
    if (!document.getElementById('assignModal')) {
        createAssignModal();
    }
    showModal('assignModal');
}

// 创建分派模态框
function createAssignModal() {
    const modalHTML = `
    <div class="modal" id="assignModal">
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>分派任务</h3>
                <button class="btn-close" onclick="closeModal('assignModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 24px;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 分派部门</label>
                    <select id="assignDept" onchange="updateAssignHandlerList()" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
                        <option>请选择部门</option>
                        <option value="inspection">巡查部</option>
                        <option value="expert">专家组</option>
                        <option value="legal">法务部</option>
                        <option value="mediation">调解部</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 分派给</label>
                    <select id="assignHandler" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
                        <option>请先选择部门</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;">优先级</label>
                    <div style="display: flex; gap: 10px;">
                        <label style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 4px; text-align: center; cursor: pointer;">
                            <input type="radio" name="assignPriority" value="LOW"> 低
                        </label>
                        <label style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 4px; text-align: center; cursor: pointer;">
                            <input type="radio" name="assignPriority" value="NORMAL" checked> 普通
                        </label>
                        <label style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 4px; text-align: center; cursor: pointer;">
                            <input type="radio" name="assignPriority" value="HIGH"> 高
                        </label>
                        <label style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 4px; text-align: center; cursor: pointer;">
                            <input type="radio" name="assignPriority" value="URGENT"> 紧急
                        </label>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 分派说明</label>
                    <textarea id="assignDesc" placeholder="请输入分派说明..." style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; min-height: 100px; resize: vertical;">请尽快进行现场核查，重点关注商标、材质、做工等方面，并拍照取证。</textarea>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 24px;">
                    <button class="btn-outline" style="flex: 1;" onclick="closeModal('assignModal')">取消</button>
                    <button class="btn-primary" style="flex: 1;" onclick="submitAssign()">确认分派</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 更新分派处理人列表
function updateAssignHandlerList() {
    const dept = document.getElementById('assignDept').value;
    const handlerSelect = document.getElementById('assignHandler');
    
    const handlers = {
        'inspection': [
            { value: 'inspector1', label: '巡查员王五' },
            { value: 'inspector2', label: '巡查员赵六' }
        ],
        'expert': [
            { value: 'expert1', label: '专家李专家' },
            { value: 'expert2', label: '专家周专家' }
        ],
        'legal': [
            { value: 'lawyer1', label: '律师张律师' },
            { value: 'lawyer2', label: '律师刘律师' }
        ],
        'mediation': [
            { value: 'mediator1', label: '调解员孙调解' },
            { value: 'mediator2', label: '调解员钱调解' }
        ]
    };
    
    handlerSelect.innerHTML = '<option>请选择处理人</option>';
    
    if (handlers[dept]) {
        handlers[dept].forEach(h => {
            const option = document.createElement('option');
            option.value = h.value;
            option.textContent = h.label;
            handlerSelect.appendChild(option);
        });
    }
}

// 提交分派
function submitAssign() {
    const dept = document.getElementById('assignDept').value;
    const handler = document.getElementById('assignHandler').value;
    const desc = document.getElementById('assignDesc').value;
    
    if (!dept || dept === '请选择部门') {
        alert('请选择部门');
        return;
    }
    
    if (!handler || handler === '请选择处理人') {
        alert('请选择处理人');
        return;
    }
    
    if (!desc.trim()) {
        alert('请输入分派说明');
        return;
    }
    
    alert('✅ 分派成功！\n\n任务已分派给相关人员');
    closeModal('assignModal');
}

// 打开处理记录模态框
function openProcessModal() {
    if (!document.getElementById('processModal')) {
        createProcessModal();
    }
    showModal('processModal');
}

// 创建处理记录模态框
function createProcessModal() {
    const modalHTML = `
    <div class="modal" id="processModal">
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>添加处理记录</h3>
                <button class="btn-close" onclick="closeModal('processModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 24px;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 处理类型</label>
                    <select id="processType" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
                        <option>请选择</option>
                        <option>现场核查</option>
                        <option>专家鉴定</option>
                        <option>调解协商</option>
                        <option>法律咨询</option>
                        <option>其他</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;"><span style="color: var(--danger-color);">*</span> 处理内容</label>
                    <textarea id="processContent" placeholder="请详细描述处理过程和发现的问题..." style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; min-height: 120px; resize: vertical;"></textarea>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px;">上传附件</label>
                    <div style="border: 2px dashed var(--border-color); border-radius: 8px; padding: 30px; text-align: center; cursor: pointer;" onclick="alert('上传附件功能')">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 36px; color: var(--text-secondary); margin-bottom: 10px;"></i>
                        <div style="color: var(--text-secondary);">点击上传或拖拽文件到此处</div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 5px;">支持图片、文档、视频</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 24px;">
                    <button class="btn-outline" style="flex: 1;" onclick="closeModal('processModal')">取消</button>
                    <button class="btn-primary" style="flex: 1;" onclick="submitProcess()">提交</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 提交处理记录
function submitProcess() {
    const type = document.getElementById('processType').value;
    const content = document.getElementById('processContent').value;
    
    if (!type || type === '请选择') {
        alert('请选择处理类型');
        return;
    }
    
    if (!content.trim()) {
        alert('请输入处理内容');
        return;
    }
    
    alert('✅ 处理记录已添加！');
    closeModal('processModal');
}

// 标记为已解决
function markAsResolved() {
    if (confirm('确认标记为已解决？\n\n标记后将通知消费者确认')) {
        alert('✅ 已标记为解决！\n\n已通知消费者确认');
        closeModal('rightsDetailModal');
    }
}

console.log('✅ 商城维权增强功能已加载');
