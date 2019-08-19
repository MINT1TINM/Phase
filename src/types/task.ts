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

export { Task, Tags, TaskMember };
