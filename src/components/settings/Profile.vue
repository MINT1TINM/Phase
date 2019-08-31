<template>
  <div>
    <v-form ref="userProfile">
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
            >{{nickName | avatar}}</span>
            <span v-else class="white--text text-uppercase">{{userInfo.username | avatar}}</span>
          </v-avatar>
          <v-btn class="ml-5" outlined color="primary">修改</v-btn>
        </v-list-item>
      </v-list>
      <v-divider class="my-3"></v-divider>

      <dim-form class="mt-4" keyName="profile" :formContent="profileList" :target="userInfo"></dim-form>
    </v-form>
    <v-layout justify-center class="pt-5">
      <v-flex xs6>
        <v-btn block rounded depressed color="primary" @click="updateUserInfo()">保存</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import UserService from "@/service/userService";
import { Authorization, UserInfo } from "@/types/user";

const userModule = namespace("user");

@Component({
  components: {}
})
export default class Profile extends Vue {
  @userModule.Getter("userInfo") private userInfo!: any;
  @userModule.Getter("authorization") private authorization!: Authorization;
  private profileList = [
    {
      type: "text-field",
      title: "用户名",
      name: "username",
      disabled: true
    },
    {
      type: "text-field",
      title: "昵称",
      name: "nickName"
    },
    {
      type: "select",
      title: "性别",
      name: "sex",
      text: "title",
      value: "value",
      chips: false,
      list: [
        {
          value: 0,
          title: "男"
        },
        {
          value: 1,
          title: "女"
        }
      ]
    },
    {
      type: "text-field",
      title: "移动电话",
      name: "phone"
    },
    {
      type: "text-field",
      title: "电子邮箱",
      name: "email"
    }
  ];

  private async updateUserInfo() {
    await UserService.updateUserInfo(this.userInfo);
    await UserService.getUserInfo(this.authorization.userID);
  }
}
</script>

<style scoped>
</style>
