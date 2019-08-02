const state = {
  lastPage: "",
  loading: false,
  appSwitcher: false,
  fullScreenLoading: false
};

const getters = {
  // continue work after altering settings
  lastPage: state => {
    return state.lastPage;
  },
  loading: state => {
    return state.loading;
  },
  appSwitcher: state => {
    return state.appSwitcher;
  },
  fullScreenLoading: state => {
    return state.fullScreenLoading;
  }
};

const mutations = {
  updateLastPage: (state, lastPage) => {
    state.lastPage = lastPage;
  },
  toggleLoading: (state, toggle) => {
    state.loading = toggle;
  },
  toggleFullScreenLoading: (state, toggle) => {
    state.fullScreenLoading = toggle;
  },
  toggleAppSwitcher: (state, toggle) => {
    state.appSwitcher = toggle;
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
