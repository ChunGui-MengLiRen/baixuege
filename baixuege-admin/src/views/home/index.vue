<script setup>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values) => {
  console.log("Success:", values);
  if (values.username == "admin" && values.password == "123456") {
    $router.push("/");
  }
};
</script>

<template>
  <div>主页</div>
</template>

<style lang="less" scoped></style>
