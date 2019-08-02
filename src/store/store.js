import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import user from "./modules/user";
import system from "./modules/system";
import project from "./modules/project";

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
    system: state.system,
    project: state.project
  }),
  filter: mutation =>
    mutation.type == "system/updateLastPage" ||
    "user/updateUserInfo" ||
    "user/updateUserAuth" ||
    "user/clearUserInfo" ||
    "user/clearAuthorization" ||
    "user/insertProject" ||
    "project/updateCurrentProjectID" ||
    "project/clearCurrentProjectID" ||
    "project/updateProjectList" ||
    "project/updateCurrentProject"
});

export default new Vuex.Store({
  modules: {
    user,
    system,
    project
  },
  plugins: [vuexLocal.plugin, vuexSession.plugin]
});
