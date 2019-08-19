<template>
  <v-app>
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
export default class SheetIndex extends Vue {}
</script>

<style>
</style>
