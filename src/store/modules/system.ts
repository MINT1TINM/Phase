import { Invitation } from "@/types/project";

interface State {
  companyName: string;
  systemName: string;
  lastPage: string;
  loading: boolean;
  appSwitcher: boolean;
  notificationCenter: boolean;
  fullScreenLoading: boolean;
  appList: App[];
  uploadPercent: number;
  invitationList: Invitation[];
  permissionList: object[];
}

interface App {
  name: string;
  route: string;
  icon: string;
  color?: string;
}

const state: State = {
  companyName: "华东理工大学",
  systemName: "DIM Step",
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
      icon: "icon/icon_project.svg"
    },
    {
      name: "人脉",
      route: "contact",
      icon: "icon/icon_contact.svg"
    },
    {
      name: "表单",
      route: "sheet",
      icon: "icon/icon_sheet.svg"
    },
    {
      name: "活动",
      route: "event",
      icon: "icon/icon_event.svg"
    },
    {
      name: "管理",
      route: "admin/home",
      icon: "icon/icon_admin.svg"
    }
  ],
  invitationList: [],
  permissionList: [
    {
      text: "管理",
      value: "god"
    }
  ]
};

const getters = {
  companyName: (s: State) => {
    return s.companyName;
  },
  systemName: (s: State) => {
    return s.systemName;
  },
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
  },
  invitationList: (s: State) => {
    return s.invitationList;
  },
  permissionList: (s: State) => {
    return s.permissionList;
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
  },
  updateInvitationList: (s: State, invitationList: Invitation[]) => {
    s.invitationList = invitationList;
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
