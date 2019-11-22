interface Project {
  id: string;
  createAt?: number;
  updatedAt?: number;
  name: string;
  description?: string;
  userID?: number;
  member?: MemberList;
  startDate?: string;
  endDate?: string;
  actionDate?: string;
  folderURL?: string;
}

interface MemberList {
  data: ProjectMember[];
}

interface ProjectMember {
  id?: string;
  userID?: string;
  userUUID?: string;
  role?: string[];
  projectRole?: [];
  headImgURL?: string;
  tag?: string[];
}

interface ProjectMemberComplete extends ProjectMember {
  // backend id
  id: string;
  nickName: string;
  email: string;
  phone: string;
  alreadyMember?: boolean;
}

interface Invitation {
  id: string;
  createAt?: number;
  updatedAt?: number;
  fromUserID: string;
  toUserID: string;
  projectID: string;
}

interface ProjectTemplate {
  id: string;
  createAt?: number;
  updatedAt?: number;
  userID: string;
  name: string;
  process: ProcessTemplate[];
}

interface ProcessTemplate {
  name: string;
  description?: string;
  task: TaskTemplate[];
}

interface TaskTemplate {
  name: string;
  description?: string;
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
