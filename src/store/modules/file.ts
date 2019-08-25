interface State {
  fileList: object;
  path: string[];
}

const state: State = {
  fileList: {},
  path: ["data"]
};

const getters = {
  fileList: (s: State) => {
    let keyArray = [...Object.keys(s.fileList)];
    let sortedFileList: any = {};
    keyArray = keyArray.sort((a: any, b: any) => {
      return b - a;
    });
    for (const key of keyArray) {
      sortedFileList[key] = (s.fileList as any)[key];
    }

    return s.fileList;
  },
  path: (s: State) => {
    return s.path;
  }
};

const mutations = {
  updateFileList: (s: State, fileList: object) => {
    s.fileList = fileList;
  },
  updatePath: (s: State, path: string[]) => {
    s.path = path;
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
