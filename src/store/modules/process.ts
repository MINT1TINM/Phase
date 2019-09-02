import { CProcess, Process, ProcessTask } from "@/types/process";
import { Task } from "@/types/task";

interface State {
  currentProcessList: Process[];
  fullTaskList: Task[];
}

const state: State = {
  currentProcessList: [],
  fullTaskList: []
};

const getters = {
  currentProcessList: (s: State) => {
    return s.currentProcessList;
  },
  currentProcessIDList: (s: State) => {
    const processIDList: string[] = [];
    if (s.currentProcessList) {
      for (const item of s.currentProcessList) {
        processIDList.push(item.id);
      }
    }

    return processIDList;
  },
  currentProcess: (s: State) => (processID: string) => {
    return s.currentProcessList.find((e: Process) => {
      return e.id === processID;
    });
  },
  fullTaskList: (s: State) => {
    for (const item of s.fullTaskList) {
      item.startDate = item.startDate.slice(0, 10);
      item.endDate = item.endDate.slice(0, 10);
    }
    return s.fullTaskList;
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
  },
  updateFullTaskList: (s: State, taskList: Task[]) => {
    s.fullTaskList = taskList;
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
