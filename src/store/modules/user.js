const state = {
  authorization: {
    access_token: "",
    refresh_token: "",
    token: "",
    userID: null
  },
  userInfo: {
    city: "",
    country: "",
    headImgURL: "",
    nickname: "",
    openid: "",
    privilege: [],
    project: [],
    province: "",
    sex: "",
    unionid: ""
  }
};
const getters = {
  userInfo: state => {
    return state.userInfo;
  },
  authorization: state => {
    return state.authorization;
  },
  projectIDList: state => {
    /*
      project:[
        {
          projectID Number
          role []
        }
      ]
    */
    let projectIDList = [];
    for (let i = 0; i < state.userInfo.project.length; i++) {
      const e = state.userInfo.project[i];
      projectIDList.push(e.projectID.toString());
    }
    return projectIDList;
  }
};
const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  updateUserAuth: (state, authorization) => {
    state.authorization = authorization;
  },
  clearUserInfo: state => {
    state.userInfo = {
      city: "",
      country: "",
      headImgURL: "",
      nickName: "",
      openid: "",
      privilege: [],
      project: [],
      province: "",
      sex: "",
      unionid: ""
    };
  },
  clearAuthorization: state => {
    state.authorization = {
      access_token: "",
      refresh_token: "",
      token: "",
      userID: null
    };
  },
  insertProject: (state, project) => {
    state.userInfo.project.push(project);
  }
};
const actions = {
  async login(context, authorization) {
    context.commit("updateUserAuth", authorization);
  },
  async getUserInfo(context, userInfo) {
    context.commit("updateUserInfo", userInfo);
  },
  async logOut(context) {
    context.commit("clearUserInfo");
    context.commit("clearAuthorization");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
