<template>
  <v-layout fill-height>
    <transition appear appear-active-class="fade-up-enter">
      <v-flex xs5 class="inner-sidebar-withoutpadding px-3" style="overflow-y:auto">
        <v-toolbar flat color="transparent" class="font-weight-black">
          任务信息
          <v-spacer></v-spacer>
          <v-btn rounded text @click="updateTaskInfo">
            <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-form ref="taskInfoForm">
            <dim-form :formContent="taskInfoContent" :target="taskInfo"></dim-form>
          </v-form>
          <v-layout justify-center>
            <v-flex xs8></v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </transition>
    <transition appear appear-active-class="fade-up-enter">
      <v-flex xs7 class="inner-sidebar-withoutpadding">
        <v-container fluid>
          <sub-task @updateTaskInfo="getTaskInfo" :subTask="taskInfo.subTask"></sub-task>
          <related-sheet class="mt-3"></related-sheet>
          <operations class="mt-3"></operations>
        </v-container>
      </v-flex>
    </transition>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import subTask from "./SubTask.vue";
import operations from "./Operations.vue";
import relatedSheet from "./RelatedSheet.vue";
import TaskService from "@/service/taskService";
import { Task } from "@/types/task";
import dimForm from "@/plugins/dim-form/Main.vue";
import { namespace } from "vuex-class";
import ProcessService from "@/service/processService";

const processModule = namespace("process");
const projectModule = namespace("project");

@Component({
  components: {
    "sub-task": subTask,
    operations: operations,
    "related-sheet": relatedSheet,
    "dim-form": dimForm
  }
})
export default class TaskDetail extends Vue {
  @projectModule.Getter("currentProjectID") private currentProjectID: any;
  @processModule.Getter("currentProcess") private currentProcess: any;
  @processModule.Mutation("updateCurrentProcessTask")
  private updateCurrentProcessTask: any;
  @projectModule.Getter("projectMemberCache") private projectMemberCache: any;

  private taskInfo: Task = {
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    actionStartDate: "",
    actionEndDate: "",
    status: false,
    tags: {
      data: []
    },
    member: {
      data: []
    },
    subTask: {
      data: []
    },
    userID: "",
    processID: "",
    executorID: ""
  };
  private taskMember = [];
  private statusList = [
    {
      text: "已完成",
      value: true
    },
    {
      text: "未完成",
      value: false
    }
  ];
  private tagList = [
    {
      text: "红色",
      color: "red"
    }
  ];

  private taskInfoContent = [
    {
      type: "text-field",
      title: "任务名称",
      name: "name"
    },
    {
      type: "date-picker",
      title: "创建时间",
      name: "createdAt",
      disabled: true
    },
    {
      type: "select",
      title: "执行者",
      name: "userID",
      chips: true,
      text: "nickName",
      value: "userID",
      list: this.taskInfo.member!.data
    },
    {
      type: "multi-select",
      title: "参与人员",
      name: "member",
      chips: true,
      text: "nickName",
      value: "userID",
      list: this.taskInfo.member!.data
    },
    {
      type: "tags",
      title: "标签",
      name: "tags"
    },
    {
      divider: true
    },
    {
      type: "date-range",
      title: "计划",
      nameStart: "startDate",
      nameEnd: "endDate"
    },
    {
      type: "date-range",
      title: "执行",
      nameStart: "actionStartDate",
      nameEnd: "actionEndDate"
    },
    {
      type: "text-area",
      title: "备注",
      name: "description"
    }
  ];

  private async getTaskInfo() {
    const rsp = await TaskService.getTaskInfo(this.$route.params.taskID);
    this.taskInfo = rsp.task;
    const memberList = this.currentProcess(this.$route.params.processID).member
      .data;

    for (const item of memberList) {
      (this.taskMember as any).push(this.projectMemberCache(item));
    }

    this.taskInfoContent[2].list = this.taskInfoContent[3].list = this
      .taskMember as any;
  }

  private async updateTaskInfo() {
    // update info
    await TaskService.updateTaskInfo(this.taskInfo);

    // update member
    await TaskService.updateTaskMember(
      this.$route.params.taskID,
      this.taskInfo.member!.data
    );

    // sync task list
    this.syncTaskList();
  }

  private async syncTaskList() {
    const rsp = await TaskService.getTaskList(this.$route.params.processID);
    this.updateCurrentProcessTask({
      processID: this.$route.params.processID,
      taskList: rsp.taskList
    });
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    next();
    this.getTaskInfo();
  }

  private mounted() {
    this.getTaskInfo();
  }
}
</script>

<style scoped>
</style>
