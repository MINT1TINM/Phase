import { Task } from '@/types/task';

interface State {
  currentTask: Task;
}

const state: State = {
  currentTask: new Task()
};

const getters = {
  currentTask: (s: State) => s.currentTask
};

const mutations = {
  updateCurrentTask: (s: State, task: Task) => {
    s.currentTask = task;
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
