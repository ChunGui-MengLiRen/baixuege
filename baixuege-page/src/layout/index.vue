<script setup>
import { useRouter } from "vue-router";
const $router = useRouter();
const toHome = function () {
  $router.push({ path: "home" });
};
</script>

<template>
  <header class="header">
    <div class="container wrap">
      <div class="avatar" @click="toHome">杨柳依依</div>
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/home">首页</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/article">文章</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/log">日志</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/note">随笔</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/about">关于</router-link>
        </li>
      </ul>
    </div>
  </header>
  <main class="main">
    <router-view />
  </main>
</template>

<style lang="less" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 56px;
  box-shadow: 0 0 18px #000;
  background-color: rgba(0, 0, 0, 0.85);

  .wrap {
    padding: 0 40px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .avatar {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
      color: #fff;
    }
    .menu {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

      .menu-item {
        width: 80px;
        height: 100%;
        line-height: 56px;
        text-align: center;
        cursor: pointer;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #fff;
          text-decoration: none;
        }
        .router-link-active {
          background-color: #333;
        }

        &:hover {
          background-color: #666;
        }
      }
    }
  }
}

.main {
  // height: 100vh;
  // height: calc(100vh - 56px);
}

.footer {
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 32px 0;
}
</style>
