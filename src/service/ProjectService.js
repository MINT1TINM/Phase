import basicService from "./BasicService";
import store from "@/store/store";

class projectService {
  static async createProject(name) {
    const rsp = await basicService.postRequest("/project/createproject", {
      name: name
    });
    return rsp;
  }

  static async getProjectList() {
    const rsp = await basicService.getRequest("/project/getprojectlist");
    store.commit("project/updateProjectList", rsp.projectList);
    return rsp;
  }
}

export default projectService;
