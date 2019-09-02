interface Process {
  id: string;
  createAt?: number;
  updatedAt?: number;
  name: string;
  description?: string;
  userID?: number;
  member?: {
    data: ProcessMember[];
  };
  task?: {
    data: ProcessTask[];
  };
}

interface ProcessTask {
  taskID?: string;
  id?: string;
  name: string;
  startDate?: string;
  endDate?: string;
  userID: string;
  status?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProcessMember {
  userID: string;
}

class CProcess {
  constructor(public config: Process) {}
}

export { Process, ProcessTask, ProcessMember, CProcess };
