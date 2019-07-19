import basicService from "./BasicService";

class wechatService {
  static async getAccessToken(code) {
    const rsp = await basicService.postRequest("/wechat/login", {
      code: code
    });
    return rsp;
  }
}

export default wechatService;
