<template>
    <div class="root">
        <div>

            <div class="login-panel">
                <h1>管理平台登录</h1>
                <Form >
                    <FormItem>
                        <Input size="large" clearable placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem>
                        <Input size="large" clearable placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem class="btn-group">
                        <Button size="large" icon="md-checkmark" type="primary" @click="handleSubmit('formCustom')">登录</Button>
                        <Button size="large" icon="md-refresh" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        passward: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        passward: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      }
    };
  }
};
</script>


<style scoped lang="scss" rel="stylesheet/scss">
.login-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 25px 40px 15px 40px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -80%);

  > h1 {
    line-height: 50px;
    text-align: center;
  }
  > form {
    padding-top: 15px;
    .btn-group {
      text-align: center;
    }
  }
}
</style>