import basicService from '@/service/basicService';
import { Instance } from '@/types/workflow';
const uuidv1 = require('uuid/v1');

class WorkflowService {
  public static async createWorkflowInstance(
    procDefId: number,
    userID: string,
    username: string,
    department: string
  ) {
    const rsp = await basicService.postRequest('/workflow/instance', {
      title: uuidv1(),
      procDefId,
      company: 'company',
      userID,
      username,
      department
    });

    return rsp as {
      id: number;
      msg: string;
    };
  }

  public static async getWorkflowInstance(id: number) {
    const rsp = await basicService.getRequest('/workflow/instance', {
      id
    });

    return rsp as {
      msg: string;
      instance: Instance;
    };
  }
}

export default WorkflowService;
