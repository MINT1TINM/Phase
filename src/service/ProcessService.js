import "@/service/BasicService";
import basicService from "@/service/BasicService";

class processService {
  static async createProcess(name, projectID) {
    const rsp = await basicService.postRequest("/process/createprocess", {
      name: name,
      projectID: projectID
    });

    return rsp;
  }
  static async getProcessList(projectID) {
    const rsp = await basicService.getRequest("/process/getprocesslist", {
      projectID: projectID
    });

    return rsp;
  }
}

export default processService;
