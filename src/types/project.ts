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
  nickName!: string;
  email!: string;
  phone!: string;
  role!: string[];
  projectRole!: [];
  headImgURL!: string;
  tag!: string[];
}

class ProjectExtraInfo {
  constructor() {
    this.tags = { data: [] };
    this.investAuditCompany = {
      id: '',
      name: '',
      contactName: '',
      phone: ''
    };
    this.finishInfo = {
      contractCompany: {
        id: '',
        name: '',
        contactName: '',
        phone: ''
      },
      investCompany: {
        id: '',
        name: '',
        contactName: '',
        phone: ''
      },
      projectCompany: {
        id: '',
        name: '',
        contactName: '',
        phone: ''
      },
      constructCompany: {
        id: '',
        name: '',
        contactName: '',
        phone: ''
      }
    };
  }

  type!: number;
  code!: string;
  address!: string;
  location!: string[];
  consultTimeRange!: string[];
  tags: { data: string[] };
  industry!: string;
  investment!: number;

  financeCode!: string;

  investAuditCompany!: {
    id: string;
    name: string;
    contactName: string;
    phone: string;
  };
  assignInvestAuditType!: number;

  // FINISH
  finishInfo!: {
    contractCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    };
    investCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    };
    projectCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    };
    constructCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    };
  };
  startDate!: string;
  endDate!: string;

  price!: number;
  auditPrice!: number;
  auditDate!: string;

  calFile!: string;
  contractFile!: string;
  projectFile!: string;
  cadFile!: string;
  cadPriceFile!: string;

  started!: boolean;
  startFlowID!: number;

  assigned!: boolean;
  assignFlowID!: number;
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

class Material {
  id!: string;
  createdAt!: string;
  name!: string;

  userUUID!: string;
  userCache!: UserCache;

  description!: string;
  specification!: string;
  unit!: string;

  type!: string[];
  region!: string;
  city!: string;
  brand!: string;
  inquiryTime!: string;

  marketPrice!: number;
  price!: number;
  taxRate!: number;

  companyUUID!: string;
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
  Track,
  Material
};
