// 按最新PRD生成5个后台管理系统的增强版HTML原型
// 符合阿里巴巴前端开发规范，字段丰富
const fs = require('fs');

// 定义5个后台系统的完整菜单结构（基于PRD 2.1-2.8章节）
const adminSystems = {
  'system': {
    name: '系统管理员',
    icon: 'cog',
    color: 'purple',
    menus: [
      { 
        id: 'user-list', 
        name: '用户列表', 
        category: '用户管理',
        columns: ['用户ID', '用户名', '姓名', '角色', '部门', '手机号', '邮箱', '状态', '最后登录', '创建时间'],
        fields: [
          { name: 'username', label: '用户名', type: 'text', required: true },
          { name: 'realname', label: '真实姓名', type: 'text', required: true },
          { name: 'role', label: '角色', type: 'select', options: ['系统管理员', '生产商', '律师', '专家', '巡查员', '渠道商'], required: true },
          { name: 'department', label: '部门', type: 'select', options: ['管理部', '法务部', '巡查部', '专家部', '技术部'], required: true },
          { name: 'phone', label: '手机号', type: 'tel', required: true },
          { name: 'email', label: '邮箱', type: 'email', required: false },
          { name: 'idcard', label: '身份证号', type: 'text', required: false },
          { name: 'address', label: '联系地址', type: 'text', required: false },
          { name: 'status', label: '状态', type: 'select', options: ['启用', '禁用', '待审核'], required: true }
        ]
      },
      { 
        id: 'role-list', 
        name: '角色列表', 
        category: '角色权限',
        columns: ['角色ID', '角色名称', '角色类型', '权限数量', '用户数量', '状态', '创建时间'],
        fields: [
          { name: 'roleName', label: '角色名称', type: 'text', required: true },
          { name: 'roleType', label: '角色类型', type: 'select', options: ['系统角色', '业务角色', '自定义角色'], required: true },
          { name: 'description', label: '角色描述', type: 'textarea', required: false },
          { name: 'permissions', label: '权限配置', type: 'checkbox', required: true }
        ]
      },
      { 
        id: 'exam-list', 
        name: '考试列表', 
        category: '考试管理',
        columns: ['考试ID', '考试名称', '考试类型', '适用角色', '题目数量', '考试时长', '及格分数', '状态', '开始时间'],
        fields: [
          { name: 'examName', label: '考试名称', type: 'text', required: true },
          { name: 'examType', label: '考试类型', type: 'select', options: ['入职考试', '年度考核', '专项培训', '资格认证'], required: true },
          { name: 'targetRole', label: '适用角色', type: 'checkbox', required: true },
          { name: 'duration', label: '考试时长(分钟)', type: 'number', required: true },
          { name: 'passScore', label: '及格分数', type: 'number', required: true },
          { name: 'totalScore', label: '总分', type: 'number', required: true },
          { name: 'questionCount', label: '题目数量', type: 'number', required: true },
          { name: 'startTime', label: '开始时间', type: 'datetime', required: true },
          { name: 'endTime', label: '结束时间', type: 'datetime', required: true },
          { name: 'allowRetake', label: '允许重考', type: 'radio', options: ['是', '否'], required: true },
          { name: 'retakeCount', label: '重考次数', type: 'number', required: false }
        ]
      },
      { 
        id: 'question-bank', 
        name: '题库管理', 
        category: '考试管理',
        columns: ['题目ID', '题目类型', '题目内容', '知识点', '难度', '正确率', '使用次数', '状态', '创建时间'],
        fields: [
          { name: 'questionType', label: '题目类型', type: 'select', options: ['单选题', '多选题', '判断题', '填空题', '简答题'], required: true },
          { name: 'questionContent', label: '题目内容', type: 'textarea', required: true },
          { name: 'knowledgePoint', label: '知识点', type: 'text', required: true },
          { name: 'difficulty', label: '难度', type: 'select', options: ['简单', '中等', '困难'], required: true },
          { name: 'options', label: '选项', type: 'textarea', required: false },
          { name: 'answer', label: '正确答案', type: 'textarea', required: true },
          { name: 'analysis', label: '答案解析', type: 'textarea', required: false },
          { name: 'tags', label: '标签', type: 'text', required: false }
        ]
      },
      { 
        id: 'training-material', 
        name: '学习材料', 
        category: '培训学习',
        columns: ['材料ID', '材料名称', '材料类型', '分类', '文件大小', '浏览次数', '下载次数', '状态', '上传时间'],
        fields: [
          { name: 'materialName', label: '材料名称', type: 'text', required: true },
          { name: 'materialType', label: '材料类型', type: 'select', options: ['PDF文档', 'Word文档', 'PPT演示', '图片', '其他'], required: true },
          { name: 'category', label: '分类', type: 'select', options: ['法律法规', '操作指南', '案例分析', '培训教材'], required: true },
          { name: 'tags', label: '标签', type: 'text', required: false },
          { name: 'description', label: '材料描述', type: 'textarea', required: false },
          { name: 'targetRole', label: '适用角色', type: 'checkbox', required: true },
          { name: 'file', label: '文件上传', type: 'file', required: true }
        ]
      },
      { 
        id: 'training-video', 
        name: '视频课程', 
        category: '培训学习',
        columns: ['课程ID', '课程名称', '讲师', '时长', '章节数', '学习人数', '完成率', '评分', '状态', '发布时间'],
        fields: [
          { name: 'courseName', label: '课程名称', type: 'text', required: true },
          { name: 'teacher', label: '讲师', type: 'text', required: true },
          { name: 'category', label: '课程分类', type: 'select', options: ['基础培训', '进阶培训', '专项培训', '认证课程'], required: true },
          { name: 'duration', label: '课程时长(分钟)', type: 'number', required: true },
          { name: 'credit', label: '学分', type: 'number', required: true },
          { name: 'description', label: '课程简介', type: 'textarea', required: false },
          { name: 'targetRole', label: '适用角色', type: 'checkbox', required: true },
          { name: 'video', label: '视频文件', type: 'file', required: true },
          { name: 'cover', label: '课程封面', type: 'file', required: false }
        ]
      },
      { 
        id: 'log-list', 
        name: '操作日志', 
        category: '审计日志',
        columns: ['日志ID', '操作人', '操作类型', '操作模块', '操作内容', 'IP地址', '操作结果', '操作时间'],
        fields: []
      }
    ]
  },
  'producer': {
    name: '生产商/代理商',
    icon: 'industry',
    color: 'blue',
    menus: [
      { 
        id: 'brand-list', 
        name: '品牌列表', 
        category: '品牌管理',
        columns: ['品牌ID', '品牌名称', '商标注册号', '品牌类别', '注册地', '授权渠道数', '巡查任务数', '状态', '创建时间'],
        fields: [
          { name: 'brandName', label: '品牌名称', type: 'text', required: true },
          { name: 'trademark', label: '商标注册号', type: 'text', required: true },
          { name: 'category', label: '品牌类别', type: 'select', options: ['服装鞋帽', '食品饮料', '电子产品', '日用百货', '化妆品', '家居用品'], required: true },
          { name: 'region', label: '注册地', type: 'text', required: true },
          { name: 'owner', label: '品牌所有人', type: 'text', required: true },
          { name: 'creditCode', label: '统一社会信用代码', type: 'text', required: false },
          { name: 'contact', label: '联系人', type: 'text', required: true },
          { name: 'phone', label: '联系电话', type: 'tel', required: true },
          { name: 'email', label: '电子邮箱', type: 'email', required: false },
          { name: 'website', label: '官方网站', type: 'url', required: false },
          { name: 'address', label: '公司地址', type: 'text', required: false },
          { name: 'description', label: '品牌介绍', type: 'textarea', required: false },
          { name: 'logo', label: '品牌LOGO', type: 'file', required: true },
          { name: 'certificate', label: '商标注册证', type: 'file', required: true },
          { name: 'license', label: '营业执照', type: 'file', required: false }
        ]
      },
