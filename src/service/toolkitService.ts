import BasicService from "./basicService";

class ToolkitService {
  public static async exportListToXlsx(head: string[], data: any[]) {
    const rsp = BasicService.postRequest("/toolkit/export/xlsx", {
      head,
      data
    });
    return rsp;
  }
}

export default ToolkitService;
