import Vue from "vue";
import store from "@/store/store";
import Router from "vue-router";
import vuetify from "@/plugins/vuetify";

import contact from "./modules/contact";
import project from "./modules/project";
import settings from "./modules/settings";
import sheet from "./modules/sheet";
import system from "./modules/system";
import event from "./modules/event";
import admin from "./modules/admin";
import finance from "./modules/finance";

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
    ...finance,
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
  // get theme color
  const path = to.path.split("/")[1];
  let themeColor = ``;
  let themeColorDark = ``;

  console.log(path);
  const currentApp = store.getters["system/currentApp"](path);
  console.log(currentApp);

  if (currentApp) {
    // @ts-ignore
    themeColor = currentApp.themeColor;
    themeColorDark = currentApp.themeColorDark;
  } else {
    themeColor = "#a64ed1";
    themeColorDark = "#b074cf";
  }

  vue.$vuetify.theme.themes.light.primary = themeColor;
  vue.$vuetify.theme.themes.dark.primary = themeColorDark;
});

export default router;
