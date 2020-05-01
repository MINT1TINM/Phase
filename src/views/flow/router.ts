import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/flow/FlowMenu.vue'),
      children: [
        {
          path: '/todo',
          component: () => import('@/views/flow/ApprovalList.vue')
        },
        {
          path: '/action',
          component: () => import('@/views/flow/ActionList.vue'),
          children: [
            {
              path: '/action/:actionID',
              component: () =>
                import('@/components/flow/action/DefineDetail.vue')
            }
          ]
        },
        {
          path: '/instance',
          component: () => import('@/views/flow/InstanceList.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ path: '/todo' });
  }
  next();
});

export default router;
