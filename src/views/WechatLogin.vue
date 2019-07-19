<template></template>

<script>
import wechatService from "../service/WechatService";
export default {
  data() {
    return {};
  },
  methods: {
    async getAccessToken() {
      let code = this.$route.query.code;
      await wechatService.getAccessToken(code);
    }
  },
  async mounted() {
    await this.getAccessToken();
  }
};
</script>

<style>
</style>
