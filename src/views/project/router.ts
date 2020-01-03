import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '',
      meta: '所有项目',
      component: () => import('@/views/project/ProjectHome.vue')
    },
    {
      path: '/template',
      meta: '所有项目',
      component: () => import('@/views/project/ProjectTemplate.vue')
    },
    {
      path: '/:processID/index',
      component: () => import('@/views/project/ProjectWorkSpace.vue'),
      children: [
        {
          path: '/calendar',
          meta: '项目日历',
          component: () => import('@/views/project/calendar/Calendar.vue')
        },
        {
          path: '/process',
          meta: '项目过程',
          component: () => import('@/views/project/process/Process.vue')
        },
        {
          path: '/process/:processID',
          meta: '项目过程',
          component: () => import('@/views/project/process/ProcessBoard.vue'),
          children: [
            {
              path: '/process/:processID/timeline',
              meta: '任务清单',
              component: () => import('@/views/project/process/Timeline.vue')
            },
            {
              path: '/process/:processID/task',
              meta: '任务清单',
              component: () => import('@/views/project/process/Task.vue'),
              children: [
                {
                  path: '/process/:processID/task/:taskID',
                  meta: '任务清单',
                  component: () =>
                    import('@/components/project/process/task/TaskDetail.vue')
                }
              ]
            },
            {
              path: '/process/:processID/settings',
              meta: '过程设置',
              component: () => import('@/views/project/process/Settings.vue')
            }
          ]
        },
        {
          path: '/contract',
          meta: '合同',
          component: () => import('@/views/project/contract/Contract.vue')
        },
        {
          path: '/contract/:contractID',
          component: () => import('@/views/project/contract/ContractInfo.vue'),
          children: [
            {
              path: '/contract/:contractID/info',
              component: () => import('@/components/project/contract/Info.vue')
            },
            {
              path: '/contract/:contractID/payment',
              component: () =>
                import('@/components/project/contract/Payment.vue')
            },
            {
              path: '/contract/:contractID/operation',
              component: () =>
                import('@/components/project/contract/Operation.vue')
            }
          ]
        },
        {
          path: '/track',
          meta: '跟踪',
          component: () => import('@/views/project/track/Track.vue')
        },
        {
          path: '/track/:trackID',
          component: () => import('@/views/project/track/TrackInfo.vue'),
          children: [
            {
              path: '/track/:trackID/info',
              component: () => import('@/components/project/track/Info.vue')
            },
            {
              path: '/track/:trackID/timeline',
              component: () => import('@/components/project/track/Timeline.vue')
            },
            {
              path: '/track/:trackID/operation',
              component: () =>
                import('@/components/project/track/Operation.vue')
            }
          ]
        },
        {
          path: '/document',
          meta: '项目文件',
          component: () => import('@/views/project/document/Document.vue')
        },
        {
          path: '/member',
          meta: '项目成员',
          component: () => import('@/views/project/member/Member.vue')
        },
        {
          path: '/sheet',
          meta: '项目表单',
          component: () => import('@/views/project/sheet/Sheet.vue')
        },
        {
          path: '/settings',
          meta: '项目设置',
          component: () => import('@/views/project/settings/Settings.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

export default router;
