interface Authorization {
  access_token: string;
  refresh_token: string;
  token: string;
  userID: string;
}

interface UserInfo {
  id?: string;
  city: string;
  country: string;
  headImgURL: string;
  nickName: string;
  openid: string;
  privilege: string[];
  project: {
    data: UserProject[];
  };
  province: string;
  sex: string;
  unionid: string;
  name?: string;
  phone?: string;
  email?: string;
  privateInfo?: PrivateInfo;
  privacySetting?: PrivacySetting;
  applicationList?: string[];
  permission?: UserPermission
}

interface UserProject {
  projectID: string;
  projectUUID?: string;
  role: [];
}

interface Login {
  time: string;
  ip: string;
  os: string;
  browser: string;
  location?: string;
}

interface PrivateInfo {
  license?: string;
  workNum?: string;
}

interface PrivacySetting {
  hideName: boolean;
  hideEmail: boolean;
  hidePhone: boolean;
}

class UserPermission {
  project!: {
    createProject: boolean
    deleteProject: boolean
  }

  contact!: {}

  sheet!: {
    createTemplate: boolean
    editTemplate: boolean
    deleteTemplate: boolean
  }

  event!: {}

  finance!: {}

  policy!: {
    createPolicy: boolean
    editPolicy: boolean
    deletePolicy: boolean
  }

  constructor(v: boolean) {
    this.project = {
      createProject: v,
      deleteProject: v
    };

    this.sheet = {
      createTemplate: v,
      deleteTemplate: v,
      editTemplate: v,
    };

    this.policy = {
      createPolicy: v,
      editPolicy: v,
      deletePolicy: v
    };
  }
}

// translation
const UserPermissionCN = {
  createProject: '创建项目',
  deleteProject: '删除项目',
  createTemplate: '创建模版',
  deleteTemplate: '删除模版',
  editTemplate: '编辑模版',
  createPolicy: '创建政策',
  editPolicy: '编辑政策',
  deletePolicy: '删除政策'
};

export {
  Authorization,
  UserInfo,
  UserProject,
  Login,
  PrivateInfo,
  PrivacySetting,
  UserPermission,
  UserPermissionCN
};
