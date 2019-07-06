import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
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
          component: () => import("./components/timeline/Timeline")
        },
        {
          path: "/dashboard/project",
          component: () => import("./components/project/Project")
        },
        {
          path: "/dashboard/contact",
          component: () => import("./components/contact/Contact")
        }
      ]
    }
  ]
});
