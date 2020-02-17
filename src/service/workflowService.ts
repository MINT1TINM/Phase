import basicService from '@/service/basicService';
import { Instance, Flow, Event, FlowLinkTask } from '@/types/workflow';
const uuidv1 = require('uuid/v1');

class WorkflowService {
  static async getWorkflowList(page: number, size: number, name?: string) {
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

  static async getWorkflow(id: number) {
    const rsp = await basicService.getRequest('/workflow/flow', {
      id
    });

    const linkRsp = await basicService.getRequest('workflow/link/flow', {
      flowID: id
    });

    return {
      flow: rsp.flow,
      count: rsp.count,
      flowLink: linkRsp
    } as {
      flow: Flow;
      flowLink: any;
      count: number;
    };
  }

  static async createWorkflowInstance(
    procDefId: number,
    userID: string,
    username: string,
    department: string,
    link: FlowLinkTask
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

    // Create link
    const linkRsp = await basicService.postRequest('/workflow/link/task', {
      flowID: procDefId,
      instanceID: rsp.id,
      ...link
    });

    if (rsp.msg === 'success' && linkRsp.msg === 'success') {
      return Promise.resolve(rsp);
    } else {
      return Promise.reject();
    }
  }

  static async getWorkflowInstance(id: number) {
    const rsp = await basicService.getRequest('/workflow/instance', {
      id
    });

    return rsp as {
      msg: string;
      instance: Instance;
    };
  }

  static async getWorkflowInstanceList(
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

  static async handleTask(
    taskID: number,
    userID: string,
    username: string,
    pass: boolean,
    procInstID: number,
    comment: string,
    flowID?: number,
    link?: any
  ) {
    const rsp = await basicService.putRequest('/workflow/task', {
      taskID,
      userID,
      username,
      pass,
      procInstID,
      comment
    });

    // Create link
    const linkRsp = await basicService.postRequest('/workflow/link/task', {
      flowID: flowID,
      taskID: taskID,
      instanceID: procInstID,
      ...link
    });

    if (rsp.msg === 'success' && linkRsp.msg === 'success') {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  static async getTimeline(instanceID: number) {
    const rsp = await basicService.getRequest('/workflow/timeline', {
      instanceID
    });

    return rsp as {
      msg: string;
      timeline: Event[];
    };
  }

  static async getLinkTask(taskID: number, instanceID?: number) {
    const rsp = await basicService.getRequest('/workflow/link/task', {
      taskID,
      instanceID
    });

    return rsp as {
      msg: string;
      linkTask: FlowLinkTask;
    };
  }
}

export default WorkflowService;
