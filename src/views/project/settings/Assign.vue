<template>
  <div>
    <v-row dense justify="center">
      <v-col lg="8" md="12">
        <v-row no-gutters>
          <v-col cols="12" class="mb-2">
            <v-toolbar dense flat>
              <v-btn :to="`/`" class="my-2 ml-1" text>
                <v-icon class="mr-2" size="20">mdi-arrow-left</v-icon>返回首页
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn
                :disabled="extraInfo.investAuditCompany.assigned"
                v-if="
                  workflowInstance.nodeID == '开始' || !extraInfo.assignFlowID
                "
                text
                @click="updateProjectInfo"
              >
                <v-icon size="20" class="mr-2">mdi-content-save-outline</v-icon
                >保存修改</v-btn
              >
              <v-btn
                text
                :disabled="extraInfo.investAuditCompany.assigned"
                v-if="
                  workflowInstance.nodeID == '开始' || !extraInfo.assignFlowID
                "
                @click="assignCompany"
              >
                <v-icon size="20" class="mr-2">mdi-check</v-icon>提交审批
              </v-btn>
            </v-toolbar>
            <v-stepper>
              <v-stepper-header>
                <v-stepper-step
                  :complete="
                    extraInfo.investAuditCompany.assigned ||
                      workflowInstance.nodeID == '开始'
                  "
                  class="body-2"
                  step="1"
                >
                  完善信息
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  :complete="
                    extraInfo.investAuditCompany.assigned ||
                      workflowInstance.nodeID == '组长审批'
                  "
                  class="body-2"
                  step="2"
                >
                  组长审批
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  :complete="extraInfo.investAuditCompany.assigned"
                  step="3"
                  class="body-2"
                  >处长审批</v-stepper-step
                >
              </v-stepper-header>
            </v-stepper>

            <v-row no-gutters>
              <v-col cols="6">
                <v-card-title class="body-2 font-weight-black">
                  投资审计单位
                </v-card-title>

                <v-container fluid>
                  <SearchSupplier
                    v-if="!extraInfo.investAuditCompany.assigned"
                    :id.sync="extraInfo.investAuditCompany.id"
                    :name.sync="extraInfo.investAuditCompany.name"
                  ></SearchSupplier>
                  <v-text-field
                    dense
                    class="mt-3"
                    outlined
                    disabled
                    v-model="extraInfo.investAuditCompany.name"
                    hide-details
                    label="企业名称"
                  ></v-text-field>

                  <v-subheader class="pt-6 px-0">参与人员</v-subheader>

                  <v-list dense class="mt-3" color="transparent">
                    <v-list-item-group
                      v-model="extraInfo.investAuditCompany.member"
                      multiple
                      color="primary"
                    >
                      <v-list-item
                        style="pointer-events:none"
                        v-for="(item, i) in memberList"
                        :key="`m-${i}`"
                        :disabled="extraInfo.investAuditCompany.assigned"
                        :value="item.userID"
                      >
                        <template v-slot:default="{ active, toggle }">
                          <v-list-item-action style="pointer-events:auto">
                            <v-checkbox
                              :input-value="active"
                              :true-value="item.userID"
                              :disabled="extraInfo.investAuditCompany.assigned"
                              @click="toggle"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-title>{{
                            item.nickName
                          }}</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.userID }}
                          </v-list-item-subtitle>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-container>
              </v-col>
              <v-col cols="6">
                <v-card-title class="body-2 font-weight-black">
                  分配信息
                </v-card-title>
                <v-container fluid>
                  <v-select
                    dense
                    label="分配方式"
                    hide-details
                    outlined
                    v-model="extraInfo.assignAuditCompanyType"
                    :items="assignTypeList"
                    item-text="text"
                    :disabled="extraInfo.investAuditCompany.assigned"
                    item-value="value"
                  ></v-select>
                  <v-text-field
                    dense
                    outlined
                    class="mt-3"
                    :disabled="extraInfo.investAuditCompany.assigned"
                    hide-details
                    label="甲方审计费"
                    type="number"
                    prefix="¥"
                    v-model="extraInfo.assignPrice"
                  ></v-text-field>

                  <v-file-input
                    @change="uploadFile"
                    class="body-2 mt-3"
                    :label="`分配附件`"
                    :disabled="extraInfo.investAuditCompany.assigned"
                    dense
                    :placeholder="
                      extraInfo.assignFile !== ''
                        ? extraInfo.assignFile
                        : `上传文件`
                    "
                    :hint="
                      extraInfo.assignFile !== ''
                        ? extraInfo.assignFile
                        : `未上传`
                    "
                    prepend-icon=""
                    prepend-inner-icon="mdi-paperclip"
                    append-outer-icon="mdi-download-outline"
                    @click:append-outer="
                      extraInfo.assignFile
                        ? downloadFile(extraInfo.assignFile)
                        : () => {}
                    "
                    outlined
                    :display-size="1000"
                  >
                  </v-file-input>
                </v-container>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Project, ProjectExtraInfo } from '@/types/project';
