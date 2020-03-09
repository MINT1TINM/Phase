<template>
  <div class="pa-2">
    <v-subheader class="subtitle-2 pl-0 mb-0">修改密码</v-subheader>
    <v-divider class="mb-4"></v-divider>
    <v-form ref="updatePasswordForm">
      <dim-form
        :target="updatePasswordTarget"
        :formContent="updatePasswordFormList"
      ></dim-form>
    </v-form>
    <v-layout justify-center class="pt-3 pb-5">
      <v-flex xs6>
        <v-btn block rounded depressed color="primary" @click="updatePassword()"
          >保存</v-btn
        >
      </v-flex>
    </v-layout>
    <v-subheader class="subtitle-2 pl-0 mb-0">近期登录历史</v-subheader>
    <v-divider class="mb-4"></v-divider>
    <v-card outlined flat>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">时间</th>
              <th class="text-center">IP地址</th>
              <th class="text-center">平台</th>
              <th class="text-center">浏览器</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in loginHistory" :key="item.name">
              <td class="caption text-center">
                {{ item.time | format('yyyy-MM-dd hh:mm:ss') }}
              </td>
              <td class="caption text-center">{{ item.ip.split(':')[0] }}</td>
              <td class="caption text-center">{{ item.os }}</td>
              <td class="caption text-center">{{ item.browser }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Authorization, Login } from '@/types/user';
import UserService from '@/service/userService';

const userModule = namespace('user');

@Component
export default class SecuritySetting extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Mutation('clearAuthorization') clearAuthorization: any;

  loginHistory: Login[] = [];

  updatePasswordFormList = [
    {
      type: 'text-field',
      title: '当前密码',
      name: 'oldPassword',
      password: true
    },
    {
      type: 'text-field',
      title: '新密码',
      name: 'newPassword',
      password: true
    },
    {
      type: 'text-field',
      title: '确认密码',
      name: 'confirmPassword',
      password: true
    }
  ];

  updatePasswordTarget = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  async getUserLoginHistory() {
    const rsp = await UserService.getUserLoginHistory(
      this.authorization.userID
    );
    this.loginHistory = rsp.loginHistory;
  }

  async updatePassword() {
    try {
      if (
        this.updatePasswordTarget.newPassword ===
        this.updatePasswordTarget.confirmPassword
      ) {
        const rsp = await UserService.changePassword(
          this.authorization.userID,
          this.updatePasswordTarget.oldPassword,
          this.updatePasswordTarget.newPassword
        );
        this.$snack('修改成功');
        this.clearAuthorization();
        window.location.href = '/';
      } else {
        this.$snack('两次密码输入不一致');
      }
    } catch (_) {
      this.$snack('修改失败');
    }
  }

  mounted() {
    this.getUserLoginHistory();
  }
}
</script>

<style scoped></style>
