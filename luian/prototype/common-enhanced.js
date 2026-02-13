/**
 * 品牌保护生态系统 - 公共增强脚本
 * 提供通用的UI组件、数据模拟、工具函数
 */

// ==================== 工具函数 ====================

const Utils = {
    // 格式化日期
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hour = String(d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hour)
            .replace('mm', minute)
            .replace('ss', second);
    },
    
    // 生成随机ID
    generateId(prefix = 'ID') {
        return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // 防抖
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 深拷贝
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // 格式化数字
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // 计算百分比
    percentage(value, total) {
        if (total === 0) return 0;
        return ((value / total) * 100).toFixed(1);
    }
};

// ==================== UI组件 ====================

const UI = {
    // 显示消息提示
    message(type, text, duration = 3000) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const colors = {
            success: '#52c41a',
            error: '#f5222d',
            warning: '#faad14',
            info: '#1890ff'
        };
        
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            animation: slideDown 0.3s ease;
        `;
        
        message.innerHTML = `
            <span style="color: ${colors[type]}; font-size: 18px; font-weight: bold;">${icons[type]}</span>
            <span style="color: #262626;">${text}</span>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, duration);
    },
    
    // 显示确认对话框
    confirm(title, content, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s;
        `;
        
        modal.innerHTML = `
            <div class="modal-dialog" style="
                background: white;
                border-radius: 8px;
                padding: 24px;
                max-width: 420px;
                width: 90%;
                animation: slideUp 0.3s;
            ">
                <div style="margin-bottom: 16px;">
                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">${title}</h3>
                    <p style="color: #595959; line-height: 1.6;">${content}</p>
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button class="btn-cancel" style="
                        padding: 8px 16px;
                        border: 1px solid #d9d9d9;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">取消</button>
                    <button class="btn-confirm" style="
                        padding: 8px 16px;
                        border: none;
                        background: #1890ff;
                        color: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">确定</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.btn-cancel').onclick = () => {
            modal.remove();
            onCancel && onCancel();
        };
        
        modal.querySelector('.btn-confirm').onclick = () => {
            modal.remove();
            onConfirm && onConfirm();
        };
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
                onCancel && onCancel();
            }
        };
    },
    
    // 显示加载状态
    loading(show = true, text = '加载中...') {
        let loader = document.getElementById('global-loader');
        
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'global-loader';
                loader.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255,255,255,0.9);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s;
                `;
                
                loader.innerHTML = `
                    <div style="
                        width: 40px;
                        height: 40px;
                        border: 4px solid #f0f0f0;
                        border-top-color: #1890ff;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                    "></div>
                    <p style="margin-top: 16px; color: #595959;">${text}</p>
                `;
                
                document.body.appendChild(loader);
            }
        } else {
            if (loader) {
                loader.remove();
            }
        }
    },
    
    // 显示模态框
    modal(title, content, footer, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s;
        `;
        
        const width = options.width || '600px';
        
        modal.innerHTML = `
            <div class="modal-dialog" style="
                background: white;
                border-radius: 8px;
                max-width: ${width};
                width: 90%;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                animation: slideUp 0.3s;
            ">
                <div class="modal-header" style="
                    padding: 16px 24px;
                    border-bottom: 1px solid #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                ">
                    <h3 style="font-size: 18px; font-weight: 600;">${title}</h3>
                    <button class="btn-close" style="
                        width: 32px;
                        height: 32px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                        border-radius: 4px;
                        font-size: 20px;
                        color: #8c8c8c;
                    ">×</button>
                </div>
                <div class="modal-body" style="
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                ">${content}</div>
                ${footer ? `<div class="modal-footer" style="
                    padding: 16px 24px;
                    border-top: 1px solid #f0f0f0;
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                ">${footer}</div>` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.btn-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal && !options.disableBackdropClick) {
                modal.remove();
            }
        };
        
        return modal;
    }
};

// ==================== 数据模拟 ====================

