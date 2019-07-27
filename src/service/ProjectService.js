import basicService from "./BasicService";

class projectService {
  static async createProject(name) {
    const rsp = await basicService.postRequest("/project/createproject", {
      name: name
    });
    return rsp;
  }

  static async getProjectList() {
    const rsp = await basicService.getRequest("/project/getprojectlist");
    return rsp;
  }
}

export default projectService;
