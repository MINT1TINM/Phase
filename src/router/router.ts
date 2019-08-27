import Vue from "vue";
import Router from "vue-router";

import contact from "./modules/contact";
import project from "./modules/project";
import settings from "./modules/settings";
import sheet from "./modules/sheet";
import system from "./modules/system";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [...sheet, ...contact, ...project, ...settings, ...system]
});
