export default [
  {
    path: '/',
    component: () => import('@/views/Landing.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/wechat/login',
    component: () => import('@/views/login/WechatLogin.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/Home.vue'),
  },
];
