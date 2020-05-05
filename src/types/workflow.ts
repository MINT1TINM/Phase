class NodeInfo {
  actType!: string;
  allowTaskRedirect!: boolean;
  approver!: string;
  aproverType!: string;
  memberCount!: 0;
  nodeId!: string;
  redirectRange: any;
  type!: string;
}

class Instance {
  id!: number;
  candidate!: string;
  company!: string;
  department!: string;
  duration!: number;
  endTime!: string;
  isFinished!: false;
  nodeID!: string;
  node_infos!: NodeInfo[];
  procDefId!: number;
  procDefName!: string;
  startTime!: string;
  startUserId!: string;
  startUserName!: string;
  taskID!: number;
  title!: string;
}

class Flow {
  constructor() {}
  id!: number;
  name!: string;
  version!: number;
  resource!: any;
  username!: string;
  userid!: string;
  company!: string;
  deployTime!: string;
}

class FlowLinkTask {
  id!: string;
  flowID!: number;
  instanceID!: number;
  extraInfo!: any;
}

class Event {
  comment!: any;
  id!: number;
  step!: number;
  userid!: string;
  username!: string;
  taskID!: number;
}

class ActionDefine {
  constructor(
    name: string = '',
    flowID: number = -1,
    sheetTemplateID: string = '',
    userID: string = '',
    groupList: any[] = [],
    is_project_action: boolean = false,
    extraInfo: any = {}
  ) {
    this.name = name;
    this.flowID = flowID;
    this.sheetTemplateID = sheetTemplateID;
    this.userID = userID;
    this.groupList = groupList;
    this.is_project_action = is_project_action;
    this.extraInfo = extraInfo;
  }
  id!: string;
  name!: string;
  flowID!: number;
  sheetTemplateID!: string;
  userID!: string;
  groupList!: any[];
  is_project_action!: boolean;
  extraInfo!: any;
}

class ActionInstance {
  constructor(
    userID: string = '',
    actionDefineID: string = '',
    sheetDataID: string = '',
    name: string = '',
    projectID: string = '',
    status: string = '未提交'
  ) {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.userID = userID;
    this.sheetDataID = sheetDataID
      ? sheetDataID
      : '00000000-0000-0000-0000-000000000000';
    this.actionDefineID = actionDefineID;
    this.name = name;
    this.status = status;
    this.projectID = projectID;
  }
  id!: string;
  name!: string;
  Description!: string;
  status!: string;
  userID!: string;
  projectID!: string;
  sheetDataID!: string;
  sheetData!: string;
  flowInstanceID!: number;
  actionDefineID!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;
}

class WorkflowDefine {
  constructor() {}
}

export {
  NodeInfo,
  Instance,
  Flow,
  Event,
  FlowLinkTask,
  ActionDefine,
  ActionInstance,
  WorkflowDefine
};
