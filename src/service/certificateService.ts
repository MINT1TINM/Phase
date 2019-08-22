import basicService from "@/service/basicService";

class CertificateService {
  public static async searchCertificate(
    keywords: string,
    pageSize: number,
    pageNumber: number
  ) {
    const rsp = await basicService.getRequest("/certificate", {
      keywords,
      pageNumber,
      pageSize
    });
    return rsp;
  }
}

export default CertificateService;