const MockData = {
    // 生成品牌列表
    generateBrands(count = 20) {
        const brands = [];
        const types = ['食品', '服装', '电子产品', '化妆品', '家居用品'];
        const statuses = ['已启用', '已禁用', '审核中'];
        
        for (let i = 1; i <= count; i++) {
            brands.push({
                id: i,
                code: `BR${String(i).padStart(8, '0')}`,
                name: `品牌${i}`,
                type: types[Math.floor(Math.random() * types.length)],
                registerDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                logo: `https://via.placeholder.com/40/667eea/ffffff?text=B${i}`
            });
        }
        
        return brands;
    },
    
    // 生成任务列表
    generateTasks(count = 15) {
        const tasks = [];
        const priorities = ['urgent', 'high', 'normal'];
        const statuses = ['pending', 'in-progress', 'completed'];
        const types = ['市场巡查', '投诉核查', '专项检查', '例行检查'];
        
        for (let i = 1; i <= count; i++) {
            const priority = priorities[Math.floor(Math.random() * priorities.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            
            tasks.push({
                id: i,
                code: `TASK${String(i).padStart(6, '0')}`,
                title: `${types[Math.floor(Math.random() * types.length)]} - 任务${i}`,
                priority: priority,
                status: status,
                assignee: `巡查员${Math.floor(Math.random() * 10) + 1}`,
                location: `${['北京', '上海', '广州', '深圳', '杭州'][Math.floor(Math.random() * 5)]}市某某区`,
                deadline: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                progress: Math.floor(Math.random() * 100),
                createTime: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
            });
        }
        
        return tasks;
    },
    
    // 生成统计数据
    generateStats() {
        return {
            todayTasks: Math.floor(Math.random() * 500) + 200,
            pendingItems: Math.floor(Math.random() * 50) + 10,
            monthlyTotal: Math.floor(Math.random() * 5000) + 2000,
            growthRate: (Math.random() * 40 - 10).toFixed(1),
            completionRate: (Math.random() * 30 + 70).toFixed(1),
            avgResponseTime: (Math.random() * 5 + 1).toFixed(1)
        };
    },
    
    // 生成图表数据
    generateChartData(days = 30) {
        const data = [];
        for (let i = 0; i < days; i++) {
            data.push({
                date: `01-${String(i + 1).padStart(2, '0')}`,
                value: Math.floor(Math.random() * 100) + 50,
                value2: Math.floor(Math.random() * 80) + 30
            });
        }
        return data;
    },
    
    // 生成待办事项
    generateTodos(count = 5) {
        const todos = [];
        const types = ['urgent', 'warning', 'info'];
        const titles = [
            '审核巡查报告',
            '处理投诉工单',
            '审批授权申请',
            '查看案件进展',
            '确认证据材料'
        ];
        
        for (let i = 0; i < count; i++) {
            todos.push({
                id: i + 1,
                type: types[i % types.length],
                title: titles[i],
                time: `${Math.floor(Math.random() * 24)}小时前`
            });
        }
        
        return todos;
    },
    
    // 生成通知列表
    generateNotifications(count = 10) {
        const notifications = [];
        const types = ['urgent', 'info'];
        const titles = [
            '新任务分配',
            '报告审核通过',
            '证据上传成功',
            '系统更新通知',
            '权限变更提醒'
        ];
        
        for (let i = 0; i < count; i++) {
            notifications.push({
                id: i + 1,
                type: types[i % types.length],
                title: titles[i % titles.length],
                desc: '这是一条通知消息的详细描述内容',
                time: `${Math.floor(Math.random() * 60)}分钟前`,
                unread: i < 3
            });
        }
        
        return notifications;
    }
};

// ==================== 表格功能 ====================

const Table = {
    // 初始化排序
    initSort(tableSelector) {
        const table = document.querySelector(tableSelector);
        if (!table) return;
        
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const field = this.dataset.sort;
                const order = this.dataset.order === 'asc' ? 'desc' : 'asc';
                
                // 更新排序图标
                headers.forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                    delete h.dataset.order;
                });
                this.classList.add(`sort-${order}`);
                this.dataset.order = order;
                
                // 执行排序
                Table.sortTable(table, field, order);
            });
        });
    },
    
    // 排序表格
    sortTable(table, field, order) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            const aValue = a.querySelector(`[data-field="${field}"]`)?.textContent || '';
            const bValue = b.querySelector(`[data-field="${field}"]`)?.textContent || '';
            
            if (order === 'asc') {
                return aValue.localeCompare(bValue, 'zh-CN');
            } else {
                return bValue.localeCompare(aValue, 'zh-CN');
            }
        });
        
        rows.forEach(row => tbody.appendChild(row));
    },
    
    // 初始化搜索
    initSearch(inputSelector, tableSelector) {
        const input = document.querySelector(inputSelector);
        const table = document.querySelector(tableSelector);
        
        if (!input || !table) return;
        
        input.addEventListener('input', Utils.debounce(function() {
            const keyword = this.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(keyword) ? '' : 'none';
            });
        }));
    },
    
    // 初始化分页
    initPagination(data, pageSize = 10) {
        return {
            data: data,
            pageSize: pageSize,
            currentPage: 1,
            totalPages: Math.ceil(data.length / pageSize),
            
            getPageData() {
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                return this.data.slice(start, end);
            },
            
            goToPage(page) {
                if (page < 1 || page > this.totalPages) return;
                this.currentPage = page;
                return this.getPageData();
            },
            
            nextPage() {
                return this.goToPage(this.currentPage + 1);
            },
            
            prevPage() {
                return this.goToPage(this.currentPage - 1);
            }
        };
    }
};

