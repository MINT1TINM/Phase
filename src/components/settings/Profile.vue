
<template>
  <div style="width:100%">
    <v-layout row wrap>
      <v-container>
        <v-flex xs8 offset-2>
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
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import userService from "@/service/UserService";
import dimForm from "@/plugins/dim-form/Main";
export default {
  data() {
    return {
      dateMenu: [],
      profileList: [
        {
          type: "text-field",
          title: "用户名",
          content: "username",
          disabled: true
        },
        {
          type: "text-field",
          title: "昵称",
          content: "nickName"
        },
        {
          type: "select",
          title: "性别",
          content: "sex",
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
          content: "phone"
        },
        {
          type: "text-field",
          title: "电子邮箱",
          content: "email"
        }
      ]
    };
  },
  methods: {
    async updateUserInfo() {
      // console.log(this.userInfo);
      await userService.updateUserInfo(this.userInfo);
    }
  },
  mounted() {},
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  }
};
</script>

<style>
</style>
