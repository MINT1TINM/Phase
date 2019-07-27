const state = {
  lastPage: "",
  currentProject: "",
  loading: false
};

const getters = {
  // continue work after altering settings
  lastPage: state => {
    return state.lastPage;
  },
  loading: state => {
    return state.loading;
  },
  currentProject: state => {
    return state.currentProject;
  }
};

const mutations = {
  updateLastPage: (state, lastPage) => {
    state.lastPage = lastPage;
  },
  toggleLoading: (state, toggle) => {
    state.loading = toggle;
  },
  updateCurrentProject: (state, currentProject) => {
    state.currentProject = currentProject;
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
