import basicService from "@/service/BasicService";
import store from "@/store/store";

class userService {
  static async getUserInfo(userID) {
    const rsp = await basicService.getRequest("/user/info", { id: userID });
    store.dispatch("user/getUserInfo", await rsp.userInfo);
  }

  static async updateUserInfo(userInfo) {
    const rsp = await basicService.putRequest("/user/info", {
      id: store.getters["user/authorization"].userID,
      nickName: userInfo.nickName,
      sex: userInfo.sex,
      phone: userInfo.phone,
      email: userInfo.email
    });
    store.dispatch("user/getUserInfo", await rsp.userInfo);
  }
}

export default userService;
