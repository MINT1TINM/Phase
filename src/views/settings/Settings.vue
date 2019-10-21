<template>
  <v-app>
    <app-bar></app-bar>
    <app-common></app-common>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import {
 Component, Prop, Vue, Watch 
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

@Component
export default class Settings extends Vue {}
</script>

<style scoped>
</style>
