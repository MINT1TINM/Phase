const state = {
  lastPage: "",
  loading: false,
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
