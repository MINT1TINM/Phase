class Process {
  id!: string;
  createAt!: number;
  updatedAt!: number;
  name!: string;
  description!: string;
  userID!: number;
  member!: {
    data: ProcessMember[];
  };
  task!: {
    data: ProcessTask[];
  };
}

class ProcessTask {
  taskID!: string;
  id!: string;
  name!: string;
  startDate!: string;
  endDate!: string;
  userID!: string;
  status!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

class ProcessMember {
  userID!: string;
}

export { Process, ProcessTask, ProcessMember };
