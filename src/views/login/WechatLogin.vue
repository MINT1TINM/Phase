<template>
  <v-app>
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
import authService from "../../service/AuthService";
import userService from "../../service/UserService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      autoLoginProgress: false
    };
  },
  methods: {
    async wechatLogin() {
      let code = this.$route.query.code;
      this.autoLoginProgress = true;
      try {
        const rsp = await authService.wechatLogin(code);
        await userService.getUserInfo(await rsp.authorization.userID);
        this.$router.push({ path: "/home" });
      } catch (err) {
        this.$router.push({ path: "/login" });
      }
    }
  },
  async mounted() {
    await this.wechatLogin();
  },
  computed: {
    ...mapGetters({
      authorization: "user/authorization"
    })
  }
};
</script>

<style>
</style>
