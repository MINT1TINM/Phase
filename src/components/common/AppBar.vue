<template>
  <v-app-bar dense flat app fixed clipped-left class="navbar hidden-sm-and-down">
    <v-toolbar-items text style="margin-left:-20px">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" width="62" icon @click="toggleAppSwitcher">
            <v-icon size="23">mdi-apps</v-icon>
          </v-btn>
        </template>
        <span class="caption">切换应用</span>
      </v-tooltip>
    </v-toolbar-items>

    <v-toolbar-items text>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="goToAppHome">
            <v-icon size="23">mdi-home</v-icon>
          </v-btn>
        </template>
        <span class="caption">所有项目</span>
      </v-tooltip>
    </v-toolbar-items>

    <span class="font-weight-black navbar-logo ml-2 app-bar-text">
      Phase
      <span class="grey--text font-weight-regular">{{$route.meta}}</span>
    </span>

    <!-- project switcher -->
    <v-toolbar-items class="ml-2" v-if="currentProject">
      <v-menu :close-on-content-click="false" offset-y :nudge-width="200">
        <template v-slot:activator="{on}">
          <v-btn text v-on="on" class="text-none">
            {{currentProject.name}}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card tile>
          <v-container fluid>
            <v-text-field
              outlined
              single-line
              hide-details
              class="text-field-dense"
              label="搜索项目"
              v-model="searchProjectContent"
            ></v-text-field>
          </v-container>
          <v-divider></v-divider>
          <v-subheader class="font-weight-black">切换项目</v-subheader>
          <v-list dense>
            <v-list-item
              v-for="(item, i) in projectListShow"
              :key="`project-${i}`"
              @click="alterProject(item.id)"
            >
              <v-list-item-avatar>
                <v-icon size="25">{{item.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <!-- notification center -->
    <v-toolbar-items>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text class="app-bar-btn">
            <v-icon size="20">mdi-bell-outline</v-icon>
          </v-btn>
        </template>
        <span class="caption">通知</span>
      </v-tooltip>
    </v-toolbar-items>

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
            <span
              v-else-if="userInfo.nickname"
              class="white--text text-uppercase"
            >{{nickName | avatar}}</span>
            <span v-else class="white--text text-uppercase">{{userInfo.username | avatar}}</span>
          </v-list-item-avatar>
          <v-list-item-title>
            <div v-if="userInfo.nickName" class="text-uppercase">{{userInfo.nickName}}</div>
            <div v-else class="text-uppercase">{{userInfo.username}}</div>
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

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      userMenu: [
        {
          icon: "mdi-settings",
          title: "设置"
        },
        {
          icon: "mdi-exit-to-app",
          title: "注销"
        }
      ],
      projectListShow: [],
      searchProjectContent: ""
    };
  },
  methods: {
    ...mapActions({
      logOut: "user/logOut"
    }),
    ...mapMutations({
      updateLastPage: "system/updateLastPage",
      updateCurrentProjectID: "project/updateCurrentProjectID",
      toggleFullScreenLoading: "system/toggleFullScreenLoading",
      toggleAppSwitcher: "system/toggleAppSwitcher"
    }),
    async userMenuActions(num) {
      switch (num) {
        case 0:
          // setting
          this.updateLastPage(this.$route.fullPath);
          this.$router.push({ path: "/settings/profile" });
          break;
        case 1:
          // exit
          try {
            await this.$confirm("确认注销吗?");
            this.logOut();
            this.$router.push({ path: "/" });
          } catch (err) {
            break;
          }
          // this.$router.push({ path: "/" });
          break;
      }
    },
    goToAppHome() {
      this.$router.push({ path: "/project" });
    },
    alterProject(projectID) {
      this.toggleFullScreenLoading(true);
      // some loading content
      this.updateCurrentProjectID(projectID);

      setTimeout(() => {
        this.toggleFullScreenLoading(false);
      }, 500);
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      currentProject: "project/currentProject",
      projectList: "project/projectList"
    }),
    nickName() {
      return this.userInfo.nickname.substring(0, 1);
    }
  },
  mounted() {
    this.projectListShow = this.projectList;
  }
};
</script>


