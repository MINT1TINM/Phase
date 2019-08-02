<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <!-- app switcher toggle -->
      <v-toolbar-items text style="margin-left:-20px">
        <v-btn width="62" icon @click="toggleAppSwitcher(false)">
          <v-icon size="23">mdi-apps</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container class="px-5" fluid grid-list-md>
      <h3 class="mt-5">应用</h3>
      <v-layout row wrap class="mt-3">
        <v-flex xs12 v-for="(item,i) in appList" :key="`app-${i}`">
          <v-card outlined :to="item.route">
            <v-card-text class="black--text">{{item.name}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      appList: [
        {
          name: "项目",
          route: "/project"
        },
        {
          name: "人脉",
          route: "/contact"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      toggleAppSwitcher: "system/toggleAppSwitcher"
    })
  }
};
</script>

<style>
</style>
