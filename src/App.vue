<template>
  <div>
    <!-- loading -->
    <v-progress-linear
      :active="loading"
      :indeterminate="true"
      absolute
      top
      color="primary accent-4"
      style="z-index:9"
    ></v-progress-linear>

    <!-- fullscreen loading -->
    <v-overlay
      :value="fullScreenLoading"
      opacity="1"
      color="primary"
      style="z-index:9;height:100%"
    >
      <v-card flat color="transparent">
        <v-container>
          <v-layout justify-center>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-layout>
        </v-container>
        <v-card-text class="text-xs-center font-weight-black">
          <strong>{{ systemName }}</strong> 正在加载数据
        </v-card-text>
      </v-card>
    </v-overlay>

    <!-- app switcher -->
    <v-navigation-drawer v-model="appSwitcherShow" fixed temporary>
      <app-switcher
        v-if="appSwitcherShow"
        style="height:calc(100vh - 48px);"
      ></app-switcher>
    </v-navigation-drawer>

    <!-- notification center -->
    <v-navigation-drawer
      width="300"
      v-model="notificationCenterShow"
      fixed
      right
      temporary
    >
      <notification-center
        v-if="notificationCenterShow"
        style="height:calc(100vh - 48px);"
      ></notification-center>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import appSwitcher from '@/components/common/app-switcher/AppSwitcher.vue';
import notificationCenter from '@/components/common/notification-center/NotificationCenter.vue';

const systemModule = namespace('system');

@Component({
  components: {
    'app-switcher': appSwitcher,
    'notification-center': notificationCenter
  }
})
export default class App extends Vue {
  @systemModule.Getter('fullScreenLoading') fullScreenLoading: any;

  @systemModule.Getter('loading') loading: any;

  @systemModule.Getter('appSwitcher') appSwitcher: any;

  @systemModule.Mutation('toggleAppSwitcher') toggleAppSwitcher: any;

  @systemModule.Getter('notificationCenter') notificationCenter: any;

  @systemModule.Mutation('toggleNotificationCenter')
  toggleNotificationCenter: any;

  @systemModule.Getter('systemName') systemName!: string;

  @systemModule.Getter('companyName') companyName!: string;

  @systemModule.Mutation('toggleFullScreenLoading')
  toggleFullScreenLoading: any;

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

  isDarkMode() {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
    setInterval(() => {
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }, 5000);
  }

  mounted() {
    document.title = `${this.systemName} | ${this.companyName}`;
    this.toggleFullScreenLoading(false);

    this.appSwitcherShow = this.appSwitcher;
    this.notificationCenterShow = this.notificationCenter;
    this.isDarkMode();
  }
}
</script>
