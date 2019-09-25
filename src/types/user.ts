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
  privilege: [];
  project: {
    data: UserProject[];
  };
  province: string;
  sex: string;
  unionid: string;
  name?: string;
  phone?: string;
  email?: string;
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

export { Authorization, UserInfo, UserProject, Login };
