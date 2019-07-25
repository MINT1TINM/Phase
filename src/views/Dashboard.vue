<template>
  <v-app>
    <v-navigation-drawer expand-on-hover mini-variant-width="62" app clipped permanent>
      <v-list nav dense>
        <v-list-item link v-for="(item,i) in appList" :key="i" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app fixed clipped-left class="navbar hidden-sm-and-down">
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <span class="font-weight-black navbar-logo ml-1">
        Phase
        <span class="grey--text font-weight-regular">{{$route.meta}}</span>
      </span>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="primary" size="36">
              <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
              <span v-else-if="userInfo.nickname" class="white--text">{{nickName}}</span>
              <span v-else class="white--text">{{userInfo.username}}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item class="pb-2">
            <v-list-item-avatar>
              <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
              <span v-else-if="userInfo.nickname" class="white--text">{{nickName}}</span>
              <span v-else class="white--text">{{userInfo.username}}</span>
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
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      appList: [
        {
          icon: "mdi-chart-timeline",
          name: "时间线",
          route: "/dashboard/timeline"
        },
        {
          icon: "mdi-file-document-outline",
          name: "项目栏",
          route: "/dashboard/project"
        },
        {
          icon: "mdi-account-box-outline",
          name: "通讯录",
          route: "/dashboard/contact"
        }
      ],
      userMenu: [
        {
          icon: "mdi-settings",
          title: "设置"
        },
        {
          icon: "mdi-exit-to-app",
          title: "注销"
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      logOut: "user/logOut"
    }),
    ...mapMutations({
      updateLastPage: "system/updateLastPage"
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
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    }),
    nickName: function() {
      return this.userInfo.nickname.substring(0, 1);
    }
  },
  mounted() {}
};
</script>

