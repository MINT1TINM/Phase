<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 style="display:flex">
        <v-text-field
          v-if="projectPermission(authorization.userID).indexOf(`c`)!=-1"
          hide-details
          class="text-field-semidense"
          outlined
          label="+ 新任务"
          v-model="newTaskName"
          single-line
        ></v-text-field>

        <v-btn
          v-if="newTaskName"
          @click="createTask"
          style="margin-left:10px;height:100%"
          color="primary"
          outlined
        >
          <v-icon size="18">mdi-plus</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 v-for="(item, i) in taskListShow" :key="`task-${i}`">
        <v-hover v-slot:default="{hover}">
          <v-card v-if="item.status" @click="toTaskDetail(item)">
            <v-list-item style="min-height:35px">
              <v-list-item-action
                style="user-select:none"
                class="mr-3"
                @click="toggleTaskStatus(item.id || item.taskID)"
              >
                <v-checkbox color="grey" v-model="item.status"></v-checkbox>
              </v-list-item-action>
              <v-list-item-title class="body-2 grey--text font-weight-black">{{item.name}}</v-list-item-title>
              <v-list-item-avatar size="25">
                <v-avatar size="25" color="primary">
                  <img
                    v-if="projectMemberCache(item.userID)"
                    :src="projectMemberCache(item.userID).headImgURL"
                  />
                </v-avatar>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <v-card
            v-else
            :class="(currentTask===item.taskID || currentTask===item.id)&&(currentTask)?`card-active`:``"
            :elevation="hover ? 6 : 0"
            outlined
            flat
            @click="toTaskDetail(item)"
          >
            <v-list-item style="min-height:35px">
              <v-list-item-action
                style="user-select:none"
                class="mr-3"
                @click="toggleTaskStatus(item.id || item.taskID)"
              >
                <v-checkbox color="primary" v-model="item.status"></v-checkbox>
              </v-list-item-action>
              <v-list-item-title class="body-2 font-weight-black">{{item.name}}</v-list-item-title>
              <v-list-item-avatar size="25">
                <v-avatar size="25" color="primary">
                  <img
                    v-if="projectMemberCache(item.userID)"
                    :src="projectMemberCache(item.userID).headImgURL"
                  />
                </v-avatar>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item style="min-height:35px" class="pb-2">
              <v-chip
                color="error"
                class="font-weight-black"
                small
                v-if="getDays(item.endDate)<0"
              >已过期</v-chip>
              <v-chip
                v-else
                dark
                class="font-weight-black"
                small
                :color="getDays(item.endDate)<=2?`orange`:`grey`"
              >{{item.endDate.slice(0,10)}}&nbsp;截止</v-chip>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TaskService from "@/service/taskService";
import { namespace } from "vuex-class";
import { Process, ProcessTask } from "@/types/process";
import { Authorization } from "@/types/user";

const processModule = namespace("process");
const projectModule = namespace("project");
const userModule = namespace("user");

@Component
export default class TaskList extends Vue {
  @Prop({ default: "" }) public processID!: string;

  @userModule.Getter("authorization") private authorization!: Authorization;
  @processModule.Getter("currentProcessList") private currentProcessList: any;
  @processModule.Mutation("updateCurrentProcessTask")
  private updateCurrentProcessTask: any;
  @projectModule.Getter("projectMemberCache") private projectMemberCache: any;
  @projectModule.Getter("projectPermission")
  private projectPermission: any;

  private newTaskName: string = "";
  private taskList: ProcessTask[] = [];
  private taskListShow: ProcessTask[] = [];

  private getDays(date: string) {
    const t1 = new Date().getTime();
    const t2 = new Date(date).getTime();
    const dateTime = 1000 * 60 * 60 * 24; // 每一天的毫秒数
    const minusDays = Math.floor((t2 - t1) / dateTime); // 计算出两个日期的天数差
    const days = minusDays; // 取绝对值
    return days;
  }

  private async createTask() {
    const rsp = await TaskService.createTask(
      this.processID || this.$route.params.processID,
      this.newTaskName
    );
    this.newTaskName = "";
    this.getTaskListManually();
  }

  private async getTaskListManually() {
    const rsp = await TaskService.getTaskList(
      this.processID || this.$route.params.processID
    );
    this.taskList = rsp.taskList;
    this.taskListShow = this.taskList.sort((a: ProcessTask, b: ProcessTask) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
    this.updateCurrentProcessTask({
      processID: this.processID || this.$route.params.processID,
      taskList: this.taskListShow
    });
  }

  private toTaskDetail(task: ProcessTask) {
    this.$emit("func", task.taskID || task.id);
    this.$router.push({
      path: `/project/process/${this.processID}/task/${task.taskID || task.id}`
    });
  }

  private getCurrentProcessFromProp() {
    return this.currentProcessList.find((e: Process) => {
      return e.id === this.processID;
    });
  }

  private async toggleTaskStatus(taskID: string) {
    // stop task card click event
    event!.stopPropagation();
    // find the task
    const i = this.taskList.findIndex((e: ProcessTask) => {
      return (e.id || e.taskID) === taskID;
    });

    // update task list
    await TaskService.toggleTaskStatus(
      this.$route.params.processID || this.processID,
      this.taskList[i].taskID || this.taskList[i].id || "",
      // @ts-ignore
      this.taskList[i].status
    );

    this.getTaskListManually();
  }

  private get currentTask() {
    return this.$route.params.taskID;
  }

  // update when list changed
  @Watch("currentProcessList")
  private onCurrentProcessListChanged() {
    console.log("changed");
    if (this.currentProcessList) {
      this.taskList = this.getCurrentProcessFromProp().task.data;
      this.taskListShow = this.taskList.sort(
        (a: ProcessTask, b: ProcessTask) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        }
      );
    }
  }

  @Watch("processID")
  private onProcessIDChanged() {
    console.log(this.processID);
    this.taskList = this.getCurrentProcessFromProp().task.data;
    this.taskListShow = this.taskList.sort((a: ProcessTask, b: ProcessTask) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  private mounted() {
    this.taskList = this.getCurrentProcessFromProp().task.data;
    this.taskListShow = this.taskList.sort((a: ProcessTask, b: ProcessTask) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
}
</script>

<style scoped>
</style>
