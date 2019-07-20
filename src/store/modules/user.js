const state = {
  userInfo: {
    authorization: {
      access_token: "",
      refresh_token: "",
      token: ""
    },
    wechatUserinfo: {
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
  }
};
const getters = {
  userInfo: state => {
    return state.userInfo;
  }
};
const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  updateUserToken: (state, token) => {
    state.userInfo.authorization.token = token;
  }
};
const actions = {
  async wechatLogin(context, userInfo) {
    context.commit("updateUserInfo", userInfo);
  },
  async standardLogin(context, token) {
    context.commit("updateUserToken", token);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
