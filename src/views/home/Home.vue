<template>
  <v-app>
    <app-bar></app-bar>
    <v-content>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs8 offset-2>
            <v-card flat color="transparent" height="250">
              <v-layout fill-height align-center>
                <div class="display-2 font-weight-black px-4">
                  <p class="subtitle-2">{{new Date() | format("yyyy-MM-dd")}}</p>
                  <h3>{{time}} {{userInfo.nickName}}</h3>
                </div>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
                            class="ma-2"
                            style="display:block;margin:auto"
                            :src="item.icon"
                          ></v-img>
                        </v-layout>
                        <div class="body-2 pb-5 pt-0 font-weight-black text-center">{{item.name}}</div>
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
import { Authorization, UserInfo } from "@/types/user";

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
  @userModule.Getter("userInfo") private userInfo!: UserInfo;

  private goToApp(route: string) {
    this.$router.push({ path: `/${route}` });
  }

  private get time() {
    const now = new Date(),
      hour = now.getHours();
    if (hour < 9) {
      return "早上好,";
    } else if (hour < 12) {
      return "上午好,";
    } else if (hour < 14) {
      return "中午好,";
    } else if (hour < 18) {
      return "下午好,";
    } else {
      return "晚上好,";
    }
  }

  private async mounted() {
    await ProjectService.getInvitationList("", "", this.authorization.userID);
  }
}
</script>

<style scoped>
</style>
