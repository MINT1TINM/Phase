<template>
  <div>
    <v-toolbar v-if="hasAccess" dense flat color="transparent">
      <v-spacer></v-spacer>
      <v-btn
        v-if="instance.nodeID == '审计组审批'"
        text
        color="success lighten-2"
        @click="finishDialog = true"
        ><v-icon class="mr-2" size="20">mdi-check</v-icon>通过</v-btn
      >
      <v-btn
        v-if="instance.nodeID == '审计组审批'"
        text
        color="error lighten-2"
        @click="commentDialog = true"
        ><v-icon class="mr-2" size="20">mdi-close</v-icon>退回</v-btn
      >
    </v-toolbar>
    <v-card>
      <v-container fluid>
        <v-list dense>
          <v-list-item>
            <v-list-item-title class="body-2">
              来源
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ instance.startUserName }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="body-2">
              组别
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ instance.department }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="body-2">
              内容
            </v-list-item-title>
            <v-list-item-subtitle class="body-2">
              {{ comment }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-toolbar dense color="transparent" flat>
          <v-toolbar-title class="body-2 font-weight-black">
            基本信息
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <dim-form :target="meeting" :formContent="infoContent"></dim-form>
        </v-container>
        <v-subheader>会议照片</v-subheader>

        <v-container fluid class="pt-0">
          <v-row dense>
            <v-col cols="4" v-for="(item, i) in meeting.pic" :key="`file-${i}`">
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
      </v-container>
    </v-card>

    <v-dialog width="600" v-model="finishDialog">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black">通过</v-card-title>
        <v-card-text>
          <v-textarea
            label="备注"
            v-model="newComment"
            outlined
            hide-details
          ></v-textarea>
        </v-card-text>
        <v-row class="py-4" no-gutters justify="center">
          <v-btn
            depressed
            rounded
            color="primary darken-1"
            @click="
              completeTask(instance);
              finishDialog = false;
            "
            >确认</v-btn
          >
          <v-btn rounded class="ml-2" text @click="finishDialog = false"
            >取消</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog width="600" v-model="commentDialog">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black">退回</v-card-title>
        <v-card-text>
          <v-textarea
            label="修改意见"
            v-model="newComment"
            outlined
            hide-details
          ></v-textarea>
        </v-card-text>
        <v-row class="py-4" no-gutters justify="center">
          <v-btn
            depressed
            rounded
            color="error lighten-1"
            @click="
              resistTask(instance);
              commentDialog = false;
            "
            >确认</v-btn
          >
          <v-btn rounded class="ml-2" text @click="commentDialog = false"
            >取消</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Instance, FlowLinkTask, Flow } from '@/types/workflow';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import { Meeting } from '@/types/project';
import MeetingService from '@/service/meetingService';
import WorkflowService from '@/service/workflowService';
import FileService from '@/service/fileService';

const userModule = namespace('user');

@Component
export default class FlowMeeting extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  @Prop() meeting!: Meeting;
  @Prop() instance!: Instance;
  @Prop() comment!: string;
  @Prop() hasAccess!: boolean;

  finishDialog = false;
  commentDialog = false;
  newComment = '';
  flowDef: Flow = new Flow();

  get infoContent() {
    return [
      {
        type: 'text-field',
        title: '例会名称',
        name: 'name',
        readonly: true
      },
      {
        type: 'date-picker',
        title: '例会日期',
        name: 'date',
        readonly: true
      },
      {
        type: 'tags',
        title: '参会人',
        name: 'attend',
        readonly: true
      },
      {
        type: 'text-area',
        title: '重点记录',
        name: 'description',
        readonly: true
      },
      {
        type: 'file-input',
        title: '会议纪要',
        name: 'file',
        changeFunc: () => {},
        downFunc: () => {
          FileService.downloadFileFromFs(this.meeting.file);
        }
      }
    ];
  }

  async completeTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'meeting',
      comment: '审核通过',
      meeting: this.meeting
    };

    try {
      await WorkflowService.handleTask(
        item.taskID,
        this.authorization.userID,
        this.userInfo.nickName,
        true,
        item.id,
        '审核通过',
        this.instance.procDefId,
        l
      );

      this.$snack('操作成功，该工作流结束');
      this.$router.push({ path: '/' });

      this.meeting.status = '已审核';
      this.meeting.extraInfo.checkFlowID = this.instance.id;
      await MeetingService.updateMeeting(this.meeting);
    } catch (err) {}
  }

  async resistTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'meeting',
      comment: this.newComment,
      meeting: this.meeting
    };

    try {
      await WorkflowService.handleTask(
        item.taskID,
        this.authorization.userID,
        this.userInfo.nickName,
        false,
        item.id,
        '审核未通过',
        this.instance.procDefId,
        l
      );

      this.meeting.status = '待提交';
      this.meeting.extraInfo.checkFlowID = this.instance.id;
      await MeetingService.updateMeeting(this.meeting);

      this.$router.push({ path: '/todo' });
    } catch (err) {}
  }
}
</script>

<style scoped></style>
