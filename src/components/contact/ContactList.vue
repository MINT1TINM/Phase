<template>
  <v-layout>
    <v-flex
      xs3
      class="inner-sidebar-withoutpadding"
      style="height:calc(100vh - 48px);overflow-y:auto"
    >
      <v-toolbar flat class="transparent" dense>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="createUserDialog=true" text v-if="privilege.indexOf(`god`)!=-1">
            <v-icon size="20">mdi-plus</v-icon>&nbsp;新建用户
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list nav dense two-line color="transparent">
        <v-list-item
          :class="item.id === currentContactID?`v-list-item--active`:``"
          v-for="(item,i) in userList"
          :key="`user-${i}`"
          @click="showInfo(item)"
        >
          <v-list-item-avatar>
            <v-avatar color="primary" size="32">
              <img v-if="item.headImgURL" :src="item.headImgURL | httpsfy" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{item.nickName}}</v-list-item-title>
            <v-list-item-subtitle class="caption grey--text">{{item.phone}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
    <v-flex xs9>
      <contact-info :userID="currentContactID"></contact-info>
    </v-flex>

    <v-dialog persistent v-model="createUserDialog" width="300">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-black subtitle-1">新建用户</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-form ref="createUserForm">
            <v-text-field
              v-model="newUserName"
              class="text-field-semidense"
              single-line
              hide-details
              :rules="[v => !!v || '']"
              outlined
              label="用户名"
            ></v-text-field>
            <v-text-field
              v-model="newNickName"
              class="text-field-semidense mt-3"
              single-line
              hide-details
              :rules="[v => !!v || '']"
              outlined
              label="昵称"
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              class="text-field-semidense mt-3"
              single-line
              hide-details
              outlined
              label="密码"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary" depressed @click="createUser">确认</v-btn>
          <v-btn rounded text @click="createUserDialog=false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Authorization, UserInfo } from "@/types/user";
import UserService from "@/service/userService";
import contactInfo from "./ContactInfo.vue";

const userModule = namespace("user");
const contactModule = namespace("contact");

@Component({
  components: {
    "contact-info": contactInfo
  }
})
export default class ContactList extends Vue {
  @userModule.Getter("privilege") private privilege!: string[];
  @userModule.Getter("authorization") private authorization!: Authorization;
  @contactModule.Getter("currentContactID") private currentContactID!: string;
  @contactModule.Mutation("updateCurrentContactID")
  private updateCurrentContactID!: (v: string) => void;

  private userList: UserInfo[] = [];
  private createUserDialog: boolean = false;

  private newUserName = "";
  private newNickName = "";
  private newPassword = "";

  private async getUserList() {
    const rsp = await UserService.getUserList();
    this.userList = rsp.user;
  }

  private async createUser() {
    await UserService.createUser(
      this.newUserName,
      this.newNickName,
      this.newPassword
    );
    this.createUserDialog = false;
    this.newUserName = "";
    this.newNickName = "";
    this.newPassword = "";
    this.getUserList();
  }

  private showInfo(user: UserInfo) {
    console.log(user.id);
    this.updateCurrentContactID(user.id!);
  }

  private mounted() {
    this.getUserList();
  }
}
</script>

<style scoped>
</style>
