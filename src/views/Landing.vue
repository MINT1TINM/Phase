<template>
  <v-app>
    <v-app-bar flat color="transparent">
      <v-toolbar-title class="font-weight-black" style="color:#A64ED1">Phase</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        outlined
        color="primary"
        v-if="authorization.token.length>=1"
        @click="autoLogin()"
      >我的项目</v-btn>
      <div v-else>
        <v-btn rounded text class="mr-2" :to="'/login'">登录</v-btn>
        <v-btn rounded outlined color="primary">开始</v-btn>
      </div>
    </v-app-bar>
    <v-container fill-height>
      <v-layout align-center justify-center row wrap>
        <v-card flat color="transparent">
          <h2 class="text-xs-center display-3 font-weight-black mt-2" style="color:#A64ED1">Phase</h2>
          <h3 class="text-xs-center mt-2" style="color:#A64ED1">项目协作范式</h3>
          <h5 class="text-xs-center mt-2" style="color:#A64ED1">INSDIM&trade;  出品</h5>
        </v-card>
      </v-layout>
    </v-container>
    <v-layout justify-center>
      <v-btn class="ma-3" outlined fab color="primary">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
    </v-layout>
    <v-overlay :value="autoLoginProgress" :absolute="true" opacity="1" color="primary">
      <v-card flat color="transparent">
        <v-container>
          <v-layout justify-center>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-layout>
        </v-container>
        <v-card-text class="text-xs-center font-weight-black">
          <strong>Phase</strong> 正在加载数据
        </v-card-text>
      </v-card>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import userService from "../service/UserService";
export default {
  data() {
    return {
      autoLoginProgress: false
    };
  },
  methods: {
    ...mapMutations({
      toggleFullScreenLoading: "system/toggleFullScreenLoading"
    }),
    async autoLogin() {
      if (this.authorization.userID != 0) {
        this.toggleFullScreenLoading(true);
        let userID = this.authorization.userID;
        await userService.getUserInfo(userID);

        setTimeout(() => {
          this.toggleFullScreenLoading(false);
          this.$router.push({ path: "/project" });
        }, 500);
      }
    }
  },
  computed: {
    ...mapGetters({
      authorization: "user/authorization"
    })
  }
};
</script>
