import basicService from "@/service/basicService";
import store from "@/store/store";

class FinanceService {
  public static async searchFinanceProject(
    key: string,
    value: string,
    pageSize?: number,
    pageNumber?: number,
    prefix?: boolean
  ) {
    const rsp = await basicService.getRequest("/finance/project", {
      key,
      value,
      pageSize,
      pageNumber,
      prefix
    });
    if (!prefix) {
      store.commit("finance/updateSearchProjectResult", rsp.project);
    }
    return rsp;
  }

  public static async searchCertificate(projectCode: string, staffNo: string) {
    const rsp = await basicService.getRequest("/finance/certificate/group", {
      projectCode,
      staffNo
    });
    return rsp;
  }

  public static async searchCertificateBill(certificateNo: string) {
    const rsp = await basicService.getRequest("/finance/certificate", {
      certificateNo
    });
    return rsp;
  }
}

export default FinanceService;
