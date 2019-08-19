import { CProcess, Process, ProcessTask } from "@/types/process";

interface State {
  currentProcessList: Process[];
}

const state: State = {
  currentProcessList: []
};

const getters = {
  currentProcessList: (s: State) => {
    return s.currentProcessList;
  },
  currentProcess: (s: State) => (processID: string) => {
    return s.currentProcessList.find((e: Process) => {
      return e.id === processID;
    });
  }
};

const mutations = {
  updateCurrentProcessList: (s: State, processList: Process[]) => {
    s.currentProcessList = processList;
  },
  updateCurrentProcessTask: (
    s: State,
    payloads: { processID: string; taskList: ProcessTask[] }
  ) => {
    console.log(payloads.taskList);
    s.currentProcessList.find((e: Process) => {
      return e.id === payloads.processID;
    })!.task!.data = payloads.taskList;
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
