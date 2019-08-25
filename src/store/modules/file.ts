interface State {
  fileList: object;
}

const state: State = {
  fileList: {}
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
      console.log(key); // 这里从大到小
    }

    return s.fileList;
  }
};

const mutations = {
  updateFileList: (s: State, fileList: object) => {
    s.fileList = fileList;
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
