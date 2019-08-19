interface Authorization {
  access_token: string;
  refresh_token: string;
  token: string;
  userID: string;
}

interface UserInfo {
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
}

interface UserProject {
  projectID: string;
  role: [];
}

export { Authorization, UserInfo, UserProject };
