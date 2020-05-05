import basicService from '@/service/basicService';
import {
  ActionDefine,
  ActionInstance,
  Event,
  Flow,
  FlowLinkTask,
  Instance
} from '@/types/workflow';

const uuidv1 = require('uuid/v1');

class WorkflowService {
  static async getFlowDef(id: number) {
    const rsp = await basicService.getRequest('/workflow/flow/def', { id });

    return rsp.flowdef as Flow;
  }

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
    const rsp = await basicService.getRequest('/workflow/flow', { id });

    const linkRsp = await basicService.getRequest('workflow/link/flow', {
      flowID: id
    });

    return { flow: rsp.flow, count: rsp.count, flowLink: linkRsp } as {
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
    const rsp = await basicService.getRequest('/workflow/instance', { id });

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
    link?: any,
    nextCandidate?: string
  ) {
    const rsp = await basicService.putRequest('/workflow/task', {
      taskID,
      userID,
      username,
      pass,
      procInstID,
      comment,
      nextCandidate
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

  static async updateActionDefine(ad: ActionDefine) {
    const rsp = await basicService.putRequest('/workflow/action/define', ad);
    return rsp;
  }

  static async getActionDefineList(
    group_id: string[] = [],
    is_project_action: boolean = false
  ) {
    const rsp = await basicService.getRequest('/workflow/action/list', {
      group_id,
      is_project_action
    });
    return rsp;
  }

  static async getActionDefine(id: string) {
    const rsp = await basicService.getRequest('/workflow/action', { id });
    return rsp;
  }

  static async getActionInstanceList(
    user_id: string = '00000000-0000-0000-0000-000000000000',
    project_id: string = '00000000-0000-0000-0000-000000000000'
  ) {
    const rsp = await basicService.getRequest(
      '/workflow/action/instance/list',
      { user_id, project_id }
    );
    return rsp;
  }
  static async getActionInstance(id: string) {
    const rsp = await basicService.getRequest('/workflow/action/instance', {
      id
    });
    return rsp as {
      msg: string;
      actionInstance: ActionInstance;
    };
  }
  static async getApprovalActionInstanceList(user_id: string = '') {
    const rsp = await basicService.getRequest(
      '/workflow/action/instance/approval/list',
      { user_id }
    );
    return rsp;
  }
  static async updateActionInstance(ai: ActionInstance) {
    const rsp = await basicService.putRequest('/workflow/action/instance', ai);
    return rsp as {
      msg: string;
      actionInstance: ActionInstance;
    };
  }

  static async startActionInstance(id: string) {
    const rsp = await basicService.getRequest(
      '/workflow/action/instance/start',
      { id }
    );
    return rsp as {
      msg: string;
      actionInstance: ActionInstance;
    };
  }

  static async completeTask(
    taskID: number,
    userID: string,
    username: string,
    pass: boolean,
    procInstID: number,
    comment: string,
    flowID?: number,
    nextCandidate?: string
  ) {
    const rsp = await basicService.putRequest('/workflow/task', {
      taskID,
      userID,
      username,
      pass,
      procInstID,
      comment,
      nextCandidate
    });
    if (rsp.msg === 'success') {
      return Promise.resolve();
    }
    return Promise.reject();
  }
}

export default WorkflowService;
