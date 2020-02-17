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

    <!--  info -->
    <div class="pa-2 mt-5">
      <v-subheader class="subtitle-2 px-0 mb-0">
        隐私
        <v-spacer></v-spacer>
        <v-btn text rounded @click="toggleInfo()">
          <div v-if="InfoShow"><v-icon>mdi-chevron-up</v-icon>隐藏</div>
          <div v-else><v-icon>mdi-chevron-down</v-icon>显示</div>
        </v-btn>
      </v-subheader>
      <v-divider class="mb-2"></v-divider>
    </div>
    <div v-if="InfoShow">
      <dim-form
        class="mt-4"
        keyName="profile"
        :formContent="InfoList"
        :target="Info"
      ></dim-form>
      <v-layout justify-center class="pt-5">
        <v-flex xs6>
          <v-btn block rounded depressed color="primary" @click="updateInfo()"
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
import { Authorization, UserInfo, Info } from '@/types/user';

const userModule = namespace('user');

@Component({
  components: {}
})
export default class Profile extends Vue {
  @userModule.Getter('userInfo') userInfo!: any;

  @userModule.Getter('authorization') authorization!: Authorization;

  profileList = [
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

  InfoList = [
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

  Info: Info = new Info();

  InfoShow: boolean = false;

  toggleInfo() {
    if (this.InfoShow === false && !this.Info.license) {
      this.getInfo();
    }
    this.InfoShow = !this.InfoShow;
  }

  async getInfo() {
    const rsp = await UserService.getInfo();
    this.Info = rsp.Info;
  }

  async updateInfo() {
    await UserService.updateInfo(this.Info);
  }

  async updateUserInfo() {
    await UserService.updateUserInfo(this.userInfo);
    await UserService.getUserInfo(this.authorization.userID);
  }
}
</script>

<style scoped></style>
