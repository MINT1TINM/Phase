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

export {
  Project,
  ProjectMember,
  ProjectMemberComplete,
  Invitation,
  ProjectTemplate,
  ProcessTemplate,
  TaskTemplate
};
