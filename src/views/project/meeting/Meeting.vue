<template>
  <div>
    <v-toolbar dense class="navbar">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >工程例会</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn outlined color="primary" @click="createMeetingDialog = true"
        ><v-icon size="20" class="mr-1">mdi-plus</v-icon>创建</v-btn
      >
    </v-toolbar>

    <v-data-table
      height="calc(100vh - 156px)"
      style="overflow:auto"
      fixed-header
      disable-sort
      disable-filtering
      :options.sync="options"
      :headers="headers"
      :items="meetingList"
      :items-per-page="1"
      class="transparent"
      :footer-props="{
        itemsPerPageOptions: [20, 50],
        showCurrentPage: true
      }"
      @click:row="showInfo"
    >
      <template v-slot:item.userUUID="{ item }">
        <v-chip small class="caption font-weight-black">{{
          item.userCache.nickName
        }}</v-chip>
      </template>

      <template v-slot:item.file="{ item }">
        {{ item.file }}
        <v-btn icon small v-if="item.file"
          ><v-icon size="20">mdi-download-outline</v-icon></v-btn
        >
      </template>

      <template v-slot:item.date="{ item }">
        {{ item.date | format('yyyy-MM-dd') }}
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>

      <template v-slot:item.status="{ item }">
        <div v-if="item.extraInfo.checked">已审核</div>
        <div
          v-else-if="
            !item.extraInfo.checked && item.extraInfo.checkFlowID != ''
          "
        >
          待审核
        </div>
        <div v-else>待提交</div>
      </template>
    </v-data-table>

    <v-dialog v-model="createMeetingDialog" width="400" persistent>
      <v-card>
        <v-toolbar dense flat class="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            创建会议记录
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <dim-form
            dense
            :target="newMeeting"
            :formContent="meetingFormContent"
          ></dim-form>
          <v-layout justify-center>
            <v-btn
              depressed
              rounded
              color="primary darken-1"
              @click="createMeeting"
              >创建</v-btn
            >
            <v-btn
              @click="createMeetingDialog = false"
              rounded
              text
              class="ml-2"
              >取消</v-btn
            >
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Meeting, Project } from '@/types/project';
import MeetingService from '@/service/meetingService';
import { namespace } from 'vuex-class';

const projectModule = namespace('project');

@Component
export default class ProjectMeeting extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;

  headers = [
    { text: '名称', value: 'name' },
    { text: '日期', value: 'date' },
    { text: '会议纪要', value: 'file' },
    { text: '创建人', value: 'userUUID' },
    { text: '创建时间', value: 'createdAt' },
    { text: '状态', value: 'status' }
  ];
  meetingFormContent = [
    {
      type: 'text-field',
      name: 'name',
      title: '名称'
    }
  ];
  createMeetingDialog = false;
  newMeeting = new Meeting();
  meetingList: Meeting[] = [];
  options: { page: number; itemsPerPage: number } = {
    page: 1,
    itemsPerPage: 20
  };
  loading = false;

  async getMeetingList() {
    const m = new Meeting();
    m.projectUUID = this.currentProject.id;
    this.meetingList = await MeetingService.getMeetingList(
      this.options.page,
      this.options.itemsPerPage,
      m
    );
  }

  async createMeeting() {
    if (this.newMeeting.name) {
      this.newMeeting.projectUUID = this.currentProject.id;
      try {
        await MeetingService.createMeeting(this.newMeeting);
        this.$snack('创建成功');
      } catch (_) {
        this.$snack('创建失败');
      }
      this.createMeetingDialog = false;
      this.newMeeting = new Meeting();
      this.getMeetingList();
    }
  }

  showInfo(v: Meeting) {
    this.$router.push({ path: `/meeting/${v.id}` });
  }

  mounted() {
    this.getMeetingList();
  }
}
</script>

<style scoped></style>
