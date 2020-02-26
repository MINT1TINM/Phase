import { Visa } from '@/types/project';
import BasicService from './basicService';

class VisaService {
  static async createVisa(c: Visa) {
    const rsp = await BasicService.postRequest('/visa', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async getVisaList(page: number, size: number, c?: Visa) {
    const rsp = await BasicService.getRequest('/visa', {
      page,
      size,
      projectUUID: c?.projectUUID,
      appType: c?.appType,
      status: c?.status
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.visa as Visa[]);
    }
    return Promise.reject([]);
  }

  static async getOneVisa(id: string) {
    const rsp = await BasicService.getRequest('/visa/info', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.visa as Visa);
    }
    return Promise.reject(new Visa());
  }

  static async updateVisa(c: Visa) {
    const rsp = await BasicService.putRequest('/visa', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async deleteVisa(id: string) {
    const rsp = await BasicService.deleteRequest('/visa', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }
}

export default VisaService;
