interface State {
  lastPage: string;
  loading: boolean;
  appSwitcher: boolean;
  notificationCenter: boolean;
  fullScreenLoading: boolean;
  appList: App[];
  uploadPercent: number;
}

interface App {
  name: string;
  route: string;
  icon: string;
  color?: string;
}

const state: State = {
  uploadPercent: 0,
  lastPage: "",
  loading: false,
  appSwitcher: false,
  notificationCenter: false,
  fullScreenLoading: false,
  appList: [
    {
      name: "项目",
      route: "project",
      icon: "project.svg",
      color: "linear-gradient(#2eaae8, #8fcceb)"
    },
    {
      name: "人脉",
      route: "contact",
      icon: "contact.svg",
      color: "linear-gradient(#514fe8, #8d8ce6)"
    },
    {
      name: "表单",
      route: "sheet",
      icon: "sheet.svg",
      color: "linear-gradient(#31e236, #80e287)"
    },
    {
      name: "会议",
      route: "meeting",
      icon: "",
      color: "linear-gradient(#2eaae8, #8fcceb)"
    }
  ]
};

const getters = {
  // continue work after altering settings
  lastPage: (s: State) => {
    return s.lastPage;
  },
  loading: (s: State) => {
    return s.loading;
  },
  appSwitcher: (s: State) => {
    return s.appSwitcher;
  },
  notificationCenter: (s: State) => {
    return s.notificationCenter;
  },
  fullScreenLoading: (s: State) => {
    return s.fullScreenLoading;
  },
  appList: (s: State) => {
    return s.appList;
  },
  uploadPercent: (s: State) => {
    return s.uploadPercent;
  }
};

const mutations = {
  updateLastPage: (s: State, lastPage: string) => {
    s.lastPage = lastPage;
  },
  toggleLoading: (s: State, toggle: boolean) => {
    s.loading = toggle;
  },
  toggleFullScreenLoading: (s: State, toggle: boolean) => {
    s.fullScreenLoading = toggle;
  },
  toggleAppSwitcher: (s: State, toggle: boolean) => {
    s.appSwitcher = toggle;
  },
  toggleNotificationCenter: (s: State, toggle: boolean) => {
    s.notificationCenter = toggle;
  },
  updateUploadPercent: (s: State, uploadPercent: number) => {
    s.uploadPercent = uploadPercent;
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
