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
          <v-flex xs2 style="position:fixed;width:100%">
            <v-list color="transparent" dense shaped>
              <v-list-item-group color="primary">
                <transition-group appear appear-active-class="fade-up-enter">
                  <div v-for="(item, i) in settingsItems" :key="`setting-${i}`">
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
          <v-flex xs10 offset-2>
            <transition appear appear-active-class="fade-up-enter">
              <v-flex xs8 offset-2>
                <v-card>
                  <v-toolbar fixed flat class="transparent">
                    <v-toolbar-title class="subtitle-1 font-weight-black ml-2">{{$route.meta}}</v-toolbar-title>
                  </v-toolbar>
                  <v-container fill-height fluid grid-list-lg class="px-4 pb-4 pt-0">
                    <div style="width:100%">
                      <router-view></router-view>
                    </div>
                  </v-container>
                </v-card>
              </v-flex>
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
    {
      text: "个人信息",
      icon: "mdi-account-circle-outline",
      route: "/settings/profile"
    },
    {
      text: "隐私",
      icon: "mdi-shield-key-outline",
      route: "/settings/privacy"
    },
    {
      text: "安全",
      icon: "mdi-lock-outline",
      route: "/settings/security"
    }
    // {
    //   text: "通知",
    //   icon: "mdi-bell-outline",
    //   route: "/settings/notification"
    // }
  ];
}
</script>

<style scoped>
</style>
