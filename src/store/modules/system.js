const state = {
  lastPage: "",
  loading: false
};

const getters = {
  // continue work after altering settings
  lastPage: state => {
    return state.lastPage;
  },
  loading: state => {
    return state.loading;
  }
};

const mutations = {
  updateLastPage: (state, lastPage) => {
    state.lastPage = lastPage;
  },
  toggleLoading: (state, toggle) => {
    state.loading = toggle;
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
