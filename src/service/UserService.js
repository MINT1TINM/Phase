import basicService from "./BasicService";
import store from "../store/store";

class userService {
  static async getUserInfo(userID) {
    const rsp = await basicService.getRequest("/user/info", { id: userID });
    store.dispatch("user/getUserInfo", rsp.userInfo);
  }
}

export default userService;
