import basicService from '@/service/basicService';

class PolicyService {
  public static async searchPolicy(content: string, page: number, size: number) {
    const rsp = await basicService.getRequest('/policy', { content, page, size });
    return rsp;
  }

  public static async getPolicyInfo(id: number) {
    const rsp = await basicService.getRequest('/policy/info', { id });
    return rsp;
  }
}

export default PolicyService;
