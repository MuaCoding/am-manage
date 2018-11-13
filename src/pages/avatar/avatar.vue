<template>
    <div class="setting-avatar">
        <h1 class="page-title">修改头像</h1>
        <div class="avatar-wrap">
            <div class="current-avatar">
                <p>当前用户头像</p>
                <div class="img-wrap">
                    <img src="" alt="">
                </div>
                <Button type="success" size="large">修改头像</Button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            userinfo: {}
        }
    },
    mounted(){
      this.userinfo = this.$route.params.userinfo;
      console.log(this.userinfo)
    },
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.setting-avatar {
  > .avatar-wrap {
    padding: 50px 0;
    background-color: #f8f8f9;
    border: 1px solid #e9eaec;
    text-align: center;

    > .current-avatar {
      width: 250px;
      display: inline-block;

      > p {
        font-size: 16px;
        margin-bottom: 20px;
      }

      > .img-wrap {
        margin-bottom: 20px;
        width: 250px;
        height: 250px;
        border-radius: 125px;
        background-color: #737d94;
        overflow: hidden;

        > img {
          height: 100%;
        }
      }
    }
  }
}
</style>
