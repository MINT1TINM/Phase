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
                >项目任务</v-toolbar-title
              >
            </v-toolbar>
            <!-- {{subtaskList}} -->
            <v-data-table
              :headers="subtaskHeader"
              :items="subtaskList"
              hide-default-footer
              class="elevation-0 transparent"
            >
              <template v-slot:item.name="props">
                <span
                  @click="
                    goToProjectTask(
                      props.item.projectID,
                      props.item.processID,
                      props.item.taskID
                    )
                  "
                  >{{ props.item.name | cut(30) }}</span
                >
              </template>
              <!-- <template v-slot:item.detail="props">{{props.item}}</template> -->
              <template v-slot:item.color="props">
                <v-icon :color="taskColor[props.item.color]"
                  >mdi-flag-outline</v-icon
                >
                {{ props.item.color }}
              </template>
              <template v-slot:item.status="props">
                <v-icon v-if="props.item.status == '未开始'" color="#3A80E7"
                  >mdi-alarm</v-icon
                >
                <v-icon v-if="props.item.status == '处理中'" color="#EB8329"
                  >mdi-alarm-note</v-icon
                >
                <v-icon v-if="props.item.status == '已完成'" color="#7AC09E"
                  >mdi-alarm-check</v-icon
                >
                {{ props.item.status }}
              </template>
              <template v-slot:item.detail="props"
                >{{ props.item.subtask.member.length }}名成员</template
              >
              <template v-slot:item.deadline="props">
                <span v-if="props.item.deadline != '2099-12-31'">{{
                  props.item.deadline | format('M.d')
                }}</span>
                <span v-else>/</span>
              </template>
              <template v-slot:item.remainingDays="props">
                <span v-if="props.item.remainingDays < 0">
                  <v-icon color="red">mdi-bell-alert-outline</v-icon>已超时
                </span>
                <span v-else-if="props.item.remainingDays == 0">
                  <v-icon color="orange">mdi-clock-alert-outline</v-icon
                  >今日到期
                </span>
                <span v-else-if="props.item.remainingDays < 2147483647"
                  >{{ props.item.remainingDays }}天</span
                >
                <span v-else>/</span>
              </template>
              <template v-slot:item.action="props">
                <v-btn
                  icon
                  @click="
                    goToProjectTask(
                      props.item.projectID,
                      props.item.processID,
                      props.item.taskID
                    )
                  "
                >
                  <v-icon size="20">mdi-information-outline</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>

          <v-flex xs8 offset-2>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="subtitle-1 font-weight-black"
                >待办事项</v-toolbar-title
              >
            </v-toolbar>

            <v-data-table
              :headers="instanceListHeader"
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
const projectModule = namespace('project');

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
  @projectModule.Mutation('updateCurrentProjectID') updateCurrentProjectID: any;

  instanceList: Instance[] = [];

  PPTList: any = [];
  subtaskList: any = [];

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

  get instanceListHeader() {
    return [
      { text: '名称', value: 'procDefName' },
      { text: '状态', value: 'nodeID' },
      { text: '时间', value: 'startTime' },
      { text: '启动人', value: 'startUserName' },
      { text: '操作', value: 'action' }
    ];
  }

  get subtaskHeader() {
    return [
      { text: '等级', align: 'left', value: 'color' },
      { text: '名称', align: 'left', value: 'name' },
      { text: '状态', align: 'left', value: 'status' },
      { text: '详情', align: 'left', value: 'detail', sortable: false },
      { text: '截止日期', align: 'left', value: 'deadline' },
      { text: '剩余时间', align: 'left', value: 'remainingDays' },
      { text: '操作', align: 'left', value: 'action', sortable: false }
    ];
  }

  taskColor = {
    非常紧急: '#E53935',
    非常重要: '#FB8C00',
    紧急: '#FFD708',
    重要: '#29B6F6',
    一般: '#76CC49'
  };
  async getPPTList() {
    this.PPTList = await ProjectService.getPPTList(this.authorization.userID);
    this.subtaskList = [];
    console.log('this.PPTList:', this.PPTList);

    this.PPTList.forEach(task => {
      // console.log('task:', task);

      task.subtask.forEach(subtask => {
        if (
          subtask.member &&
          subtask.member.includes(this.authorization.userID) &&
          subtask.status != '已完成'
        ) {
          this.subtaskList.push({
            color: subtask.color,
            name: `${subtask.name}-${task.task_name}-${task.process_name}-${task.project_name}`,
            status: subtask.status,
            deadline: !!subtask.endDate ? subtask.endDate : '2099-12-31',
            remainingDays: !!subtask.endDate
              ? Math.floor(
                  (new Date(subtask.endDate).getTime() - new Date().getTime()) /
                    (24 * 3600 * 1000)
                ) + 1
              : 2147483647,
            projectID: task.project_id,
            processID: task.process_id,
            taskID: task.task_id,
            subtaskID: subtask.id,
            subtask: subtask,
            members: subtask.member
          });
        }
      });
    });

    // this.PPTList.forEach(project => {
    //   project.process.forEach(process => {
    //     process.task.forEach(task => {
    //       console.log('task:', task);

    //       if (!task.status)
    //         task.subTask.data.forEach(subtask => {
    //           console.log('subtask:', subtask);

    //           if (
    //             subtask.member.includes(this.authorization.userID) &&
    //             subtask.status != '已完成'
    //           ) {
    //             this.subtaskList.push({
    //               color: subtask.color,
    //               name: `${subtask.name}-${task.name}-${process.name}-${project.name}`,
    //               status: subtask.status,
    //               deadline: !!subtask.endDate ? subtask.endDate : '2099-12-31',
    //               remainingDays: !!subtask.endDate
    //                 ? Math.floor(
    //                     (new Date(subtask.endDate).getTime() -
    //                       new Date().getTime()) /
    //                       (24 * 3600 * 1000)
    //                   ) + 1
    //                 : 2147483647,
    //               projectID: project.id,
    //               processID: process.id,
    //               taskID: task.id,
    //               subtaskID: subtask.id,
    //               // project: project,
    //               // process: process,
    //               // task: task,
    //               subtask: subtask
    //             });
    //           }
    //           // subtask.member.forEach(uid => {
    //           //   console.log(uid);
    //           // });
    //         });
    //     });
    //   });
    // });
    // console.log('this.subTaskList:', this.subtaskList);
  }

  goToProjectTask(projectID: string, processID: string, taskID: string) {
    this.updateCurrentProjectID(projectID);
    window.location.href = `/project#/process/${processID}/task/${taskID}`;
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
    this.getPPTList();
  }
}
</script>

<style scoped></style>
