<template>
  <div>
    <v-navigation-drawer app clipped>
      <v-list nav dense>
        <v-list-item
          v-for="(item, i) in navItem"
          :key="`nav-${i}`"
          :to="item.route"
        >
          <template>
            <v-list-item-icon class="mr-0">
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FlowMenu extends Vue {
  get navItem() {
    return [
      {
        icon: 'mdi-playlist-check',
        name: '待办事项',
        route: '/todo'
      },
      {
        icon: 'mdi-forwardburger',
        name: '流程定义',
        route: '/workflow'
      },
      // {
      //   icon: 'mdi-link',
      //   name: '事件绑定',
      //   route: '/bind'
      // },
      {
        icon: 'mdi-link',
        name: '事件定义',
        route: '/action'
      },
      {
        icon: 'mdi-clipboard-play-outline',
        name: '我的实例',
        route: '/instance'
      }
    ];
  }
}
</script>

<style scoped></style>
