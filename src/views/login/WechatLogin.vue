<template></template>

<script>
import authService from "../../service/AuthService";
import userService from "../../service/UserService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    async wechatLogin() {
      let code = this.$route.query.code;
      try {
        const rsp = await authService.wechatLogin(code);
        await userService.getUserInfo(await rsp.authorization.userID);
      } catch (err) {
        console.log(err);
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
