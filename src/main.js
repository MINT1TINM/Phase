import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  try {
    config.headers["authorization"] =
      store.getters["user/userInfo"].authorization.token;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
