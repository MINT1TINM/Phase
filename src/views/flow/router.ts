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
          component: () =>
            import('@/components/flow/action/ApprovalListFrame.vue')
        },
        {
          path: '/action',
          component: () =>
            import('@/components/flow/action/ActionListFrame.vue')
          // children: [
          //   {
          //     path: '/action/:actionID',
          //     component: () =>
          //       import('@/components/flow/action/ActionDefineDetail.vue')
          //   }
          // ]
        },
        {
          path: '/instance',
          component: () =>
            import('@/components/flow/action/InstanceListFrame.vue')
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
