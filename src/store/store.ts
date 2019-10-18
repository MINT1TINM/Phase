import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import contact from '@/store/modules/contact';
import file from '@/store/modules/file';
import process from '@/store/modules/process';
import project from '@/store/modules/project';
import sheet from '@/store/modules/sheet';
import system from '@/store/modules/system';
import task from '@/store/modules/task';
import user from '@/store/modules/user';
import finance from '@/store/modules/finance';

Vue.use(Vuex);

const vuexLocal: any = new VuexPersistence<any>({
  storage: window.localStorage,
  reducer: (state: any) => ({
    user: state.user,
  }),
  filter: (mutation: any) => mutation.type === 'user/updateUserInfo'
    || mutation.type === 'user/updateUserToken'
    || mutation.type === 'user/clearUserInfo'
    || mutation.type === 'user/clearAuthorization',
});

const vuexSession: any = new VuexPersistence<any>({
  storage: window.sessionStorage,
  reducer: (state: any) => ({
    user: state.user,
    system: state.system,
    project: state.project,
    process: state.process,
    sheet: state.sheet,
    file: state.file,
    task: state.task,
    contact: state.contact,
    finance: state.finance,
  }),
  filter: (mutation: any) => mutation.type === 'system/updateLastPage'
    || mutation.type === 'system/updateInvitationList'
    || mutation.type === 'user/updateUserInfo'
    || mutation.type === 'user/updateUserAuth'
    || mutation.type === 'user/insertProject'
    || mutation.type === 'user/initUserProject'
    || mutation.type === 'user/updateUserInfo'
    || mutation.type === 'user/updateUserToken'
    || mutation.type === 'user/clearUserInfo'
    || mutation.type === 'user/clearAuthorization'
    || mutation.type === 'project/updateCurrentProjectID'
    || mutation.type === 'project/clearCurrentProjectID'
    || mutation.type === 'project/updateProjectList'
    || mutation.type === 'project/updateCurrentProject'
    || mutation.type === 'project/updateViewMode'
    || mutation.type === 'process/updateCurrentProcessList'
    || mutation.type === 'process/updateCurrentProcessTask'
    || mutation.type === 'sheet/insertNewEmptyField'
    || mutation.type === 'sheet/updateSheetTemplate'
    || mutation.type === 'sheet/insertListField'
    || mutation.type === 'sheet/updateSheetList'
    || mutation.type === 'sheet/updateViewMode'
    || mutation.type === 'file/updateFileList'
    || mutation.type === 'file/updatePath'
    || mutation.type === 'file/updatePathPrettier'
    || mutation.type === 'file/restorePath'
    || mutation.type === 'file/restorePathPrettier'
    || mutation.type === 'task/updateCurrentTask'
    || mutation.type === 'contact/updateCurrentGroup'
    || mutation.type === 'contact/updateCurrentContactID'
    || mutation.type === 'finance/updateSearchProjectResult'
    || mutation.type === 'finance/updateCurrentProject',
});

export default new Vuex.Store({
  // @ts-ignore
  modules: {
    user,
    system,
    project,
    process,
    sheet,
    file,
    task,
    contact,
    finance,
  },
  plugins: [vuexLocal.plugin, vuexSession.plugin],
});
