import { Contract } from '@/types/project';
import BasicService from './basicService';

class ContractService {
  static async createContract(c: Contract) {
    const rsp = await BasicService.postRequest('/contract', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async getContractList(page: number, size: number, c?: Contract) {
    const rsp = await BasicService.getRequest('/contract', {
      page,
      size,
      projectUUID: c?.projectUUID,
      name: c?.name,
      contractorName: c?.contractorName
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.contract as Contract[]);
    }
    return Promise.reject([]);
  }

  static async getOneContract(id: string) {
    const rsp = await BasicService.getRequest('/contract/info', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.contract as Contract);
    }
    return Promise.reject(new Contract());
  }

  static async updateContract() {}

  static async deleteContract() {}
}

export default ContractService;
