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
    headimgurl: "",
    nickname: "",
    openid: "",
    privilege: [],
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
  }
};
const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  updateUserAuth: (state, authorization) => {
    state.authorization = authorization;
  }
};
const actions = {
  async login(context, authorization) {
    context.commit("updateUserAuth", authorization);
  },
  async getUserInfo(context, userInfo) {
    context.commit("updateUserInfo", userInfo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
