<template>
  <v-layout fill-height>
    <transition appear appear-active-class="fade-up-enter">
      <v-container fluid>
        <v-layout>
          <div class="pa-2">
            <v-avatar color="primary" size="100">
              <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
              <span
                v-else
                class="headline font-weight-black white--text"
              >{{userInfo.nickName | avatar}}</span>
            </v-avatar>
          </div>
          <v-flex class="pl-3">
            <v-layout align-center fill-height>
              <h2>{{userInfo.nickName}}</h2>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-tabs v-model="tab" class="mt-2" background-color="transparent">
          <v-tab href="#info">信息</v-tab>
          <v-tab href="#activity">动态</v-tab>
          <v-tab href="#security">安全</v-tab>
          <v-tab href="#operations">操作</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-container v-if="tab===`info`" fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs4 v-if="privilege.indexOf(`god`)!==-1">
              <v-card outlined>
                <v-card-title class="caption grey--text font-weight-black">权限</v-card-title>
                <v-card-text>
                  <v-select
                    dense
                    class="font-weight-black"
                    chips
                    outlined
                    :items="permissionList"
                    item-text="text"
                    item-value="value"
                    multiple
                    @change="updateUserPrivilege"
                    single-line
                    hide-details
                    v-model="userInfo.privilege"
                  ></v-select>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex class="d-flex align-stretch" xs4 v-if="userInfo.phone">
              <v-card width="100%" outlined>
                <v-card-title class="caption grey--text font-weight-black">移动电话</v-card-title>
                <v-card-text>
                  <h4>{{userInfo.phone}}</h4>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex class="d-flex align-stretch" xs4 v-if="userInfo.email">
              <v-card width="100%" outlined>
                <v-card-title class="caption grey--text font-weight-black">电子邮件</v-card-title>
                <v-card-text>
                  <h4>{{userInfo.email}}</h4>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex class="d-flex align-stretch" xs4>
              <v-card width="100%" outlined>
                <v-card-title class="caption grey--text font-weight-black">加入时间</v-card-title>
                <v-card-text>
                  <h4>{{userInfo.createdAt | format("yyyy-MM-dd")}}</h4>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container v-else-if="tab===`activity`" fluid grid-list-md>
          <v-layout row wrap>xxxxx</v-layout>
        </v-container>
        <v-container v-else-if="tab===`security`" fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <v-subheader class="subtitle-2 pl-0 mb-0">近期登录历史</v-subheader>
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
                      <tr v-for="(item,i) in loginHistory" :key="`login-${i}`">
                        <td
                          class="caption text-center"
                        >{{ item.time | format("yyyy-MM-dd hh:mm:ss") }}</td>
                        <td class="caption text-center">{{ item.ip.split(":")[0] }}</td>
                        <td class="caption text-center">{{ item.os }}</td>
                        <td class="caption text-center">{{ item.browser }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container v-else-if="tab===`operations`" fluid grid-list-md>
          <v-layout row wrap justify-center>
            <v-flex xs8>
              <v-btn @click="deleteUser" block rounded depressed color="error">
                <v-icon size="20">mdi-delete-outline</v-icon>释放账户
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </transition>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import UserService from "@/service/userService";
import { UserInfo, Login } from "@/types/user";
import { namespace } from "vuex-class";

const userModule = namespace("user");
const systemModule = namespace("system");

@Component
export default class AdminUserInfoNav extends Vue {
  @Prop(String) public userID!: string;

  @userModule.Getter("privilege") private privilege!: string[];
  @systemModule.Getter("permissionList") private permissionList: any;

  private userInfo: UserInfo = {
    city: "",
    country: "",
    headImgURL: "",
    nickName: "",
    openid: "",
    privilege: [],
    project: {
      data: []
    },
    province: "",
    sex: "",
    unionid: ""
  };
  private tab = null;
  private loginHistory: Login[] = [];

  private async updateUserPrivilege(privilege: string[]) {
    console.log(privilege);
    await UserService.updatePrivilege(this.userID, privilege);
  }

  private async getUserLoginHistory() {
    const rsp = await UserService.getUserLoginHistory(this.userID);
    this.loginHistory = rsp.loginHistory;
  }

  private async deleteUser() {
    const res = await this.$confirm("此操作无法还原", {
      title: "确认释放?",
      buttonTrueColor: "primary",
      dark: this.$vuetify.theme.dark
    });
    if (res) {
    }
  }

  @Watch("userID")
  private async onUserIDChanged() {
    this.userInfo = {
      city: "",
      country: "",
      headImgURL: "",
      nickName: "",
      openid: "",
      privilege: [],
      project: {
        data: []
      },
      province: "",
      sex: "",
      unionid: ""
    };
    if (this.userID) {
      const rsp = await UserService.getOtherUserInfo(this.userID);
      this.userInfo = rsp.userInfo;
      this.getUserLoginHistory();
    }
  }

  private async mounted() {
    this.userInfo = {
      city: "",
      country: "",
      headImgURL: "",
      nickName: "",
      openid: "",
      privilege: [],
      project: {
        data: []
      },
      province: "",
      sex: "",
      unionid: ""
    };
    if (this.userID) {
      const rsp = await UserService.getOtherUserInfo(this.userID);
      this.userInfo = rsp.userInfo;
      this.getUserLoginHistory();
    }
  }
}
</script>

<style scoped>
</style>
