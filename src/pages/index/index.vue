<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <span class="inner-text">管理平台</span>
          </div>
        </Menu>
      </Header>
      <Layout style="padding: 0px 50px;">
        <Breadcrumb style="margin: 16px 0px;">
          <BreadcrumbItem to="/">Home</BreadcrumbItem>
          <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
          <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">

          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu ref="menu" width="auto">

                <MenuGroup title="管理平台">
                  <MenuItem :name="0">
                  <Icon type="md-home" />首页
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="预约管理">
                  <MenuItem :name="1">
                  <Icon type="ios-calendar-outline" />预约估价
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="装修管理">
                  <MenuItem :name="2">
                  <Icon type="md-cube" />房间项
                  </MenuItem>
                  <MenuItem :name="3">
                  <Icon type="ios-construct" />施工项
                  </MenuItem>
                  <MenuItem :name="4">
                  <Icon type="md-outlet" />产品项
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="员工管理">
                  <MenuItem :name="5">
                  <Icon type="md-people" />公司管理
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="后台功能">
                  <MenuItem :name="6">
                  <Icon type="md-chatboxes" />平台消息
                  </MenuItem>
                  <MenuItem :name="7">
                  <Icon type="ios-paper-plane" />轮播管理
                  </MenuItem>
                  <MenuItem :name="8">
                  <Icon type="ios-document" />公式文档
                  </MenuItem>
                  <MenuItem :name="9">
                  <Icon type="ios-lock" />密码修改
                  </MenuItem>
                </MenuGroup>
              </Menu>
            </Sider>
            <Content :style="{padding: '5px 24px 80px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>

      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.layout {
  position: relative;
  min-width: 1100px;
  background: #f5f7f9;

  > .ivu-layout {
    display: flex;
    flex: auto;
    flex-direction: column;
    background: #f5f7f9;
    > .ivu-layout-header {
      > .ivu-menu {
        display: flex;

        height: 64px;
        line-height: 64px;
        > .layout-logo {
          display: inline-block;
          height: 64px;
          vertical-align: middle;

          > .inner-text {
            display: inline-block;
            margin: 20px 0 20px 10px;
            padding: 0 5px;
            background-color: rgba(0, 0, 0, 0.2);
            color: #fff;
            line-height: 22px;
            height: 22px;
            border-radius: 2px;
            vertical-align: middle;
          }
        }
        > .layout-nav {
          width: 240px;
        }
      }
    }
  }

  .layout-footer-center {
    text-align: center;
  }
}
</style>