import { FlowLinkTask, Instance } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';
import { Authorization, UserInfo } from '@/types/user';
import SearchSupplier from '@/components/common/search/SearchSupplier.vue';
import ProjectService from '@/service/projectService';
import { SupplierMember } from '@/types/company';
import CompanyService from '@/service/companyService';
import FileService from '@/service/fileService';

const projectModule = namespace('project');
const userModule = namespace('user');

@Component({
  components: {
    SearchSupplier
  }
})
export default class ProjectAssign extends Vue {
  @projectModule.Getter('currentProjectID') currentProjectID!: string;
  @projectModule.Getter('currentProject') currentProject!: Project;
  @projectModule.State('assignTypeList') assignTypeList!: any[];
  @userModule.Getter('authorization')
  authorization!: Authorization;
  @userModule.Getter('userInfo')
  userInfo!: UserInfo;

  workflowInstance: Instance = new Instance();
  memberList: SupplierMember[] = [];

  async updateProjectInfo() {
    let p = this.currentProject;
    p.extraInfo = this.extraInfo;

    console.log(p);
    await ProjectService.updateProjectInfo(p);
  }

  async uploadFile(v: any) {
    const rsp = await FileService.uploadFile(v, '', '');
    this.extraInfo.investAuditCompany.assignFile = rsp.path;
    this.updateProjectInfo();
  }

  async downloadFile(path: string) {
    FileService.downloadFileFromFs(path);
  }

  async assignCompany() {
    const r = await this.$confirm('', {
      title: '确认提交审批？',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });

    if (r) {
      // Create instance if no instance
      if (!this.extraInfo.investAuditCompany.assignFlowID) {
        const l = new FlowLinkTask();
        l.extraInfo = {
          type: 'assignment',
          comment: '提交审核',
          project: this.currentProject
        };

        const rsp = await WorkflowService.createWorkflowInstance(
          4,
          this.authorization.userID,
          this.userInfo.nickName,
          '审计处',
          l
        );

        this.extraInfo.investAuditCompany.assignFlowID = rsp.id;
        await this.updateProjectInfo();
      } else {
        const l = new FlowLinkTask();
        l.extraInfo = {
          type: 'assignment',
          comment: '提交审核',
          project: this.currentProject
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
        } catch (err) {
          this.$snack('提交失败');
        }
      }

      this.updateProjectInfo();
      this.getFlow();
    }
  }

  async getFlow() {
    if (this.extraInfo.investAuditCompany.assignFlowID) {
      console.log(this.extraInfo.investAuditCompany.assignFlowID);
      this.workflowInstance = {
        ...new Instance(),
        ...(
          await WorkflowService.getWorkflowInstance(
            this.currentProject.extraInfo.investAuditCompany.assignFlowID
          )
        ).instance
      };
    } else {
      this.workflowInstance = new Instance();
    }
  }

  get extraInfo() {
    const newExtraInfo = new ProjectExtraInfo();
    const e = { ...newExtraInfo, ...this.currentProject.extraInfo };
    console.log(this.currentProject.extraInfo);
    return e;
  }

  get companyID() {
    return this.extraInfo.investAuditCompany.id;
  }

  get assignMember() {
    return this.extraInfo.investAuditCompany.member;
  }

  @Watch('currentProjectID')
  onChanged() {
    this.getFlow();
  }

  @Watch('companyID')
  async onCompanyIDChanged() {
    this.memberList = (
      await CompanyService.getSupplier(this.companyID)
    ).member.data;
  }

  async mounted() {
    this.getFlow();
    this.memberList = (
      await CompanyService.getSupplier(this.companyID)
    ).member.data;
  }
}
</script>

<style scoped></style>
