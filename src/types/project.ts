class Project {
  id!: string;
  createAt!: number;
  updatedAt!: number;
  name!: string;
  description!: string;
  userID!: number;
  member!: MemberList;
  startDate!: string;
  endDate!: string;
  actionDate!: string;
  folderURL!: string;
}

class MemberList {
  data!: ProjectMember[];
}

class ProjectMember {
  id!: string;
  userID!: string;
  userUUID!: string;
  role!: string[];
  projectRole!: [];
  headImgURL!: string;
  tag!: string[];
}

class ProjectMemberComplete extends ProjectMember {
  // backend id
  id!: string;
  nickName!: string;
  email!: string;
  phone!: string;
  alreadyMember!: boolean;
}

class Invitation {
  id!: string;
  createAt!: number;
  updatedAt!: number;
  fromUserID!: string;
  toUserID!: string;
  projectID!: string;
}

class ProjectTemplate {
  id!: string;
  createAt!: number;
  updatedAt!: number;
  userID!: string;
  name!: string;
  process!: ProcessTemplate[];
}

class ProcessTemplate {
  name!: string;
  description!: string;
  task!: TaskTemplate[];
}

class TaskTemplate {
  name!: string;
  description!: string;
}

class Contract {
  id!: string;
  createdAt!: string;
  signedAt!: string;
  name!: string;
  code!: string;
  projectUUID!: string;
  contractorName!: string;
  contractorTag!: string[];
  amount!: number;
  paidAmount!: number;
  paidPercentage!: number;
  promise!: string;
  file!: string[];
}

class Payment {
  id!: string;
  createdAt!: string;
  name!: string;
  projectUUID!: string;
  contractUUID!: string;
  applyAmount!: number;
  appliedAt!: string;
  payAmount!: number;
  paidAt!: string;
  file!: string[];
}

export {
  Project,
  ProjectMember,
  ProjectMemberComplete,
  Invitation,
  ProjectTemplate,
  ProcessTemplate,
  TaskTemplate,
  Contract,
  Payment
};
