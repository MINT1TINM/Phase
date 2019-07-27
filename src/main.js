import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "./assets/animation.css";

import dimForm from "@/plugins/dim-form/Index";
Vue.use(dimForm);
Vue.component("dim-form", dimForm);

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  try {
    config.headers["authorization"] =
      "PHASE " + store.getters["user/authorization"].token;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return config;
});

// http -> https for m***g wechat avatar
Vue.filter("httpsfy", url => {
  var realUrl = url.substring(4);
  return "https" + realUrl;
});

new Vue({
  router,
  store,
  vuetify,
  component: {
    dimForm
  },
  render: h => h(App)
}).$mount("#app");
