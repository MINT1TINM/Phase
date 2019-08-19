<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-layout fill-height>
        <v-flex xs2 class="inner-sidebar-withoutpadding"></v-flex>
        <v-flex xs3 class="inner-sidebar-withoutpadding"></v-flex>
        <v-flex xs7></v-flex>
      </v-layout>
    </v-content>
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
export default class Contact extends Vue {}
</script>

<style scoped>
</style>
