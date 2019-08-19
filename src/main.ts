import "@/assets/animation.css";
import "@/plugins/class-component-hooks.js";
import "@/plugins/snackbar/index";

import axios from "axios";
import Vue from "vue";

import App from "@/App.vue";
import VuetifyConfirm from "@/plugins/confirm-dialog";
import vuetify from "@/plugins/vuetify";
import router from "@/router/router";
import store from "@/store/store";
// format date
import DateHelper from "@/utils/DateHelper";

Vue.use(VuetifyConfirm);

Vue.config.productionTip = false;

// axios config
axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  try {
    config.headers.authorization =
      "PHASE " + store.getters["user/authorization"].token;
  } catch (err) {
    console.log(err);
  }
  return config;
});

// http -> https for m***g wechat avatar
Vue.filter("httpsfy", (url: string) => {
  const realUrl = url.substring(4);
  return "https" + realUrl;
});

// format date
Vue.filter("format", (date: string, fmt: string) => {
  return DateHelper.format(date, fmt);
});

// get weekday
Vue.filter("weekday", (date: string) => {
  return DateHelper.getWeekDay(date);
});

// make avatar
Vue.filter("avatar", (v: string) => {
  if (v) {
    return v.slice(0, 1);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
