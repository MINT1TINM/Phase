import { UserCache } from './user';

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
  extraInfo!: ProjectExtraInfo;
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

class ProjectExtraInfo {
  address!: string;
  location!: string[];
  consultTimeRange!: string[];
  tags: { data: string[] } = { data: [] };
  industry!: string;
  investment!: number;
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
  userUUID!: string;
  userCache!: UserCache;
  projectUUID!: string;
  contractorName!: string;
  contractorTags!: { data: string[] };
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

class Track {
  id!: string;
  createdAt!: string;
  name!: string;
  projectUUID!: string;
  userUUID!: string;
  userCache!: UserCache;
  trackDate!: string;
  tracker!: string;
  description!: string;
  file!: any;
  liveDescription!: string;
  liveFile!: any;
  liveComment!: string;
  status!: boolean;
}

export {
  Project,
  ProjectMember,
  ProjectMemberComplete,
  ProjectExtraInfo,
  Invitation,
  ProjectTemplate,
  ProcessTemplate,
  TaskTemplate,
  Contract,
  Payment,
  Track
};
