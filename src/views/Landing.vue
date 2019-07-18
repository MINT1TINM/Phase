<template>
  <v-app>
    <v-app-bar flat color="transparent">
      <v-toolbar-title class="font-weight-black" style="color:#A64ED1">Phase</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn rounded text class="mr-2" :to="'/login'">登录</v-btn>
      <v-btn rounded outlined color="primary">开始</v-btn>
    </v-app-bar>
    <v-container fill-height>
      <v-layout align-center justify-center row wrap>
        <v-card flat color="transparent">
          <h2 class="text-xs-center display-3 font-weight-black mt-2" style="color:#A64ED1">Phase</h2>
          <h4 class="text-xs-center mt-2" style="color:#A64ED1">项目协作范式</h4>
        </v-card>
      </v-layout>
    </v-container>
    <v-layout justify-center>
      <v-btn class="ma-3" outlined fab color="primary">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
