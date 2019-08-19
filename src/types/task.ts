interface Task {
  id: string;
  name: string;
  createAt?: number;
  updatedAt?: number;
  description: string;
  startDate: string;
  endDate: string;
  actionStartDate: string;
  actionEndDate: string;
  status: boolean;
  tags: Tags;
  member?: {
    data: [];
  };
  subTask?: {
    data: SubTask[];
  };
  userID: string;
  executorID: string;
  processID: string;
}

interface Tags {
  data: string[];
}

interface TaskMember {
  userID: string;
}

interface SubTask {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: number;
  file: [];
}

export { Task, Tags, TaskMember, SubTask };
