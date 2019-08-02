<template>
  <v-container class="px-5" fluid grid-list-md>
    <h3>应用程序</h3>
    <v-layout row wrap class="mt-3">
      <v-flex xs12 v-for="(item,i) in appList" :key="`app-${i}`">
        <v-card outlined :to="item.route">
          <v-card-text class="black--text">{{item.name}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      appList: [
        {
          name: "项目",
          route: "/project"
        },
        {
          name:"人脉"
        }
      ]
    };
  }
};
</script>

<style>
</style>
