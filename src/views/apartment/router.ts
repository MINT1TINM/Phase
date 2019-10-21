import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/apartment/Estate.vue'),
      children: [
        {
          path: '/:estateID',
          component: () => import('@/views/apartment/Unit.vue'),
          children: [
            {
              path: '/:estateID/:unitID',
              component: () => import('@/views/apartment/Config.vue'),
            }
          ]
        }
      ]
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
