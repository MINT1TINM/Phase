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
  color?: string;
  status: boolean;
  tags: Tags;
  member?: {
    data: [];
  };
  sheet?: {
    data: [];
  };
  draft?: {
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

class SubTask {
  id?: string;
  name?: string;
  createdAt?: string;
  status?: number;
  file?: [];
  content?: SubTaskContent[];
  certificate?: SubTaskCertificate[];
}

interface SubTaskContent {
  property: string;
  description: string;
  expect: string;
  reality: string;
  status: boolean;
  review: string;
}

interface SubTaskCertificate {
  uniNo: string;
  ord: string;
}

export { Task, Tags, TaskMember, SubTask, SubTaskContent, SubTaskCertificate };
