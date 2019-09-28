import BasicService from "./basicService";

class AdminService {
  public static async createGroup(name: string) {}

  public static async getGroup() {
    const rsp = await BasicService.getRequest("/company/group", {});
  }
}
