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
                    extraInfo.assigned || workflowInstance.nodeID == '开始'
                  "
                  class="body-2"
                  step="1"
                >
                  完善信息
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  :complete="
                    extraInfo.assigned ||
                      workflowInstance.nodeID == '审计处工程科科员'
                  "
                  class="body-2"
                  step="2"
                >
                  审计处工程科科员审批
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  :complete="extraInfo.assigned"
                  step="3"
                  class="body-2"
                  >二级单位反馈</v-stepper-step
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
                    :id.sync="extraInfo.investAuditCompany.id"
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
                  <v-text-field
                    dense
                    class="mt-3"
                    outlined
                    v-model="extraInfo.investAuditCompany.contactName"
                    hide-details
                    label="联系人"
                  ></v-text-field>
                  <v-text-field
                    dense
                    v-model="extraInfo.investAuditCompany.phone"
                    outlined
                    class="mt-3"
                    hide-details
                    label="联系人电话"
                  ></v-text-field>
                </v-container>
              </v-col>
              <v-col cols="6">
                <v-card-title class="body-2 font-weight-black">
                  分配信息
                </v-card-title>
                <v-container fluid>
                  <v-select
                    dense
                    hide-details
                    outlined
                    v-model="extraInfo.assignAuditCompanyType"
                    :items="assignTypeList"
                    item-text="text"
                    item-value="value"
                  ></v-select>
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
import SearchSupplier from '@/plugins/search-supplier/Index.vue';
import ProjectService from '@/service/projectService';

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
  @userModule.Getter('authorization')
  authorization!: Authorization;
  @userModule.Getter('userInfo')
  userInfo!: UserInfo;

  workflowInstance: Instance = new Instance();

  assignTypeList = [
    {
      text: '综合分配',
      value: 0
    },
    {
      text: '二次议标',
      value: 1
    },
    {
      text: '公开招投标',
      value: 2
    }
  ];

  async updateProjectInfo() {
    let p = this.currentProject;
    p.extraInfo = this.extraInfo;
    await ProjectService.updateProjectInfo(p);
  }

  async assignCompany() {
    const r = await this.$confirm('', {
      title: '确认提交审批？',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });

    if (r) {
      await this.updateProjectInfo();

      // Create instance if no instance
      if (!this.extraInfo.assignFlowID) {
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
        this.extraInfo.assignFlowID = rsp.id;
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
    if (this.extraInfo.assignFlowID) {
      console.log(this.extraInfo.assignFlowID);
      this.workflowInstance = {
        ...new Instance(),
        ...(
          await WorkflowService.getWorkflowInstance(
            this.currentProject.extraInfo.assignFlowID
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

  @Watch('currentProjectID')
  onChanged() {
    this.getFlow();
  }

  mounted() {
    this.getFlow();
  }
}
</script>

<style scoped></style>
