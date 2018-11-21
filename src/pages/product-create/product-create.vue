<template>
  <div>
    <h1 class="page-title">新增产品项</h1>
    <div class="edit-content"></div>
  </div>
</template>

<script>
  export default {
    name: "productCreate",
    data() {
    },
    methods: {},
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .ivu-layout-content {
    h1 {
      &.page-title {
        line-height: 40px;
        overflow: hidden;
        margin-bottom: 20px;
      }
    }
  }

  .edit-content {
    margin-top: 15px;
    background-color: #f7f8f9;
    padding: 35px 25px;
  }
</style>
