interface Project {
  id: string;
  uuid?: number;
  createAt?: number;
  updatedAt?: number;
  name: string;
  description?: string;
  userID?: number;
  member?: MemberList;
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

export { Project, ProjectMember, ProjectMemberComplete, Invitation };
