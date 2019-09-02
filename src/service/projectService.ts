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
      description: projectInfo.description,
      startDate: projectInfo.startDate,
      endDate: projectInfo.endDate,
      actionDate: projectInfo.actionDate
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
    role: [],
    tag: []
  ) {
    const rsp = await basicService.putRequest("/project/memberrole", {
      projectID,
      userID,
      role,
      tag
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
    if (rsp.msg === "success") {
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
    store.commit("system/updateInvitationList", rsp.invitation);
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
}

export default ProjectService;
