import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Landing")
    },
    {
      path: "/login",
      component: () => import("@/views/login/Login")
    },
    {
      path: "/wechat/login",
      component: () => import("@/views/login/WechatLogin")
    },
    {
      path: "/register",
      component: () => import("@/views/user/Register")
    },
    {
      path: "/home",
      meta: "主页",
      component: () => import("@/views/Home")
    },
    {
      path: "/settings",
      meta: "设置",
      component: () => import("@/views/settings/Settings"),
      children: [
        {
          path: "/settings/profile",
          meta: "个人信息",
          component: () => import("@/components/settings/Profile")
        },
        {
          path: "/settings/notification",
          meta: "通知",
          component: () => import("@/components/settings/Notification")
        }
      ]
    },
    {
      path: "/project",
      component: () => import("@/views/project/Project"),
      children: [
        {
          path: "/project/calendar",
          meta: "日历",
          component: () => import("@/views/project/calendar/Calendar")
        },
        {
          path: "/project/process",
          meta: "过程",
          component: () => import("@/views/project/process/Process")
        },
        {
          path: "/project/process/:processId",
          meta: "过程",
          component: () => import("@/views/project/process/ProcessBoard"),
          children: [
            {
              path: "/project/process/:processId/timeline",
              meta: "任务清单",
              component: () =>
                import("@/views/project/process/Timeline")
            },
            {
              path: "/project/process/:processId/task",
              meta: "任务清单",
              component: () => import("@/views/project/process/Task"),
              children: [
                {
                  path: "/project/process/:processId/task/:taskId",
                  meta: "任务清单",
                  component: () =>
                    import("@/components/process/task/TaskDetail")
                }
              ]
            },
            {
              path: "/project/process/:processId/settings",
              meta: "项目设置",
              component: () =>
                import("@/views/project/process/Settings")
            }
          ]
        },
        {
          path: "/project/document",
          meta: "成员",
          component: () => import("@/views/project/document/Document")
        },
        {
          path: "/project/member",
          meta: "成员",
          component: () => import("@/views/project/member/Member")
        }
      ]
    }
  ]
});
