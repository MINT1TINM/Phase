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
  private toggleFullScreenLoading: any;

  private async wechatLogin() {
    const { code } = this.$route.query;
    console.log(code);
    this.toggleFullScreenLoading(true);
    try {
      // @ts-ignore
      const rsp = await AuthService.wechatLogin(code);
      await UserService.getUserInfo(await rsp.authorization.userID);
      this.toggleFullScreenLoading(false);
      this.$router.push({ path: '/home' });
    } catch (err) {
      this.toggleFullScreenLoading(false);
      this.$router.push({ path: '/login' });
    }
  }

  private mounted() {
    this.wechatLogin();
  }
}
</script>

<style scoped></style>
