import Vue from 'vue';
import BasicService from './basicService';
import { Group } from '@/types/company';

const vue = new Vue() as any;

class AdminService {
  public static async createGroup(name: string) {
    const rsp = await BasicService.postRequest('/company/group', {
      name,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('创建成功');
    }
    return rsp;
  }

  public static async getGroup() {
    const rsp = await BasicService.getRequest('/company/group', {});
    return rsp;
  }

  public static async getGroupInfo(id: string) {
    const rsp = await BasicService.getRequest('/company/group/info', {
      id,
    });
    return rsp;
  }

  public static async updateGroupInfo(groupID: string, groupInfo: Group) {
    const rsp = await BasicService.putRequest('/company/group', {
      groupID,
      name: groupInfo.name,
      description: groupInfo.description,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('更新成功');
    }
    return rsp;
  }

  public static async insertGroupMember(groupID: string, userID: string) {
    const rsp = await BasicService.postRequest('/company/group/member', {
      groupID,
      userID,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('更新成功');
    }
    return rsp;
  }

  public static async deleteGroupMember(groupID: string, userID: string) {
    const rsp = await BasicService.deleteRequest('/company/group/member', {
      groupID,
      userID,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('删除成功');
    }
    return rsp;
  }

  public static async updateDepartmentTree(department: any) {
    const rsp = await BasicService.putRequest('/company/department/tree', {
      department,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('更新成功');
    }
    return rsp;
  }

  public static async getDepartmentTree() {
    const rsp = await BasicService.getRequest('/company/department/tree', {});
    return rsp;
  }

  public static async getDepartment(departmentID: string) {
    const rsp = await BasicService.getRequest('/company/department', {
      departmentID,
    });
    return rsp;
  }

  public static async insertDepartmentMember(
    departmentID: string,
    userID: string,
  ) {
    const rsp = await BasicService.postRequest('/company/department/member', {
      departmentID,
      userID,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('更新成功');
    }
    return rsp;
  }

  public static async removeDepartmentMember(
    departmentID: string,
    userID: string,
  ) {
    const rsp = await BasicService.deleteRequest('/company/department/member', {
      departmentID,
      userID,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('删除成功');
    }
    return rsp;
  }
}

export default AdminService;
