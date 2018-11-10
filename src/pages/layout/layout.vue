<template>
  <div class="layout">

    <Layout>
      <headerBar></headerBar>
      <!-- <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <span class="inner-text">管理平台</span>
          </div>
        </Menu>
      </Header> -->

      <Layout style="padding: 0px 50px;">

        <Breadcrumb style="margin: 16px 0px;">
          <BreadcrumbItem>管理平台</BreadcrumbItem>
          <BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
        </Breadcrumb>

        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">

          <Layout>

            <Sider hide-trigger :style="{background: '#fff'}">

              <Menu ref="menu" width="auto" :active-name="$route.name" @on-select="routeTo">

                <MenuGroup title="管理平台">

                  <MenuItem name="index">
                  <Icon type="md-home" />首页
                  </MenuItem>

                </MenuGroup>

                <MenuGroup title="预约管理">

                  <MenuItem name="appointment">
                  <Icon type="ios-calendar-outline" />预约估价
                  </MenuItem>

                </MenuGroup>

                <MenuGroup title="装修管理">

                  <MenuItem name="room">
                  <Icon type="md-cube" />房间项
                  </MenuItem>

                  <MenuItem name="construct">
                  <Icon type="ios-construct" />施工项
                  </MenuItem>

                  <MenuItem name="product">
                  <Icon type="md-outlet" />产品项
                  </MenuItem>

                </MenuGroup>

                <MenuGroup title="员工管理">

                  <MenuItem name="company">
                  <Icon type="md-people" />公司管理
                  </MenuItem>

                </MenuGroup>

                <MenuGroup title="后台功能">

                  <MenuItem name="message">
                  <Icon type="md-chatboxes" />平台消息
                  </MenuItem>

                  <MenuItem name="banner">
                  <Icon type="ios-paper-plane" />轮播管理
                  </MenuItem>

                  <MenuItem name="formula">
                  <Icon type="ios-document" />公式文档
                  </MenuItem>

                  <MenuItem name="password">
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
 
import headerBar from 'components/header-bar.vue';

export default {
  name: "app",

  data() {
    return {
      activeName: "index"
    };
  },
  mounted() {
  },
  methods: {
    routeTo(e) {
      this.$router.push("/app/" + e);
    }
  },
  components: {
    headerBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
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

        > .layout-nav {
          width: 240px;
        }
      }
    }
  }
}

.ivu-layout-content {
  h1 {
    &.page-title {
      line-height: 40px;
      overflow: hidden;
      margin-bottom: 20px;
    }
  }
}
</style>
