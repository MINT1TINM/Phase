import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/project',
      meta: '凭证',
      component: () => import('@/views/finance/SearchProject.vue')
    },
    {
      path: '/subject',
      meta: '凭证',
      component: () => import('@/views/finance/SearchSubject.vue')
    },
    {
      path: '/certificate',
      meta: '凭证',
      component: () => import('@/views/finance/SearchCertificate.vue')
    },
    {
      path: '/project/:projectCode/:staffNo',
      meta: '凭证',
      component: () => import('@/views/finance/Account.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ path: '/project' });
  }
  next();
});

export default router;
