<template>
  <v-layout>
    <v-flex
      xs12
      class="inner-sidebar-withoutpadding"
      style="height:calc(100vh - 48px);overflow-y:auto"
    >
      <v-toolbar class="transparent" dense>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            @click="createUserDialog = true"
            text
            v-if="privilege.indexOf(`god`) != -1"
          >
            <v-icon size="20">mdi-plus</v-icon>&nbsp;新建用户
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-simple-table class="transparent">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">昵称</th>
              <th class="text-left">真实姓名</th>
              <th class="text-left">移动电话</th>
              <th class="text-left">E-Mail</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in userList"
              :key="`user-${i}`"
              @click="showInfo(item)"
            >
              <td class="caption">{{ item.nickName }}</td>
              <td class="caption">{{ item.name }}</td>
              <td class="caption">{{ item.phone }}</td>
              <td class="caption">{{ item.email }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>

    <!-- userinfo nav -->
    <v-navigation-drawer width="800" right temporary fixed v-model="infoNav">
      <info-nav
        :userID="currentContactID"
        @closeNav="infoNav = false"
      ></info-nav>
    </v-navigation-drawer>

    <v-dialog persistent v-model="createUserDialog" width="300">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-black subtitle-1"
            >新建用户</v-toolbar-title
          >
        </v-toolbar>
        <v-container fluid>
          <v-form ref="createUserForm">
            <v-text-field
              v-model="newUserName"
              class="dense"
              single-line
              hide-details
              :rules="[v => !!v || '']"
              outlined
              label="用户名"
            ></v-text-field>
            <v-text-field
              v-model="newNickName"
              dense
              class="mt-3"
              single-line
              hide-details
              :rules="[v => !!v || '']"
              outlined
              label="昵称"
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              dense
              class="mt-3"
              single-line
              hide-details
              outlined
              label="密码"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary" depressed @click="createUser"
            >确认</v-btn
          >
          <v-btn rounded text @click="createUserDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import UserService from '@/service/userService';
import infoNav from './InfoNav.vue';

const userModule = namespace('user');
const contactModule = namespace('contact');

@Component({
  components: {
    'info-nav': infoNav
  }
})
export default class AdminUser extends Vue {
  @userModule.Getter('privilege') privilege!: string[];

  @userModule.Getter('authorization') authorization!: Authorization;

  @contactModule.Getter('currentContactID') currentContactID!: string;

  @contactModule.Mutation('updateCurrentContactID')
  updateCurrentContactID!: (v: string) => void;

  userList: UserInfo[] = [];

  createUserDialog: boolean = false;

  infoNav: boolean = false;

  newUserName = '';

  newNickName = '';

  newPassword = '';

  async getUserList() {
    const rsp = await UserService.getUserList();
    this.userList = rsp.user;
  }

  async createUser() {
    await UserService.createUser(
      this.newUserName,
      this.newNickName,
      this.newPassword
    );
    this.createUserDialog = false;
    this.newUserName = '';
    this.newNickName = '';
    this.newPassword = '';
    this.getUserList();
  }

  showInfo(user: UserInfo) {
    this.infoNav = true;
    console.log(user.id);
    this.updateCurrentContactID(user.id!);
  }

  mounted() {
    this.getUserList();
  }
}
</script>

<style scoped></style>
