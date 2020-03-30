<template>
  <v-layout fill-height>
    <transition appear>
      <v-flex
        xs5
        class="inner-sidebar-withoutpadding px-3"
        style="overflow-y:auto"
      >
        <v-toolbar flat color="transparent" class="font-weight-black">
          任务信息
          <v-spacer></v-spacer>
          <v-btn
            rounded
            text
            @click="updateTaskInfo"
            v-if="projectPermission(authorization.userID).indexOf(`u`) != -1"
          >
            <v-icon size="20">mdi-content-save-outline</v-icon>&nbsp;保存
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-form ref="taskInfoForm">
            <dim-form
              :disabled="
                projectPermission(authorization.userID).indexOf(`u`) == -1
              "
              :formContent="taskInfoContent"
              :target="currentTask"
            ></dim-form>
          </v-form>
        </v-container>
        {{ taskInfoContent }}
      </v-flex>
    </transition>

    <v-flex
      xs7
      class="inner-sidebar-withoutpadding"
      style="height:calc(100vh - 96px);overflow-y:auto"
    >
      <transition appear appear-active-class="fade-up-enter">
        <v-container fluid>
          <sub-task :subTask="currentTask.subTask || { data: [] }"></sub-task>
          <related-sheet
            :sheetIDList="currentTask.sheet.data"
            class="mt-3"
          ></related-sheet>
          <related-file
            :fileList="currentTask.file.data"
            class="mt-3"
          ></related-file>
          <operations class="mt-3"></operations>
        </v-container>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import subTask from './SubTask.vue';
import operations from './Operations.vue';
import relatedSheet from './RelatedSheet.vue';
import relatedDraft from './RelatedDraft.vue';
import relatedFile from './RelatedFile.vue';
import TaskService from '@/service/taskService';
import { Task } from '@/types/task';

import ProcessService from '@/service/processService';
import { Authorization } from '@/types/user';

const processModule = namespace('process');
const projectModule = namespace('project');
const taskModule = namespace('task');
const userModule = namespace('user');

@Component({
  components: {
    'sub-task': subTask,
    operations,
    'related-sheet': relatedSheet,
    'related-file': relatedFile
  }
})
export default class TaskDetail extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @projectModule.Getter('currentProjectID') currentProjectID!: string;
  @projectModule.Getter('projectPermission')
  projectPermission: any;
  @processModule.Getter('currentProcess') currentProcess: any;
  @processModule.Mutation('updateCurrentProcessTask')
  updateCurrentProcessTask: any;
  @projectModule.Getter('projectMemberCache') projectMemberCache: any;
  @taskModule.Getter('currentTask') currentTask!: Task;

  processMember: any[] = [];
  statusList = [
    {
      text: '已完成',
      value: true
    },
    {
      text: '未完成',
      value: false
    }
  ];

  tagList = [
    {
      text: '红色',
      color: 'red'
    }
  ];
  get taskInfoContent() {
    return [
      {
        type: 'text-field',
        title: '任务名称',
        name: 'name'
      },
      {
        type: 'date-picker',
        title: '创建时间',
        name: 'createdAt',
        disabled: true
      },
      {
        type: 'select',
        title: '执行者',
        name: 'userID',
        chips: true,
        text: 'nickName',
        value: 'userID',
        list: this.taskMember
      },
      {
        type: 'multi-select',
        title: '参与人员',
        name: 'member',
        chips: true,
        text: 'nickName',
        value: 'userID',
        list: this.taskMember
      },
      {
        type: 'select',
        title: '任务等级',
        name: 'color',
        text: 'name',
        value: 'name',
        list: [
          {
            name: '非常紧急',
            color: '#E53935'
          },
          {
            name: '非常重要',
            color: '#FB8C00'
          },
          {
            name: '紧急',
            color: '#F8CF5E'
          },
          {
            name: '重要',
            color: '#29B6F6'
          },
          {
            name: '一般',
            color: '#76CC49'
          }
        ]
      },
      {
        type: 'tags',
        title: '标签',
        name: 'tags'
      },
      {
        divider: true
      },
      {
        type: 'date-range',
        title: '计划',
        nameStart: 'startDate',
        nameEnd: 'endDate'
      },
      {
        type: 'date-range',
        title: '执行',
        nameStart: 'actionStartDate',
        nameEnd: 'actionEndDate'
      },
      {
        type: 'text-area',
        title: '审计方案',
        name: 'description'
      }
    ];
  }

  get taskMember() {
    return this.processMember.map(e => this.projectMemberCache(e));
  }

  async getTaskInfo() {
    await TaskService.getTaskInfo(this.$route.params.taskID);
    this.processMember =
      this.currentProcess(this.$route.params.processID).member.data || [];
  }

  async updateTaskInfo() {
    // update info
    await TaskService.updateTaskInfo(this.currentTask);

    // update member
    await TaskService.updateTaskMember(
      this.$route.params.taskID,
      this.currentTask.member!.data
    );

    // sync task list
    this.syncTaskList();
  }

  async syncTaskList() {
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

  mounted() {
    this.getTaskInfo();
    console.log(this.currentTask);
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: block;
}
</style>
