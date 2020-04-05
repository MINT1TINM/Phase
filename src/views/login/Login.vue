<template>
  <v-app>
    <app-common></app-common>
    <v-layout>
      <v-flex class="hidden-sm-and-down gradient-background" md9>
        <v-row no-gutters justify="center" align="center" style="height:100vh">
          <!-- <div class="display-1">DIMStep</div> -->
        </v-row>
      </v-flex>
      <v-flex xs12 md3>
        <v-container fill-height style="padding:20px">
          <v-layout wrap align-center justify-start>
            <v-flex xs12>
              <div
                class="display-1 font-weight-black mt-2 mb-4"
                style="color:#A64ED1"
              >
                登录 DIMStep
              </div>

              <v-form ref="loginForm">
                <v-text-field
                  dense
                  class="mb-3 body-2"
                  hide-details
                  outlined
                  single-line
                  label="用户名"
                  v-model="loginForm.username"
                  :rules="[v => !!v || '']"
                ></v-text-field>
                <v-text-field
                  dense
                  class="body-2"
                  type="password"
                  outlined
                  single-line
                  label="密码"
                  v-model="loginForm.password"
                  :rules="[v => !!v || '']"
                  @keyup.enter="standardLogin()"
                ></v-text-field>
              </v-form>
              <v-btn
                outlined
                block
                color="primary"
                dark
                @click="standardLogin()"
                >登录</v-btn
              >
              <!-- <v-btn outlined class="mt-3" block color="green" dark @click="wechatLogin()">微信登录</v-btn> -->
              <!-- <v-btn class="mt-3" text color="primary">忘记密码?</v-btn> -->
              <!-- <v-divider class="my-3"></v-divider>
              <v-btn block text color="primary" :to="'/register'">注册新用户</v-btn>-->
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AuthService from '@/service/authService';
import UserService from '@/service/userService';
import { Authorization } from '@/types/user';
import ProjectService from '@/service/projectService';

const systemModule = namespace('system');
const userModule = namespace('user');

@Component
export default class Login extends Vue {
  $refs!: {
    loginForm: HTMLFormElement;
  };

  loginForm = {
    username: '',
    password: ''
  };

  @systemModule.Mutation('toggleFullScreenLoading')
  toggleFullScreenLoading!: (v: boolean) => void;
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Mutation('clearAuthorization') clearAuthorization: any;

  // login through username & password
  async standardLogin() {
    if (this.$refs.loginForm.validate()) {
      this.toggleFullScreenLoading(true);

      try {
        const authorization = await AuthService.standardLogin(
          this.loginForm.username,
          this.loginForm.password
        );
        await UserService.getUserInfo(await authorization.userID!);
        await ProjectService.getInvitationList('', '', authorization.userID!);

        this.toggleFullScreenLoading(false);
        this.wechatLogin();
        // window.location.href = '/home';
      } catch (err) {
        this.toggleFullScreenLoading(false);
      }
    }
  }

  // login with wechat
  async wechatLogin() {
    const appid = 'wxdfa1c9397935814c';
    const redirectUri = 'https://phase.insdim.com/#/wechat/login';
    const responseType = 'code';
    const scope = 'snsapi_login';
    const state = 'state';
    window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${scope}&state=${state}#wechat_redirect`;
  }
}
</script>

<style scoped>
.gradient-background {
  background: linear-gradient(-45deg, #e73c7e, #23a6d5);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
