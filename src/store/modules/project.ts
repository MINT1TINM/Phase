import { Project, ProjectMember, ProjectExtraInfo } from '@/types/project';
import { Task } from '@/types/task';

interface State {
  currentProjectID: string;
  projectList: Project[];
  statusList: string[];
  typeList: any[];
  options: {
    type: number;
    status: string;
  };
  assignTypeList: any[];
}

const state: State = {
  currentProjectID: '',
  projectList: [],
  statusList: [
    '立项申请',
    '立项受理',
    '招标阶段',
    '施工阶段',
    '竣工送审',
    '送审受理',
    '审价完毕'
  ],
  typeList: [
    { name: '竣工结算审计', id: 1 },
    { name: '全过程投资审计基建工程', id: 2 },
    { name: '全过程投资审计修缮工程', id: 3 }
  ],
  assignTypeList: [
    {
      text: '综合分配',
      value: 0
    },
    {
      text: '二次议标',
      value: 1
    },
    {
      text: '公开招投标',
      value: 2
    }
  ],
  options: {
    type: 0,
    status: ''
  }
};

const getters = {
  currentProjectID: (s: State) => s.currentProjectID,
  currentProject: (s: State) => {
    let c = s.projectList.find((e: Project) => e.id === s.currentProjectID);
    return c;
  },

  currentProjectMemberIDList: (s: State) => {
    if (s.currentProjectID === '') {
      return [];
    }
    const memberIDList = [];
    const memberList = s.projectList.find(
      (e: Project) => e.id === s.currentProjectID
    )!.member;
    for (const item of memberList!.data!) {
      memberIDList.push(item.userID);
    }
    return memberIDList;
  },
  projectList: (s: State) => s.projectList,
  projectMemberCache: (s: State) => (userID: string) => {
    const memberList = s.projectList.find(
      (e: Project) => e.id === s.currentProjectID
    )!.member!.data;

    const member = memberList!.find(
      (e: ProjectMember) => e.userID === userID || e.id === userID
    );

    return member;
  },
  projectPermission: (s: State) => (userID: string) => {
    const currentProject = s.projectList.find(
      (e: Project) => e.id === s.currentProjectID
    );
    return (
      currentProject?.member?.data?.find(
        (e: ProjectMember) => e.userID === userID
      )?.role || []
    );
  }
};

const mutations = {
  updateCurrentProjectID: (s: State, currentProjectID: string) => {
    s.currentProjectID = currentProjectID;
  },
  clearCurrentProjectID: (s: State) => {
    s.currentProjectID = '';
  },
  updateCurrentProject: (s: State, projectInfo: Project) => {
    // find and update current project
    const index = s.projectList.findIndex(
      (e: Project) => e.id === projectInfo.id
    );
    s.projectList[index] = projectInfo;
  },
  updateProjectList: (s: State, projectList: Project[]) => {
    s.projectList = projectList;
  },
  updateOptions: (s: State, o: State['options']) => {
    s.options = o;
  },
  restoreOptions: (s: State) => {
    s.options = {
      type: 0,
      status: ''
    };
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
