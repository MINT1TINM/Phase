const state = {
  lastPage: ""
};

const getters = {
  // continue work after altering settings
  lastPage: state => {
    return state.lastPage;
  }
};

const mutations = {
  updateLastPage: (state, lastPage) => {
    state.lastPage = lastPage;
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
