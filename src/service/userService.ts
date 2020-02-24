import Vue from 'vue';

import basicService from '@/service/basicService';
import store from '@/store/store';
import {
  UserInfo,
  Info,
  PrivacySetting,
  UserPermission,
  UserCache
} from '@/types/user';

const vue = new Vue() as any;

class UserService {
  static async getUserInfo(userID: string) {
    const rsp = await basicService.getRequest('/user/info', { id: userID });
    store.commit('user/updateUserInfo', await rsp.userInfo);
    if (!rsp.userInfo.project) {
      store.commit('user/initUserProject');
    }
    return rsp;
  }

  static async getInfo() {
    const rsp = await basicService.getRequest('/user/info', {});
    return rsp;
  }

  static async getUserCache(id: string[]) {
    const rsp = await basicService.getRequest('/user/avatar', { id });
    return rsp.userAvatar as UserCache[];
  }

  static async getOtherUserInfo(userID: string) {
    const rsp = await basicService.getRequest('/user/info', { id: userID });
    return rsp;
  }

  static async getUserList() {
    const rsp = await basicService.getRequest('/user/list', {});
    return rsp;
  }

  static async updateUserInfo(userInfo: UserInfo) {
    const rsp = await basicService.putRequest('/user/info', {
      id: store.getters['user/authorization'].userID,
      name: userInfo.name,
      nickName: userInfo.nickName,
      sex: userInfo.sex,
      phone: userInfo.phone,
      email: userInfo.email
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async updateInfo(Info: Info) {
    const rsp = await basicService.putRequest('/user/info', {
      license: Info.license,
      workNum: Info.workNum
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async updatePrivacySetting(privacySetting: PrivacySetting) {
    const rsp = await basicService.putRequest('/user/privacysetting', {
      hideEmail: privacySetting.hideEmail,
      hideName: privacySetting.hideName,
      hidePhone: privacySetting.hidePhone
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
    }
    return rsp;
  }

  static async updatePrivilege(id: string, privilege: string[]) {
    const rsp = await basicService.putRequest('/user/privilege', {
      id,
      privilege
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async updateUserAppList(id: string, appList: string[]) {
    const rsp = await basicService.putRequest('/user/applist', {
      id,
      appList
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async updateUserPermission(id: string, permission: UserPermission) {
    const rsp = await basicService.putRequest('/user/permission', {
      id,
      permission
    });
    if (rsp.msg === 'success') {
      vue.$snack('修改成功');
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async createUser(
    username: string,
    nickName: string,
    password: string
  ) {
    const rsp = await basicService.postRequest('/user', {
      username,
      nickName,
      password
    });
    if (rsp.msg === 'success') {
      vue.$snack('创建成功');
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async searchUser(content: string) {
    const rsp = await basicService.getRequest('/user/search', {
      content
    });
    return rsp;
  }

  static async getUserLoginHistory(id: string) {
    const rsp = await basicService.getRequest('/user/login/history', {
      id
    });
    return rsp;
  }

  static async deleteUser(userID: string) {
    const rsp = await basicService.deleteRequest('/user', {
      userID
    });
    return rsp;
  }
}

export default UserService;
