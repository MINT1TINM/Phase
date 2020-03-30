class Task {
  id!: string;
  name!: string;
  createAt!: number;
  updatedAt!: number;
  description!: string;
  startDate!: string;
  endDate!: string;
  actionStartDate!: string;
  actionEndDate!: string;
  color!: string;
  status!: boolean;
  tags!: Tags;
  member!: {
    data: [];
  };
  sheet!: {
    data: [];
  };
  file?: {
    data: [];
  };
  subTask!: {
    data: SubTask[];
  };
  userID!: string;
  executorID!: string;
  processID!: string;
}

class Tags {
  data!: string[];
}

class TaskMember {
  userID!: string;
}

class SubTask {
  id!: string;
  name!: string;
  createdAt!: string;
  status!: string;
  color!: string;
  startDate!: string;
  endDate!: string;
  // file!: [];
  content!: SubTaskContent[];
  certificate!: SubTaskCertificate[];
}

class SubTaskContent {
  property!: string;
  description!: string;
  expect!: string;
  reality!: string;
  status!: boolean;
  review!: string;
}

class SubTaskCertificate {
  uniNo!: string;
  ord!: string;
}

export { Task, Tags, TaskMember, SubTask, SubTaskContent, SubTaskCertificate };
