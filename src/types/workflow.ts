class Instance {
  id!: number;
  candidate!: string;
  company!: string;
  department!: string;
  duration!: number;
  endTime!: string;
  isFinished!: false;
  nodeID!: string;
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

export { Instance, Flow };
