const state = {
  currentProjectID: "",
  projectList: []
};

const getters = {
  currentProjectID: state => {
    return state.currentProjectID;
  },
  projectList: state => {
    return state.projectList;
  }
};

const mutations = {
  updateCurrentProjectID: (state, currentProjectID) => {
    state.currentProjectID = currentProjectID;
  },
  clearCurrentProjectID: state => {
    state.currentProjectID = null;
  },
  updateProjectList: (state, projectList) => {
    state.projectList = projectList;
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
