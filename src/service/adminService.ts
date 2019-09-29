import BasicService from "./basicService";
import { Group } from "@/types/company";

import Vue from "vue";
const vue = new Vue() as any;

class AdminService {
  public static async createGroup(name: string) {
    const rsp = await BasicService.postRequest("/company/group", {
      name
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("创建成功");
    }
    return rsp;
  }

  public static async getGroup() {
    const rsp = await BasicService.getRequest("/company/group", {});
    return rsp;
  }

  public static async getGroupInfo(id: string) {
    const rsp = await BasicService.getRequest("/company/group/info", {
      id
    });
    return rsp;
  }

  public static async updateGroupInfo(groupID: string, groupInfo: Group) {
    const rsp = await BasicService.putRequest("/company/group", {
      groupID,
      name: groupInfo.name,
      description: groupInfo.description
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("更新成功");
    }
    return rsp;
  }
}

export default AdminService;
