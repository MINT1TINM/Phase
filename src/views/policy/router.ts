import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/explore',
      component: () => import('@/views/policy/Explore.vue')
    },
    {
      path: '/explore/:search',
      component: () => import('@/views/policy/Result.vue')
    },
    {
      path: '/info/:id',
      component: () => import('@/views/policy/Info.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ path: '/explore' });
  }
  next();
});

export default router;
