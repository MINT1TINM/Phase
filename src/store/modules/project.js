const state = {
  currentProjectID: "",
  projectList: []
};

const getters = {
  currentProjectID: state => {
    return state.currentProjectID;
  },
  currentProject: state => {
    return state.projectList.find(e => {
      return e.id == state.currentProjectID;
    });
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
  updateCurrentProject: (state, projectInfo) => {
    // find and update current project
    let index = state.projectList.findIndex(e => {
      return e.id == projectInfo.id;
    });
    state.projectList[index] = projectInfo;
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
