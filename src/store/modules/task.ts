import { Task } from "@/types/task";

interface State {
  currentTask: Task;
}

const state: State = {
  currentTask: {
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    actionStartDate: "",
    actionEndDate: "",
    status: false,
    tags: {
      data: []
    },
    member: {
      data: []
    },
    subTask: {
      data: []
    },
    sheet: {
      data: []
    },
    userID: "",
    processID: "",
    executorID: ""
  }
};

const getters = {
  currentTask: (s: State) => {
    return s.currentTask;
  }
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