// ==================== 表单功能 ====================

const Form = {
    // 表单验证
    validate(formSelector) {
        const form = document.querySelector(formSelector);
        if (!form) return false;
        
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const value = field.value.trim();
            const errorEl = field.parentElement.querySelector('.error-message');
            
            if (!value) {
                isValid = false;
                field.classList.add('error');
                if (errorEl) {
                    errorEl.textContent = '此字段不能为空';
                    errorEl.style.display = 'block';
                }
            } else {
                field.classList.remove('error');
                if (errorEl) {
                    errorEl.style.display = 'none';
                }
            }
        });
        
        return isValid;
    },
    
    // 获取表单数据
    getData(formSelector) {
        const form = document.querySelector(formSelector);
        if (!form) return {};
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    },
    
    // 重置表单
    reset(formSelector) {
        const form = document.querySelector(formSelector);
        if (!form) return;
        
        form.reset();
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    }
};

// ==================== 图表功能 ====================

const Chart = {
    // 创建简单的柱状图（使用CSS）
    createBarChart(container, data, options = {}) {
        const maxValue = Math.max(...data.map(d => d.value));
        const html = data.map(item => {
            const height = (item.value / maxValue) * 100;
            return `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div style="
                        width: 100%;
                        height: 200px;
                        display: flex;
                        align-items: flex-end;
                        justify-content: center;
                    ">
                        <div style="
                            width: 60%;
                            height: ${height}%;
                            background: linear-gradient(180deg, #1890ff, #40a9ff);
                            border-radius: 4px 4px 0 0;
                            transition: all 0.3s;
                            cursor: pointer;
                        " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"></div>
                    </div>
                    <div style="font-size: 12px; color: #8c8c8c;">${item.label}</div>
                    <div style="font-size: 14px; font-weight: 600;">${item.value}</div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `<div style="display: flex; gap: 16px; padding: 20px;">${html}</div>`;
    },
    
    // 创建简单的折线图（使用SVG）
    createLineChart(container, data, options = {}) {
        const width = container.clientWidth || 600;
        const height = 300;
        const padding = 40;
        const maxValue = Math.max(...data.map(d => d.value));
        
        const points = data.map((d, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - (d.value / maxValue) * (height - padding * 2);
            return `${x},${y}`;
        }).join(' ');
        
        container.innerHTML = `
            <svg width="${width}" height="${height}" style="background: white; border-radius: 8px;">
                <polyline points="${points}" fill="none" stroke="#1890ff" stroke-width="2"/>
                ${data.map((d, i) => {
                    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
                    const y = height - padding - (d.value / maxValue) * (height - padding * 2);
                    return `<circle cx="${x}" cy="${y}" r="4" fill="#1890ff"/>`;
                }).join('')}
            </svg>
        `;
    }
};

// ==================== 本地存储 ====================

const Storage = {
    // 保存数据
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },
    
    // 获取数据
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },
    
    // 删除数据
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },
    
    // 清空所有数据
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    }
};

// ==================== 动画样式 ====================

// 添加动画样式到页面
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 导出到全局
window.Utils = Utils;
window.UI = UI;
window.MockData = MockData;
window.Table = Table;
window.Form = Form;
window.Chart = Chart;
window.Storage = Storage;

console.log('✅ 公共增强脚本加载完成');
