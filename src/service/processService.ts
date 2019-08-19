import Vue from "vue";

import basicService from "@/service/basicService";
import store from "@/store/store";
import { Process, ProcessMember } from "@/types/process";

const vue = new Vue();
class ProcessService {
  public static async createProcess(name: string, projectID: string) {
    const rsp = await basicService.postRequest("/process", {
      name,
      projectID
    });

    return rsp;
  }
  public static async getProcessList(projectID: string) {
    const rsp = await basicService.getRequest("/process/list", {
      projectID
    });
    store.commit("process/updateCurrentProcessList", rsp.processList);
    return rsp;
  }

  public static async getProcessInfo(processID: string) {
    const rsp = await basicService.getRequest("/process/info", {
      id: processID
    });

    return rsp;
  }

  public static async updateProcessInfo(
    processID: string,
    processInfo: Process
  ) {
    const rsp = await basicService.putRequest("/process/info", {
      processID,
      name: processInfo.name,
      description: processInfo.description
    });
    if (rsp.message === "success") {
      // @ts-ignore
      vue.$snackbar.show("更新成功");
    }
    return rsp;
  }

  public static async updateProcessMember(
    processID: string,
    member: ProcessMember[]
  ) {
    const memberParams = [];
    for (const m of member) {
      memberParams.push(m.userID);
    }
    const rsp = await basicService.putRequest("/process/member", {
      processID,
      member: memberParams
    });
    return rsp;
  }
}

export default ProcessService;
