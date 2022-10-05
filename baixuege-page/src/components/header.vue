<script setup>
import myDrawer from './drawer.vue';
import { MenuOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const $router = useRouter();
const toHome = function () {
  $router.push('/home');
};
let visible = ref(false);
const openDrawer = () => {
  visible.value = !visible.value;
};
const toPage = url => {
  // $router.push({ path: url });
  visible.value = false;
};

const toAdmin = () => {
  window.open('http://admin.yangliuyi.top');
};
</script>

<template>
  <header class="header">
    <div class="container wrap">
      <div class="avatar" @click="toHome">杨柳依依</div>
      <menu-outlined class="menu-icon hide-menu-icon" @click="openDrawer" />
      <ul class="menu show-menu">
        <li class="menu-item">
          <router-link to="/home">首页</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/article">文章</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/say">说说</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/about">关于</router-link>
        </li>
        <li class="menu-item">
          <div class="admin" @click="toAdmin">
            <setting-outlined />
          </div>
        </li>
      </ul>
    </div>
  </header>
  <myDrawer v-model:visible="visible">
    <ul class="phone-menu" @click="toPage('home')">
      <li class="phone-menu-item">
        <router-link to="/home">首页</router-link>
      </li>
      <li class="phone-menu-item">
        <router-link to="/article">文章</router-link>
      </li>
      <li class="phone-menu-item">
        <router-link to="/say">说说</router-link>
      </li>
      <li class="phone-menu-item">
        <router-link to="/about">关于</router-link>
      </li>
    </ul>
  </myDrawer>
</template>

<style lang="less" scoped>
.header {
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 56px;
  box-shadow: 0 0 18px #000;
  background-color: #22292d;

  .wrap {
    padding: 0 16px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    .avatar {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
      color: #fff;
    }

    .menu-icon {
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }

    .menu {
      height: 100%;
      display: none;
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
          color: #00bfa6;
          font-weight: 600;
        }

        &:hover {
          background-color: #666;
        }
      }
    }
  }
}

.phone-menu {
  .phone-menu-item {
    height: 40px;
    cursor: pointer;

    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: #000;
    }

    .router-link-active {
      color: #00bfa6;
      font-weight: 600;
    }

    // &:hover {
    //   background-color: #666;
    // }
  }
}
</style>
