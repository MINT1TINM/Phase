<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AuthService from '@/service/authService';
import UserService from '@/service/userService';

const systemModule = namespace('system');

@Component
export default class WechatLogin extends Vue {
  @systemModule.Mutation('toggleFullScreenLoading')
  toggleFullScreenLoading: any;

  async wechatLogin() {
    const { code } = this.$route.query;
    console.log(code);
    this.toggleFullScreenLoading(true);
    try {
      const authorization = await AuthService.wechatLogin(code as string);
      await UserService.getUserInfo(await authorization.userID!);
      this.toggleFullScreenLoading(false);
      this.$router.push({ path: '/home' });
    } catch (err) {
      this.toggleFullScreenLoading(false);
      this.$router.push({ path: '/login' });
    }
  }

  mounted() {
    this.wechatLogin();
  }
}
</script>

<style scoped></style>
