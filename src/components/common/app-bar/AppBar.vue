<template>
  <v-app-bar dense flat app fixed clipped-left class="navbar">
    <!-- app switcher toggle -->
    <v-toolbar-items text style="margin-left:-16px">
      <v-btn width="62" icon @click="toggleAppSwitcher">
        <v-icon size="23">mdi-apps</v-icon>
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items text class="mr-2">
      <v-btn
        text
        style="padding:0 5px"
        class="font-weight-black navbar-logo app-bar-text text-none subtitle-1"
        @click="goHome"
      >{{systemName}}</v-btn>
    </v-toolbar-items>
    <v-divider vertical inset></v-divider>

    <!-- current app  -->
    <v-toolbar-items text class="ml-2" v-if="currentRoute!==`home`">
      <template>
        <v-btn style="padding:0 5px" text @click="toCurrentAppHome">{{currentApp.name}}</v-btn>
      </template>
    </v-toolbar-items>

    <project-bar v-if="currentApp.route==='project'"></project-bar>

    <v-spacer></v-spacer>

    <!-- notification center -->

    <v-badge overlap style="height:100%">
      <template v-slot:badge class="caption">
        <small>{{invitationList.length}}</small>
      </template>
      <v-toolbar-items>
        <v-btn text class="app-bar-btn" @click="toggleNotificationCenter(true)">
          <v-icon size="20">mdi-bell-outline</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-badge>

    <!-- user menu -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-toolbar-items style="margin-right:-20px">
          <v-btn class="app-bar-btn" text v-on="on">
            <v-avatar color="primary" size="32">
              <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
              <span v-else-if="userInfo.nickname" class="white--text">{{nickName | avatar}}</span>
              <span v-else class="white--text">{{userInfo.username | avatar}}</span>
            </v-avatar>
          </v-btn>
        </v-toolbar-items>
      </template>
      <v-list dense>
        <v-list-item class="pb-2">
          <v-list-item-avatar color="primary" size="36">
            <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
            <span v-else-if="userInfo.nickname" class="white--text">{{nickName | avatar}}</span>
            <span v-else class="white--text">{{userInfo.username | avatar}}</span>
          </v-list-item-avatar>
          <v-list-item-title>
            <div v-if="userInfo.nickName">{{userInfo.nickName}}</div>
            <div v-else>{{userInfo.username}}</div>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in userMenu"
          :key="`userMenu-${i}`"
          @click="userMenuActions(i)"
        >
          <v-list-item-avatar>
            <v-icon size="25">{{item.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title class="text-uppercase">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import projectBar from "./modules/ProjectBar.vue";
import { Invitation } from "@/types/project";

const userModule = namespace("user");
const systemModule = namespace("system");

@Component({
  components: {
    "project-bar": projectBar
  }
})
export default class AppBar extends Vue {
  private userMenu = [
    {
      icon: "mdi-settings-outline",
      title: "设置"
    },
    {
      icon: "mdi-logout-variant",
      title: "注销"
    }
  ];

  @userModule.Getter("userInfo") private userInfo: any;
  @userModule.Mutation("clearAuthorization") private clearAuthorization: any;
  @userModule.Mutation("clearUserInfo") private clearUserInfo: any;

  @systemModule.Mutation("toggleFullScreenLoading")
  private toggleFullScreenLoading: any;
  @systemModule.Mutation("toggleAppSwitcher") private toggleAppSwitcher: any;
  @systemModule.Mutation("toggleNotificationCenter")
  private toggleNotificationCenter: any;
  @systemModule.Getter("invitationList") private invitationList!: Invitation[];
  @systemModule.Getter("systemName") private systemName!: string;

  @systemModule.Mutation("updateLastPage") private updateLastPage: any;
  @systemModule.Getter("appList") private appList: any;

  private async userMenuActions(num: number) {
    switch (num) {
      case 0:
        // setting
        this.updateLastPage(this.$route.fullPath);
        this.$router.push({ path: "/settings/profile" });
        break;
      case 1:
        // exit

        const res = await this.$confirm("", {
          title: "确认注销?",
          buttonTrueColor: "primary"
        });
        if (res) {
          this.clearAuthorization();
          this.clearUserInfo();

          this.$router.push({ path: "/" });
        }

        // this.$router.push({ path: "/" });
        break;
    }
  }

  private toCurrentAppHome() {
    this.$router.push({ path: `/${this.currentApp.route}` });
  }

  private goHome() {
    this.$router.push({ path: `/home` });
  }

  get nickName() {
    return this.userInfo.nickname.substring(0, 1);
  }
  get currentRoute() {
    return this.$route.fullPath.split("/")[1];
  }
  get currentApp() {
    if (this.currentRoute !== "home") {
      return this.appList.find((e: any) => {
        return this.currentRoute === e.route;
      });
    }
    return "";
  }
}
</script>

<style>
.v-badge--overlap .v-badge__badge {
  top: 4px !important;
  right: 4px;
  pointer-events: none;
}
</style>
