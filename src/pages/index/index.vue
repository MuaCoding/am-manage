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
      <Content>
        <router-view></router-view>
      </Content>
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
