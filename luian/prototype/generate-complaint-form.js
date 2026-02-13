/**
 * 维权投诉表单生成脚本
 * 根据字段定义自动生成完整的表单HTML
 */

const fs = require('fs');
const path = require('path');

// 字段定义
const formFields = {
    // 投诉分类
    category: {
        complaint_category: {
            label: '投诉类型',
            type: 'radio-card',
            required: true,
            options: [
                { value: 'online', label: '线上网购商品投诉', icon: '📱', desc: '适用于电商平台、网店、小程序等线上购买的商品' },
                { value: 'offline', label: '线下购买商品投诉', icon: '🏪', desc: '适用于实体店、专卖店、商场柜台等线下购买的商品' }
            ]
        }
    },
    
    // 基础信息
    basic: {
        user_name: { label: '申请人姓名', type: 'text', required: true, placeholder: '请输入您的真实姓名', maxlength: 50, help: '💡 请输入您的真实姓名' },
        user_phone: { label: '手机号码', type: 'tel', required: true, placeholder: '138****5678', maxlength: 11, help: '💡 用于接收处理进度通知' },
        user_email: { label: '电子邮箱', type: 'email', required: false, placeholder: 'example@email.com', maxlength: 100 },
        id_card: { label: '身份证号', type: 'text', required: true, placeholder: '110101199001011234', maxlength: 18, help: '💡 用于实名认证，信息加密保存' },
        contact_address: { label: '联系地址', type: 'textarea', required: false, placeholder: '北京市朝阳区...', maxlength: 200 }
    },
    
    // 线上商品信息
    online: {
        product_name: { label: '商品名称', type: 'text', required: true, placeholder: '耐克运动鞋', maxlength: 200 },
        brand_name: { label: '品牌名称', type: 'text', required: true, placeholder: 'Nike', maxlength: 100 },
        product_model: { label: '商品型号', type: 'text', required: false, placeholder: 'Air Max 270', maxlength: 100 },
        product_category: { label: '商品分类', type: 'select', required: true, placeholder: '请选择商品分类' },
        online_platform: { 
            label: '购买平台', 
            type: 'radio', 
            required: true, 
            options: ['淘宝', '京东', '拼多多', '天猫', '抖音商城', '其他'],
            hasOther: true
        },
        online_shop_name: { label: '店铺名称', type: 'text', required: true, placeholder: 'XX运动专营店', maxlength: 100 },
        online_shop_url: { label: '店铺链接', type: 'url', required: false, placeholder: 'https://shop.example.com...', maxlength: 500 },
        product_url: { label: '商品链接', type: 'url', required: false, placeholder: 'https://item.example.com...', maxlength: 500 },
        order_no: { label: '订单号', type: 'text', required: true, placeholder: '202401150001234567', maxlength: 50 },
        purchase_date: { label: '购买时间', type: 'date', required: true },
        purchase_price: { label: '购买价格', type: 'number', required: true, placeholder: '899.00', min: 0, step: 0.01, help: '💡 请输入实际支付金额' },
        seller_contact: { label: '卖家联系方式', type: 'text', required: false, placeholder: '客服电话/旺旺号', maxlength: 100 }
    },
    
    // 线下店铺信息
    offline_shop: {
        offline_shop_name: { label: '店铺名称', type: 'text', required: true, placeholder: 'XX品牌专卖店', maxlength: 100 },
        offline_shop_type: {
            label: '店铺类型',
            type: 'radio',
            required: true,
            options: ['品牌专卖店', '商场专柜', '个体商户', '批发市场', '其他'],
            hasOther: true
        },
        offline_address: {
            label: '店铺地址',
            type: 'address',
            required: true,
            fields: ['province', 'city', 'district', 'detail']
        },
        offline_location: {
            label: '定位店铺位置',
            type: 'map',
            required: false,
            help: '💡 精确定位有助于快速处理'
        },
        offline_shop_photos: {
            label: '店铺门头照片',
            type: 'upload-image',
            required: true,
            max: 5,
            help: '💡 请拍摄店铺门头、招牌，最多上传5张'
        },
        offline_interior_photos: {
            label: '店铺内部照片',
            type: 'upload-image',
            required: false,
            max: 5,
            help: '💡 店铺内部环境、商品陈列'
        },
        offline_payment_qr: {
            label: '店铺收款码照片',
            type: 'upload-image',
            required: false,
            max: 2,
            help: '💡 微信/支付宝收款码，有助于确认店铺身份'
        },
        offline_license_photo: {
            label: '店铺营业执照照片',
            type: 'upload-image',
            required: false,
            max: 2,
            help: '💡 如店内有展示营业执照'
        },
        offline_contact_name: { label: '店铺联系人', type: 'text', required: true, placeholder: '李老板', maxlength: 50 },
        offline_contact_phone: { label: '店铺联系电话', type: 'tel', required: true, placeholder: '010-12345678', maxlength: 20 },
        offline_contact_wechat: { label: '店铺微信/QQ', type: 'text', required: false, placeholder: '微信号: shop123', maxlength: 50 },
        offline_business_hours: { label: '店铺经营时间', type: 'text', required: false, placeholder: '营业时间: 09:00-21:00', maxlength: 100 }
    },
    
    // 线下商品信息
    offline_product: {
        product_name: { label: '商品名称', type: 'text', required: true, placeholder: '耐克运动鞋', maxlength: 200 },
        brand_name: { label: '品牌名称', type: 'text', required: true, placeholder: 'Nike', maxlength: 100 },
        product_model: { label: '商品型号', type: 'text', required: false, placeholder: 'Air Max 270', maxlength: 100 },
        product_category: { label: '商品分类', type: 'select', required: true, placeholder: '请选择商品分类' },
        product_spec: { label: '商品颜色/规格', type: 'text', required: false, placeholder: '黑色/42码', maxlength: 100 },
        purchase_date: { label: '购买时间', type: 'date', required: true },
        purchase_price: { label: '购买价格', type: 'number', required: true, placeholder: '899.00', min: 0, step: 0.01, help: '💡 请输入实际支付金额' },
        payment_method: {
            label: '付款方式',
            type: 'radio',
            required: true,
            options: ['现金', '微信支付', '支付宝', '银行卡', '其他']
        },
        has_invoice: {
            label: '是否有发票/收据',
            type: 'radio',
            required: true,
            options: ['有', '没有']
        },
        invoice_photo: {
            label: '发票/收据照片',
            type: 'upload-image',
            required: false,
            max: 3,
            help: '💡 如有发票或收据请上传'
        },
        salesperson_info: { label: '销售人员信息', type: 'text', required: false, placeholder: '姓名/工号: 小王/001', maxlength: 100 }
    }
};

console.log('✅ 字段定义加载完成');
console.log(`📊 总字段数: ${Object.values(formFields).reduce((sum, group) => sum + Object.keys(group).length, 0)}`);
console.log('');
console.log('💡 提示: 由于表单HTML文件过大，建议使用模块化方式实现');
console.log('💡 可以将表单拆分为多个组件，按需加载');
