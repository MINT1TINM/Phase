import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("./views/Landing")
    },
    {
      path: "/login",
      component: () => import("./views/login/Login")
    },
    {
      path: "/wechat/login",
      component: () => import("./views/login/WechatLogin")
    },
    {
      path: "/register",
      component: () => import("./views/user/Register")
    },
    {
      path: "/settings",
      meta: "设置",
      component: () => import("./views/settings/Settings"),
      children: [
        {
          path: "/settings/profile",
          meta: "个人信息",
          component: () => import("./views/settings/Profile")
        },
        {
          path: "/settings/notification",
          meta: "通知",
          component: () => import("./views/settings/Notification")
        }
      ]
    },
    {
      path: "/dashboard",
      component: () => import("./views/Dashboard"),
      children: [
        {
          path: "/dashboard/timeline",
          meta: "时间线",
          component: () => import("./components/timeline/Timeline")
        },
        {
          path: "/dashboard/project",
          meta: "项目栏",
          component: () => import("./components/project/Project")
        },
        {
          path: "/dashboard/project/:projectId",
          meta: "项目栏",
          component: () => import("./components/project/ProjectColumnDetail"),
          children: [
            {
              path: "/dashboard/project/:projectId/task/:taskId",
              meta: "项目栏",
              component: () => import("./components/project/ProjectTaskDetail")
            }
          ]
        },
        {
          path: "/dashboard/contact",
          meta: "通讯录",
          component: () => import("./components/contact/Contact")
        }
      ]
    }
  ]
});
