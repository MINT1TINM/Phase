import Vue from 'vue';

import basicService from '@/service/basicService';
import store from '@/store/store';
import { Project, ProjectMember, ProjectTemplate } from '@/types/project';

const vue = new Vue();

class ProjectService {
  public static async createProject(name: string, wfInstanceID?: number) {
    const rsp = (await basicService.postRequest('/project', {
      name: name,
      extraInfo: {
        startFlowID: wfInstanceID
      }
    })) as {
      msg: string;
      project: Project;
      userProject: Project;
    };

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp);
    } else {
      return Promise.reject();
    }
  }

  public static async getProjectList() {
    if (store.getters['user/projectIDList'].length >= 1) {
      const rsp = await basicService.getRequest('/project/list', {
        // use array as params
        id: store.getters['user/projectIDList']
      });
      store.commit('project/updateProjectList', rsp.projectList);

      return rsp;
    }
    const rsp = {
      msg: 'success',
      projectList: []
    };

    return rsp;
  }

  public static async getProjectMember(memberList: ProjectMember[]) {
    const memberIDList = [];
    for (let i = 0; i < memberList.length; i++) {
      const e = memberList[i];
      memberIDList.push(e.userID);
    }

    const rsp = await basicService.getRequest('/project/member', {
      id: memberIDList
    });
    return rsp;
  }

  public static async updateProjectInfo(projectInfo: Project) {
    const rsp = await basicService.putRequest('/project/info', {
      projectID: projectInfo.id,
      name: projectInfo.name,
      description: projectInfo.description,
      startDate: projectInfo.startDate,
      endDate: projectInfo.endDate,
      actionDate: projectInfo.actionDate,
      extraInfo: projectInfo.extraInfo
    });
    store.commit('project/updateCurrentProject', rsp.project);
    if (rsp.msg === 'success') {
      vue.$snack('更新成功');
    }
    return rsp;
  }

  public static async removeProjectMember(projectID: string, userID: string) {
    const rsp = await basicService.putRequest('/project/member', {
      projectID,
      userID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('已移除成员');
    }
    return rsp;
  }

  public static async updateMemberRole(
    projectID: string,
    userID: string,
    role: [],
    tag: []
  ) {
    const rsp = await basicService.putRequest('/project/memberrole', {
      projectID,
      userID,
      role,
      tag
    });

    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  public static async updateProjectFolder(file: any, projectID: string) {
    const fileForm = new FormData();
    fileForm.append('file', file);
    fileForm.append('projectID', projectID);

    const rsp = await basicService.postRequest('/project/folder', fileForm);
    return rsp;
  }

  // invitation
  public static async submitInvitation(
    projectID: string,
    fromUserID: string,
    toUserID: string
  ) {
    const rsp = await basicService.postRequest('/project/invitation', {
      fromUserID,
      toUserID,
      projectID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('已发送邀请');
    }
    return rsp;
  }

  public static async getInvitationList(
    projectID: string,
    fromUserID: string,
    toUserID: string
  ) {
    const rsp = await basicService.getRequest('/project/invitation', {
      fromUserID,
      toUserID,
      projectID
    });
    store.commit('system/updateInvitationList', rsp.invitation);
    return rsp;
  }

  public static async updateInvitationStatus(
    invitationID: string,
    status: number
  ) {
    const rsp = await basicService.putRequest('/project/invitation', {
      invitationID,
      status
    });
    return rsp;
  }

  public static async saveToTemplate(projectID: string, name: string) {
    const rsp = await basicService.postRequest('/project/template', {
      projectID,
      name
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('保存成功');
    }
    return rsp;
  }

  public static async getProjectTemplateList(userID: string) {
    const rsp = await basicService.getRequest('/project/template/list', {
      userID
    });
    return rsp.template as ProjectTemplate[];
  }

  public static async getTemplateInfo(templateID: string) {
    const rsp = await basicService.getRequest('/project/template', {
      templateID
    });
    return rsp;
  }

  public static async generateProject(
    name: string,
    templateID: string,
    wfInstanceID?: number
  ) {
    const rsp = await basicService.postRequest('/project/structure', {
      templateID,
      name,
      wfInstanceID
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp);
    } else {
      return Promise.reject();
    }
  }

  public static async deleteProject(projectID: string) {
    const rsp = await basicService.deleteRequest('/project', {
      projectID
    });
    return rsp;
  }
}

export default ProjectService;
