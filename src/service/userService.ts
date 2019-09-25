import Vue from "vue";

import basicService from "@/service/basicService";
import store from "@/store/store";
import { UserInfo, PrivateInfo } from "@/types/user";

const vue = new Vue();

class UserService {
  public static async getUserInfo(userID: string) {
    const rsp = await basicService.getRequest("/user/info", { id: userID });
    store.commit("user/updateUserInfo", await rsp.userInfo);
    if (!rsp.userInfo.project) {
      store.commit("user/initUserProject");
    }
    return rsp;
  }

  public static async getPrivateInfo() {
    const rsp = await basicService.getRequest("/user/privateinfo", {});
    return rsp;
  }

  public static async getOtherUserInfo(userID: string) {
    const rsp = await basicService.getRequest("/user/info", { id: userID });
    return rsp;
  }

  public static async getUserList() {
    const rsp = await basicService.getRequest("/user/list", {});
    return rsp;
  }

  public static async updateUserInfo(userInfo: UserInfo) {
    const rsp = await basicService.putRequest("/user/info", {
      id: store.getters["user/authorization"].userID,
      name: userInfo.name,
      nickName: userInfo.nickName,
      sex: userInfo.sex,
      phone: userInfo.phone,
      email: userInfo.email
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("更新成功");
    }
  }

  public static async updatePrivateInfo(privateInfo: PrivateInfo) {
    const rsp = basicService.putRequest("/user/privateinfo", {
      license: privateInfo.license
    });

    return rsp;
  }

  public static async updatePrivilege(id: string, privilege: string[]) {
    const rsp = basicService.putRequest("/user/privilege", {
      id,
      privilege
    });

    return rsp;
  }

  public static async createUser(
    username: string,
    nickName: string,
    password: string
  ) {
    const rsp = await basicService.postRequest("/user", {
      username,
      nickName,
      password
    });
    if (rsp.msg === "success") {
      // @ts-ignore
      vue.$snackbar.show("创建成功");
    }
    return rsp;
  }

  public static async searchUser(content: string) {
    const rsp = await basicService.getRequest("/user/search", {
      content
    });
    return rsp;
  }

  public static async getUserLoginHistory(id: string) {
    const rsp = await basicService.getRequest("/user/login/history", {
      id
    });
    return rsp;
  }
}

export default UserService;
