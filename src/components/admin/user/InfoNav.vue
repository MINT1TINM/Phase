<template>
  <v-layout fill-height>
    <transition appear appear-active-class="fade-up-enter">
      <v-container fluid>
        <v-layout>
          <div class="pa-2">
            <v-avatar color="primary darken-2" size="100">
              <img
                v-if="userInfo.headImgURL"
                :src="userInfo.headImgURL | httpsfy"
              />
              <span v-else class="headline font-weight-black white--text">{{
                userInfo.nickName | avatar
              }}</span>
            </v-avatar>
          </div>
          <v-flex class="pl-3">
            <v-layout align-center fill-height>
              <h2>{{ userInfo.nickName }}</h2>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-tabs v-model="tab" class="mt-2" background-color="transparent">
          <v-tab href="#info">信息</v-tab>
          <v-tab href="#activity">权限</v-tab>
          <v-tab href="#security">安全</v-tab>
          <v-tab href="#operations">操作</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <div style="height:calc(100vh - 185px);overflow-y:auto">
          <v-container v-if="tab === `info`" fluid grid-list-md>
            <v-layout row wrap>
              <v-flex class="d-flex align-stretch" xs4 v-if="userInfo.phone">
                <v-card width="100%" outlined>
                  <v-card-title class="caption grey--text font-weight-black"
                    >移动电话</v-card-title
                  >
                  <v-card-text>
                    <h4>{{ userInfo.phone }}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex class="d-flex align-stretch" xs4 v-if="userInfo.email">
                <v-card width="100%" outlined>
                  <v-card-title class="caption grey--text font-weight-black"
                    >电子邮件</v-card-title
                  >
                  <v-card-text>
                    <h4>{{ userInfo.email }}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex class="d-flex align-stretch" xs4>
                <v-card width="100%" outlined>
                  <v-card-title class="caption grey--text font-weight-black"
                    >加入时间</v-card-title
                  >
                  <v-card-text>
                    <h4>{{ userInfo.createdAt | format('yyyy-MM-dd') }}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-else-if="tab === `activity`" fluid grid-list-md>
            <v-flex xs4 v-if="privilege.indexOf(`god`) !== -1">
              <v-card outlined>
                <v-card-title class="caption grey--text font-weight-black"
                  >系统权限</v-card-title
                >
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
            <div class="subtitle-2 pl-0 mt-6 mb-1">应用程序</div>
            <div class="caption pl-0 mb-2">*对管理员用户无效</div>
            <v-card outlined flat>
              <v-list nav dense>
                <v-list-item-group multiple v-model="userInfo.applicationList">
                  <template v-for="(item, i) in selectableAppList">
                    <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                    <v-list-item
                      style="pointer-events:none"
                      v-else
                      :key="`item-${i}`"
                      :value="item.nameEn"
                    >
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-avatar>
                          <v-img :src="item.icon"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>

                        <!-- app access -->
                        <v-list-item-action style="pointer-events:auto">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-checkbox
                                v-on="on"
                                :input-value="active"
                                :true-value="item.nameEn"
                                @click="toggle"
                              ></v-checkbox>
                            </template>
                            <span class="caption">使用权</span>
                          </v-tooltip>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
              <v-layout row wrap justify-center class="my-3">
                <v-flex xs8>
                  <v-btn @click="updateUserAppList" block rounded depressed>
                    <v-icon size="20">mdi-content-save-outline</v-icon
                    >&nbsp;保存
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>

            <AppAccess
              :permission="userInfo.permission"
              :userID="userID"
              @getUserInfo="getUserInfo"
            ></AppAccess>
          </v-container>
          <v-container v-else-if="tab === `security`" fluid grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-subheader class="subtitle-2 pl-0 mb-0"
                  >近期登录历史</v-subheader
                >
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
                        <tr
                          v-for="(item, i) in loginHistory"
                          :key="`login-${i}`"
                        >
                          <td class="caption text-center">
                            {{ item.time | format('yyyy-MM-dd hh:mm:ss') }}
                          </td>
                          <td class="caption text-center">
                            {{ item.ip.split(':')[0] }}
                          </td>
                          <td class="caption text-center">{{ item.os }}</td>
                          <td class="caption text-center">
                            {{ item.browser }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-else-if="tab === `operations`" fluid grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs8>
                <v-btn
                  @click="deleteUser"
                  block
                  rounded
                  depressed
                  color="error"
                >
                  <v-icon size="20">mdi-delete-outline</v-icon>&nbsp;释放账户
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-container>
    </transition>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import UserService from '@/service/userService';
import { UserInfo, Login } from '@/types/user';
import { App } from '@/types/system';
import AppAccess from './AppAccess.vue';

const userModule = namespace('user');
const systemModule = namespace('system');

@Component({
  components: {
    AppAccess
  }
})
export default class AdminUserInfoNav extends Vue {
  @Prop(String) public userID!: string;

  @userModule.Getter('privilege') private privilege!: string[];

  @systemModule.Getter('permissionList') private permissionList: any;

  @systemModule.Getter('appList') private applicationList!: App[];

  private userInfo: UserInfo = new UserInfo();

  private appAccessNav: boolean = false;

  private tab = null;

  private loginHistory: Login[] = [];

  private async updateUserPrivilege(privilege: string[]) {
    console.log(privilege);
    await UserService.updatePrivilege(this.userID, privilege);
  }

  private async updateUserAppList() {
    console.log(this.userInfo.applicationList);
    await UserService.updateUserAppList(
      this.userID,
      this.userInfo.applicationList || []
    );
  }

  private async getUserLoginHistory() {
    const rsp = await UserService.getUserLoginHistory(this.userID);
    this.loginHistory = rsp.loginHistory;
  }

  private async getUserInfo() {
    const rsp = await UserService.getOtherUserInfo(this.userID);
    this.userInfo = rsp.userInfo;
  }

  private async deleteUser() {
    const res = await this.$confirm('此操作无法还原', {
      title: '确认释放?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await UserService.deleteUser(this.userInfo.id || '');
      this.$emit('closeNav');
    }
  }

  private get selectableAppList() {
    return this.applicationList.slice(0, this.applicationList.length - 1);
  }

  @Watch('userID')
  private async onUserIDChanged() {
    this.userInfo = new UserInfo();
  }

  private async mounted() {
    this.userInfo = new UserInfo();
    if (this.userID) {
      this.getUserInfo();
      this.getUserLoginHistory();
    }
  }
}
</script>

<style scoped></style>
