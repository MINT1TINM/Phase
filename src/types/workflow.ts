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
    flowID: string,
    sheetTemplateID: string,
    userID: string,
    groupList: any[],
    extraInfo: any
  ) {
    this.flowID = flowID;
    this.sheetTemplateID = sheetTemplateID;
    this.userID = userID;
    this.groupList = groupList;
    this.extraInfo = extraInfo;
  }
  id!: string;
  name!: string;
  flowID!: string;
  sheetTemplateID!: string;
  groupList!: any[];
  userID!: string;
  extraInfo!: any;
}

class ActionInstance {
  constructor(
    userID: string = '',
    sheetDataID: string = '',
    actionDefineID: string = '',
    status: string = '未提交'
  ) {
    this.userID = userID;
    this.sheetDataID = sheetDataID;
    this.actionDefineID = actionDefineID;
    this.status = status;
  }
  id!: string;
  status!: string;
  userID!: string;
  sheetDataID!: string;
  sheetData!: string;
  flowInstanceID!: string;
  actionDefineID!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;
}

export { Instance, Flow, Event, FlowLinkTask, ActionDefine, ActionInstance };
