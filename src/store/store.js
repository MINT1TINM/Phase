import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import user from "./modules/user";
import system from "./modules/system";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    user: state.user
  }),
  filter: mutation =>
    mutation.type == "user/updateUserInfo" || "user/updateUserToken"
});

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    system: state.system
  }),
  filter: mutation => mutation.type == "system/updateLastPage"
});

export default new Vuex.Store({
  modules: {
    user,
    system
  },
  plugins: [vuexLocal.plugin, vuexSession.plugin]
});
