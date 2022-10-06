<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { login } from '../../api/login.js';
import { useRouter } from 'vue-router';
const $router = useRouter();

// 账号、密码
const formState = ref({
  username: '',
  password: ''
});

// 登录
const onFinish = async values => {
  try {
    const res = await login({
      username: values.username,
      password: values.password
    });
    if (res.status == '1') {
      // 登录成功 存储 token 到本地
      localStorage.setItem('BAIXUEGE_TOKEN', res.data.token);
      // 登录成功 跳转到首页
      $router.push('/');
    } else {
      message.warning(res.message);
    }
  } catch (error) {
    message.error(error);
  }
};

// 重置
const reset = () => {
  formState.value = {
    username: '',
    password: ''
  };
};
</script>

<template>
  <section class="login">
    <div class="login-form">
      <h2>后台管理系统</h2>
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input
            v-model:value="formState.username"
            placeholder="请输入账号"
          />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item style="text-align: right">
          <a-button @click="reset">重置</a-button>
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
