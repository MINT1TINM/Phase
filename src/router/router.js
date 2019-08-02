import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import systemRouter from "./modules/system";
import projectRouter from "./modules/project";
import settingsRouter from "./modules/settings";
import contactRouter from "./modules/contact";

export default new Router({
  routes: [
    ...systemRouter,
    ...projectRouter,
    ...settingsRouter,
    ...contactRouter
  ]
});
