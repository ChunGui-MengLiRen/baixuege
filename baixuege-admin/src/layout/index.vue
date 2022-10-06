<template>
  <a-layout class="layout-container">
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="layout-sider"
      :trigger="null"
      collapsible
    >
      <div v-if="collapsed" class="logo-image">
        <img src="../assets/bing_img.jpg" alt="" />
      </div>
      <div v-else class="logo">杨柳依依</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        :style="{ height: 'calc(100% - 56px)', borderRight: 0 }"
        @select="select"
      >
        <a-menu-item key="home">
          <template #icon>
            <home-outlined />
          </template>
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="article">
          <template #icon>
            <read-outlined />
          </template>
          <span>文章</span>
        </a-menu-item>
        <a-menu-item key="say">
          <template #icon>
            <comment-outlined />
          </template>
          <span>说说</span>
        </a-menu-item>
        <a-menu-item key="about">
          <template #icon>
            <user-outlined />
          </template>
          <span>关于</span>
        </a-menu-item>
        <a-menu-item key="type">
          <template #icon>
            <paper-clip-outlined />
          </template>
          <span>类型</span>
        </a-menu-item>
        <a-menu-item key="tags">
          <template #icon>
            <tags-outlined />
          </template>
          <span>标签</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <logout-outlined class="logout" @click="logout" />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  HomeOutlined,
  ReadOutlined,
  CommentOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  TagsOutlined,
  PaperClipOutlined
} from '@ant-design/icons-vue';
import { ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

// 菜单折叠
let collapsed = ref(false);

// 设置当前选中的菜单
let selectedKeys = ref([toRaw($route).path.value.split('/')[1]]);

// 菜单改变
const select = value => {
  console.log(value);
  $router.push(value.key);
};

// 退出登录
const logout = () => {
  // 跳转登录页
  $router.push('/login');
  // 清除本地 token
  localStorage.removeItem('BAIXUEGE_TOKEN');
};
</script>
<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .header {
    height: 56px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }

    .logout {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }

    .title {
      font-size: 24px;
      color: #fff;
      font-weight: 600;
    }
  }

  .logo {
    height: 56px;
    line-height: 56px;
    // text-align: center;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    padding: 0 24px;
  }

  .logo-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}

.site-layout-background {
  background: #fff;
}
</style>
