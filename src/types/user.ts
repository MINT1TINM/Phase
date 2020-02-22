import { Project } from './project';

class Authorization {
  access_token!: string;
  refresh_token!: string;
  token!: string;
  userID!: string;
}

class UserInfo {
  id!: string;
  city!: string;
  country!: string;
  headImgURL!: string;
  nickName!: string;
  openid!: string;
  privilege!: string[];
  project!: Project[];
  province!: string;
  sex!: string;
  unionid!: string;
  name!: string;
  phone!: string;
  email!: string;
  Info!: Info;
  privacySetting!: PrivacySetting;
  applicationList!: string[];
  permission!: UserPermission;
}

class Login {
  time!: string;
  ip!: string;
  os!: string;
  browser!: string;
  location!: string;
}

class Info {
  license!: string;
  workNum!: string;
}

class PrivacySetting {
  hideName!: boolean;
  hideEmail!: boolean;
  hidePhone!: boolean;
}

class UserCache {
  id!: string;
  nickName!: string;
  headImgURL!: string;
}

class UserPermission {
  project!: {
    createProject: boolean;
    deleteProject: boolean;
  };

  contact!: {};

  sheet!: {
    createTemplate: boolean;
    editTemplate: boolean;
    deleteTemplate: boolean;
  };

  event!: {};

  finance!: {};

  policy!: {
    createPolicy: boolean;
    editPolicy: boolean;
    deletePolicy: boolean;
  };

  constructor(v: boolean) {
    this.project = {
      createProject: v,
      deleteProject: v
    };

    this.sheet = {
      createTemplate: v,
      deleteTemplate: v,
      editTemplate: v
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
  Login,
  Info,
  PrivacySetting,
  UserPermission,
  UserPermissionCN,
  UserCache
};
