<template>
    <Header>
        <div class="site-logo">
            <span class="inner-text">管理平台</span>
        </div>
        <div class="user-info">
            <div class="user-avatar" @click="linkAction">
                <img ref="avatar" :src="userinfo.avatar" alt="">
            </div>
            <span :title="'用户类型：'+userinfo.identity_name" class="user-name">{{userinfo.account | upper}}</span>
            <a class="exit-link">退出</a>
        </div>
    </Header>
</template>

<script>
import { queryUserInfo } from "../../server/commonServices";
import { ERR_OK } from "../../server/configServices";

export default {
    props: [
        'userinfo'
    ],
    data(){
        return{
        }
    },
    filters: {
        upper: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.toUpperCase();
        }
    },
    methods: {
        linkAction() {
            this.$router.push({name: "avatar",params: {userinfo: this.userinfo}});
        },
    },

}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.layout {
  > .ivu-layout {
    > .ivu-layout-header {
      > .site-logo {
        float: left;
        height: 64px;
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

      > .user-info {
        float: right;
        height: 64px;
        line-height: 64px;
        > .user-avatar {
          display: inline-block;
          height: 30px;
          width: 30px;
          line-height: 25px;
          border-radius: 15px;
          overflow: hidden;
          vertical-align: middle;
          background: url('../../assets/error.png') 50% no-repeat, #737d94;
          cursor: pointer;

          img {
            height: 100%;
            width: 100%;
          }
        }

        > .user-name {
          color: #fff;
          padding-left: 5px;
          vertical-align: middle;
        }
        > .exit-link {
          color: #fff;
          padding-left: 15px;
          margin-left: 15px;
          border-left: 1px solid rgba(0, 0, 0, 0.2);
          vertical-align: middle;

          &:hover {
            color: #2d8cf0;
          }
        }
      }
    }
  }
}
</style>

