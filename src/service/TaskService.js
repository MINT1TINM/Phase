import basicService from "./BasicService";
import store from "@/store/store";

class taskService {
  static async createTask(taskName,processID){
    const rsp = await basicService.getRequest("/process")
  }
}

export default taskService;
