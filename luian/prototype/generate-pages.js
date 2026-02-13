// 这是一个辅助脚本，用于生成7个PC端后台HTML页面的配置
// 每个页面都符合阿里巴巴前端开发规范和Ant Design设计体系

const pages = {
  'pc-lawyer': {
    title: '律师后台',
    role: '王律师（执业5年+）',
    avatar: 'lawyer',
    indicator: { icon: 'certificate', text: 'CFCA数字证书', color: '#f0f5ff' },
    menus: [
      { id: 'dashboard', icon: 'home', text: '工作台' },
      { id: 'cases', icon: 'briefcase', text: '案件管理', submenu: [
        { id: 'case-list', text: '案件列表' },
        { id: 'case-ip', text: '知识产权案件' },
        { id: 'case-consumer', text: '消费者案件' },
        { id: 'case-evidence', text: '证据链管理' }
      ]},
      { id: 'documents', icon: 'file-alt', text: 'AI文书生成', submenu: [
        { id: 'doc-ai', text: 'AI文书生成' },
        { id: 'doc-review', text: '三级评审' },
        { id: 'doc-sign', text: 'CFCA电子签名' },
        { id: 'doc-archive', text: '文书归档' }
      ]},
      { id: 'supervision', icon: 'eye', text: '督导检查' },
      { id: 'lawyers', icon: 'user-tie', text: '律师管理' },
      { id: 'statistics', icon: 'chart-bar', text: '数据统计' }
    ],
    stats: [
      { icon: 'briefcase', color: 'blue', value: '45', label: '进行中案件', trend: '+5' },
      { icon: 'file-alt', color: 'green', value: '128', label: 'AI生成文书', trend: '准确率95.8%' },
      { icon: 'check-double', color: 'orange', value: '98.2%', label: '证据链完整性', trend: '符合标准' },
      { icon: 'clock', color: 'red', value: '12', label: '待审核文书', trend: '需5日内完成' }
    ],
    compliance: [
      { text: '执业满5年', color: '#2f54eb' },
      { text: '胜诉率≥90%', color: '#52c41a' },
      { text: 'CFCA数字证书', color: '#2f54eb' },
      { text: 'Ukey双因子认证', color: '#2f54eb' }
    ]
  },
  
  'pc-expert': {
    title: '专家后台',
    role: '张专家（高级鉴定师）',
    avatar: 'expert',
    indicator: { icon: 'microscope', text: 'AI辅助鉴定≥95%', color: '#e6fffb' },
    menus: [
      { id: 'dashboard', icon: 'home', text: '工作台' },
      { id: 'appraisal', icon: 'microscope', text: '商品鉴定', submenu: [
        { id: 'appraisal-list', text: '鉴定任务' },
        { id: 'appraisal-ai', text: 'AI辅助鉴定' },
        { id: 'appraisal-report', text: '鉴定报告' },
        { id: 'appraisal-sample', text: '样品库' }
      ]},
      { id: 'consulting', icon: 'comments', text: '专业咨询' },
      { id: 'academy', icon: 'graduation-cap', text: '品牌学院' },
      { id: 'quality', icon: 'shield-check', text: '质量监督' },
      { id: 'standards', icon: 'book', text: '标准制定' },
      { id: 'statistics', icon: 'chart-bar', text: '数据统计' }
    ],
    stats: [
      { icon: 'microscope', color: 'blue', value: '89', label: '待鉴定任务', trend: '+12' },
      { icon: 'check-circle', color: 'green', value: '95.8%', label: 'AI鉴定准确率', trend: '符合标准' },
      { icon: 'graduation-cap', color: 'orange', value: '156', label: '本月培训人次', trend: '+23%' },
      { icon: 'shield-check', color: 'red', value: '98.5%', label: '质量合格率', trend: '+2.3%' }
    ],
    compliance: [
      { text: 'AI辅助鉴定≥95%', color: '#13c2c2' },
      { text: 'SIFT特征点≥1000', color: '#13c2c2' },
      { text: '图像相似度≥85%', color: '#13c2c2' },
      { text: '每月1次培训课程', color: '#52c41a' }
    ]
  },
  
  // 其他页面配置...
};

module.exports = pages;
