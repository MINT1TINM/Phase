<template>
  <v-app>
    <v-app-bar app>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <span class="font-weight-black navbar-logo ml-1">PHASE</span>
      <v-spacer></v-spacer>
      <v-avatar color="primary" size="36">
        <span class="white--text">M</span>
      </v-avatar>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
