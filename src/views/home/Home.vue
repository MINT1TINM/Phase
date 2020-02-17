<template>
  <v-app>
    <app-bar></app-bar>
    <app-common></app-common>
    <v-content>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs8 offset-2>
            <v-card flat color="transparent" height="250">
              <v-layout fill-height align-center>
                <div class="display-2 font-weight-black px-4">
                  <p class="subtitle-2">
                    {{ new Date() | format('yyyy-MM-dd') }}
                  </p>
                  <h3>{{ time }} {{ userInfo.nickName }}</h3>
                </div>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs8 offset-2>
            <v-container>
              <transition appear appear-active-class="fade-up-enter">
                <v-layout row wrap v-if="isGod">
                  <v-flex xs15 v-for="(item, i) in appList" :key="`app-${i}`">
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        color="transparent"
                        :elevation="hover ? 8 : 0"
                        @click="goToApp(item.route)"
                      >
                        <v-layout
                          align-center
                          justify-center
                          style="padding:10%"
                        >
                          <v-img
                            aspect-ratio="1"
                            class="ma-2"
                            style="display:block;margin:auto"
                            :src="item.icon"
                          ></v-img>
                        </v-layout>
                        <div
                          class="body-2 pb-5 pt-0 font-weight-black text-center"
                        >
                          {{ item.name }}
                        </div>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                  <v-flex
                    xs15
                    v-for="(item, i) in availableAppList"
                    :key="`app-${i}`"
                  >
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        color="transparent"
                        :elevation="hover ? 8 : 0"
                        @click="goToApp(item.route)"
                      >
                        <v-layout
                          align-center
                          justify-center
                          style="padding:10%"
                        >
                          <v-img
                            aspect-ratio="1"
                            class="ma-2"
                            style="display:block;margin:auto"
                            :src="item.icon"
                          ></v-img>
                        </v-layout>
                        <div
                          class="body-2 pb-5 pt-0 font-weight-black text-center"
                        >
                          {{ item.name }}
                        </div>
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
import { Component, Prop, Vue } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import appBar from '@/components/common/app-bar/AppBar.vue';
import BasicService from '@/service/basicService';
import ProjectService from '@/service/projectService';
import { Authorization, UserInfo } from '@/types/user';
import { App } from '@/types/system';

import RecentFile from '@/components/home/RecentFile.vue';
import WillExpire from '@/components/home/WillExpire.vue';

const systemModule = namespace('system');
const userModule = namespace('user');

@Component({
  components: {
    'app-bar': appBar,
    RecentFile,
    WillExpire
  }
})
export default class ComponentName extends Vue {
  @systemModule.Getter('appList') appList!: App[];

  @systemModule.Getter('estateAppList') estateAppList!: App[];

  @systemModule.Getter('systemName') systemName!: string;

  @userModule.Getter('authorization') authorization!: Authorization;

  @userModule.Getter('userInfo') userInfo!: UserInfo;

  @userModule.Getter('isGod') isGod!: boolean;

  goToApp(route: string) {
    window.location.href = `/${route}`;
  }

  get time() {
    const hour = new Date().getHours();
    if (hour < 9) {
      return '早上好,';
    }
    if (hour < 12) {
      return '上午好,';
    }
    if (hour < 14) {
      return '中午好,';
    }
    if (hour < 18) {
      return '下午好,';
    }
    return '晚上好,';
  }

  get availableAppList() {
    const availableAppList: App[] = [];
    for (const app of this.appList) {
      if ((this.userInfo.applicationList! || []).indexOf(app.nameEn) !== -1) {
        availableAppList.push(app);
      }
    }
    return availableAppList;
  }

  async mounted() {
    await ProjectService.getInvitationList('', '', this.authorization.userID);
  }
}
</script>

<style scoped></style>
