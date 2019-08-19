<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="250">
        <transition appear appear-active-class="fade-up-enter">
          <v-layout align-center column justify-center>
            <h1 class="display-2 font-weight-light mb-5 mt-5">Phase</h1>
          </v-layout>
        </transition>
      </v-parallax>

      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs8 offset-2>
            <v-card-title class="subtitle-1 font-weight-black">
              应用
              <v-spacer></v-spacer>
            </v-card-title>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout row wrap>
                  <v-flex xs15 v-for="(item,i) in appList" :key="`project-${i}`">
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        :elevation="hover ? 8 : 2"
                        @click="goToApp(item.route)"
                        :style="`background:${item.color}`"
                      >
                        <v-layout align-center justify-center style="padding:30%">
                          <v-img
                            aspect-ratio="1"
                            style="display:block;margin:auto"
                            :src="item.icon"
                          ></v-img>
                        </v-layout>
                        <div class="body-2 pb-5 font-weight-black white--text text-center">{{item.name}}</div>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </transition>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import appBar from "@/components/common/app-bar/AppBar.vue";
import { namespace } from "vuex-class";
import BasicService from "@/service/basicService";

const systemModule = namespace("system");

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class ComponentName extends Vue {
  @systemModule.Getter("appList") private appList: any;

  private goToApp(route: string) {
    this.$router.push({ path: `/${route}` });
  }

  private test() {
    BasicService.postRequest("/user/test", {});
  }
}
</script>

<style scoped>
</style>
