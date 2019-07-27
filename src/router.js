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
      path: "/dashboard",
      component: () => import("@/views/Dashboard"),
      children: [
        {
          path: "/dashboard/timeline",
          meta: "时间线",
          component: () => import("@/components/timeline/Timeline")
        },
        {
          path: "/dashboard/process",
          meta: "过程",
          component: () => import("@/views/process/Process")
        },
        {
          path: "/dashboard/process/:processId",
          meta: "过程",
          component: () => import("@/views/process/ProcessBoard"),
          children: [
            {
              path: "/dashboard/process/:processId/task",
              meta: "任务清单",
              component: () => import("@/views/process/task/Task"),
              children: [
                {
                  path: "/dashboard/process/:processId/task/:taskId",
                  meta: "任务清单",
                  component: () =>
                    import("@/components/process/task/TaskDetail")
                }
              ]
            },
            {
              path: "/dashboard/process/:processId/settings",
              meta: "项目设置",
              component: () => import("@/views/process/settings/Settings")
            }
          ]
        },
        {
          path: "/dashboard/contact",
          meta: "通讯录",
          component: () => import("@/components/contact/Contact")
        }
      ]
    }
  ]
});
