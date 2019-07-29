<template>
  <v-app-bar flat app fixed clipped-left class="navbar hidden-sm-and-down">
    <v-btn icon @click="backHome">
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
            <span v-else-if="userInfo.nickname" class="white--text">{{nickName | avatar}}</span>
            <span v-else class="white--text">{{userInfo.username | avatar}}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item class="pb-2">
          <v-list-item-avatar color="primary" size="36">
            <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
            <span v-else-if="userInfo.nickname" class="white--text text-uppercase">{{nickName | avatar}}</span>
            <span v-else class="white--text text-uppercase">{{userInfo.username | avatar}}</span>
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
    },
    backHome() {
      this.$router.push({ path: "/home" });
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    }),
    nickName: function() {
      return this.userInfo.nickname.substring(0, 1);
    }
  }
};
</script>

<style>
</style>
