import basicService from '@/service/basicService';
import { Instance, Flow, Event } from '@/types/workflow';
const uuidv1 = require('uuid/v1');

class WorkflowService {
  public static async getWorkflowList(
    page: number,
    size: number,
    name?: string
  ) {
    const rsp = await basicService.getRequest('/workflow/flow/list', {
      page,
      size,
      name
    });

    return rsp as {
      msg: string;
      flow: Flow[];
      count: number;
    };
  }

  public static async getWorkflow(id: number) {
    const rsp = await basicService.getRequest('/workflow/flow', {
      id
    });

    return rsp as {
      msg: string;
      flow: Flow;
      count: number;
    };
  }

  public static async createWorkflowInstance(
    procDefId: number,
    userID: string,
    username: string,
    department: string
  ) {
    const rsp = (await basicService.postRequest('/workflow/instance', {
      title: uuidv1(),
      procDefId,
      company: 'company',
      userID,
      username,
      department
    })) as {
      id: number;
      msg: string;
    };

    if (rsp.msg === 'success') {
      return Promise.resolve(rsp);
    } else {
      return Promise.reject();
    }
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

  public static async getWorkflowInstanceList(
    group: string[],
    username: string,
    userUUID: string,
    page: number,
    size: number
  ) {
    const rsp = await basicService.getRequest('/workflow/instance/list', {
      group,
      username,
      userUUID,
      page,
      size
    });

    return rsp as {
      msg: string;
      count: number;
      instance: Instance[];
    };
  }

  public static async handleTask(
    taskID: number,
    userID: string,
    username: string,
    pass: boolean,
    procInstID: number,
    comment: string
  ) {
    const rsp = await basicService.putRequest('/workflow/task', {
      taskID,
      userID,
      username,
      pass,
      procInstID,
      comment
    });

    if (rsp.msg === 'success') {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  public static async getTimeline(instanceID: number) {
    const rsp = await basicService.getRequest('/workflow/timeline', {
      instanceID
    });

    return rsp as {
      msg: string;
      timeline: Event[];
    };
  }
}

export default WorkflowService;
