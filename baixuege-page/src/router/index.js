// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
        name: 'Home'
      },
      {
        path: 'article',
        component: () => import('../layout/index.vue'),
        name: 'Article',
        redirect: 'article/list',
        children: [
          {
            path: 'list',
            component: () => import('../views/article/index.vue'),
            name: 'ArticleList'
          },
          {
            path: 'detail',
            component: () => import('../views/article/detail.vue'),
            name: 'ArticleDetail'
          }
        ]
      },
      {
        path: 'say',
        component: () => import('../views/say/index.vue'),
        name: 'Say'
      },
      {
        path: 'about',
        component: () => import('../views/about/index.vue'),
        name: 'About'
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
