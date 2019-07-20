import basicService from "./BasicService";
import store from "../store/store";

class authService {
  static async getWechatAccessToken(code) {
    const rsp = await basicService.postRequest("/wechat/login", {
      code: code
    });
    store.dispatch("user/wechatLogin", rsp.alertList);
    return rsp;
  }

  static async standardLogin(username, password) {
    const rsp = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    store.dispatch("user/standardLogin", rsp.token);
    return rsp;
  }
}

export default authService;
