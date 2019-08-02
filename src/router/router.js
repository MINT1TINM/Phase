import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import projectRouter from "@/router/modules/project";

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
    ...projectRouter
  ]
});
