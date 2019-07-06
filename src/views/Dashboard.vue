<template>
  <v-app>
    <v-app-bar style="z-index:9">
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <span class="font-weight-black navbar-logo ml-1">PHASE</span>
      <v-spacer></v-spacer>
      <v-avatar color="primary" size="36">
        <span class="white--text">M</span>
      </v-avatar>
    </v-app-bar>
    <v-navigation-drawer expand-on-hover mini-variant-width="56" permanent clipped>
      <v-list nav dense>
        <v-list-item link v-for="(item,i) in appList" :key="i" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
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
          name: "项目",
          route: "/dashboard/project"
        },
        {
          icon: "mdi-account-box-outline",
          name: "通讯录",
          route: "/dashboard/contact"
        }
      ]
    };
  },
  methods: {}
};
</script>

