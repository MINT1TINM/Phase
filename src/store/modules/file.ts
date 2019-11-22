interface State {
  fileList: object;
  path: string[];
  pathPrettier: string[];
}

const state: State = {
  fileList: {},
  path: ['data'],
  pathPrettier: ['根目录']
};

const getters = {
  fileList: (s: State) => {
    let keyArray = [...Object.keys(s.fileList)];
    const sortedFileList: any = {};
    keyArray = keyArray.sort((a: any, b: any) => b - a);
    for (const key of keyArray) {
      sortedFileList[key] = (s.fileList as any)[key];
    }

    return s.fileList;
  },
  path: (s: State) => s.path,
  pathPrettier: (s: State) => s.pathPrettier
};

const mutations = {
  updateFileList: (s: State, fileList: object) => {
    s.fileList = fileList;
  },
  updatePath: (s: State, path: string[]) => {
    s.path = path;
  },
  updatePathPrettier: (s: State, path: string[]) => {
    s.pathPrettier = path;
  },
  restorePath: (s: State) => {
    s.path = ['data'];
  },
  restorePathPrettier: (s: State) => {
    s.pathPrettier = ['根目录'];
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
