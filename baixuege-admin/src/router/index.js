// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    name: 'Login',
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
        name: 'Home',
      },
      {
        path: 'article',
        component: () => import('../views/article/index.vue'),
        name: 'Article',
      },
      {
        path: 'article/add',
        component: () => import('../views/article/add.vue'),
        name: 'AddArticle',
      },
      {
        path: 'article/update',
        component: () => import('../views/article/update.vue'),
        name: 'UpdateArticle',
      },
      {
        path: 'say',
        component: () => import('../views/say/index.vue'),
        name: 'Say',
      },
      {
        path: 'about',
        component: () => import('../views/about/index.vue'),
        name: 'About',
      },
      {
        path: 'about/update',
        component: () => import('../views/about/update.vue'),
        name: 'UpdateAbout',
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
