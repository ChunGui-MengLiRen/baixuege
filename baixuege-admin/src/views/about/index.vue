
<template>
  <div class="about">
    <div class="self">
      <div class="action">
        <form-outlined class='icon' @click="update" /> 关于我
      </div>
      <div class="editor">
        <v-md-editor v-model="selfText" mode="preview" height="100%"></v-md-editor>

      </div>
    </div>
    <div class="site">
      <div class="action">
        <form-outlined class='icon' @click="update" /> 关于本站
      </div>
      <div class="editor">
        <v-md-editor v-model="siteText" mode="preview" height="100%"></v-md-editor>
      </div>
    </div>

  </div>
</template>
<script setup>
import { FormOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();
const selfText = ref("## 关于自己")
const siteText = ref("## 关于本站")
const update = () => {
  $router.push('/updateAbout')
}
</script>

<style lang="less" scoped>
.about {
  height: 100%;
  display: flex;
  gap: 24px;

  .self {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .site {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .editor {
    flex: 1;
  }

  .action {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    font-weight: 600;

    .icon {
      font-size: 20px;
      cursor: pointer;
      position: absolute;
      left: 16px;
      top: 10px;
      color: #1890ff
    }
  }


}
</style>
