// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "home",
        component: () => import("../views/home/index.vue"),
        name: "Home",
      },
      {
        path: "article",
        component: () => import("../views/article/index.vue"),
        name: "Article",
      },
      {
        path: "log",
        component: () => import("../views/log/index.vue"),
        name: "Log",
      },
      {
        path: "note",
        component: () => import("../views/note/index.vue"),
        name: "Note",
      },
      {
        path: "about",
        component: () => import("../views/about/index.vue"),
        name: "About",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
