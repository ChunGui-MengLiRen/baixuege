<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons-vue";
import myDrawer from "./drawer.vue";
import { getMenu } from "../api/index";

const $router = useRouter();

// 抽屉显隐
let visible = ref(false);
// 菜单列表
let menuList = ref([]);

// 获取菜单
const getMenuData = async () => {
  try {
    const res = await getMenu();
    if (res.status == "1") {
      console.log(res);
      menuList.value = res.data;
    } else {
      message.error("获取菜单失败！");
    }
  } catch (error) {
    message.error("获取菜单失败！");
  }
};
getMenuData();

// 移动端打开菜单抽屉
const openDrawer = () => {
  visible.value = !visible.value;
};

// 跳转首页
const toHome = function () {
  $router.push("/home");
};

// 跳转后台管理
const toAdmin = () => {
  window.open("http://admin.yangliuyi.top");
};
</script>

<template>
  <header class="header">
    <div class="container wrap">
      <div class="avatar" @click="toHome">杨柳依依</div>
      <menu-outlined class="menu-icon hide-menu-icon" @click="openDrawer" />
      <ul class="menu show-menu">
        <li class="menu-item" v-for="item in menuList" :key="item.id">
          <router-link :to="item.menu_router">{{ item.menu_name }}</router-link>
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
    <ul class="phone-menu" @click="visible = false">
      <li class="phone-menu-item" v-for="item in menuList" :key="item.id">
        <router-link :to="item.menu_router">{{ item.menu_name }}</router-link>
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
  }
}
</style>
