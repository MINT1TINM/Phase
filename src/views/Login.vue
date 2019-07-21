<template>
  <v-app>
    <v-layout>
      <v-flex class="hidden-sm-and-down" md9 style="background-color:#000"></v-flex>
      <v-flex xs12 md3>
        <v-container fill-height>
          <v-layout wrap align-center justify-start>
            <v-flex xs12>
              <div class="display-1 font-weight-black mt-2 mb-4" style="color:#A64ED1">登录</div>

              <v-form ref="loginForm">
                <v-text-field
                  class="text-field-dense mb-3"
                  hide-details
                  outlined
                  single-line
                  label="用户名"
                  v-model="loginForm.username"
                  :rules="[v => !!v || '请填写用户名']"
                ></v-text-field>
                <v-text-field
                  class="text-field-dense"
                  type="password"
                  outlined
                  single-line
                  label="密码"
                  v-model="loginForm.password"
                  :rules="[v => !!v || '请填写密码']"
                  @keyup.enter="standardLogin()"
                ></v-text-field>
              </v-form>
              <v-btn block color="primary" dark @click="standardLogin()">登录</v-btn>
              <v-btn class="mt-3" block color="green" dark @click="wechatLogin()">微信登录</v-btn>
              <v-btn class="mt-3" block text color="primary">忘记密码?</v-btn>
              <!-- <v-divider class="my-3"></v-divider>
              <v-btn block text color="primary" :to="'/register'">注册新用户</v-btn>-->
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import authService from "../service/AuthService";
import userService from "../service/UserService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
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
    },
    async standardLogin() {
      if (this.$refs.loginForm.validate()) {
        const rsp = await authService.standardLogin(
          this.loginForm.username,
          this.loginForm.password
        );
        if (rsp.msg == "success") {
          this.$router.push({ path: "/dashboard/timeline" });
        }
      }
    },
    async autoLogin() {
      let userID = this.authorization.userID;
      await userService.getUserInfo(userID);
    }
  },
  computed: {
    ...mapGetters({
      authorization: "user/authorization"
    })
  },
  mounted() {
    this.autoLogin();
  }
};
</script>

<style>
</style>
