export let siderMenus = [
  {
    title: "管理平台",
    children: [{
      text: "首页",
      name: "manage",
      icon: "md-home",
      link: "index",
      active: "index"
    }]
  }, {
    title: "预约管理",
    children: [{
      text: "预约估价",
      name: "appointment-list",
      icon: "ios-calendar",
      link: "appointmentList",
      active: "appointment"
    }]
  }, {
    title: "装修管理",
    children: [{
      text: "房间项",
      name: "fitment-room",
      icon: "md-cube",
      link: "roomList",
      active: "room"
    }, {
      text: "施工项",
      name: "fitment-construct",
      icon: "ios-construct",
      link: "constructList",
      active: "construct"
    }, {
      text: "产品项",
      name: "fitment-product",
      icon: "md-outlet",
      link: "productList",
      active: "product"
    }]
  }, {
    title: "员工管理",
    children: [{
      text: "公司管理",
      name: "staff-company",
      icon: "md-people",
      link: "companyList",
      active: "company"
    }]
  }, {
    title: "后台功能",
    children: [{
      text: "平台消息",
      name: "setting-message",
      icon: "md-chatboxes",
      link: "messageList",
      active: "message"
    }, {
      text: "轮播管理",
      name: "setting-banner",
      icon: "ios-paper-plane",
      link: "settingBanner",
      active: "banner"
    }, {
      text: "公式文档",
      name: "setting-formula",
      icon: "ios-document",
      link: "settingFormula",
      active: "formula"
    }, {
      text: "密码修改",
      name: "setting-password",
      icon: "ios-lock",
      link: "settingPassword",
      active: "password"
    }]
  }
]
