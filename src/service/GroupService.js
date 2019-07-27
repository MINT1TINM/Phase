import "@/service/BasicService";
import basicService from "@/service/BasicService";

class groupService {
  static async createGroup(name) {
    const rsp = await basicService.postRequest("/group/creategroup", {
      name: name
    });

    return rsp;
  }
}

export default groupService;
