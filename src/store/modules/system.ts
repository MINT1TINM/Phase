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
  nameEn: string;
  route: string;
  icon: string;
  themeColor: string;
  themeColorDark: string;
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
      nameEn: "project",
      route: "project",
      icon: "icon/icon_project.svg",
      themeColor: "#42A5F5",
      themeColorDark: "#6bb5f2"
    },
    {
      name: "人脉",
      nameEn: "contact",
      route: "contact",
      icon: "icon/icon_contact.svg",
      themeColor: "#7E57C2",
      themeColorDark: "#9b7ecc"
    },
    {
      name: "表单",
      nameEn: "sheet",
      route: "sheet",
      icon: "icon/icon_sheet.svg",
      themeColor: "#26A69A",
      themeColorDark: "#26A69A"
    },
    {
      name: "活动",
      nameEn: "event",
      route: "event",
      icon: "icon/icon_event.svg",
      themeColor: "#c7521c",
      themeColorDark: "#c7521c"
    },
    {
      name: "凭证",
      nameEn: "certificate",
      route: "certificate",
      icon: "icon/icon_certificate.svg",
      themeColor: "#2979FF",
      themeColorDark: "#6099fc"
    },
    {
      name: "管理",
      nameEn: "admin",
      route: "admin/home",
      icon: "icon/icon_admin.svg",
      themeColor: "#333333",
      themeColorDark: "#d4d4d4"
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
  currentApp: (s: State) => (name: string) => {
    console.log(name);
    return s.appList.find((e: App) => {
      return e.nameEn === name;
    });
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
