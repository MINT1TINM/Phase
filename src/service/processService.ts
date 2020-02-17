import Vue from 'vue';

import basicService from '@/service/basicService';
import store from '@/store/store';
import { Process, ProcessMember } from '@/types/process';

const vue = new Vue();
class ProcessService {
  static async createProcess(name: string, projectID: string) {
    const rsp = await basicService.postRequest('/process', {
      name,
      projectID
    });

    return rsp;
  }

  static async deleteProcess(processID: string) {
    const rsp = await basicService.deleteRequest('/process', {
      processID
    });
    return rsp;
  }

  static async getProcessList(projectID: string) {
    const rsp = await basicService.getRequest('/process/list', {
      projectID
    });
    store.commit('process/updateCurrentProcessList', rsp.processList);
    return rsp;
  }

  static async getProcessInfo(processID: string) {
    const rsp = await basicService.getRequest('/process/info', {
      id: processID
    });

    return rsp;
  }

  static async updateProcessInfo(processID: string, processInfo: Process) {
    const rsp = await basicService.putRequest('/process/info', {
      processID,
      name: processInfo.name,
      description: processInfo.description
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async updateProcessMember(processID: string, member: ProcessMember[]) {
    const memberParams = [];
    for (const m of member) {
      memberParams.push(m.userID);
    }
    const rsp = await basicService.putRequest('/process/member', {
      processID,
      member: memberParams
    });
    return rsp;
  }
}

export default ProcessService;
