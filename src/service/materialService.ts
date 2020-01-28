import { Material } from '@/types/project';
import BasicService from './basicService';

class MaterialService {
  static async createMaterial(c: Material) {
    const rsp = await BasicService.postRequest('/material', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async getMaterialList(page: number, size: number, c?: Material) {
    const rsp = await BasicService.getRequest('/material', {
      page,
      size,
      name: c?.name,
      companyUUID: c?.companyUUID
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.material as Material[]);
    }
    return Promise.reject([]);
  }

  static async getOneMaterial(id: string) {
    const rsp = await BasicService.getRequest('/material/info', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.material as Material);
    }
    return Promise.reject(new Material());
  }

  static async updateMaterial(c: Material) {
    const rsp = await BasicService.putRequest('/material', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async deleteMaterial(id: string) {
    const rsp = await BasicService.deleteRequest('/material', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }
}

export default MaterialService;
