import Vue from 'vue';

import basicService from '@/service/basicService';
import store from '@/store/store';
import { Project, ProjectMember, ProjectTemplate } from '@/types/project';

const vue = new Vue();

class ProjectService {
  static async createProject(name: string, wfInstanceID?: number) {
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

  static async getProjectList(userID: string) {
    const rsp = await basicService.getRequest('/project/list', {
      // use array as params
      userID
    });
    store.commit('project/updateProjectList', rsp.project);
  }

  static async getProjectMember(memberList: ProjectMember[]) {
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

  static async updateProjectInfo(projectInfo: Project) {
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
      vue.$snack('项目信息已更新');
    }
    return rsp;
  }

  static async removeProjectMember(projectID: string, userID: string) {
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

  static async updateMemberRole(
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

  static async updateProjectFolder(file: any, projectID: string) {
    const fileForm = new FormData();
    fileForm.append('file', file);
    fileForm.append('projectID', projectID);

    const rsp = await basicService.postRequest('/project/folder', fileForm);
    return rsp;
  }

  // invitation
  static async submitInvitation(
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

  static async getInvitationList(
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

  static async updateInvitationStatus(invitationID: string, status: number) {
    const rsp = await basicService.putRequest('/project/invitation', {
      invitationID,
      status
    });
    return rsp;
  }

  static async saveToTemplate(projectID: string, name: string) {
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

  static async getProjectTemplateList(userID: string) {
    const rsp = await basicService.getRequest('/project/template/list', {
      userID
    });
    return rsp.template as ProjectTemplate[];
  }

  static async getTemplateInfo(templateID: string) {
    const rsp = await basicService.getRequest('/project/template', {
      templateID
    });
    return rsp;
  }

  static async generateProject(
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

  static async deleteProject(projectID: string) {
    const rsp = await basicService.deleteRequest('/project', {
      projectID
    });
    return rsp;
  }
}

export default ProjectService;
