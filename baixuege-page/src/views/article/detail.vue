<script setup>
import { ref } from "vue";
import MyFooter from "../../components/footer.vue";
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { getArticleDetail } from "../../api";

const $router = useRouter();
const $route = useRoute();

const baseURL = import.meta.env.VITE_APP_BASE_API;

const detail = ref({});

const getDetail = async () => {
  const res = await getArticleDetail($router.currentRoute.value.query.id);
  if (res.status == "1") {
    console.log(res.data);
    detail.value = res.data[0];
  }
};

getDetail();
</script>

<template>
  <div class="container wrap">
    <v-md-editor v-model="detail.content" mode="preview"></v-md-editor>
  </div>
  <MyFooter />
</template>

<style lang="less" scoped>
.wrap {
  padding: 80px 12px 24px 12px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  min-height: 100vh;
}
</style>
