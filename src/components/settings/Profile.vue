<template>
  <div>
    <v-form ref="userProfile">
      <div class="pa-2">
        <v-subheader class="subtitle-2 pl-0 mb-0">通用</v-subheader>
        <v-divider class="mb-2"></v-divider>
      </div>
      <v-list>
        <v-list-item>
          <v-subheader style="padding:0">头像</v-subheader>
        </v-list-item>
        <v-list-item>
          <v-avatar color="primary" size="64">
            <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL" />
            <span
              v-else-if="userInfo.nickname"
              class="white--text text-uppercase"
              >{{ nickName | avatar }}</span
            >
            <span v-else class="white--text text-uppercase">{{
              userInfo.username | avatar
            }}</span>
          </v-avatar>
          <!-- <v-btn class="ml-5" outlined color="primary">修改</v-btn> -->
        </v-list-item>
      </v-list>
      <v-divider class="my-3 mx-2"></v-divider>

      <dim-form
        class="mt-4"
        keyName="profile"
        :formContent="profileList"
        :target="userInfo"
      ></dim-form>
    </v-form>

    <v-layout justify-center class="pt-5">
      <v-flex xs6>
        <v-btn block rounded depressed color="primary" @click="updateUserInfo()"
          >保存</v-btn
        >
      </v-flex>
    </v-layout>

    <!-- private info -->
    <div class="pa-2 mt-5">
      <v-subheader class="subtitle-2 px-0 mb-0">
        隐私
        <v-spacer></v-spacer>
        <v-btn text rounded @click="togglePrivateInfo()">
          <div v-if="privateInfoShow"><v-icon>mdi-chevron-up</v-icon>隐藏</div>
          <div v-else><v-icon>mdi-chevron-down</v-icon>显示</div>
        </v-btn>
      </v-subheader>
      <v-divider class="mb-2"></v-divider>
    </div>
    <div v-if="privateInfoShow">
      <dim-form
        class="mt-4"
        keyName="profile"
        :formContent="privateInfoList"
        :target="privateInfo"
      ></dim-form>
      <v-layout justify-center class="pt-5">
        <v-flex xs6>
          <v-btn
            block
            rounded
            depressed
            color="primary"
            @click="updatePrivateInfo()"
            >保存</v-btn
          >
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import UserService from '@/service/userService';
import { Authorization, UserInfo, PrivateInfo } from '@/types/user';

const userModule = namespace('user');

@Component({
  components: {}
})
export default class Profile extends Vue {
  @userModule.Getter('userInfo') private userInfo!: any;

  @userModule.Getter('authorization') private authorization!: Authorization;

  private profileList = [
    {
      type: 'text-field',
      title: '用户名',
      name: 'username',
      disabled: true
    },
    {
      type: 'text-field',
      title: '昵称',
      name: 'nickName'
    },
    {
      type: 'text-field',
      title: '真实姓名',
      name: 'name'
    },
    {
      type: 'select',
      title: '性别',
      name: 'sex',
      text: 'title',
      value: 'value',
      chips: false,
      list: [
        {
          value: 0,
          title: '男'
        },
        {
          value: 1,
          title: '女'
        }
      ]
    },
    {
      type: 'text-field',
      title: '移动电话',
      name: 'phone'
    },
    {
      type: 'text-field',
      title: '电子邮箱',
      name: 'email'
    }
  ];

  private privateInfoList = [
    {
      type: 'text-field',
      title: '身份证',
      name: 'license'
    },
    {
      type: 'text-field',
      title: '工号',
      name: 'workNum'
    }
  ];

  private privateInfo: PrivateInfo = {};

  private privateInfoShow: boolean = false;

  private togglePrivateInfo() {
    if (this.privateInfoShow === false && !this.privateInfo.license) {
      this.getPrivateInfo();
    }
    this.privateInfoShow = !this.privateInfoShow;
  }

  private async getPrivateInfo() {
    const rsp = await UserService.getPrivateInfo();
    this.privateInfo = rsp.privateInfo;
  }

  private async updatePrivateInfo() {
    await UserService.updatePrivateInfo(this.privateInfo);
  }

  private async updateUserInfo() {
    await UserService.updateUserInfo(this.userInfo);
    await UserService.getUserInfo(this.authorization.userID);
  }
}
</script>

<style scoped></style>
