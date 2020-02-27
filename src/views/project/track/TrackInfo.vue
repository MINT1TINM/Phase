<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >{{ track.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="updateTrack" text>
        <v-icon size="20" class="mr-2">mdi-content-save-outline</v-icon>保存
      </v-btn>
      <v-btn
        v-if="workflowInstance.nodeID == '开始' && track.extraInfo.checkFlowID"
        @click="submitCheck"
        text
      >
        <v-icon size="20" class="mr-2">mdi-check</v-icon>提交审批
      </v-btn>
      <v-btn icon @click="$router.push({ path: `/track` })"
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
              <SearchSupplier
                :id.sync="track.trackUnit.id"
                :name.sync="track.trackUnit.name"
              ></SearchSupplier>

              <v-text-field
                hide-details
                outlined
                class="mt-3"
                dense
                label="跟踪企业"
                :value="track.trackUnit.name"
                readonly
              ></v-text-field>

              <dim-form
                dense
                :target="track"
                :formContent="infoContent"
              ></dim-form>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card>
            <v-toolbar dense color="transparent" flat>
              <v-toolbar-title class="body-2 font-weight-black">
                现场情况
              </v-toolbar-title>
            </v-toolbar>
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
                        v-model="track.liveDescription"
                        dense
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6" class="pl-4">
                      <v-row dense>
                        <v-subheader>现场照片</v-subheader>
                        <v-col cols="12">
                          <v-file-input
                            outlined
                            dense
                            label="上传图片"
                            @change="uploadFile"
                            accept="image/png, image/jpeg"
                          ></v-file-input>
                        </v-col>
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
                        hide-details
                        label="图纸、招标文件等要求文本"
                        v-model="track.liveComment"
                        dense
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6" class="pl-4">
                      <v-row dense>
                        <v-subheader>图纸、招标文件等资料截图</v-subheader>
                        <v-col cols="12">
                          <v-file-input
                            outlined
                            dense
                            label="上传图片"
                            @change="uploadLiveFile"
                            accept="image/png, image/jpeg"
                          ></v-file-input>
                        </v-col>
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
                    v-model="track.extraInfo.problemDesc"
                    dense
                  ></v-textarea>

                  <v-col cols="12">
                    <v-subheader class="pl-0">依据文件</v-subheader>
                    <v-file-input
                      outlined
                      dense
                      hide-details
                      label="依据文件"
                      @change="uploadProblemFile"
                    ></v-file-input>
                  </v-col>
                  <v-list dense>
                    <v-list-item
                      v-for="(item, i) in track.extraInfo.problemFile"
                      :key="`pf-${i}`"
                    >
                      <v-list-item-action>
                        <v-btn icon small @click="downloadFile(item)"
                          ><v-icon size="20"
                            >mdi-download-outline</v-icon
                          ></v-btn
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
                  @click="deleteTrack"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Track } from '@/types/project';
import TrackService from '@/service/trackService';
import FileService from '@/service/fileService';
import CompanyService from '@/service/companyService';
import { SupplierMember } from '@/types/company';
import { Instance, FlowLinkTask, Flow } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';

const userModule = namespace('user');

@Component
export default class ProjectTrackInfo extends Vue {
  @userModule.Getter('authorization')
  authorization!: Authorization;
  @userModule.Getter('userInfo')
  userInfo!: UserInfo;

  track: Track = new Track();
  memberList: SupplierMember[] = [];
  workflowInstance: Instance = new Instance();
  flowDef: Flow = new Flow();

  get infoContent() {
    return [
      {
        type: 'select',
        title: '跟踪人员',
        name: 'tracker',
        text: 'nickName',
        value: 'userID',
        list: this.memberList
      },
      { type: 'date-picker', title: '跟踪日期', name: 'trackDate' }
    ];
  }

  async getTrack() {
    try {
      this.track = await TrackService.getOneTrack(this.$route.params.trackID);
    } catch (err) {
      this.$snack('加载失败');
    }
  }

  async updateTrack() {
    try {
      await TrackService.updateTrack(this.track);
      this.$snack('更新成功');
    } catch (err) {
      this.$snack('更新失败');
    }
  }

  async uploadFile(v: any) {
    if (v) {
      const rsp = await FileService.uploadFile(v, '', '');
      this.track.file.unshift(rsp.path);
      this.updateTrack();
    }
  }

  async removeFile(v: string) {
    this.track.file = this.track.file.filter(e => e !== v);
    this.updateTrack();
  }

  async uploadProblemFile(v: any) {
    if (v) {
      const rsp = await FileService.uploadFile(v, '', '');
      if (!this.track.extraInfo.problemFile) {
        this.track.extraInfo.problemFile = [];
      }

      this.track.extraInfo.problemFile.unshift(rsp.path);
      this.updateTrack();
    }
  }

  async removeProblemFile(v: string) {
    this.track.extraInfo.problemFile = this.track.extraInfo.problemFile.filter(
      e => e !== v
    );
    this.updateTrack();
  }

  async uploadLiveFile(v: any) {
    if (v) {
      const rsp = await FileService.uploadFile(v, '', '');

      this.track.liveFile.unshift(rsp.path);
      this.updateTrack();
    }
  }

  async removeLiveFile(v: string) {
    this.track.liveFile = this.track.liveFile.filter(e => e !== v);
    this.updateTrack();
  }

  async deleteTrack() {
    const c = await this.$confirm('此操作无法恢复', {
      title: '确认删除？',
      buttonTrueColor: 'error',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      try {
        await TrackService.deleteTrack(this.$route.params.trackID);
        this.$router.push({ path: '/track' });
        this.$snack('删除成功');
      } catch (_) {
        this.$snack('删除失败');
      }
    }
  }

  downloadFile(v: string) {
    FileService.downloadFileFromFs(v);
  }

  async submitCheck() {
    if (this.track.extraInfo.checkFlowID) {
      const l = new FlowLinkTask();
      l.extraInfo = {
        type: 'track',
        comment: '提交审核',
        track: this.track
      };

      try {
        await WorkflowService.handleTask(
          this.workflowInstance.taskID,
          this.authorization.userID,
          this.userInfo.nickName,
          true,
          this.workflowInstance.id,
          '提交审核',
          this.workflowInstance.procDefId,
          l
        );
        this.$snack('提交成功');
        this.getFlow();
      } catch (err) {
        this.$snack('提交失败');
      }
    } else {
      const l = new FlowLinkTask();
      l.extraInfo = {
        type: 'track',
        comment: '提交审核',
        track: this.track
      };

      try {
        const rsp = await WorkflowService.createWorkflowInstance(
          8,
          this.authorization.userID,
          this.userInfo.nickName,
          '个人',
          l
        );

        this.track.extraInfo.checkFlowID = rsp.id;
        this.track.status = '待审核';
        await this.updateTrack();
        this.$snack('提交成功');
      } catch (_) {
        this.$snack('提交失败');
      }
    }
  }

  async getFlow() {
    if (this.track.extraInfo.checkFlowID) {
      this.workflowInstance = {
        ...new Instance(),
        ...(
          await WorkflowService.getWorkflowInstance(
            this.track.extraInfo.checkFlowID
          )
        ).instance
      };

      this.flowDef = await WorkflowService.getFlowDef(
        this.workflowInstance.procDefId
      );

      console.log(JSON.parse(this.flowDef.resource));
    } else {
      this.workflowInstance = new Instance();
    }
  }

  @Watch('companyID')
  async onCompanyIDChanged() {
    this.memberList = (
      await CompanyService.getSupplier(this.companyID)
    ).member.data;
  }

  get companyID() {
    return this.track.trackUnit.id;
  }

  get staticURL() {
    return process.env.VUE_APP_STATIC_URL;
  }

  async mounted() {
    await this.getTrack();
    this.getFlow();
  }
}
</script>

<style scoped></style>
