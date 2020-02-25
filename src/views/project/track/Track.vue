<template>
  <div>
    <v-toolbar dense class="navbar">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >跟踪日志</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn outlined color="primary" @click="createTrackDialog = true"
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
      :items="trackList"
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

      <template v-slot:item.tracker="{ item }">
        <v-chip small class="caption font-weight-black">{{
          item.trackerCache.nickName
        }}</v-chip>
      </template>

      <template v-slot:item.trackDate="{ item }">
        {{ item.trackDate | format('yyyy-MM-dd') }}
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

    <v-dialog v-model="createTrackDialog" width="400" persistent>
      <v-card>
        <v-toolbar dense flat class="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            创建跟踪记录
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <dim-form
            dense
            :target="newTrack"
            :formContent="trackFormContent"
          ></dim-form>
          <v-layout justify-center>
            <v-btn
              depressed
              rounded
              color="primary darken-1"
              @click="createTrack"
              >创建</v-btn
            >
            <v-btn @click="createTrackDialog = false" rounded text class="ml-2"
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
import { Track } from '@/types/project';
import TrackService from '@/service/trackService';

@Component
export default class ProjectTrack extends Vue {
  headers = [
    { text: '名称', value: 'name' },
    { text: '跟踪日期', value: 'trackDate' },
    { text: '跟踪单位', value: 'trackUnit' },
    { text: '跟踪人', value: 'tracker' },
    { text: '创建人', value: 'userUUID' },
    { text: '创建时间', value: 'createdAt' },
    { text: '状态', value: 'status' }
  ];
  trackFormContent = [
    {
      type: 'text-field',
      name: 'name',
      title: '名称'
    }
  ];
  createTrackDialog = false;
  newTrack = new Track();
  trackList: Track[] = [];
  options: { page: number; itemsPerPage: number } = {
    page: 1,
    itemsPerPage: 20
  };
  loading = false;

  async getTrackList() {
    this.trackList = await TrackService.getTrackList(
      this.options.page,
      this.options.itemsPerPage
    );
  }

  async createTrack() {
    if (this.newTrack.name) {
      try {
        await TrackService.createTrack(this.newTrack);
        this.$snack('创建成功');
      } catch (_) {
        this.$snack('创建失败');
      }
      this.createTrackDialog = false;
      this.newTrack = new Track();
      this.getTrackList();
    }
  }

  showInfo(v: Track) {
    this.$router.push({ path: `/track/${v.id}` });
  }

  mounted() {
    this.getTrackList();
  }
}
</script>

<style scoped></style>
