import Vue from 'vue';
import basicService from '@/service/basicService';
import { Policy } from '@/types/policy';

const vue = new Vue();

class PolicyService {
  public static async searchPolicy(content: string, page: number, size: number) {
    const rsp = await basicService.getRequest('/policy', { content, page, size });
    return rsp;
  }

  public static async getPolicyInfo(id: number) {
    const rsp = await basicService.getRequest('/policy/info', { id });
    return rsp;
  }

  public static async createPolicy(title: string) {
    const rsp = await basicService.postRequest('/policy', { title });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('创成功');
    }
    return rsp;
  }

  public static async updatePolicy(policy: Policy) {
    const rsp = await basicService.putRequest('/policy', policy);
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('更新成功');
    }
    return rsp;
  }

  public static async deletePolicy(id: number) {
    const rsp = await basicService.deleteRequest('/policy', { id });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('删除成功');
    }
    return rsp;
  }
}

export default PolicyService;
