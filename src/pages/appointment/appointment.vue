<template>
  <div class="appointment-list">
    <h1 class="page-title">预约估价</h1>
    <div class="action-bar clearfix">
      <div class="bar-left">
        <p style="line-height: 36px;font-size: 14px;color: rgb(170, 170, 170);">
          <Icon type="ios-alert" />
          <span>暂无可操作功能</span>
        </p>
      </div>
      <div class="bar-right">
        <div>
          <Select style="width:100px" size="large">
            <Option value="1">客户姓名</Option>
            <Option value="2">型号2</Option>
          </Select>
        </div>
        <div>
          <Select filterable size="large" style="width:200px" v-if="false">
            <!-- <Option></Option> -->
          </Select>
          <Input size="large" placeholder="large size" style="width:200px" />
        </div>
        <Button type="primary" size="large">
          <Icon type="ios-search" /></Button>
      </div>
    </div>

    <div>
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~common/scss/common.scss";

.ivu-layout-content {
  h1 {
    &.page-title {
      line-height: 40px;
      overflow: hidden;
      margin-bottom: 20px;
    }
  }
}

.appointment-list {
  > .action-bar {
    margin-bottom: 30px;
    width: 100%;

    .bar-left {
      float: left;
    }
    .bar-right {
      float: right;

      > div {
        float: left;
        margin-left: 5px;
      }

      > button {
        float: left;
        margin-left: 5px;
      }
    }
  }
}
</style>

