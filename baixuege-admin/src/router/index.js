// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
    name: "Login",
  },
  //   {
  //     path: "/",
  //     redirect: "/home",
  //     component: () => import("../layout/index.vue"),
  //     children: [
  //       {
  //         path: "home",
  //         component: () => import("../views/home/index.vue"),
  //         name: "Home",
  //       },
  //     ],
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
