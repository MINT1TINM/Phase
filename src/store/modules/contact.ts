interface State {
  currentGroup: string;
  currentContactID: string;
}

const state: State = {
  currentGroup: "",
  currentContactID: ""
};

const getters = {
  currentGroup: (s: State) => {
    return s.currentGroup;
  },
  currentContactID: (s: State) => {
    return s.currentContactID;
  }
};

const mutations = {
  updateCurrentGroup: (s: State, group: string) => {
    s.currentGroup = group;
  },
  updateCurrentContactID: (s: State, contactID: string) => {
    s.currentContactID = contactID;
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
