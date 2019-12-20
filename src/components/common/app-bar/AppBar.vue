<template>
  <v-app-bar dense flat app fixed clipped-left class="navbar">
    <!-- app switcher toggle -->
    <v-toolbar-items text style="margin-left:-16px">
      <v-btn width="62" icon @click="toggleAppSwitcher">
        <v-avatar size="24">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            xmlns:serif="http://www.serif.com/"
            class="app-icon"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          >
            <path
              d="M6,8C7.1,8 8,7.1 8,6C8,4.9 7.1,4 6,4C4.9,4 4,4.9 4,6C4,7.1 4.9,8 6,8ZM12,20C13.1,20 14,19.1 14,18C14,16.9 13.1,16 12,16C10.9,16 10,16.9 10,18C10,19.1 10.9,20 12,20ZM6,20C7.1,20 8,19.1 8,18C8,16.9 7.1,16 6,16C4.9,16 4,16.9 4,18C4,19.1 4.9,20 6,20ZM6,14C7.1,14 8,13.1 8,12C8,10.9 7.1,10 6,10C4.9,10 4,10.9 4,12C4,13.1 4.9,14 6,14ZM12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14ZM16,6C16,7.1 16.9,8 18,8C19.1,8 20,7.1 20,6C20,4.9 19.1,4 18,4C16.9,4 16,4.9 16,6ZM12,8C13.1,8 14,7.1 14,6C14,4.9 13.1,4 12,4C10.9,4 10,4.9 10,6C10,7.1 10.9,8 12,8ZM18,14C19.1,14 20,13.1 20,12C20,10.9 19.1,10 18,10C16.9,10 16,10.9 16,12C16,13.1 16.9,14 18,14ZM18,20C19.1,20 20,19.1 20,18C20,16.9 19.1,16 18,16C16.9,16 16,16.9 16,18C16,19.1 16.9,20 18,20Z"
              style="fill-rule:evenodd;"
            />
          </svg>
        </v-avatar>
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items text class="mr-2">
      <v-btn
        text
        class="font-weight-black text-none subtitle-1 px-2"
        color="primary"
        @click="goHome"
        >{{ systemName }}</v-btn
      >
    </v-toolbar-items>
    <v-divider vertical inset></v-divider>

    <!-- current app  -->
    <v-toolbar-items
      text
      class="ml-2"
      v-if="currentRoute !== `home` && currentApp"
    >
      <template>
        <v-btn style="padding:0 5px" text @click="toCurrentAppHome">{{
          currentApp.name
        }}</v-btn>
      </template>
    </v-toolbar-items>

    <project-bar
      v-if="currentApp && currentApp.nameEn === 'project'"
    ></project-bar>
    <finance-bar
      v-if="currentApp && currentApp.nameEn === 'finance'"
    ></finance-bar>
    <audit-bar v-if="currentApp && currentApp.nameEn === 'audit'"></audit-bar>
    <ticket-bar
      v-if="currentApp && currentApp.nameEn === 'ticket'"
    ></ticket-bar>

    <v-spacer></v-spacer>
    <v-divider vertical inset></v-divider>
    <!-- notification center -->

    <v-badge overlap style="height:100%">
      <template v-if="invitationList.length >= 1" v-slot:badge class="caption">
        <small>{{ invitationList.length }}</small>
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
            <v-avatar color="primary darken-2" size="32">
              <img
                v-if="userInfo.headImgURL"
                :src="userInfo.headImgURL | httpsfy"
              />
              <span v-else-if="userInfo.nickname" class="white--text">{{
                nickName | avatar
              }}</span>
              <span v-else class="white--text">{{
                userInfo.username | avatar
              }}</span>
            </v-avatar>
          </v-btn>
        </v-toolbar-items>
      </template>
      <v-list dense>
        <v-list-item class="pb-2">
          <v-list-item-avatar color="primary">
            <v-avatar color="primary darken-2" size="36">
              <img
                v-if="userInfo.headImgURL"
                :src="userInfo.headImgURL | httpsfy"
              />
              <span
                v-else-if="userInfo.nickname"
                class="white--text text-uppercase"
                >{{ nickName | avatar }}</span
              >
              <span v-else class="white--text text-uppercase">{{
                userInfo.username | avatar
              }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            <div v-if="userInfo.nickName">{{ userInfo.nickName }}</div>
            <div v-else>{{ userInfo.username }}</div>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in userMenu"
          :key="`userMenu-${i}`"
          @click="userMenuActions(i)"
        >
          <v-list-item-avatar>
            <v-icon size="25">{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title class="text-uppercase">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import projectBar from './modules/ProjectBar.vue';
import financeBar from './modules/FinanceBar.vue';
import auditBar from './modules/AuditBar.vue';
import ticketBar from './modules/TicketBar.vue';
import { Invitation } from '@/types/project';
import { App } from '@/types/system';

const userModule = namespace('user');
const systemModule = namespace('system');

@Component({
  components: {
    'project-bar': projectBar,
    'finance-bar': financeBar,
    'audit-bar': auditBar,
    'ticket-bar': ticketBar
  }
})
export default class AppBar extends Vue {
  private userMenu = [
    {
      icon: 'mdi-settings-outline',
      title: '设置'
    },
    {
      icon: 'mdi-logout-variant',
      title: '注销'
    }
  ];

  @userModule.Getter('userInfo') private userInfo: any;

  @userModule.Mutation('clearAuthorization') private clearAuthorization: any;

  @userModule.Mutation('clearUserInfo') private clearUserInfo: any;

  @systemModule.Mutation('toggleFullScreenLoading')
  private toggleFullScreenLoading: any;

  @systemModule.Mutation('toggleAppSwitcher') private toggleAppSwitcher: any;

  @systemModule.Mutation('toggleNotificationCenter')
  private toggleNotificationCenter: any;

  @systemModule.Getter('invitationList') private invitationList!: Invitation[];

  @systemModule.Getter('systemName') private systemName!: string;

  @systemModule.Mutation('updateLastPage') private updateLastPage: any;

  @systemModule.Getter('appList') private appList!: App[];

  private async userMenuActions(num: number) {
    switch (num) {
      case 0:
        // setting
        // this.updateLastPage(this.$route.fullPath);
        // this.$router.push({ path: '/settings/profile' });
        window.location.href = '/settings';
        break;
      case 1:
        // exit

        // eslint-disable-next-line no-case-declarations
        const res = await this.$confirm('', {
          title: '确认注销?',
          buttonTrueColor: 'primary',
          dark: this.$vuetify.theme.dark
        });
        if (res) {
          this.clearAuthorization();
          this.clearUserInfo();

          window.location.href = '/login';
        }
        break;
    }
  }

  private toCurrentAppHome() {
    this.$router.push({ path: '/' });
  }

  private goHome() {
    window.location.href = '/home';
  }

  get nickName() {
    return this.userInfo.nickname.substring(0, 1);
  }

  get currentRoute() {
    return window.location.pathname.split('/')[1];
  }

  get currentApp() {
    if (this.currentRoute !== 'home') {
      return this.appList.find(
        (e: any) => this.currentRoute === e.route.split('/')[0]
      );
    }
    return undefined;
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
