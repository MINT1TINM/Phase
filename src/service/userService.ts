import Vue from "vue";

import basicService from "@/service/basicService";
import store from "@/store/store";

const vue = new Vue();
interface UpdateUserInfo {
  id: number;
  nickName: string;
  sex: string;
  phone: string;
  email: string;
}

class UserService {
  public static async getUserInfo(userID: string) {
    const rsp = await basicService.getRequest("/user/info", { id: userID });
    store.commit("user/updateUserInfo", await rsp.userInfo);
    if (!rsp.userInfo.project) {
      store.commit("user/initUserProject");
    }
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

  public static async updateUserInfo(userInfo: UpdateUserInfo) {
    const rsp = await basicService.putRequest("/user/info", {
      id: store.getters["user/authorization"].userID,
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
}

export default UserService;
