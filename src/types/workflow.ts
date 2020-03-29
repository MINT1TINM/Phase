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

export { Instance, Flow, Event, FlowLinkTask };
