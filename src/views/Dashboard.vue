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

    <app-bar></app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import appBar from "@/components/common/AppBar";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    appBar: appBar
  },
  data() {
    return {
      appList: [
        {
          icon: "mdi-chart-timeline",
          name: "日历",
          route: "/dashboard/calendar"
        },
        {
          icon: "mdi-file-document-outline",
          name: "过程",
          route: "/dashboard/process"
        },
        {
          icon: "mdi-account-box-outline",
          name: "人脉",
          route: "/dashboard/contact"
        }
      ]
    };
  },
  methods: {},

  mounted() {}
};
</script>

