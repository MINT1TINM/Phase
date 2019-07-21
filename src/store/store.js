import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import user from "./modules/user";

Vue.use(Vuex);

const vuexSession = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    user: state.user
  }),
  filter: mutation =>
    mutation.type == "user/updateUserInfo" || "user/updateUserToken"
});

export default new Vuex.Store({
  modules: {
    user
  },
  plugins: [vuexSession.plugin]
});
