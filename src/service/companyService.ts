import Vue from 'vue';
import BasicService from './basicService';
import { Group, Supplier } from '@/types/company';

const vue = new Vue() as any;

class CompanyService {
  static async createGroup(g: Group) {
    const rsp = await BasicService.postRequest('/company/group', g);
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('创建成功');
    }
    return rsp;
  }

  static async getGroup() {
    const rsp = await BasicService.getRequest('/company/group', {});
    return rsp;
  }

  static async getGroupInfo(id: string) {
    const rsp = await BasicService.getRequest('/company/group/info', {
      id
    });
    return rsp;
  }

  static async updateGroupInfo(groupID: string, groupInfo: Group) {
    const rsp = await BasicService.putRequest('/company/group', {
      groupID,
      name: groupInfo.name,
      description: groupInfo.description
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async insertGroupMember(groupID: string, userID: string) {
    const rsp = await BasicService.postRequest('/company/group/member', {
      groupID,
      userID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async deleteGroupMember(groupID: string, userID: string) {
    const rsp = await BasicService.deleteRequest('/company/group/member', {
      groupID,
      userID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('删除成功');
    }
    return rsp;
  }

  static async deleteGroup(id: string) {
    const rsp = await BasicService.deleteRequest('/company/group', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }

  static async getUserGroup(userID: string) {
    const rsp = await BasicService.getRequest('/company/group/list', {
      userID
    });

    return rsp as {
      msg: string;
      groupUUIDList: string[];
    };
  }

  static async updateDepartmentTree(department: any) {
    const rsp = await BasicService.putRequest('/company/department/tree', {
      department
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async getDepartmentTree() {
    const rsp = await BasicService.getRequest('/company/department/tree', {});
    return rsp;
  }

  static async getDepartment(departmentID: string) {
    const rsp = await BasicService.getRequest('/company/department', {
      departmentID
    });
    return rsp;
  }

  static async insertDepartmentMember(departmentID: string, userID: string) {
    const rsp = await BasicService.postRequest('/company/department/member', {
      departmentID,
      userID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async removeDepartmentMember(departmentID: string, userID: string) {
    const rsp = await BasicService.deleteRequest('/company/department/member', {
      departmentID,
      userID
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('删除成功');
    }
    return rsp;
  }

  static async searchSupplier(name: string) {
    const rsp = await BasicService.getRequest('/company/supplier/search', {
      name
    });
    return rsp.supplier as Supplier[];
  }

  static async getSupplierList(page: number, size: number) {
    const rsp = await BasicService.getRequest('/company/supplier/list', {
      page,
      size
    });
    return rsp.supplier as Supplier[];
  }

  static async getSupplier(uuid: string) {
    const rsp = await BasicService.getRequest('/company/supplier', {
      uuid
    });
    return rsp.supplier as Supplier;
  }
}

export default CompanyService;
