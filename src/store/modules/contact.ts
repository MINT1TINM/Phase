interface State {
  currentGroup: string;
  currentContactID: string;
}

const state: State = {
  currentGroup: 'all',
  currentContactID: ''
};

const getters = {
  currentGroup: (s: State) => s.currentGroup,
  currentContactID: (s: State) => s.currentContactID
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
