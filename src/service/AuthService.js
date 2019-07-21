import basicService from "./BasicService";
import store from "../store/store";

class authService {
  static async wechatLogin(code) {
    const rsp = await basicService.postRequest("/wechat/login", {
      code: code
    });
    store.dispatch("user/login", rsp.authorization);
    return rsp;
  }

  static async standardLogin(username, password) {
    const rsp = await basicService.postRequest("/user/login", {
      username: username,
      password: password
    });
    if (rsp.msg == "success") {
      store.dispatch("user/login", rsp.authorization);
    }
    return rsp;
  }
}

export default authService;
