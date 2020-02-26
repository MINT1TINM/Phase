<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title class="subtitle-1 font-weight-black">{{
        meeting.name
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="updateMeeting" text>
        <v-icon size="20" class="mr-2">mdi-content-save-outline </v-icon>保存
      </v-btn>
      <v-btn icon @click="$router.push({ path: `/meeting` })"
        ><v-icon size="20">mdi-close</v-icon></v-btn
      >
    </v-toolbar>
    <v-container
      fluid
      style="height:calc(100vh - 96px)"
      class="overflow-y-auto"
    >
      <v-row justify="center">
        <v-col cols="8">
          <v-card>
            <v-toolbar dense color="transparent" flat>
              <v-toolbar-title class="body-2 font-weight-black">
                基本信息
              </v-toolbar-title>
            </v-toolbar>
            <v-container fluid>
              <dim-form :target="meeting" :formContent="infoContent"></dim-form>
            </v-container>
            <v-subheader>会议照片</v-subheader>
            <v-col cols="12">
              <v-file-input
                outlined
                dense
                label="上传图片"
                @change="uploadFile"
                accept="image/png, image/jpeg"
              ></v-file-input>
            </v-col>
            <v-container fluid class="pt-0">
              <v-row dense>
                <v-col
                  cols="4"
                  v-for="(item, i) in meeting.pic"
                  :key="`file-${i}`"
                >
                  <v-card outlined flat>
                    <v-img v-viewer :src="staticURL + item"></v-img>
                    <v-toolbar dense flat color="transparent">
                      <div class="caption pa-2">... {{ item.slice(-15) }}</div>
                      <v-spacer></v-spacer>
                      <v-btn icon small @click="removeFile(item)"
                        ><v-icon size="20">mdi-close</v-icon></v-btn
                      >
                    </v-toolbar>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="8">
          <v-card>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="body-2 font-weight-black"
                >⚠️危险</v-toolbar-title
              >
            </v-toolbar>
            <v-row justify="center">
              <v-col cols="6">
                <v-btn
                  @click="deleteMeeting"
                  color="error darken-1"
                  depressed
                  rounded
                  block
                  ><v-icon class="mr-2" size="20">mdi-delete-outline</v-icon
                  >删除</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Meeting } from '@/types/project';
import MeetingService from '@/service/meetingService';
import FileService from '@/service/fileService';

@Component
export default class ProjectMeetingInfo extends Vue {
  meeting: Meeting = new Meeting();

  get infoContent() {
    return [
      {
        type: 'text-field',
        title: '例会名称',
        name: 'name'
      },
      {
        type: 'date-picker',
        title: '例会日期',
        name: 'date'
      },
      {
        type: 'tags',
        title: '参会人',
        name: 'attend'
      },
      {
        type: 'text-area',
        title: '重点记录',
        name: 'description'
      },
      {
        type: 'file-input',
        title: '会议纪要',
        name: 'file',
        changeFunc: async (v: any) => {
          if (v) {
            const rsp = await FileService.uploadFile(v, '', '');
            this.meeting.file = rsp.path;
            this.updateMeeting();
          }
        },
        downFunc: () => {
          FileService.downloadFileFromFs(this.meeting.file);
        }
      }
    ];
  }

  async getMeeting() {
    this.meeting = await MeetingService.getOneMeeting(
      this.$route.params.meetingID
    );
  }

  async updateMeeting() {
    try {
      await MeetingService.updateMeeting(this.meeting);
      this.$snack('更新成功');
    } catch (err) {
      this.$snack('更新失败');
    }
  }

  async deleteMeeting() {
    const c = await this.$confirm('此操作无法恢复', {
      title: '确认删除？',
      buttonTrueColor: 'error',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      try {
        await MeetingService.deleteMeeting(this.$route.params.meetingID);
        this.$router.push({ path: '/track' });
        this.$snack('删除成功');
      } catch (_) {
        this.$snack('删除失败');
      }
    }
  }

  async uploadFile(v: any) {
    const rsp = await FileService.uploadFile(v, '', '');

    if (!this.meeting.pic) {
      this.meeting.pic = [];
    }

    this.meeting.pic.unshift(rsp.path);
    this.updateMeeting();
  }

  async removeFile(v: string) {
    this.meeting.pic = this.meeting.pic.filter(e => e !== v);
    this.updateMeeting();
  }

  get staticURL() {
    return process.env.VUE_APP_STATIC_URL;
  }

  mounted() {
    this.getMeeting();
  }
}
</script>

<style scoped></style>
