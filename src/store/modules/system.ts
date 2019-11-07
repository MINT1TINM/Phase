import { Invitation } from '@/types/project';
import { App } from '@/types/system';

interface State {
  companyName: string;
  systemName: string;
  lastPage: string;
  loading: boolean;
  appSwitcher: boolean;
  notificationCenter: boolean;
  fullScreenLoading: boolean;
  appList: App[];
  estateAppList: App[];
  uploadPercent: number;
  invitationList: Invitation[];
  permissionList: object[];
}

const state: State = {
  companyName: '华东理工大学',
  systemName: 'DIMStep',
  uploadPercent: 0,
  lastPage: '',
  loading: false,
  appSwitcher: false,
  notificationCenter: false,
  fullScreenLoading: false,
  appList: [
    {
      name: '项目',
      nameEn: 'project',
      route: 'project',
      icon: 'icon/icon_project.svg',
      themeColor: '#42A5F5',
      themeColorDark: '#6bb5f2',
    },
    {
      name: '人脉',
      nameEn: 'contact',
      route: 'contact',
      icon: 'icon/icon_contact.svg',
      themeColor: '#7E57C2',
      themeColorDark: '#9b7ecc',
    },
    {
      name: '表单',
      nameEn: 'sheet',
      route: 'sheet',
      icon: 'icon/icon_sheet.svg',
      themeColor: '#26A69A',
      themeColorDark: '#26A69A',
    },
    // {
    //   name: "活动",
    //   nameEn: "event",
    //   route: "event",
    //   icon: "icon/icon_event.svg",
    //   themeColor: "#c7521c",
    //   themeColorDark: "#c7521c"
    // },
    {
      name: '财务',
      nameEn: 'finance',
      route: 'finance',
      icon: 'icon/icon_finance.svg',
      themeColor: '#2979FF',
      themeColorDark: '#6099fc',
    },
    {
      name: '政策',
      nameEn: 'policy',
      route: 'policy',
      icon: 'icon/icon_policy.svg',
      themeColor: '#A1887F',
      themeColorDark: '#D7CCC8',
    },
    {
      name: '管理',
      nameEn: 'admin',
      route: 'admin',
      icon: 'icon/icon_admin.svg',
      themeColor: '#333333',
      themeColorDark: '#d4d4d4',
      privilege: ['god'],
    },
  ],
  estateAppList: [
    {
      name: '房源',
      nameEn: 'apartment',
      route: 'apartment',
      icon: 'icon/icon_finance.svg',
      themeColor: '#2979FF',
      themeColorDark: '#6099fc',
    },
    {
      name: '账单',
      nameEn: 'bill',
      route: 'bill',
      icon: 'icon/icon_finance.svg',
      themeColor: '#2979FF',
      themeColorDark: '#6099fc',
    },
    {
      name: '审计',
      nameEn: 'audit',
      route: 'audit',
      icon: 'icon/icon_finance.svg',
      themeColor: '#2979FF',
      themeColorDark: '#6099fc',
    },
    {
      name: '工单',
      nameEn: 'ticket',
      route: 'ticket',
      icon: 'icon/icon_finance.svg',
      themeColor: '#2979FF',
      themeColorDark: '#6099fc',
    },
  ],
  invitationList: [],
  permissionList: [
    {
      text: '管理',
      value: 'god',
    },
  ],
};

const getters = {
  companyName: (s: State) => s.companyName,
  systemName: (s: State) => s.systemName,
  lastPage: (s: State) => s.lastPage,
  loading: (s: State) => s.loading,
  appSwitcher: (s: State) => s.appSwitcher,
  notificationCenter: (s: State) => s.notificationCenter,
  fullScreenLoading: (s: State) => s.fullScreenLoading,
  appList: (s: State) => s.appList,
  estateAppList: (s: State) => s.estateAppList,
  currentApp: (s: State) => (name: string) => {
    console.log(name);
    return s.appList.find((e: App) => e.nameEn === name);
  },
  uploadPercent: (s: State) => s.uploadPercent,
  invitationList: (s: State) => s.invitationList,
  permissionList: (s: State) => s.permissionList,
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
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
