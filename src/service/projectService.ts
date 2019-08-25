import Vue from "vue";

import basicService from "@/service/basicService";
import store from "@/store/store";
import { Project, ProjectMember } from "@/types/project";

const vue = new Vue();

class ProjectService {
  public static async createProject(name: string) {
    const rsp = await basicService.postRequest("/project", {
      name
    });

    return rsp;
  }

  public static async getProjectList() {
    if (store.getters["user/projectIDList"].length >= 1) {
      const rsp = await basicService.getRequest("/project/list", {
        // use array as params
        id: store.getters["user/projectIDList"]
      });
      store.commit("project/updateProjectList", rsp.projectList);

      return rsp;
    } else {
      const rsp = {
        msg: "success",
        projectList: []
      };

      return rsp;
    }
  }

  public static async getProjectMember(memberList: ProjectMember[]) {
    const memberIDList = [];
    for (const item of memberList) {
      memberIDList.push(item.userID);
    }
    const rsp = await basicService.getRequest("/project/member", {
      id: memberIDList
    });
    return rsp;
  }

  public static async updateProjectInfo(projectInfo: Project) {
    const rsp = await basicService.putRequest("/project/info", {
      projectID: projectInfo.id,
      name: projectInfo.name,
      description: projectInfo.description
    });
    store.commit("project/updateCurrentProject", rsp.project);
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("更新成功");
    }
    return rsp;
  }

  public static async removeProjectMember(projectID: string, userID: string) {
    const rsp = await basicService.putRequest("/project/member", {
      projectID,
      userID
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("已移除成员");
    }
    return rsp;
  }

  public static async updateMemberRole(
    projectID: string,
    userID: string,
    role: []
  ) {
    const rsp = await basicService.putRequest("/project/memberrole", {
      projectID,
      userID,
      role
    });

    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("更新成功");
    }
    return rsp;
  }

  // invitation
  public static async submitInvitation(
    projectID: string,
    fromUserID: string,
    toUserID: string
  ) {
    const rsp = await basicService.postRequest("/project/invitation", {
      fromUserID,
      toUserID,
      projectID
    });
    if (rsp.message === "success") {
      // @ts-ignore
      vue.$snackbar.show("已发送邀请");
    }
    return rsp;
  }

  public static async getInvitationList(
    projectID: string,
    fromUserID: string,
    toUserID: string
  ) {
    const rsp = await basicService.getRequest("/project/invitation", {
      fromUserID,
      toUserID,
      projectID
    });
    return rsp;
  }

  public static async updateInvitationStatus(
    invitationID: string,
    status: number
  ) {
    const rsp = await basicService.putRequest("/project/invitation", {
      invitationID,
      status
    });
    return rsp;
  }

  public static async getProjectFile(projectID: string) {
    const rsp = await basicService.getRequest("/file", {
      projectID
    });
    store.commit("file/updateFileList", rsp.projectFile.fs.data);
    return rsp;
  }

  public static async createCatalog(projectID: string, path: string[]) {
    const rsp = await basicService.postRequest("/file/catalog", {
      projectID,
      path
    });
    return rsp;
  }

  public static async renameCatalog(
    projectID: string,
    path: string[],
    name: string
  ) {
    const rsp = await basicService.putRequest("/file/catalog", {
      projectID,
      path,
      name
    });
    return rsp;
  }
}

export default ProjectService;
