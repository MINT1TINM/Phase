import { Authorization, UserInfo } from '@/types/user';

interface State {
  authorization: Authorization;
  userInfo: UserInfo;
}

const state: State = {
  authorization: new Authorization(),
  userInfo: new UserInfo()
};

const getters = {
  userInfo: (s: State) => s.userInfo,
  authorization: (s: State) => s.authorization,
  projectIDList: (s: State) => {
    const projectIDList = [];

    if (s.userInfo.project) {
      for (const item of s.userInfo.project) {
        projectIDList.push(item.id);
      }
    }

    return projectIDList;
  },
  privilege: (s: State) => s.userInfo.privilege,
  isGod: (s: State) => s.userInfo.privilege?.indexOf('god') !== -1
};

const mutations = {
  updateUserInfo: (s: State, userInfo: UserInfo) => {
    s.userInfo = userInfo;
  },
  updateUserAuth: (s: State, authorization: Authorization) => {
    s.authorization = authorization;
  },
  initUserProject: (s: State) => {
    s.userInfo.project = [];
  },
  clearUserInfo: (s: State) => {
    s.userInfo = new UserInfo();
  },
  clearAuthorization: (s: State) => {
    s.authorization = {
      access_token: '',
      refresh_token: '',
      token: '',
      userID: ''
    };
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
