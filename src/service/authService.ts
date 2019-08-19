import basicService from "@/service/basicService";
import store from "@/store/store";

class AuthService {
  public static async wechatLogin(code: string) {
    const rsp = await basicService.postRequest("/wechat/login", {
      code
    });
    store.commit("user/updateUserAuth", rsp.authorization);
    return rsp;
  }

  public static async standardLogin(username: string, password: string) {
    const rsp = await basicService.postRequest("/user/login", {
      username,
      password
    });
    if (rsp.msg === "success") {
      store.commit("user/updateUserAuth", rsp.authorization);
    }
    return rsp;
  }
}

export default AuthService;
