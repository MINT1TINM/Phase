import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/bill/Query.vue')
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     next({ path: '/all' });
//   }
//   next();
// });

export default router;
