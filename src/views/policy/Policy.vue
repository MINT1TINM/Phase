<template>
  <v-app>
    <app-bar></app-bar>
    <app-common></app-common>
    <div>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Policy extends Vue {

}
</script>

<style scoped>
</style>
