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

        <v-subheader v-if="track">跟踪日志</v-subheader>

        <v-list dense>
          <div v-for="(item, i) in list" :key="`l-${i}`">
            <v-subheader class="ml-2 mt-2" v-if="item.subheader">
              {{ item.subheader }}
            </v-subheader>
            <v-list-item v-else>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="item.chip">
                <v-chip-group>
                  <v-chip small v-for="c in item.value" :key="c">{{
                    c
                  }}</v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.date">
                {{ item.value | format('yyyy-MM-dd ') }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>{{
                item.value
              }}</v-list-item-subtitle>
            </v-list-item>
          </div>
        </v-list>

        <v-container fluid>
          <v-card outlined flat>
            <v-container fluid>
              <v-row dense>
                <v-col cols="6">
                  <v-subheader class="pl-0">现场描述</v-subheader>
                  <v-textarea
                    outlined
                    label="现场描述"
                    hide-details
                    readonly
                    v-model="track.liveDescription"
                    dense
                  ></v-textarea>
                </v-col>
                <v-col cols="6" class="pl-4">
                  <v-row dense>
                    <v-subheader>现场照片</v-subheader>

                    <v-col
                      cols="6"
                      v-for="(item, i) in track.file"
                      :key="`file-${i}`"
                    >
                      <v-card outlined flat>
                        <v-img v-viewer :src="staticURL + item"></v-img>
                        <v-toolbar dense flat color="transparent">
                          <div class="caption pa-2">
                            ... {{ item.slice(-15) }}
                          </div>
                          <v-spacer></v-spacer>
                          <v-btn icon small @click="removeFile(item)"
                            ><v-icon size="20">mdi-close</v-icon></v-btn
                          >
                        </v-toolbar>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card outlined flat class="mt-2">
            <v-container fluid>
              <v-row dense>
                <v-col cols="6">
                  <v-subheader class="pl-0"
                    >图纸、招标文件等要求文本</v-subheader
                  >
                  <v-textarea
                    outlined
                    readonly
                    hide-details
                    label="图纸、招标文件等要求文本"
                    v-model="track.liveComment"
                    dense
                  ></v-textarea>
                </v-col>
                <v-col cols="6" class="pl-4">
                  <v-row dense>
                    <v-subheader>图纸、招标文件等资料截图</v-subheader>

                    <v-col
                      cols="6"
                      v-for="(item, i) in track.liveFile"
                      :key="`liveFile-${i}`"
                    >
                      <v-card outlined flat>
                        <v-img
                          aspect-ratio="1.7"
                          :src="staticURL + item"
                        ></v-img>
                        <v-toolbar dense flat color="transparent">
                          <div class="caption pa-2">
                            ... {{ item.slice(-15) }}
                          </div>
                          <v-spacer></v-spacer>

                          <v-btn icon small @click="removeLiveFile(item)"
                            ><v-icon size="20">mdi-close</v-icon></v-btn
                          >
                        </v-toolbar>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-row dense class="mt-2">
            <v-col cols="12">
              <v-textarea
                outlined
                hide-details
                readonly
                label="本次跟踪总结"
                v-model="track.description"
                dense
              ></v-textarea>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-row dense>
            <v-col cols="12">
              <v-switch
                label="是否发现问题"
                v-model="track.extraInfo.problem"
              ></v-switch>
              <v-textarea
                outlined
                hide-details
                label="问题描述"
                readonly
                v-model="track.extraInfo.problemDesc"
                dense
              ></v-textarea>

              <v-col cols="12">
                <v-subheader class="pl-0">依据文件</v-subheader>
              </v-col>
              <v-list dense>
                <v-list-item
                  v-for="(item, i) in track.extraInfo.problemFile"
                  :key="`pf-${i}`"
                >
                  <v-list-item-action>
                    <v-btn icon small @click="downloadFile(item)"
                      ><v-icon size="20">mdi-download-outline</v-icon></v-btn
                    >
                  </v-list-item-action>
                  <v-list-item-title>{{ item }}</v-list-item-title>

                  <v-list-item-action>
                    <v-btn
                      icon
                      small
                      color="error"
                      @click="removeProblemFile(item)"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-list-item-action>
                </v-list-item>
              </v-list>
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
import { Instance, FlowLinkTask } from '@/types/workflow';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import { Track } from '@/types/project';
import TrackService from '../../service/trackService';

const userModule = namespace('user');

@Component
export default class FlowTrack extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @userModule.Getter('userInfo') userInfo!: UserInfo;

  @Prop() track!: Track;
  @Prop() instance!: Instance;
  @Prop() comment!: string;
  @Prop() hasAccess!: boolean;

  finishDialog = false;
  commentDialog = false;
  newComment = '';
  flowDef: any = null;

  get list() {
    return [
      {
        name: '跟踪企业',
        value: this.track.trackUnit.name
      },
      {
        name: '跟踪人员',
        value: this.track.tracker
      },
      {
        date: true,
        name: '创建时间',
        value: this.track.createdAt
      },
      {
        date: true,
        name: '跟踪日期',
        value: this.track.trackDate
      },
      {
        name: '创建人',
        value: this.track.userCache.nickName
      }
    ];
  }

  async completeTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'track',
      comment: '审核通过',
      track: this.track
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

      this.track.status = '已审核';
      await TrackService.updateTrack(this.track);
    } catch (err) {}
  }

  async resistTask(item: Instance) {
    const l = new FlowLinkTask();
    l.flowID = this.instance.procDefId;
    l.instanceID = this.instance.id;
    l.extraInfo = {
      type: 'track',
      comment: this.newComment,
      track: this.track
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

      this.track.status = '待提交';
      await TrackService.updateTrack(this.track);

      this.$router.push({ path: '/todo' });
    } catch (err) {}
  }

  mounted() {
    console.log(this.instance);
  }
}
</script>

<style scoped></style>
