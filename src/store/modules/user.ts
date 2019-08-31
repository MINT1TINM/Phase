import { Authorization, UserInfo, UserProject } from "@/types/user";

interface State {
  authorization: Authorization;
  userInfo: UserInfo;
}

const state: State = {
  authorization: {
    access_token: "",
    refresh_token: "",
    token: "",
    userID: ""
  },
  userInfo: {
    city: "",
    country: "",
    headImgURL: "",
    nickName: "",
    openid: "",
    privilege: [],
    project: { data: [] },
    province: "",
    sex: "",
    unionid: ""
  }
};

const getters = {
  userInfo: (s: State) => {
    return s.userInfo;
  },
  authorization: (s: State) => {
    return s.authorization;
  },
  projectIDList: (s: State) => {
    const projectIDList = [];

    if (s.userInfo.project) {
      for (const item of s.userInfo.project.data) {
        projectIDList.push(item.projectID);
      }
    }

    return projectIDList;
  },
  privilege: (s: State) => {
    return s.userInfo.privilege;
  }
};

const mutations = {
  updateUserInfo: (s: State, userInfo: UserInfo) => {
    s.userInfo = userInfo;
  },
  updateUserAuth: (s: State, authorization: Authorization) => {
    s.authorization = authorization;
  },
  initUserProject: (s: State) => {
    s.userInfo.project.data = [];
  },
  clearUserInfo: (s: State) => {
    s.userInfo = {
      city: "",
      country: "",
      headImgURL: "",
      nickName: "",
      openid: "",
      privilege: [],
      project: { data: [] },
      province: "",
      sex: "",
      unionid: ""
    };
  },
  clearAuthorization: (s: State) => {
    s.authorization = {
      access_token: "",
      refresh_token: "",
      token: "",
      userID: ""
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
