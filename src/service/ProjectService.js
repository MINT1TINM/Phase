import basicService from "./BasicService";
import store from "@/store/store";

class projectService {
  static async createProject(name) {
    const rsp = await basicService.postRequest("/project/createproject", {
      name: name
    });
    store.commit("user/insertProject", {
      projectID: rsp.project.id,
      role: rsp.project.role
    });
    return rsp;
  }

  static async getProjectList() {
    if (store.getters["user/projectIDList"].length >= 1) {
      const rsp = await basicService.getRequest("/project/getprojectlist", {
        // use array as params
        id: store.getters["user/projectIDList"]
      });
      store.commit("project/updateProjectList", rsp.projectList);
      return rsp;
    } else {
      const rsp = {
        msg: "success",
        projectList: []
      };
      return rsp;
    }
  }
}

export default projectService;
