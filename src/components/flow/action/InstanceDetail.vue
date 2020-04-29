<template>
  <div>
    <v-toolbar dense color="transparent" flat>
      <v-toolbar-title class="subtitle-1 font-weight-black">{{
        actionInstance.name
      }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <template v-if="flowTaskID!=-1"> -->
      <template>
        <v-btn text color="success" @click="approveWorkflow()"
          ><v-icon size="20" class="mr-2">mdi-check</v-icon>审批通过</v-btn
        >
        <v-btn text color="error" @click="rejectWorkflow()"
          ><v-icon size="20" class="mr-2">mdi-close</v-icon>审批不通过</v-btn
        >
      </template>
    </v-toolbar>

    <v-container fluid>
      <!-- {{ actionDefine }} -->
      <TimeLineComponent
        :workflowDefine="workflowDefine"
        :flowNode="flowNode"
        :timeLine="timeLine"
        :currentNodeID="currentNodeID"
        :status="actionInstance.status"
      />
      <!-- <v-toolbar dense color="transparent" flat>
        <v-toolbar-title class="subtitle-1 font-weight-black">表单模版</v-toolbar-title>
      </v-toolbar>
      <SheetTemplatePreview :currentTemplateID="actionDefine.sheetTemplateID"></SheetTemplatePreview>-->
      表单展示 编辑权限={{
        actionInstance.status == '未提交' && flowTaskID == -1
      }}
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import { Sheet } from '@/types/sheet';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import {
  Instance,
  ActionDefine,
  ActionInstance,
  Event,
  NodeInfo,
  Flow
} from '@/types/workflow';
import { Template } from '@/types/sheet';
import ActionDefineComponent from '@/components/flow/action/DefineDetail.vue';
import TimeLineComponent from '@/components/flow/chart/TimeLine.vue';
const userModule = namespace('user');

@Component({
  components: {
    ActionDefineComponent,
    TimeLineComponent
  }
})
export default class ActionInstanceComponent extends Vue {
  @Prop({ default: () => '' }) actionInstanceID!: string;
  // @Prop({ default: () => false }) approvalRight!: boolean;

  actionDefine: any = {};
  workflowDefineID: number = -1;
  async getActionDefine(id: string) {
    const rsp = await WorkflowService.getActionDefine(id);
    this.actionDefine = rsp.actionDefine;
    this.workflowDefineID = this.actionDefine.flowID;
    this.getWorkflowDefine(this.workflowDefineID);
  }

  workflowDefine: Flow = new Flow();
  async getWorkflowDefine(id: number) {
    this.workflowDefine = await WorkflowService.getFlowDef(id);
  }

  workflowInstance: Instance = new Instance();
  currentNodeID: string = '';
  flowNode: NodeInfo[] = [];
  async getWorkflowInstance(instance_id: number) {
    this.workflowInstance = (
      await WorkflowService.getWorkflowInstance(instance_id)
    ).instance;
    // console.log(this.workflowInstance);
    this.flowNode = this.workflowInstance.node_infos;
    this.currentNodeID = this.workflowInstance.nodeID;
  }

  timeLine: Event[] = [];
  async getTimeLine(instance_id: number) {
    this.timeLine = (await WorkflowService.getTimeline(instance_id)).timeline;
  }

  sheetData: Sheet = new Sheet();
  async geSheetInfo(id: string) {
    const rsp = await SheetService.getSheetInfo(id);
    this.sheetData = rsp.sheet;
  }

  actionInstance: ActionInstance = new ActionInstance();
  actionDefineID: string = '';
  async getActionInstance(id: string) {
    this.actionInstance = (
      await WorkflowService.getActionInstance(id)
    ).actionInstance;
    // console.log(this.actionInstance);
    this.actionDefineID = this.actionInstance.actionDefineID;
    this.getActionDefine(this.actionDefineID);
    this.getWorkflowInstance(this.actionInstance.flowInstanceID);
    this.getTimeLine(this.actionInstance.flowInstanceID);
  }

  @Watch('actionInstanceID', { immediate: true })
  onActionInstanceIDChanged() {
    if (this.actionInstanceID) this.getActionInstance(this.actionInstanceID);
  }

  approvalCommand: string = '';
  approvalResult: boolean = true;
  approvalCommandDialog: boolean = false;
  @userModule.Getter('authorization') authorization!: Authorization;
  @Prop({ default: () => -1 }) flowTaskID!: number;

  async approveWorkflow() {
    try {
      await WorkflowService.completeTask(
        this.flowTaskID,
        this.authorization.userID,
        this.authorization.userID,
        true,
        this.workflowInstance.id,
        this.approvalCommand
      );
      this.$snack('操作成功', { color: 'success' });
    } catch (_) {
      this.$snack('操作失败', { color: 'error' });
    }
  }

  async rejectWorkflow() {
    try {
      await WorkflowService.completeTask(
        this.flowTaskID,
        this.authorization.userID,
        this.authorization.userID,
        false,
        this.workflowInstance.id,
        this.approvalCommand
      );
      this.$snack('操作成功', { color: 'success' });
    } catch (_) {
      this.$snack('操作失败', { color: 'error' });
    }
  }

  async mounted() {}
}
</script>

<style scoped></style>
