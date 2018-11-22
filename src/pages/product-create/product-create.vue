<template>
  <div>
    <h1 class="page-title">新增产品项</h1>
    <div class="edit-content">
      <Form autocomplete="off" ref="createForm" :model="createForm" :rules="createRules" :label-width="80">
        <FormItem label="产品名称" prop="name">
          <Input type="text" v-model="createForm.name" size="large" clearable placeholder="请输入用户名"
                 autocomplete="off"></Input>
        </FormItem>
        <!--<FormItem prop="password">-->
          <!--<Input type="password" v-model="loginForm.password" size="large" clearable placeholder="请输入密码"-->
                 <!--autocomplete="on" @keyup.enter.native="handleSubmit('loginForm')"></Input>-->
        <!--</FormItem>-->
        <FormItem class="btn-group">
          <Button size="large" icon="md-checkmark" type="primary" @click="handleSubmit('loginForm')">登录</Button>
          <Button size="large" icon="md-refresh" @click="handleReset('loginForm')" style="margin-left: 8px">重置
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "productCreate",
    data() {
      return{
        createForm:{
          name: '',
        },
        createRules:{
          name: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
        },
      }
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
