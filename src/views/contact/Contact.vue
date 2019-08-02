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

<script>
import appBar from "@/components/common/app-bar/AppBar";
export default {
  components: {
    appBar: appBar
  },
  data() {
    return {};
  },
  mounted() {
    console.log("shit");
  }
};
</script>

<style>
</style>
