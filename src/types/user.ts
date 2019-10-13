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

export {
  Authorization,
  UserInfo,
  UserProject,
  Login,
  PrivateInfo,
  PrivacySetting
};
