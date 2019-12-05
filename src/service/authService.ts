import basicService from '@/service/basicService';
import store from '@/store/store';
import { Authorization } from '@/types/user';

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
    if ('geolocation' in navigator) {
      try {
        position = await this.getUserLocation();
      } catch {}
    }
    const rsp = await basicService.postRequest('/wechat/login', {
      code,
      position
    });
    if (rsp.msg === 'success') {
      store.commit('user/updateUserAuth', rsp.authorization);
      return Promise.resolve(rsp.authorization as Authorization);
    } else {
      window.location.href = '/login';
      return Promise.reject('error');
    }
  }

  public static async standardLogin(username: string, password: string) {
    let position = [];
    if ('geolocation' in navigator) {
      try {
        position = await this.getUserLocation();
      } catch {}
    }
    const rsp = await basicService.postRequest('/user/login', {
      username,
      password,
      position
    });
    if (rsp.msg === 'success') {
      store.commit('user/updateUserAuth', rsp.authorization);
      return Promise.resolve(rsp.authorization as Authorization);
    } else {
      window.location.href = '/login';
      return Promise.reject('error');
    }
  }
}

export default AuthService;
