<template>
  <v-app>
    <app-bar></app-bar>
    <v-content></v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import appBar from "@/components/common/app-bar/AppBar.vue";

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class AdminTemplate extends Vue {}
</script>

<style scoped>
</style>
