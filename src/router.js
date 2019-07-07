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
          component: () => import("./components/project/ProjectColumnDetail")
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
