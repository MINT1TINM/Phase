<template>
  <v-app>
    <v-navigation-drawer expand-on-hover mini-variant-width="62" app clipped permanent>
      <v-list nav dense>
        <v-list-item link v-for="(item,i) in appList" :key="i" :to="item.route">
          <v-list-item-icon style="margin-right:0">
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="margin-left:20px">{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <app-bar></app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import appBar from "@/components/common/app-bar/AppBar.vue";

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class ProjectIndex extends Vue {
  private appList = [
    {
      icon: "mdi-chart-timeline",
      name: "日历",
      route: "/project/calendar"
    },
    {
      icon: "mdi-view-dashboard-outline",
      name: "过程",
      route: "/project/process"
    },
    {
      icon: "mdi-account-box-outline",
      name: "成员",
      route: "/project/member"
    },
    {
      icon: "mdi-file-outline",
      name: "文件",
      route: "/project/document"
    },
    {
      icon: "mdi-file-table-outline",
      name: "表单",
      route: "/project/sheet"
    },
    {
      icon: "mdi-tune",
      name: "设置",
      route: "/project/settings"
    }
  ];
}
</script>

<style>
</style>
