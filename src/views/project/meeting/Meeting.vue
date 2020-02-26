<template>
  <div>
    <v-toolbar dense class="navbar">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >工程例会</v-toolbar-title
      >
      <v-select
        class="ml-4 body-2"
        :items="statusList"
        v-model="options.status"
        dense
        label="类型"
        outlined
        style="max-width:250px"
        single-line
        hide-details
      ></v-select>

      <v-btn icon @click="options.status = ''"
        ><v-icon size="20">mdi-close</v-icon></v-btn
      >
      <v-spacer></v-spacer>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn outlined color="primary" @click="createMeeting()"
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
        <div v-else>待上传</div>
      </template>

      <template v-slot:item.time="{ item }">
        {{ item.time | format('yyyy-MM-dd') }}
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Meeting, Project } from '@/types/project';
import MeetingService from '@/service/meetingService';
import { namespace } from 'vuex-class';

const projectModule = namespace('project');

@Component
export default class ProjectMeeting extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;

  headers = [
    { text: '名称', value: 'name' },
    { text: '日期', value: 'time' },
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

  newMeeting = new Meeting();
  meetingList: Meeting[] = [];
  options: { page: number; itemsPerPage: number; status: string } = {
    page: 1,
    itemsPerPage: 20,
    status: ''
  };
  loading = false;
  statusList = ['待提交', '待审核', '已审核'];

  async getMeetingList() {
    const m = new Meeting();
    m.projectUUID = this.currentProject.id;
    m.status = this.options.status;
    this.meetingList = await MeetingService.getMeetingList(
      this.options.page,
      this.options.itemsPerPage,
      m
    );
  }

  async createMeeting() {
    this.newMeeting.projectUUID = this.currentProject.id;
    this.newMeeting.name = '未命名';
    this.newMeeting.status = '待提交';
    try {
      await MeetingService.createMeeting(this.newMeeting);
      this.$snack('创建成功');
    } catch (_) {
      this.$snack('创建失败');
    }

    this.newMeeting = new Meeting();
    this.getMeetingList();
  }

  @Watch('options', {
    deep: true
  })
  onChanged() {
    this.getMeetingList();
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
