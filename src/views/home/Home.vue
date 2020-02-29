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

      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs8 offset-2>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="subtitle-1 font-weight-black"
                >待办事项</v-toolbar-title
              >
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="instanceList"
              hide-default-footer
              disable-sort
              class="elevation-0 transparent"
            >
              <template v-slot:item.action="{ item }">
                <v-btn icon @click="toFlow(item)">
                  <v-icon size="20">mdi-information-outline</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>

          <v-flex xs8 offset-2>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="subtitle-1 font-weight-black"
                >近期</v-toolbar-title
              >
            </v-toolbar>
            <Statistic></Statistic>
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
import Statistic from '@/components/home/Statistic.vue';

import BasicService from '@/service/basicService';
import ProjectService from '@/service/projectService';
import WorkflowService from '@/service/workflowService';
import CompanyService from '@/service/companyService';

import { Authorization, UserInfo } from '@/types/user';
import { App } from '@/types/system';
import { Instance } from '@/types/workflow';

const systemModule = namespace('system');
const userModule = namespace('user');

@Component({
  components: {
    'app-bar': appBar,
    Statistic
  }
})
export default class ComponentName extends Vue {
  @systemModule.Getter('appList') appList!: App[];
  @systemModule.Getter('estateAppList') estateAppList!: App[];
  @systemModule.Getter('systemName') systemName!: string;
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;
  @userModule.Getter('isGod') isGod!: boolean;

  instanceList: Instance[] = [];

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

  get headers() {
    return [
      {
        text: '名称',
        value: 'procDefName'
      },
      {
        text: '状态',
        value: 'nodeID'
      },
      {
        text: '时间',
        value: 'startTime'
      },
      {
        text: '启动人',
        value: 'startUserName'
      },
      {
        text: '操作',
        value: 'action'
      }
    ];
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

  async getFlowInstance() {
    // get user group
    const groupUUIDList = (
      await CompanyService.getUserGroup(this.authorization.userID)
    ).groupUUIDList;

    const rsp = await WorkflowService.getWorkflowInstanceList(
      groupUUIDList,
      this.userInfo.nickName,
      this.authorization.userID,
      1,
      100
    );
    if (rsp.msg === 'failed') {
      this.$snack('🤔工作流服务已下线');
    } else {
      this.instanceList = rsp.instance.slice(0, 5);
    }
  }

  toFlow(ins: Instance) {
    window.location.href = `/flow#/todo/${ins.id}`;
  }

  async mounted() {
    await ProjectService.getInvitationList('', '', this.authorization.userID);
    this.getFlowInstance();
  }
}
</script>

<style scoped></style>
