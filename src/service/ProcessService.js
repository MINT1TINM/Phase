import "@/service/BasicService";
import basicService from "@/service/BasicService";

class processService {
  static async createProcess(name) {
    const rsp = await basicService.postRequest("/process/createprocess", {
      name: name
    });

    return rsp;
  }
}

export default processService;
