<template>
  <v-app>
    <v-app-bar dense flat fixed app class="navbar">
      <span
        class="ml-1 font-weight-black navbar-logo app-bar-text text-none subtitle-1"
      >{{systemName}} 设置</span>
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
                  <v-flex xs8 offset-2>
                    <router-view></router-view>
                  </v-flex>
                </v-container>
              </v-card>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const systemModule = namespace("system");

@Component
export default class Settings extends Vue {
  @systemModule.Getter("lastPage") private lastPage: any;
  @systemModule.Getter("systemName") private systemName!: string;

  private settingsItems = [
    { title: "通用" },
    {
      text: "个人信息",
      icon: "mdi-account-circle-outline",
      route: "/settings/profile"
    },
    {
      text: "通知",
      icon: "mdi-bell-outline",
      route: "/settings/notification"
    },
    { title: "安全" },
    { text: "密码", icon: "mdi-textbox-password" },
    { text: "二次验证", icon: "mdi-key-outline" }
  ];
}
</script>

<style scoped>
</style>
