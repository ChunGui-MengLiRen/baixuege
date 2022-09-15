// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    // children: [...mine, ...zichan],
  },
  // {
  //   path: '/login',
  //   component: () => import('../views/login'),
  // },
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('../views/404.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
