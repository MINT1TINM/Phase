import Vue from 'vue';
import basicService from '@/service/basicService';
import { Policy } from '@/types/policy';

const vue = new Vue();

class PolicyService {
  static async searchPolicy(content: string, page: number, size: number) {
    const rsp = await basicService.getRequest('/policy', {
      content,
      page,
      size
    });
    return rsp;
  }

  static async getPolicyInfo(id: number) {
    const rsp = await basicService.getRequest('/policy/info', { id });
    return rsp;
  }

  static async createPolicy(title: string) {
    const rsp = await basicService.postRequest('/policy', { title });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('创建成功');
    }
    return rsp;
  }

  static async updatePolicy(policy: Policy) {
    const rsp = await basicService.putRequest('/policy', policy);
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('更新成功');
    }
    return rsp;
  }

  static async deletePolicy(id: number) {
    const rsp = await basicService.deleteRequest('/policy', { id });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snack('删除成功');
    }
    return rsp;
  }
}

export default PolicyService;
