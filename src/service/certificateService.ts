import basicService from "@/service/basicService";
import store from "@/store/store";

class CertificateService {
  public static async searchCertificateProject(
    key: string,
    value: string,
    pageSize?: number,
    pageNumber?: number,
    prefix?: boolean
  ) {
    const rsp = await basicService.getRequest("/certificate/project", {
      key,
      value,
      pageSize,
      pageNumber,
      prefix
    });
    if (!prefix) {
      store.commit("certificate/updateSearchProjectResult", rsp.project);
    }
    return rsp;
  }

  public static async searchCertificate(projectCode: string, staffNo: string) {
    const rsp = await basicService.getRequest("/certificate", {
      projectCode,
      staffNo
    });
    return rsp;
  }
}

export default CertificateService;
