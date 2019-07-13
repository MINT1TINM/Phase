import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  // reducer: state => ({}),
  filter: mutation => mutation.type == "user/updateUserInfo"
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexSession.plugin]
});
