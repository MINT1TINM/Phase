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
      path: '/index',
      component: () => import('@/views/project/ProjectWorkSpace.vue'),
      children: [
        {
          path: '/dashboard',
          meta: '项目日历',
          component: () => import('@/views/project/dashboard/Dashboard.vue')
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
          path: '/material',
          meta: '材料',
          component: () => import('@/views/project/material/Material.vue')
        },
        {
          path: '/material/:materialID',
          meta: '材料',
          component: () => import('@/views/project/material/MaterialInfo.vue')
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
          component: () => import('@/views/project/track/TrackInfo.vue')
        },
        {
          path: '/meeting',
          meta: '例会',
          component: () => import('@/views/project/meeting/Meeting.vue')
        },
        {
          path: '/meeting/:meetingID',
          component: () => import('@/views/project/meeting/Info.vue')
        },
        {
          path: '/visa',
          meta: '例会',
          component: () => import('@/views/project/visa/Visa.vue')
        },
        {
          path: '/visa/:visaID',
          component: () => import('@/views/project/visa/Info.vue')
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
        },
        {
          path: '/action',
          meta: '项目事件',
          component: () => import('@/views/project/action/ActionList.vue')
        },
        {
          path: '/action/instance',
          meta: '事件实例',
          component: () => import('@/views/project/action/InstanceList.vue')
        }
      ]
    },
    {
      path: '/assign',
      component: () => import('@/views/project/settings/Assign.vue')
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
