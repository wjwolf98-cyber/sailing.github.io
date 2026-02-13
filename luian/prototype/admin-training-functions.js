// ==================== 培训学习管理功能 ====================

// 新增培训课程
function addTrainingCourse() {
    if (!document.getElementById('trainingCourseFormModal')) {
        createTrainingCourseFormModal();
    }
    document.getElementById('trainingCourseFormTitle').textContent = '新增课程';
    document.getElementById('trainingCourseForm').reset();
    showAdminModal('trainingCourseFormModal');
}

// 创建培训课程表单模态框
function createTrainingCourseFormModal() {
    const modalHTML = `
    <div id="trainingCourseFormModal" class="admin-modal">
        <div class="admin-modal-content" style="max-width: 700px;">
            <div class="admin-modal-header">
                <h3 id="trainingCourseFormTitle">新增课程</h3>
                <button class="admin-modal-close" onclick="closeAdminModal('trainingCourseFormModal')">×</button>
            </div>
            <div class="admin-modal-body">
                <form id="trainingCourseForm">
                    <div class="form-group">
                        <label><span class="required">*</span> 课程名称</label>
                        <input type="text" class="form-control" placeholder="请输入课程名称" required>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 课程类型</label>
                        <select class="form-control" required>
                            <option value="">请选择</option>
                            <option>法律培训</option>
                            <option>技术培训</option>
                            <option>管理培训</option>
                            <option>产品培训</option>
                            <option>营销培训</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 讲师</label>
                        <input type="text" class="form-control" placeholder="请输入讲师姓名" required>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 课程时长（分钟）</label>
                        <input type="number" class="form-control" placeholder="如：60" required>
                    </div>
                    <div class="form-group">
                        <label>课程封面</label>
                        <div class="upload-area" onclick="alert('上传课程封面')">
                            <div style="text-align: center; padding: 20px; border: 2px dashed #ddd; border-radius: 8px; cursor: pointer;">
                                <div style="font-size: 36px; margin-bottom: 10px;">📷</div>
                                <div>点击上传封面图片</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>课程视频</label>
                        <div class="upload-area" onclick="alert('上传课程视频')">
                            <div style="text-align: center; padding: 20px; border: 2px dashed #ddd; border-radius: 8px; cursor: pointer;">
                                <div style="font-size: 36px; margin-bottom: 10px;">🎬</div>
                                <div>点击上传视频文件</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>课程简介</label>
                        <textarea class="form-control" rows="4" placeholder="请输入课程简介"></textarea>
                    </div>
                    <div class="form-group">
                        <label>课程大纲</label>
                        <textarea class="form-control" rows="6" placeholder="请输入课程大纲（每行一个章节）"></textarea>
                    </div>
                </form>
            </div>
            <div class="admin-modal-footer">
                <button class="btn btn-default" onclick="closeAdminModal('trainingCourseFormModal')">取消</button>
                <button class="btn btn-primary" onclick="submitTrainingCourseForm()">保存</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 提交培训课程表单
function submitTrainingCourseForm() {
    alert('✅ 课程保存成功！');
    closeAdminModal('trainingCourseFormModal');
}

// 查看课程详情
function viewCourseDetail(courseId) {
    if (!document.getElementById('courseDetailModal')) {
        createCourseDetailModal();
    }
    showAdminModal('courseDetailModal');
}

// 创建课程详情模态框
function createCourseDetailModal() {
    const modalHTML = `
    <div id="courseDetailModal" class="admin-modal">
        <div class="admin-modal-content" style="max-width: 800px;">
            <div class="admin-modal-header">
                <h3>课程详情</h3>
                <button class="admin-modal-close" onclick="closeAdminModal('courseDetailModal')">×</button>
            </div>
            <div class="admin-modal-body">
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>课程名称</label>
                        <div>品牌保护法律知识</div>
                    </div>
                    <div class="detail-item">
                        <label>课程类型</label>
                        <div>法律培训</div>
                    </div>
                    <div class="detail-item">
                        <label>讲师</label>
                        <div>李律师</div>
                    </div>
                    <div class="detail-item">
                        <label>课程时长</label>
                        <div>120分钟</div>
                    </div>
                    <div class="detail-item">
                        <label>学习人数</label>
                        <div>156人</div>
                    </div>
                    <div class="detail-item">
                        <label>完成人数</label>
                        <div>142人</div>
                    </div>
                    <div class="detail-item">
                        <label>发布时间</label>
                        <div>2024-01-10</div>
                    </div>
                    <div class="detail-item">
                        <label>状态</label>
                        <div><span class="badge badge-success">已发布</span></div>
                    </div>
                    <div class="detail-item full-width">
                        <label>课程简介</label>
                        <div>本课程系统讲解品牌保护相关法律知识，包括商标法、专利法、反不正当竞争法等...</div>
                    </div>
                    <div class="detail-item full-width">
                        <label>课程大纲</label>
                        <div>
                            <div>第一章：商标法基础知识</div>
                            <div>第二章：专利法基础知识</div>
                            <div>第三章：反不正当竞争法</div>
                            <div>第四章：品牌维权实务</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="admin-modal-footer">
                <button class="btn btn-default" onclick="closeAdminModal('courseDetailModal')">关闭</button>
                <button class="btn btn-primary" onclick="editCourse()">编辑</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 编辑课程
function editCourse(courseId) {
    alert(`编辑课程\n\n课程ID: ${courseId}\n可修改课程信息、视频、大纲等`);
}

// 查看课程统计
function viewCourseStats(courseId) {
    alert(`课程统计\n\n课程ID: ${courseId}\n\n统计数据：\n• 学习人数: 156人\n• 完成人数: 142人\n• 完成率: 91%\n• 平均学习时长: 108分钟\n• 平均评分: 4.8/5.0\n• 学习趋势: 稳步上升`);
}

// 查看学员
function viewStudents(courseId) {
    alert(`查看学员\n\n课程ID: ${courseId}\n显示所有学习该课程的学员列表`);
}

// 新增考试
function addExam() {
    if (!document.getElementById('examFormModal')) {
        createExamFormModal();
    }
    document.getElementById('examFormTitle').textContent = '新增考试';
    document.getElementById('examForm').reset();
    showAdminModal('examFormModal');
}

// 创建考试表单模态框
function createExamFormModal() {
    const modalHTML = `
    <div id="examFormModal" class="admin-modal">
        <div class="admin-modal-content" style="max-width: 700px;">
            <div class="admin-modal-header">
                <h3 id="examFormTitle">新增考试</h3>
                <button class="admin-modal-close" onclick="closeAdminModal('examFormModal')">×</button>
            </div>
            <div class="admin-modal-body">
                <form id="examForm">
                    <div class="form-group">
                        <label><span class="required">*</span> 考试名称</label>
                        <input type="text" class="form-control" placeholder="请输入考试名称" required>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 关联课程</label>
                        <select class="form-control" required>
                            <option value="">请选择</option>
                            <option>品牌保护法律知识</option>
                            <option>防伪技术培训</option>
                            <option>渠道商管理规范</option>
                            <option>消费者权益保护</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 考试时长（分钟）</label>
                        <input type="number" class="form-control" placeholder="如：60" required>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 及格分数</label>
                        <input type="number" class="form-control" placeholder="如：60" min="0" max="100" required>
                    </div>
                    <div class="form-group">
                        <label><span class="required">*</span> 考试次数限制</label>
                        <select class="form-control" required>
                            <option value="">请选择</option>
                            <option>不限次数</option>
                            <option>1次</option>
                            <option>2次</option>
                            <option>3次</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>考试说明</label>
                        <textarea class="form-control" rows="4" placeholder="请输入考试说明"></textarea>
                    </div>
                </form>
            </div>
            <div class="admin-modal-footer">
                <button class="btn btn-default" onclick="closeAdminModal('examFormModal')">取消</button>
                <button class="btn btn-primary" onclick="submitExamForm()">保存</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 提交考试表单
function submitExamForm() {
    alert('✅ 考试保存成功！');
    closeAdminModal('examFormModal');
}

// 查看考试详情
function viewExamDetail(examId) {
    alert(`考试详情\n\n考试ID: ${examId}\n考试名称: 品牌保护法律知识考核\n关联课程: 品牌保护法律知识\n考试时长: 60分钟\n及格分数: 60分\n参考人数: 142人\n通过率: 85%`);
}

// 编辑考试
function editExam(examId) {
    alert(`编辑考试\n\n考试ID: ${examId}\n可修改考试信息、题目等`);
}

// 查看考试成绩
function viewExamResults(examId) {
    alert(`查看考试成绩\n\n考试ID: ${examId}\n显示所有参加该考试的学员成绩列表`);
}

// 管理试题
function manageQuestions(examId) {
    alert(`管理试题\n\n考试ID: ${examId}\n可添加、编辑、删除试题\n支持单选题、多选题、判断题、填空题、简答题`);
}

console.log('✅ Training & Exam Management Functions Loaded');
