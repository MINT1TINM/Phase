<template>
  <div>
    <v-navigation-drawer mini-variant-width="62" app clipped permanent fixed>
      <v-list nav dense class="transparent">
        <v-list-item
          link
          v-for="(item, i) in appList"
          :key="i"
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
import appBar from '@/components/common/app-bar/AppBar.vue';

@Component({
  components: {
    'app-bar': appBar
  }
})
export default class AdminTemplate extends Vue {
  appList = [
    {
      name: '主页',
      icon: 'mdi-home-outline',
      route: '/home'
    },
    {
      name: '用户',
      icon: 'mdi-account-outline',
      route: '/user'
    },
    {
      name: '群组',
      icon: 'mdi-account-group-outline',
      route: '/group'
    },
    {
      name: '部门',
      icon: 'mdi-format-line-style',
      route: '/department'
    }
  ];
}
</script>

<style scoped></style>
