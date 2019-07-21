<template>
  <v-app>
    <v-app-bar flat fixed app class="navbar">
      <span class="font-weight-black navbar-logo ml-1">
        Phase 设置
        <span class="grey--text font-weight-regular">{{$route.meta}}</span>
      </span>
      <v-spacer></v-spacer>
      <v-btn icon :to="'/dashboard/timeline'">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container grid-list-lg fluid fill-height>
        <v-layout row wrap>
          <v-flex xs3>
            <v-list color="transparent" dense shaped>
              <v-list-item-group color="primary">
                <div v-for="(item, i) in settingsItems" :key="i">
                  <v-subheader v-if="item.title">{{item.title}}</v-subheader>
                  <v-list-item v-else :to="item.route">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list-item-group>
            </v-list>
          </v-flex>
          <v-flex xs9>
            <v-card>
              <v-container fill-height fluid grid-list-lg style="padding:20px">
                <router-view></router-view>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      settingsItems: [
        { title: "通用" },
        { text: "个人信息", icon: "mdi-account", route: "/settings/profile" },
        { text: "通知", icon: "mdi-bell", route: "/settings/notification" }
      ]
    };
  }
};
</script>

<style>
</style>
