<script setup>
import { defineComponent, reactive } from "vue";
import { login } from "../../api/login.js"
import { useRouter } from "vue-router";
const $router = useRouter();
const formState = reactive({
  username: "admin",
  password: "123456",
});
const onFinish = async (values) => {
  console.log("Success:", values);
  const res = await login({
    username: values.username,
    password: values.password,
  })
  if (res.status == '1') {
    localStorage.setItem('BAIXUEGE_TOKEN', res.data.token)
    $router.push("/");
  }
};
</script>

<template>
  <section class="login">
    <div class="login-form">
      <h2>后台管理系统</h2>
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入账号' }]">
          <a-input v-model:value="formState.username" placeholder="请输入账号" />
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item style="text-align: right">
          <a-button>重置</a-button>
          <a-button type="primary" html-type="submit" style="margin-left: 10px">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 400px;
    height: 240px;
    background-color: #fff;
    padding: 24px;
    border-radius: 12px;

    h2 {
      text-align: center;
    }
  }
}
</style>
