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
  },
  clearUserInfo: state => {
    state.userInfo = {
      city: "",
      country: "",
      headImgURL: "",
      nickName: "",
      openid: "",
      privilege: [],
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
