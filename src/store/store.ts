import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import process from "@/store/modules/process";
import project from "@/store/modules/project";
import sheet from "@/store/modules/sheet";
import system from "@/store/modules/system";
import user from "@/store/modules/user";

Vue.use(Vuex);

const vuexLocal: any = new VuexPersistence<any>({
  storage: window.localStorage,
  reducer: (state: any) => ({
    user: state.user
  }),
  filter: (mutation: any) =>
    mutation.type === "user/updateUserInfo" ||
    mutation.type === "user/updateUserToken" ||
    mutation.type === "user/clearUserInfo" ||
    mutation.type === "user/clearAuthorization"
});

const vuexSession: any = new VuexPersistence<any>({
  storage: window.sessionStorage,
  reducer: (state: any) => ({
    user: state.user,
    system: state.system,
    project: state.project,
    process: state.process,
    sheet: state.sheet
  }),
  filter: (mutation: any) =>
    mutation.type === "system/updateLastPage" ||
    mutation.type === "user/updateUserInfo" ||
    mutation.type === "user/updateUserAuth" ||
    mutation.type === "user/insertProject" ||
    mutation.type === "user/initUserProject" ||
    mutation.type === "user/updateUserInfo" ||
    mutation.type === "user/updateUserToken" ||
    mutation.type === "user/clearUserInfo" ||
    mutation.type === "user/clearAuthorization" ||
    mutation.type === "project/updateCurrentProjectID" ||
    mutation.type === "project/clearCurrentProjectID" ||
    mutation.type === "project/updateProjectList" ||
    mutation.type === "project/updateCurrentProject" ||
    mutation.type === "process/updateCurrentProcessList" ||
    mutation.type === "process/updateCurrentProcessTask" ||
    mutation.type === "sheet/insertNewEmptyField" ||
    mutation.type === "sheet/updateSheetTemplate" ||
    mutation.type === "sheet/insertListField" ||
    mutation.type === "sheet/updateSheetList"
});

export default new Vuex.Store({
  // @ts-ignore
  modules: {
    user,
    system,
    project,
    process,
    sheet
  },
  plugins: [vuexLocal.plugin, vuexSession.plugin]
});
