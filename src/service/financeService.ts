import basicService from '@/service/basicService';
import store from '@/store/store';

class FinanceService {
  static async searchFinanceProject(
    key: string,
    value: string,
    pageSize?: number,
    pageNumber?: number,
    prefix?: boolean
  ) {
    const rsp = await basicService.getRequest('/finance/project', {
      key,
      value,
      pageSize,
      pageNumber,
      prefix
    });
    if (!prefix) {
      store.commit('finance/updateSearchProjectResult', rsp.project);
    }
    return rsp;
  }

  static async searchCertificateGroup(
    projectCode: string,
    staffNo: string,
    startDate?: number,
    endDate?: number
  ) {
    const rsp = await basicService.getRequest('/finance/certificate/group', {
      projectCode,
      staffNo,
      startDate,
      endDate
    });
    return rsp;
  }

  static async searchCertificate(certificateNo: string) {
    const rsp = await basicService.getRequest('/finance/certificate', {
      certificateNo: certificateNo.replace(/ /g, '')
    });
    return rsp;
  }

  static async searchSubject(
    projectCode: string[],
    startDate: string,
    endDate: string
  ) {
    const rsp = await basicService.getRequest('/finance/subject', {
      code: projectCode,
      startDate,
      endDate
    });
    return rsp;
  }

  static async searchSubjectDetail(projectCode: string, subjectCode: string) {
    const rsp = await basicService.getRequest('/finance/subject/detail', {
      projectCode,
      subjectCode
    });
    return rsp;
  }
}

export default FinanceService;
