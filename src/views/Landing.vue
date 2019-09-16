<template>
  <v-app>
    <v-app-bar flat color="transparent">
      <v-toolbar-title class="font-weight-black" style="color:#A64ED1">{{systemName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        outlined
        color="primary"
        v-if="authorization.token.length>=1"
        @click="autoLogin()"
      >我的主页</v-btn>
      <div v-else>
        <v-btn rounded text class="mr-2" :to="'/login'">登录</v-btn>
        <v-btn rounded outlined color="primary">开始</v-btn>
      </div>
    </v-app-bar>
    <v-container fill-height>
      <v-layout align-center justify-center row wrap>
        <v-card flat color="transparent">
          <h2
            class="text-center display-3 font-weight-black mt-2"
            style="color:#A64ED1"
          >ECUST {{systemName}}</h2>
        </v-card>
      </v-layout>
    </v-container>
    <v-layout justify-center>
      <h4 class="text-center mt-2" style="color:#A64ED1">Powered By Phase</h4>
    </v-layout>
    <v-layout class="pb-5" justify-center>
      <h5 class="text-center mt-2" style="color:#A64ED1">INSDIM&reg; 出品</h5>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import UserService from "@/service/userService";

const userModule = namespace("user");
const systemModule = namespace("system");

@Component
export default class Landing extends Vue {
  @userModule.Getter("authorization") private authorization: any;
  @userModule.Mutation("clearAuthorization") private clearAuthorization: any;
  @systemModule.Mutation("toggleFullScreenLoading")
  private toggleFullScreenLoading: any;
  @systemModule.Getter("systemName") private systemName!: string;

  private async autoLogin() {
    this.toggleFullScreenLoading(true);
    const userID = this.authorization.userID;

    const rsp = await UserService.getUserInfo(userID);
    setTimeout(() => {
      this.toggleFullScreenLoading(false);
      this.$router.push({ path: "/home" });
    }, 500);

    if (rsp.msg === "error") {
      console.log("xxx");
      this.toggleFullScreenLoading(true);
      this.clearAuthorization();
      this.$router.push({ path: "/login" });
    }
  }
}
</script>

<style>
</style>
