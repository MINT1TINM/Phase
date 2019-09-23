<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="250">
        <transition appear appear-active-class="fade-up-enter">
          <v-layout align-center column justify-center>
            <h1 class="display-2 font-weight-light mb-5 mt-5">{{systemName}}</h1>
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
                        color="transparent"
                        :elevation="hover ? 8 : 0"
                        @click="goToApp(item.route)"
                      >
                        <v-layout align-center justify-center style="padding:10%">
                          <v-img
                            aspect-ratio="1"
                            style="display:block;margin:auto"
                            :src="item.icon"
                          ></v-img>
                        </v-layout>
                        <div class="body-2 pb-5 font-weight-black text-center">{{item.name}}</div>
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
import ProjectService from "@/service/projectService";
import { Authorization } from "@/types/user";

const systemModule = namespace("system");
const userModule = namespace("user");

@Component({
  components: {
    "app-bar": appBar
  }
})
export default class ComponentName extends Vue {
  @systemModule.Getter("appList") private appList: any;
  @systemModule.Getter("systemName") private systemName!: string;
  @userModule.Getter("authorization") private authorization!: Authorization;

  private goToApp(route: string) {
    this.$router.push({ path: `/${route}` });
  }

  private async mounted() {
    await ProjectService.getInvitationList("", "", this.authorization.userID);
  }
}
</script>

<style scoped>
</style>
