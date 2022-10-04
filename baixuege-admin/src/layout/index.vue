<template>
  <a-layout class="layout-container">
    <a-layout-header class="header">
      <div class="title">杨柳依依</div>
      <div class="login">
        <!-- <img src="../assets/bing_img.jpg" class="logo" alt="" /> -->
        <a-button type="link" danger @click="logout">退出</a-button>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
          @select="select"
        >
          <a-menu-item key="home">首页</a-menu-item>
          <a-menu-item key="article">文章</a-menu-item>
          <a-menu-item key="say">说说</a-menu-item>
          <a-menu-item key="about">关于</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb> -->
        <a-layout-content
          :style="{
            background: '#f0f0f0',
            minHeight: '280px'
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons-vue';
import { ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();
let breadcrumbList = ref(['home']);
console.log(toRaw($route).path.value);
let selectedKeys = ref([toRaw($route).path.value.split('/')[1]]);
const select = value => {
  console.log(value);
  breadcrumbList.value = value.key.split('/').filter(item => item);
  $router.push(value.key);
};
const logout = () => {
  $router.push('/login');
  localStorage.removeItem('BAIXUEGE_TOKEN');
};
</script>
<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;

    .title {
      font-size: 24px;
      color: #fff;
      font-weight: 600;
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}

.site-layout-background {
  background: #fff;
}
</style>
