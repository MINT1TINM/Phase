<template>
  <v-app>
    <v-layout row>
      <v-flex class="hidden-sm-and-down" md9 style="background-color:#000"></v-flex>
      <v-flex xs12 md3>
        <v-container fill-height>
          <v-layout row wrap align-center justify-start>
            <v-flex xs12>
              <div class="display-1 font-weight-black mt-2 mb-4" style="color:#A64ED1">登录</div>

              <v-form ref="loginForm">
                <v-text-field
                  class="text-field-dense mb-3"
                  hide-details
                  outlined
                  single-line
                  label="邮箱"
                ></v-text-field>
                <v-text-field class="text-field-dense" outlined single-line label="密码"></v-text-field>
              </v-form>
              <v-btn block color="primary" dark>登录</v-btn>
              <v-btn class="mt-3" block color="green" dark @click="wechatLogin()">微信登录</v-btn>
              <v-btn class="mt-3" block text color="primary">忘记密码?</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn block text color="primary" :to="'/register'">注册新用户</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    wechatLogin() {
      let appid = "wxdfa1c9397935814c";
      let redirect_uri = "https://phase.insdim.com/#/wechat/login";
      let response_type = "code";
      let scope = "snsapi_login";
      let state = "state";
      window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${encodeURIComponent(
        redirect_uri
      )}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`;
    }
  },
  mounted() {}
};
</script>

<style>
</style>
