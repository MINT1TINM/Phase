import Vue from "vue";
import Router from "vue-router";
import vuetify from "@/plugins/vuetify";

import contact from "./modules/contact";
import project from "./modules/project";
import settings from "./modules/settings";
import sheet from "./modules/sheet";
import system from "./modules/system";
import event from "./modules/event";
import admin from "./modules/admin";

Vue.use(Router);

const vue = new Vue({ vuetify });

const router = new Router({
  routes: [
    ...sheet,
    ...contact,
    ...project,
    ...settings,
    ...system,
    ...event,
    ...admin
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.afterEach((to, from) => {
  const path = to.path.split("/")[1];
  let themeColor = ``;
  switch (path) {
    case "project":
      themeColor = "#42A5F5";
      break;
    case "contact":
      themeColor = "#7E57C2";
      break;
    case "sheet":
      themeColor = "#26A69A";
      break;
    case "event":
      themeColor = "#c7521c";
      break;
    case "admin":
      themeColor = "#333333";
      break;
    default:
      themeColor = "#a64ed1";
      break;
  }
  // @ts-ignore
  vue.$vuetify.theme.themes.light.primary = themeColor;
});

export default router;
