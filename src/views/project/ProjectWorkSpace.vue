<template>
  <div>
    <v-navigation-drawer
      expand-on-hover
      mini-variant-width="62"
      app
      clipped
      permanent
      fixed
    >
      <v-list nav dense color="transparent">
        <v-list-item
          link
          v-for="(item, i) in appList"
          :key="i"
          :to="item.route"
        >
          <template>
            <v-list-item-icon style="margin-right:0">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="margin-left:20px">{{
              item.name
            }}</v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { Authorization } from '@/types/user';

const userModule = namespace('user');
const projectModule = namespace('project');

@Component({
  components: {}
})
export default class ProjectIndex extends Vue {
  @userModule.Getter('authorization') private authorization!: Authorization;

  @projectModule.Getter('projectPermission')
  private projectPermission: any;

  private appList = [
    {
      icon: 'mdi-chart-timeline',
      name: '日历',
      route: '/calendar',
      role: ['r']
    },
    {
      icon: 'mdi-view-dashboard-outline',
      name: '过程',
      route: '/process',
      role: ['r']
    },
    {
      icon: 'mdi-account-box-outline',
      name: '成员',
      route: '/member',
      role: ['r']
    },
    {
      icon: 'mdi-file-outline',
      name: '文件',
      route: '/document',
      role: ['r']
    },
    {
      icon: 'mdi-file-table-outline',
      name: '表单',
      route: '/sheet',
      role: []
    },
    {
      icon: 'mdi-tune',
      name: '设置',
      route: '/settings',
      role: ['r']
    }
  ];
}
</script>
