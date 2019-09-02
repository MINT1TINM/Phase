<template>
  <v-app>
    <v-navigation-drawer
      class="acrylic"
      color="transparent"
      expand-on-hover
      mini-variant-width="62"
      app
      clipped
      permanent
    >
      <v-list nav dense color="transparent">
        <v-list-item link v-for="(item,i) in appList" :key="i" :to="item.route">
          <template>
            <v-list-item-icon style="margin-right:0">
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="margin-left:20px">{{item.name}}</v-list-item-title>
          </template>
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
import { namespace } from "vuex-class";
import { Authorization } from "@/types/user";

const userModule = namespace("user");
const projectModule = namespace("project");

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class ProjectIndex extends Vue {
  @userModule.Getter("authorization") private authorization!: Authorization;
  @projectModule.Getter("projectPermission")
  private projectPermission: any;

  private appList = [
    {
      icon: "mdi-chart-timeline",
      name: "日历",
      route: "/project/calendar",
      role: ["r"]
    },
    {
      icon: "mdi-view-dashboard-outline",
      name: "过程",
      route: "/project/process",
      role: ["r"]
    },
    {
      icon: "mdi-account-box-outline",
      name: "成员",
      route: "/project/member",
      role: ["r"]
    },
    {
      icon: "mdi-file-outline",
      name: "文件",
      route: "/project/document",
      role: ["r"]
    },
    {
      icon: "mdi-file-table-outline",
      name: "表单",
      route: "/project/sheet",
      role: []
    },
    {
      icon: "mdi-tune",
      name: "设置",
      route: "/project/settings",
      role: ["r"]
    }
  ];
}
</script>

<style>
</style>
