import basicService from "@/service/basicService";

class CertificateService {
  public static async searchCertificateProject(key: string, value: string) {
    const rsp = await basicService.getRequest("/certificate/project", {
      key,
      value
    });
    return rsp;
  }
}

export default CertificateService;
