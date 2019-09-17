<template>
  <v-app id="app">
    <!-- loading -->
    <v-progress-linear
      :active="loading"
      :indeterminate="true"
      absolute
      top
      color="deep-purple accent-4"
      style="z-index:9"
    ></v-progress-linear>

    <!-- fullscreen loading -->
    <v-overlay
      :value="fullScreenLoading"
      :absolute="true"
      opacity="1"
      color="primary"
      style="z-index:9"
    >
      <v-card flat color="transparent">
        <v-container>
          <v-layout justify-center>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-layout>
        </v-container>
        <v-card-text class="text-xs-center font-weight-black">
          <strong>{{systemName}}</strong> 正在加载数据
        </v-card-text>
      </v-card>
    </v-overlay>

    <!-- app switcher -->
    <v-navigation-drawer v-model="appSwitcherShow" fixed temporary class="acrylic">
      <app-switcher v-if="appSwitcherShow" style="height:calc(100vh - 48px);"></app-switcher>
    </v-navigation-drawer>

    <!-- notification center -->
    <v-navigation-drawer v-model="notificationCenterShow" fixed right temporary class="acrylic">
      <notification-center v-if="notificationCenterShow" style="height:calc(100vh - 48px);"></notification-center>
    </v-navigation-drawer>

    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import appSwitcher from "@/components/common/app-switcher/AppSwitcher.vue";
import notificationCenter from "@/components/common/notification-center/NotificationCenter.vue";

const systemModule = namespace("system");

@Component({
  components: {
    "app-switcher": appSwitcher,
    "notification-center": notificationCenter
  }
})
export default class App extends Vue {
  @systemModule.Getter("fullScreenLoading") private fullScreenLoading: any;
  @systemModule.Getter("loading") private loading: any;
  @systemModule.Getter("appSwitcher") private appSwitcher: any;
  @systemModule.Mutation("toggleAppSwitcher") private toggleAppSwitcher: any;
  @systemModule.Getter("notificationCenter") private notificationCenter: any;
  @systemModule.Mutation("toggleNotificationCenter")
  private toggleNotificationCenter: any;
  @systemModule.Getter("systemName") private systemName!: string;

  @systemModule.Mutation("toggleFullScreenLoading")
  private toggleFullScreenLoading: any;

  get appSwitcherShow() {
    return this.appSwitcher;
  }
  set appSwitcherShow(v) {
    this.toggleAppSwitcher(v);
  }

  get notificationCenterShow() {
    return this.notificationCenter;
  }
  set notificationCenterShow(v) {
    this.toggleNotificationCenter(v);
  }

  private mounted() {
    document.title = this.systemName;
    this.toggleFullScreenLoading(false);

    this.appSwitcherShow = this.appSwitcher;
    this.notificationCenterShow = this.notificationCenter;
  }
}
</script>


