import basicService from "@/service/basicService";
import store from "@/store/store";
import router from "@/router/router";

class AuthService {
  public static getCoordinates() {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  public static async getUserLocation() {
    const position = (await this.getCoordinates()) as any;
    return [position.coords.latitude, position.coords.longitude];
  }

  public static async wechatLogin(code: string) {
    let position = [];
    if ("geolocation" in navigator) {
      try {
        position = await this.getUserLocation();
      } catch {}
    }
    const rsp = await basicService.postRequest("/wechat/login", {
      code,
      position
    });
    store.commit("user/updateUserAuth", rsp.authorization);
    return rsp;
  }

  public static async standardLogin(username: string, password: string) {
    let position = [];
    if ("geolocation" in navigator) {
      try {
        position = await this.getUserLocation();
      } catch {}
    }
    const rsp = await basicService.postRequest("/user/login", {
      username,
      password,
      position
    });
    if (rsp.msg === "success") {
      store.commit("user/updateUserAuth", rsp.authorization);
    } else {
      router.push({ path: "/login" });
    }
    return rsp;
  }
}

export default AuthService;
