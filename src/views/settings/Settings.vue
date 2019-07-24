<template>
  <v-app>
    <v-app-bar flat fixed app class="navbar">
      <span class="font-weight-black navbar-logo ml-1">
        Phase 设置
        <span class="grey--text font-weight-regular">{{$route.meta}}</span>
      </span>
      <v-spacer></v-spacer>
      <v-btn icon :to="lastPage">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container grid-list-lg fluid fill-height>
        <v-layout row wrap>
          <v-flex xs3>
            <v-list color="transparent" dense shaped>
              <v-list-item-group color="primary">
                <transition-group appear appear-active-class="fade-up-enter">
                  <div v-for="(item, i) in settingsItems" :key="i">
                    <v-subheader class="mt-3" v-if="item.title">{{item.title}}</v-subheader>
                    <v-list-item v-else :to="item.route">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </transition-group>
              </v-list-item-group>
            </v-list>
          </v-flex>
          <v-flex xs9>
            <transition appear appear-active-class="fade-up-enter">
              <v-card>
                <v-container fill-height fluid grid-list-lg style="padding:20px">
                  <router-view></router-view>
                </v-container>
              </v-card>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      settingsItems: [
        { title: "通用" },
        { text: "个人信息", icon: "mdi-account", route: "/settings/profile" },
        { text: "通知", icon: "mdi-bell", route: "/settings/notification" },
        { title: "安全" },
        { text: "密码", icon: "mdi-textbox-password" },
        { text: "二次验证", icon: "mdi-shield-lock" }
      ]
    };
  },
  computed: {
    ...mapGetters({ lastPage: "system/lastPage" })
  }
};
</script>

<style>
</style>
