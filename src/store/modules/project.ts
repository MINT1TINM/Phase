import { Project, ProjectMember } from "@/types/project";

interface State {
  currentProjectID: string;
  projectList: Project[];
}

const state: State = {
  currentProjectID: "",
  projectList: []
};

const getters = {
  currentProjectID: (s: State) => {
    return s.currentProjectID;
  },
  currentProject: (s: State) => {
    return s.projectList.find((e: Project) => {
      return e.id === s.currentProjectID;
    });
  },
  currentProjectMemberIDList: (s: State) => {
    if (s.currentProjectID === "") {
      return [];
    }
    const memberIDList = [];
    const memberList = s.projectList.find((e: Project) => {
      return e.id === s.currentProjectID;
    })!.member;
    for (const item of memberList!.data || { data: [] }) {
      memberIDList.push(item.userID);
    }
    return memberIDList;
  },
  projectList: (s: State) => {
    return s.projectList;
  },
  projectMemberCache: (s: State) => (userID: string) => {
    const memberList = s.projectList.find((e: Project) => {
      return e.id === s.currentProjectID;
    })!.member!.data;

    const member = memberList.find((e: ProjectMember) => {
      return e.userID === userID;
    });

    return member;
  }
};

const mutations = {
  updateCurrentProjectID: (s: State, currentProjectID: string) => {
    s.currentProjectID = currentProjectID;
  },
  clearCurrentProjectID: (s: State) => {
    s.currentProjectID = "";
  },
  updateCurrentProject: (s: State, projectInfo: Project) => {
    // find and update current project
    const index = s.projectList.findIndex((e: Project) => {
      return e.id === projectInfo.id;
    });
    s.projectList[index] = projectInfo;
  },
  updateProjectList: (s: State, projectList: Project[]) => {
    s.projectList = projectList;
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
