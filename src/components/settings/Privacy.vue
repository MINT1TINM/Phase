<template>
  <div>
    <dim-form
      class="mt-4"
      keyName="profile"
      :formContent="privacySettingList"
      :target="privacySetting"
    ></dim-form>
    <v-layout justify-center class="pt-5">
      <v-flex xs6>
        <v-btn block rounded depressed color="primary" @click="updatePrivacySetting()">保存</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import UserService from '@/service/userService';
import { PrivacySetting, Authorization, UserInfo } from '@/types/user';

const userModule = namespace('user');

@Component
export default class Privacy extends Vue {
  @userModule.Getter('userInfo') private userInfo!: UserInfo;

  @userModule.Getter('authorization') private authorization!: Authorization;

  private privacySettingList = [
    {
      type: 'switch',
      title: '隐藏真实姓名',
      name: 'hideName',
    },
    {
      type: 'switch',
      title: '隐藏邮箱',
      name: 'hideEmail',
    },
    {
      type: 'switch',
      title: '隐藏电话号码',
      name: 'hidePhone',
    },
  ];

  private get privacySetting() {
    return this.userInfo.privacySetting!;
  }

  private set privacySetting(v: PrivacySetting) {
    this.privacySetting = v;
  }

  private async updatePrivacySetting() {
    await UserService.updatePrivacySetting(this.privacySetting);
    await UserService.getUserInfo(this.authorization.userID);
  }
}
</script>

<style scoped>
</style>
