
<template>
  <div class="about">
    <div class="self">
      <div class="action">
        <form-outlined class='icon' @click="update('self')" /> 关于我
      </div>
      <div class="editor">
        <v-md-editor v-model="selfText" mode="preview" height="100%"></v-md-editor>
      </div>
    </div>
    <div class="site">
      <div class="action">
        <form-outlined class='icon' @click="update('site')" /> 关于本站
      </div>
      <div class="editor">
        <v-md-editor v-model="siteText" mode="preview" height="100%"></v-md-editor>
      </div>
    </div>

  </div>
</template>
<script setup>
import { getDetail } from "../../api/about"
import { FormOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();
const selfText = ref("")
const siteText = ref("")
const update = (type) => {
  $router.push('/about/update?type=' + type)
}

const getDetailData = async () => {
  const res = await getDetail()
  if (res.status == '1') {
    console.log(res.data);
    selfText.value = res.data[0].self
    siteText.value = res.data[0].site
  }
}

getDetailData()


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
