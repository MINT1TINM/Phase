import { Contract, Payment } from '@/types/project';
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

  static async updateContract(c: Contract) {
    const rsp = await BasicService.putRequest('/contract', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async deleteContract(id: string) {
    const rsp = await BasicService.deleteRequest('/contract', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async createPayment(p: Payment) {
    const rsp = await BasicService.postRequest('/contract/payment', p);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async updatePayment(p: Payment) {
    const rsp = await BasicService.putRequest('/contract/payment', p);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async getPaymentList(p: Payment) {
    const rsp = await BasicService.getRequest('/contract/payment', {
      contractUUID: p.contractUUID,
      projectUUID: p.projectUUID
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.payment);
    }
    return Promise.reject(rsp.msg);
  }

  static async deletePayment(id: string) {
    const rsp = await BasicService.deleteRequest('/contract/payment', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }
}

export default ContractService;
