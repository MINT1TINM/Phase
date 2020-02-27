import { UserCache } from './user';
import { SupplierMember } from './company';

class Project {
  constructor() {
    this.member = {
      data: []
    };
  }
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
      member: []
    };
    this.finishInfo = {
      price: 0,
      auditPrice: 0,
      auditDate: '',
      calFile: '',
      contractFile: '',
      projectFile: '',
      cadFile: '',
      cadPriceFile: ''
    };
    this.stock = {
      type: 0,
      achieveCode: '',
      achieveFile: '',

      code: '',
      name: '',
      agentCompany: '',
      date: new Date().toISOString().slice(0, 10),
      controlPrice: 0,
      price: 0,

      // files
      sketchFile: '',
      file: '',
      bidNotification: '',
      bidFinance: ''
    };
    this.company = {
      projectCompany: { id: '', name: '', contactName: '', phone: '' },
      projectDepartment: { id: '', name: '', contactName: '', phone: '' },
      constructCompany: { id: '', name: '', contactName: '', phone: '' },
      contractCompany: { id: '', name: '', contactName: '', phone: '' }
    };
    this.check = {
      price: 0,
      date: new Date().toISOString().slice(0, 10),
      code: '',
      auditPrice: 0,

      // files
      report: '',
      cal: '',
      invoice: ''
    };
    this.checkResult = {
      price: 0,
      code: '',
      date: new Date().toISOString().slice(0, 10),
      report: ''
    };
    this.file = '';
  }

  type!: number;
  code!: string;
  address!: string;
  location!: string[];
  consultTimeRange!: string[];
  tags: { data: string[] };
  industry!: string;
  investment!: number;
  startDate!: string;
  endDate!: string;
  financeCode!: string;

  fundSource!: string[];
  fundAccount!: any[];
  file!: string;

  // 送审信息
  finishInfo!: {
    price: number;
    auditPrice: number;
    auditDate: string;

    calFile: string;
    contractFile: string;
    projectFile: string;
    cadFile: string;
    cadPriceFile: string;
  };

  started!: boolean;
  startFlowID!: number;

  // 分配投资审计
  assigned!: boolean;
  assignFlowID!: number;
  assignFile!: string;
  assignAuditCompanyType!: number; // text: '0 综合分配', text: '1 二次议标', 2 公开招投标',
  assignPrice!: number;
  investAuditCompany!: {
    id: string;
    name: string;
    member: string[];
  };

  // 采购
  stock!: {
    type: number; // 0 非招标 // 1 二级单位备案 // 2 公开招投标
    achieveCode: string;
    achieveFile: string;

    code: string;
    name: string;
    agentCompany: string;
    date: string;
    controlPrice: number;
    price: number;

    // files
    sketchFile: string;
    file: string;
    bidNotification: string;
    bidFinance: string;
  };

  // 单位
  company!: {
    projectDepartment: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    }; // 工程主管部门
    contractCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    }; // 施工总承包单位
    projectCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    }; // 工程监理单位
    constructCompany: {
      id: string;
      name: string;
      contactName: string;
      phone: string;
    }; // 代建单位
  };

  // 审价结果
  check!: {
    price: number;
    date: string;
    code: string;
    auditPrice: number;

    // files
    report: string;
    cal: string;
    invoice: string;
  };

  // 审定结果
  checkResult!: {
    price: number;
    code: string;
    date: string;
    report: string;
  };
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
  constructor() {
    this.extraInfo = {
      checkFlowID: 0,
      checked: false,
      problem: false,
      problemDesc: '',
      problemFile: []
    };
    this.trackUnit = {
      id: '',
      name: ''
    };
  }
  id!: string;
  createdAt!: string;
  name!: string;
  projectUUID!: string;
  userUUID!: string;
  userCache!: UserCache;
  trackDate!: string;
  tracker!: string;
  trackUnit!: {
    id: string;
    name: string;
  };

  description!: string; // 总结
  file!: string[]; // 现场照片
  liveDescription!: string; // 现场描述
  liveFile!: string[]; // 截图
  liveComment!: string; // 要求文本
  status!: string;
  extraInfo!: {
    checkFlowID: number;
    checked: boolean;

    problem: boolean;
    problemDesc: string;
    problemFile: string[];
  };
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

class Meeting {
  constructor() {
    this.attend = {
      data: []
    };
    this.extraInfo = {
      checkFlowID: 0
    };
  }

  id!: string;
  createdAt!: string;
  name!: string;
  time!: string;
  file!: string;
  pic!: string[];
  description!: string;
  attend!: {
    data: any[];
  };
  extraInfo!: {
    checkFlowID: number;
  };
  userUUID!: string;
  userCache!: UserCache;
  projectUUID!: string;
  status!: string;
}

class Visa {
  id!: string;
  name!: string;
  createdAt!: string;
  appCode!: string;
  appType!: string;
  amount!: number;
  checkAmount!: number;
  description!: string;
  file!: string[];
  status!: string;
  extraInfo!: {
    checkFlowID: number;
  };

  userUUID!: string;
  userCache!: UserCache;
  projectUUID!: string;
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
  Material,
  Meeting,
  Visa
};
