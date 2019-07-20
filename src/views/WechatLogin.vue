<template></template>

<script>
import AuthService from "../service/AuthService";
export default {
  data() {
    return {};
  },
  methods: {
    async getWechatAccessToken() {
      let code = this.$route.query.code;
      const rsp = await AuthService.getWechatAccessToken(code);
    }
  },
  async mounted() {
    await this.getWechatAccessToken();
  }
};
</script>

<style>
</style>
