import basicService from "@/service/basicService";

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
