import { AuditProject } from "@/types/finance";
interface State {
  searchProjectResult: AuditProject[];
  currentProject: AuditProject;
}

const state: State = {
  searchProjectResult: [],
  currentProject: {
    name: "",
    code: "",
    chargeName: "",
    chargeSno: "",
    balance: 0,
    balanceSyear: ""
  }
};

const getters = {
  searchProjectResult: (s: State) => {
    return s.searchProjectResult;
  },
  currentProject: (s: State) => {
    return s.currentProject;
  }
};

const mutations = {
  updateSearchProjectResult: (
    s: State,
    searchProjectResult: AuditProject[]
  ) => {
    s.searchProjectResult = searchProjectResult;
  },
  updateCurrentProject(s: State, project: AuditProject) {
    s.currentProject = project;
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
