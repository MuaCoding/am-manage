export let breadCrumbs = [{
  name: "首页",
  value: "index",
  router: "index"
}, {
  name: "预约管理",
  value: "appointment",
  router: "appointmentList",
  children: [{
    name: "预约详情",
    value: "detail",
    router: "appointmentDetail"
  }]
}, {
  name: "施工项管理",
  value: "construct",
  router: "constructList",
  children: [{
    name: "施工项产品关联",
    value: "manage",
    router: "constructManage"
  }]
}, {
  name: "房间项管理",
  value: "room",
  router: "roomList",
  children: [{
    name: "房间施工项关联",
    value: "manage",
    router: "roomManage"
  }]
}, {
  name: "产品项管理",
  value: "product",
  router: "product",
  children: [{
    name: "新增产品项",
    value: "create",
    router: "productCreate"
  }, {
    name: "编辑产品项",
    value: "edit",
    router: "productEdit"
  }, {
    name: "管理价格",
    value: "price",
    router: "productPrice"
  }]
}, {
  name: "公司管理",
  value: "company",
  router: "companyList",
  children: [{
    name: "测量员管理",
    value: "surveyor",
    router: "companySurveyor"
  }]
}, {
  name: "平台消息",
  value: "message",
  router: "messageList",
  children: [{
    name: "发布新信息",
    value: "add",
    router: "messageAdd"
  }]
}, {
  name: "密码修改",
  value: "password",
  router: "settingPassword"
}, {
  name: "轮播管理",
  value: "banner",
  router: "settingBanner"
}, {
  name: "公式文档",
  value: "formula",
  router: "settingFormula"
}, {
  name: "修改头像",
  value: "avatar",
  router: "settingAvatar"
}];
